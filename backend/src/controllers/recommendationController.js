const db = require("../db");
const { VertexAI } = require("@google-cloud/vertexai");

const vertexAI = new VertexAI({
  project: process.env.GCLOUD_PROJECT_ID,
  location: "global",
});

const model = vertexAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

exports.getRecommendations = async (req, res) => {
  try {
    console.log("✅ Vertex AI hit:", req.userId);

    const userId = req.userId;

    // 1. User profile
    const userResult = await db.query(
      "SELECT name, major, year, bio FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // 2. Joined clubs
    const joinedResult = await db.query(
      `SELECT clubs.name FROM memberships
       JOIN clubs ON memberships.club_id = clubs.id
       WHERE memberships.user_id = $1`,
      [userId]
    );

    const joinedNames = joinedResult.rows.map((r) => r.name);

    // 3. Available clubs
    const clubsResult = await db.query(
      `SELECT name, category, description
       FROM clubs
       WHERE id NOT IN (
         SELECT club_id FROM memberships WHERE user_id = $1
       )`,
      [userId]
    );

    const available = clubsResult.rows;

    if (available.length === 0) {
      return res.json({ recommendations: [] });
    }

    // 4. Build prompt
    const prompt = `
You are a university club advisor.

Student:
- Major: ${user.major || "N/A"}
- Year: ${user.year || "N/A"}
- Bio: ${user.bio || "N/A"}
- Already joined: ${joinedNames.join(", ") || "None"}

Available clubs:
${available.map(c => `- ${c.name} (${c.category}): ${c.description}`).join("\n")}

Return ONLY valid JSON array:
[
  {
    "club_name": "",
    "category": "",
    "reason": ""
  }
]
`;

    // 5. Call Vertex AI
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("✅ Vertex raw response:", text);

    // 6. Parse JSON safely
    let recommendations = [];
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      recommendations = JSON.parse(cleaned);
    } catch (err) {
      console.error("❌ JSON parse error:", text);
      return res.status(502).json({
        error: "Invalid AI response format",
      });
    }

    return res.json({ recommendations });
  } catch (err) {
    console.error("❌ Vertex error:", err);
    return res.status(500).json({ error: "AI failed" });
  }
};