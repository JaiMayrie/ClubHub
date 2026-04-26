const db = require("../db");

/**
 * Get All Clubs
 */
exports.getAllClubs = async (req, res) => {
  try {
    const result = await db.query(`
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
      GROUP BY clubs.id, users.name
      ORDER BY clubs.name ASC
    `);

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

/**
 * Get Club By ID
 */
exports.getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid club ID" });
    }

    const result = await db.query(
      `
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
        (SELECT COUNT(*) FROM memberships WHERE memberships.club_id = clubs.id) AS member_count,
        users.name as admin_name,
        users.email as admin_email
      FROM clubs
      LEFT JOIN users ON clubs.admin_id = users.id
      WHERE clubs.id = $1
    `,
      [id]
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