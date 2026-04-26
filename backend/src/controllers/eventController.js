const db = require("../db");

exports.getAllEvents = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT
        events.*,
        clubs.name AS club_name,
        clubs.category AS club_category
      FROM events
      JOIN clubs ON events.club_id = clubs.id
      ORDER BY events.event_date ASC
      `
    );

    res.json({
      events: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error("Error fetching all events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
exports.getRecentEvents = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT
        events.*,
        clubs.name AS club_name,
        clubs.category AS club_category
      FROM events
      JOIN clubs ON events.club_id = clubs.id
      WHERE events.event_date >= NOW() - INTERVAL '30 days'
      ORDER BY events.event_date ASC
      LIMIT 20
      `
    );

    res.json({ events: result.rows });
  } catch (error) {
    console.error("Error fetching recent events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getEventsForClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    const result = await db.query(
      `
      SELECT *
      FROM events
      WHERE club_id = $1
      ORDER BY event_date ASC
      `,
      [clubId]
    );

    res.json({ events: result.rows });
  } catch (error) {
    console.error("Error fetching club events:", error);
    res.status(500).json({ error: "Failed to fetch club events" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { club_id, name, description, location, event_date } = req.body;

    const result = await db.query(
      `
      INSERT INTO events
      (club_id, name, description, location, event_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        club_id,
        name,
        description || "",
        location || "",
        event_date,
      ]
    );

    res.status(201).json({ event: result.rows[0] });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};