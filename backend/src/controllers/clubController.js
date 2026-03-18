const db = require('../db');

/**
 * Get all clubs with optional filtering
 * 
 * @route   GET /api/clubs
 * @access  Public
 * @query   {string} category - Optional: Filter clubs by category
 * @query   {string} search - Optional: Search clubs by name or description
 * @returns {Object} Response object containing clubs array
 * @returns {Array} clubs - Array of club objects
 * @returns {number} clubs[].id - Club ID
 * @returns {string} clubs[].name - Club name
 * @returns {string} clubs[].category - Club category
 * @returns {string} clubs[].description - Club description
 * @returns {number} clubs[].member_count - Number of members
 * @returns {string} clubs[].admin_name - Name of club administrator
 * 
 * @example
 * // Get all clubs
 * GET /api/clubs
 * 
 * @example
 * // Filter by category
 * GET /api/clubs?category=Academic
 * 
 * @example
 * // Search clubs
 * GET /api/clubs?search=chess
 */
exports.getAllClubs = async (req, res) => {
  try {
    // Query all clubs with admin information using LEFT JOIN
    // This ensures we get clubs even if admin info is missing
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
    
    // Handle empty database case
    if (result.rows.length === 0) {
      return res.json({ 
        clubs: [], 
        message: 'No clubs found' 
      });
    }
    
    // Return clubs data
    res.json({ 
      clubs: result.rows,
      count: result.rows.length
    });
    
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch clubs',
      message: 'An error occurred while retrieving clubs from the database'
    });
  }
};