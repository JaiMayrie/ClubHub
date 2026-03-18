const db = require('../db');

// Placeholder for future functions
module.exports = {};

exports.getAllClubs = async (req, res) => {
  try {
    const result = await db.query(`
    SELECT 
        clubs.id, 
        clubs.name, 
        clubs.category, 
        clubs.description, 
        clubs.member_count,
        users.name as admin_name
    FROM clubs
    LEFT JOIN users ON clubs.admin_id = users.id
    ORDER BY clubs.name
    `);
    
    res.json({ clubs: result.rows });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
};