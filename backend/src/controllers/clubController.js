const db = require("../db");

// ================= GET ALL CLUBS =================
exports.getAllClubs = async (req, res) => {
  try {
    const { category, search } = req.query;
    const sanitizedCategory = category?.trim();
    const sanitizedSearch = search?.trim();

    let query = `
      SELECT 
        clubs.id,
        clubs.name,
        clubs.category,
        clubs.description,
        clubs.meeting_info,
        clubs.contact_email,
        clubs.admin_id,
        clubs.created_at,
        clubs.updated_at,
        COUNT(memberships.id) AS member_count,
        users.name AS admin_name
      FROM clubs
      LEFT JOIN users ON clubs.admin_id = users.id
      LEFT JOIN memberships ON memberships.club_id = clubs.id
    `;

    const values = [];
    const conditions = [];
    let paramCount = 1;

    if (sanitizedCategory) {
      conditions.push(`clubs.category = $${paramCount}`);
      values.push(sanitizedCategory);
      paramCount++;
    }

    if (sanitizedSearch) {
      conditions.push(
        `(clubs.name ILIKE $${paramCount} OR clubs.description ILIKE $${paramCount})`,
      );
      values.push(`%${sanitizedSearch}%`);
      paramCount++;
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " GROUP BY clubs.id, users.name ORDER BY clubs.name ASC";

    const result = await db.query(query, values);

    return res.json({
      clubs: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error("❌ Error fetching clubs:", error);
    return res.status(500).json({
      error: "Failed to fetch clubs",
      message: error.message,
    });
  }
};

// ================= GET CLUB BY ID =================
exports.getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    const result = await db.query(
      `SELECT 
        clubs.id,
        clubs.name,
        clubs.category,
        clubs.description,
        clubs.meeting_info,
        clubs.contact_email,
        clubs.admin_id,
        clubs.created_at,
        clubs.updated_at,
        (SELECT COUNT(*) FROM memberships WHERE memberships.club_id = clubs.id) AS member_count,
        users.name AS admin_name,
        users.email AS admin_email
      FROM clubs
      LEFT JOIN users ON clubs.admin_id = users.id
      WHERE clubs.id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    return res.json({ club: result.rows[0] });
  } catch (error) {
    console.error("❌ Error fetching club:", error);
    return res.status(500).json({
      error: "Failed to fetch club",
      message: error.message,
    });
  }
};

// ================= GET MY CLUBS =================
exports.getMyClubs = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        id, name, category, description, meeting_info, contact_email,
        created_at, updated_at,
        (SELECT COUNT(*) FROM memberships WHERE memberships.club_id = clubs.id) AS member_count
       FROM clubs
       WHERE admin_id = $1
       ORDER BY created_at DESC`,
      [req.userId],
    );

    return res.json({
      clubs: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error("❌ Error fetching user clubs:", error);
    return res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

// ================= CREATE CLUB =================
exports.createClub = async (req, res) => {
  try {
    const { name, category, description, meeting_info, contact_email } =
      req.body;

    if (!name || !category || !description) {
      return res.status(400).json({
        error: "Name, category, and description are required",
      });
    }

    if (name.trim().length < 3 || name.trim().length > 150) {
      return res.status(400).json({
        error: "Club name must be between 3 and 150 characters",
      });
    }

    const validCategories = [
      "Academic",
      "Sports",
      "Arts",
      "Service",
      "Professional",
      "Special Interest",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
      });
    }

    if (contact_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact_email)) {
        return res.status(400).json({ error: "Invalid contact email format" });
      }
    }

    if (req.userRole !== "admin") {
      return res
        .status(403)
        .json({ error: "Only administrators can create clubs" });
    }

    const result = await db.query(
      `INSERT INTO clubs (name, category, description, meeting_info, contact_email, admin_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name.trim(),
        category,
        description,
        meeting_info || null,
        contact_email || null,
        req.userId,
      ],
    );

    const club = result.rows[0];

    // Add admin as a member of their own club
    await db.query(
      "INSERT INTO memberships (user_id, club_id) VALUES ($1, $2)",
      [req.userId, club.id],
    );

    return res.status(201).json({
      message: "Club created successfully",
      club,
    });
  } catch (error) {
    console.error("❌ Error creating club:", error);
    return res.status(500).json({ error: "Failed to create club" });
  }
};

// ================= UPDATE CLUB =================
exports.updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, meeting_info, contact_email } =
      req.body;
    const userId = req.userId;

    const clubCheck = await db.query(
      "SELECT admin_id FROM clubs WHERE id = $1",
      [id],
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (clubCheck.rows[0].admin_id !== userId) {
      return res
        .status(403)
        .json({ error: "Only the club admin can edit this club" });
    }

    const validCategories = [
      "Academic",
      "Sports",
      "Arts",
      "Service",
      "Professional",
      "Special Interest",
    ];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
      });
    }

    if (contact_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact_email)) {
        return res.status(400).json({ error: "Invalid contact email format" });
      }
    }

    const result = await db.query(
      `UPDATE clubs
       SET name         = COALESCE($1, name),
           category     = COALESCE($2, category),
           description  = COALESCE($3, description),
           meeting_info = COALESCE($4, meeting_info),
           contact_email = COALESCE($5, contact_email),
           updated_at   = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        name || null,
        category || null,
        description || null,
        meeting_info || null,
        contact_email || null,
        id,
      ],
    );

    return res.json({
      message: "Club updated successfully",
      club: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error updating club:", error);
    return res.status(500).json({ error: "Failed to update club" });
  }
};

// ================= GET CLUB JOIN REQUESTS =================
exports.getClubJoinRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const clubCheck = await db.query(
      "SELECT admin_id FROM clubs WHERE id = $1",
      [id],
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (clubCheck.rows[0].admin_id !== userId) {
      return res.status(403).json({
        error: "You are not authorized to view requests for this club",
      });
    }

    const result = await db.query(
      `SELECT 
        join_requests.*,
        users.name AS user_name,
        users.email AS user_email
       FROM join_requests
       JOIN users ON join_requests.user_id = users.id
       WHERE join_requests.club_id = $1 AND join_requests.status = 'pending'
       ORDER BY join_requests.created_at DESC`,
      [id],
    );

    return res.json({
      requests: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error("❌ Error fetching join requests:", error);
    return res.status(500).json({ error: "Failed to fetch join requests" });
  }
};
