const db = require("../db");

/**
 * GET /api/recommendations
 * Returns 3-5 AI-suggested clubs for the logged-in student
 * based on their major, year, bio, and clubs already joined.
 */
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Fetch user profile
    const userResult = await db.query(
      "SELECT name, major, year, bio FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // 2. Fetch clubs user is already in
    const membershipResult = await db.query(
      `SELECT clubs.name FROM memberships
       JOIN clubs ON memberships.club_id = clubs.id
       WHERE memberships.user_id = $1`,
      [userId]
    );
    const joinedClubNames = membershipResult.rows.map((r) => r.name);

    // 3. Fetch all clubs (excluding ones already joined)
    const clubsResult = await db.query(
      `SELECT clubs.name, clubs.category, clubs.description
       FROM clubs
       WHERE clubs.id NOT IN (
         SELECT club_id FROM memberships WHERE user_id = $1
       )
       ORDER BY clubs.name ASC`,
      [userId]
    );

    const availableClubs = clubsResult.rows;

    if (availableClubs.length === 0) {
      return res.json({ recommendations: [] });
    }

    // 4. Build prompt for Claude
    const userContext = [
      user.major ? `Major: ${user.major}` : null,
      user.year ? `Year: ${user.year}` : null,
      user.bio ? `Bio: "${user.bio}"` : null,
      joinedClubNames.length > 0
        ? `Already in: ${joinedClubNames.join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const clubsList = availableClubs
      .map((c) => `- ${c.name} (${c.category}): ${c.description}`)
      .join("\n");

    const prompt = `You are a helpful university club advisor at Purdue Fort Wayne.

Student profile:
${userContext || "No profile info provided yet."}

Available clubs the student has NOT joined yet:
${clubsList}

Based on the student's profile, recommend exactly 3 to 5 clubs that would be the best fit.
Return ONLY a JSON array with no extra text, markdown, or explanation outside the JSON.
Format:
[
  {
    "club_name": "Exact Club Name",
    "category": "Category",
    "reason": "One sentence explaining why this club fits this student."
  }
]`;

    // 5. Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Claude API error:", err);
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const aiData = await response.json();
    const rawText = aiData.content?.[0]?.text || "[]";

    // 6. Parse JSON safely
    let recommendations = [];
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      recommendations = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", rawText);
      return res.status(502).json({ error: "Failed to parse AI response" });
    }

    return res.json({ recommendations });
  } catch (error) {
    console.error("Recommendations error:", error);
    return res.status(500).json({ error: "Failed to get recommendations" });
  }
};
