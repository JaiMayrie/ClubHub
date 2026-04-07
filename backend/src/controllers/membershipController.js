const db = require("../db");

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
        (SELECT COUNT(*) FROM memberships m2 WHERE m2.club_id = clubs.id) AS member_count
       FROM memberships
       JOIN clubs ON memberships.club_id = clubs.id
       WHERE memberships.user_id = $1
       ORDER BY memberships.joined_at DESC`,
      [userId],
    );

    res.json({
      memberships: result.rows,
      count: result.rows.length,
    });
  } catch (error) {
    console.error("Error fetching memberships:", error);
    res.status(500).json({ error: "Failed to fetch memberships" });
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
      "SELECT id FROM memberships WHERE user_id = $1 AND club_id = $2",
      [userId, clubId],
    );

    if (membershipCheck.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "You are not a member of this club" });
    }

    // Delete membership
    await db.query(
      "DELETE FROM memberships WHERE user_id = $1 AND club_id = $2",
      [userId, clubId],
    );

    res.json({ message: "Successfully left the club" });
  } catch (error) {
    console.error("Error leaving club:", error);
    res.status(500).json({ error: "Failed to leave club" });
  }
};
