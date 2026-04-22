const db = require("../db");

/**
 * GET /api/recommendations
 * Returns 3–5 AI-suggested clubs for the logged-in student.
 * Uses Google Gemini API (free tier).
 * Response shape per club: { club_name, category, reason }
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

    // 2. Clubs the user already joined
    const joinedResult = await db.query(
      `SELECT clubs.name FROM memberships
       JOIN clubs ON memberships.club_id = clubs.id
       WHERE memberships.user_id = $1`,
      [userId]
    );
    const joinedNames = joinedResult.rows.map((r) => r.name);

    // 3. All other available clubs
    const clubsResult = await db.query(
      `SELECT name, category, description
       FROM clubs
       WHERE id NOT IN (
         SELECT club_id FROM memberships WHERE user_id = $1
       )
       ORDER BY name ASC`,
      [userId]
    );
    const available = clubsResult.rows;

    if (available.length === 0) {
      return res.json({ recommendations: [] });
    }

    // 4. Build prompt
    const profileLines = [
      user.major ? `Major: ${user.major}`                     : null,
      user.year  ? `Year: ${user.year}`                       : null,
      user.bio   ? `Bio: "${user.bio}"`                       : null,
      joinedNames.length
        ? `Already joined: ${joinedNames.join(", ")}`         : null,
    ].filter(Boolean).join("\n");

    const clubList = available
      .map((c) => `- ${c.name} (${c.category}): ${c.description}`)
      .join("\n");

    const prompt = `You are a helpful club advisor at Purdue Fort Wayne university.

Student profile:
${profileLines || "No profile info provided yet."}

Clubs available to join:
${clubList}

Recommend exactly 3 to 5 clubs that best fit this student based on their profile.
Return ONLY a raw JSON array — no markdown, no code fences, no explanation outside the JSON.
Each item must have exactly these three keys:
  "club_name"  — the exact club name from the list above
  "category"   — the club category
  "reason"     — one sentence explaining why it suits this student

Example:
[
  { "club_name": "Robotics Club", "category": "Academic", "reason": "Matches your CS major and interest in building things." }
]`;

    // 5. Call Gemini API (free tier — gemini-1.5-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const geminiData = await geminiResponse.json();

    // Extract text from Gemini response structure
    const rawText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // 6. Parse safely — strip any accidental markdown fences
    let recommendations = [];
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      recommendations = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Gemini response:", rawText);
      return res.status(502).json({ error: "Failed to parse AI response" });
    }

    return res.json({ recommendations });
  } catch (error) {
    console.error("Recommendations error:", error);
    return res.status(500).json({ error: "Failed to get recommendations" });
  }
};
