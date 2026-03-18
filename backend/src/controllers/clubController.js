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

/**
 * Get club by ID with detailed information
 * 
 * @route   GET /api/clubs/:id
 * @access  Public
 * @param   {number} id - Club ID from URL parameter
 * @returns {Object} club - Detailed club information including admin details
 * 
 * @example
 * GET /api/clubs/1
 */
exports.getClubById = async (req, res) => {
  try {
    // Extract club ID from URL parameters
    const { id } = req.params;
    
    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid club ID' });
    }
    
    // Query club with admin information
    const result = await db.query(`
      SELECT 
        clubs.*,
        users.name as admin_name,
        users.email as admin_email
      FROM clubs
      LEFT JOIN users ON clubs.admin_id = users.id
      WHERE clubs.id = $1
    `, [id]);
    
    // Handle club not found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Club not found' });
    }
    
    // Return club details
    res.json({ club: result.rows[0] });
    
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ error: 'Failed to fetch club' });
  }
};

/**
 * Create a new club (admin only)
 * 
 * @route   POST /api/clubs
 * @access  Private (Admin only)
 * @body    {string} name - Club name (required)
 * @body    {string} category - Club category (required)
 * @body    {string} description - Club description (required)
 * @body    {string} meeting_info - Meeting information (optional)
 * @body    {string} contact_email - Contact email (optional)
 * @returns {Object} club - Created club object
 * 
 * @example
 * POST /api/clubs
 * Headers: { Authorization: "Bearer <token>" }
 * Body: {
 *   "name": "Robotics Club",
 *   "category": "Academic",
 *   "description": "Build and program robots",
 *   "meeting_info": "Fridays 5PM",
 *   "contact_email": "robotics@purdue.edu"
 * }
 */
exports.createClub = async (req, res) => {
  try {
    const { name, category, description, meeting_info, contact_email } = req.body;
    
    // ========== VALIDATION 1: Required Fields ==========
    if (!name || !category || !description) {
      return res.status(400).json({ 
        error: 'Name, category, and description are required' 
      });
    }
    
    // ========== VALIDATION 2: Name Length ==========
    if (name.length < 3 || name.length > 150) {
      return res.status(400).json({ 
        error: 'Club name must be between 3 and 150 characters' 
      });
    }
    
    // ========== VALIDATION 3: Valid Category ==========
    const validCategories = [
      'Academic', 
      'Sports', 
      'Arts', 
      'Service', 
      'Professional', 
      'Special Interest'
    ];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ 
        error: `Invalid category. Must be one of: ${validCategories.join(', ')}` 
      });
    }
    
    // ========== VALIDATION 4: Contact Email Format ==========
    if (contact_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact_email)) {
        return res.status(400).json({ 
          error: 'Invalid contact email format' 
        });
      }
    }
    
    // ========== AUTHORIZATION: Check Admin Role ==========
    if (req.userRole !== 'admin') {
      return res.status(403).json({ 
        error: 'Only administrators can create clubs' 
      });
    }
    
    // ========== DATABASE: Insert New Club ==========
    const result = await db.query(
      `INSERT INTO clubs (name, category, description, meeting_info, contact_email, admin_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, category, description, meeting_info, contact_email, req.userId]
    );
    
    const club = result.rows[0];
    
    // ========== SUCCESS RESPONSE ==========
    res.status(201).json({
      message: 'Club created successfully',
      club
    });
    
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ 
      error: 'Failed to create club',
      message: 'An error occurred while creating the club'
    })