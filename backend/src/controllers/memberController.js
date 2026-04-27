const db = require("../db");

/**
 * Get all members of a club (admin or club member)
 *
 * @route   GET /api/clubs/:id/members
 * @access  Private (club admin or member)
 */
exports.getClubMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.userId, 10);

    // Verify club exists
    const clubCheck = await db.query(
      "SELECT id, name, admin_id FROM clubs WHERE id = $1",
      [id],
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    const isAdmin = clubCheck.rows[0].admin_id === userId;

    // Allow access to admin or any club member
    if (!isAdmin) {
      const memberCheck = await db.query(
        "SELECT 1 FROM memberships WHERE club_id = $1 AND user_id = $2",
        [id, userId],
      );
      if (memberCheck.rows.length === 0) {
        return res.status(403).json({
          error: "Only club members can view the member list",
        });
      }
    }

    const result = await db.query(
      `SELECT 
        users.id,
        users.name,
        ${isAdmin ? "users.email," : ""}
        memberships.joined_at
       FROM memberships
       JOIN users ON memberships.user_id = users.id
       WHERE memberships.club_id = $1
       ORDER BY memberships.joined_at ASC`,
      [id],
    );

    return res.json({
      club_name: clubCheck.rows[0].name,
      admin_id: clubCheck.rows[0].admin_id,
      member_count: result.rows.length,
      members: result.rows,
      is_admin: isAdmin,
    });
  } catch (error) {
    console.error("Error fetching club members:", error);
    return res.status(500).json({ error: "Failed to fetch members" });
  }
};

/**
 * Remove a member from a club (admin only)
 *
 * @route   DELETE /api/clubs/:id/members/:userId
 * @access  Private (club admin only)
 */
exports.removeClubMember = async (req, res) => {
  try {
    const { id, userId: targetUserId } = req.params;
    const adminId = req.userId;

    // Verify club exists and requester is the admin
    const clubCheck = await db.query(
      "SELECT admin_id FROM clubs WHERE id = $1",
      [id],
    );

    if (clubCheck.rows.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (clubCheck.rows[0].admin_id !== adminId) {
      return res.status(403).json({
        error: "Only the club admin can remove members",
      });
    }

    // Prevent admin from removing themselves
    if (parseInt(targetUserId) === adminId) {
      return res.status(400).json({
        error: "Club admin cannot remove themselves from the club",
      });
    }

    // Check membership exists
    const memberCheck = await db.query(
      "SELECT id FROM memberships WHERE user_id = $1 AND club_id = $2",
      [targetUserId, id],
    );

    if (memberCheck.rows.length === 0) {
      return res.status(404).json({
        error: "This user is not a member of the club",
      });
    }

    // Remove membership
    await db.query(
      "DELETE FROM memberships WHERE user_id = $1 AND club_id = $2",
      [targetUserId, id],
    );

    return res.json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Error removing member:", error);
    return res.status(500).json({ error: "Failed to remove member" });
  }
};
