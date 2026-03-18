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
    // Extract and sanitize query parameters
    const { category, search } = req.query;
    const sanitizedCategory = category?.trim();
    const sanitizedSearch = search?.trim();
    
    // Build dynamic SQL query
    let query = `
      SELECT 
        clubs.id, 
        clubs.name, 
        clubs.category, 
        clubs.description, 
        clubs.member_count,
        clubs.created_at,
        users.name as admin_name
      FROM clubs
      LEFT JOIN users ON clubs.admin_id = users.id
    `;
    
    const values = [];
    const conditions = [];
    let paramCount = 1;
    
    // Add category filter if provided
    if (sanitizedCategory) {
      conditions.push(`clubs.category = $${paramCount}`);
      values.push(sanitizedCategory);
      paramCount++;
    }
    
    // Add search filter if provided (searches both name and description)
    if (sanitizedSearch) {
      conditions.push(`(clubs.name ILIKE $${paramCount} OR clubs.description ILIKE $${paramCount})`);
      values.push(`%${sanitizedSearch}%`);
      paramCount++;
    }
    
    // Apply WHERE clause if any conditions exist
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    // Always order by name
    query += ' ORDER BY clubs.name ASC';
    
    // Execute query
    const result = await db.query(query, values);
    
    // Handle empty results
    if (result.rows.length === 0) {
      return res.json({ 
        clubs: [], 
        count: 0,
        message: 'No clubs found matching your criteria' 
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

exports.getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(
      'SELECT * FROM clubs WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Club not found' });
    }
    
    res.json({ club: result.rows[0] });
    
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ error: 'Failed to fetch club' });
  }
};