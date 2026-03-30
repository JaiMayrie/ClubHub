const db = require('../db');

/**
 * Get all members of a club (admin only)
 *
 * @route   GET /api/clubs/:id/members
 * @access  Private (club admin only)
 */
exports.getClubMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Verify club exists and user is the admin
    const clubCheck = await db.query(
      'SELECT id, name, admin_id, member_count FROM clubs WHERE id = $1',
      [id]
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Club not found' });
    }

    if (clubCheck.rows[0].admin_id !== userId) {
      return res.status(403).json({
        error: 'Only the club admin can view the member list',
      });
    }

    const result = await db.query(
      `SELECT 
        users.id,
        users.name,
        users.email,
        memberships.joined_at
       FROM memberships
       JOIN users ON memberships.user_id = users.id
       WHERE memberships.club_id = $1
       ORDER BY memberships.joined_at ASC`,
      [id]
    );

    return res.json({
      club_name: clubCheck.rows[0].name,
      member_count: clubCheck.rows[0].member_count,
      members: result.rows,
    });
  } catch (error) {
    console.error('Error fetching club members:', error);
    return res.status(500).json({ error: 'Failed to fetch members' });
  }
};