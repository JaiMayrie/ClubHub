const db = require('../db');

/**
 * Get current user's club memberships
 * 
 * @route   GET /api/memberships/my-memberships
 * @access  Private
 */
exports.getMyMemberships = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await db.query(
      `SELECT 
        memberships.id,
        memberships.joined_at,
        clubs.id as club_id,
        clubs.name as club_name,
        clubs.category,
        clubs.description,
        clubs.meeting_info,
        clubs.contact_email,
        clubs.member_count
       FROM memberships
       JOIN clubs ON memberships.club_id = clubs.id
       WHERE memberships.user_id = $1
       ORDER BY memberships.joined_at DESC`,
      [userId]
    );

    res.json({
      memberships: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Error fetching memberships:', error);
    res.status(500).json({ error: 'Failed to fetch memberships' });
  }
};

/**
 * Leave a club (remove membership)
 * 
 * @route   DELETE /api/memberships/:clubId
 * @access  Private
 */
exports.leaveClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const userId = req.userId;

    // Check if membership exists
    const membershipCheck = await db.query(
      'SELECT id FROM memberships WHERE user_id = $1 AND club_id = $2',
      [userId, clubId]
    );

    if (membershipCheck.rows.length === 0) {
      return res.status(404).json({ error: 'You are not a member of this club' });
    }

    // Begin transaction
    const client = await db.pool.connect();
    
    try {
      await client.query('BEGIN');

      // Delete membership
      await client.query(
        'DELETE FROM memberships WHERE user_id = $1 AND club_id = $2',
        [userId, clubId]
      );

      // Decrement member count
      await client.query(
        'UPDATE clubs SET member_count = GREATEST(member_count - 1, 0) WHERE id = $1',
        [clubId]
      );

      await client.query('COMMIT');

      res.json({ message: 'Successfully left the club' });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error leaving club:', error);
    res.status(500).json({ error: 'Failed to leave club' });
  }
};