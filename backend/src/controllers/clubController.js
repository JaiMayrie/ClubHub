const db = require('../db');

// Placeholder for future functions
module.exports = {};

exports.getAllClubs = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, category, description, member_count FROM clubs ORDER BY name'
    );
    
    res.json({ clubs: result.rows });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};