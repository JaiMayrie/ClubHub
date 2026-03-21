const db = require('../db');

/**
 * Submit a join request to a club
 * 
 * @route   POST /api/join-requests
 * @access  Private (authenticated students)
 * @body    {number} club_id - ID of club to join
 * @body    {string} message - Optional message to club admin
 */
exports.submitJoinRequest = async (req, res) => {
  try {
    const { club_id, message } = req.body;
    const userId = req.userId;

    // Validation
    if (!club_id) {
      return res.status(400).json({ error: 'Club ID is required' });
    }

    // Check if club exists
    const clubCheck = await db.query(
      'SELECT id, name FROM clubs WHERE id = $1',
      [club_id]
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check if user is already a member
    const membershipCheck = await db.query(
      'SELECT id FROM memberships WHERE user_id = $1 AND club_id = $2',
      [userId, club_id]
    );

    if (membershipCheck.rows.length > 0) {
      return res.status(400).json({ error: 'You are already a member of this club' });
    }

    // Check if user already has a pending request
    const requestCheck = await db.query(
      'SELECT id FROM join_requests WHERE user_id = $1 AND club_id = $2 AND status = $3',
      [userId, club_id, 'pending']
    );

    if (requestCheck.rows.length > 0) {
      return res.status(400).json({ error: 'You already have a pending request for this club' });
    }

    // Create join request
    const result = await db.query(
      `INSERT INTO join_requests (user_id, club_id, message, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, club_id, message || null, 'pending']
    );

    res.status(201).json({
      message: 'Join request submitted successfully',
      request: result.rows[0]
    });

  } catch (error) {
    console.error('Error submitting join request:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(400).json({ 
        error: 'You already have a request for this club' 
      });
    }

    res.status(500).json({ error: 'Failed to submit join request' });
  }
};

/**
 * Get join requests for a specific club (admin only)
 * 
 * @route   GET /api/clubs/:id/join-requests
 * @access  Private (club admin only)
 */
exports.getClubJoinRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if user is admin of this club
    const clubCheck = await db.query(
      'SELECT admin_id FROM clubs WHERE id = $1',
      [id]
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Club not found' });
    }

    if (clubCheck.rows[0].admin_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to view requests for this club' });
    }

    // Get pending join requests with user information
    const result = await db.query(
      `SELECT 
        join_requests.*,
        users.name as user_name,
        users.email as user_email
       FROM join_requests
       JOIN users ON join_requests.user_id = users.id
       WHERE join_requests.club_id = $1 AND join_requests.status = $2
       ORDER BY join_requests.created_at DESC`,
      [id, 'pending']
    );

    res.json({
      requests: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Error fetching join requests:', error);
    res.status(500).json({ error: 'Failed to fetch join requests' });
  }
};

/**
 * Get current user's join requests
 * 
 * @route   GET /api/join-requests/my-requests
 * @access  Private
 */
exports.getMyJoinRequests = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await db.query(
      `SELECT 
        join_requests.*,
        clubs.name as club_name,
        clubs.category as club_category
       FROM join_requests
       JOIN clubs ON join_requests.club_id = clubs.id
       WHERE join_requests.user_id = $1
       ORDER BY join_requests.created_at DESC`,
      [userId]
    );

    res.json({
      requests: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Error fetching user join requests:', error);
    res.status(500).json({ error: 'Failed to fetch join requests' });
  }
};

/**
 * Approve or reject a join request
 * 
 * @route   PATCH /api/join-requests/:id
 * @access  Private (club admin only)
 * @body    {string} status - 'approved' or 'rejected'
 */
exports.updateJoinRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    // Validation
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        error: 'Status must be either "approved" or "rejected"' 
      });
    }

    // Get join request with club info
    const requestCheck = await db.query(
      `SELECT jr.*, c.admin_id, c.name as club_name
       FROM join_requests jr
       JOIN clubs c ON jr.club_id = c.id
       WHERE jr.id = $1`,
      [id]
    );

    if (requestCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Join request not found' });
    }

    const request = requestCheck.rows[0];

    // Check if user is admin of the club
    if (request.admin_id !== userId) {
      return res.status(403).json({ 
        error: 'You are not authorized to manage requests for this club' 
      });
    }

    // Check if request is still pending
    if (request.status !== 'pending') {
      return res.status(400).json({ 
        error: 'This request has already been processed' 
      });
    }

    // Begin transaction
    const client = await db.pool.getConnection();
    
    try {
      await client.query('BEGIN');

      // Update request status
      await client.query(
        'UPDATE join_requests SET status = $1 WHERE id = $2',
        [status, id]
      );

      // If approved, create membership and increment member count
      if (status === 'approved') {
        // Add to memberships
        await client.query(
          `INSERT INTO memberships (user_id, club_id)
           VALUES ($1, $2)`,
          [request.user_id, request.club_id]
        );

        // Increment club member count
        await client.query(
          'UPDATE clubs SET member_count = member_count + 1 WHERE id = $1',
          [request.club_id]
        );
      }

      await client.query('COMMIT');

      res.json({
        message: `Join request ${status} successfully`,
        status
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error updating join request:', error);
    res.status(500).json({ error: 'Failed to update join request' });
  }
};
