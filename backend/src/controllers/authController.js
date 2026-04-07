/**
 * Auth Controller
 * Handles user registration and login.
 * JWT is used for authentication.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Generates a JWT token containing userId and role
// Token expires in 7 days

const generateToken = (userId, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    // 1. Check duplicate email
    const existing = await db.query("SELECT id FROM users WHERE email = $1", [
      normalizedEmail,
    ]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // 2. Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Insert user
    const result = await db.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [name, normalizedEmail, passwordHash, "student"],
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.role);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already registered" });
    }

    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await db.query(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = $1",
      [normalizedEmail],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id, user.role);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================= CURRENT USER =================
exports.getMe = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, role, bio, major, year, created_at FROM users WHERE id = $1",
      [req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: result.rows[0] });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const userResult = await db.query(
      "SELECT id, name, bio, major, year, created_at FROM users WHERE id = $1",
      [id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const clubsResult = await db.query(
      `SELECT clubs.id, clubs.name AS club_name, clubs.category
       FROM memberships
       JOIN clubs ON memberships.club_id = clubs.id
       WHERE memberships.user_id = $1
       ORDER BY clubs.name`,
      [id],
    );

    return res.json({ user: userResult.rows[0], clubs: clubsResult.rows });
  } catch (error) {
    console.error("Get public profile error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, major, year } = req.body;

    if (name !== undefined) {
      if (!name || !name.trim()) {
        return res.status(400).json({ error: "Name is required" });
      }
      if (name.trim().length < 2 || name.trim().length > 100) {
        return res.status(400).json({
          error: "Name must be between 2 and 100 characters",
        });
      }
    }

    if (bio !== undefined && bio.length > 500) {
      return res
        .status(400)
        .json({ error: "Bio must be 500 characters or fewer" });
    }

    if (major !== undefined && major.length > 100) {
      return res
        .status(400)
        .json({ error: "Major must be 100 characters or fewer" });
    }

    const validYears = [
      "",
      "Freshman",
      "Sophomore",
      "Junior",
      "Senior",
      "Graduate",
      "Other",
    ];
    if (year !== undefined && !validYears.includes(year)) {
      return res.status(400).json({ error: "Invalid year value" });
    }

    const result = await db.query(
      `UPDATE users
       SET name  = COALESCE($1, name),
           bio   = COALESCE($2, bio),
           major = COALESCE($3, major),
           year  = COALESCE($4, year)
       WHERE id = $5
       RETURNING id, name, email, role, bio, major, year, created_at`,
      [
        name !== undefined ? name.trim() : null,
        bio !== undefined ? bio : null,
        major !== undefined ? major : null,
        year !== undefined ? year : null,
        req.userId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "New password must be at least 6 characters",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        error: "New password must be different from current password",
      });
    }

    // Fetch current password hash
    const result = await db.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isValid = await bcrypt.compare(
      currentPassword,
      result.rows[0].password_hash,
    );

    if (!isValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash and save new password
    const saltRounds = 10;
    const newHash = await bcrypt.hash(newPassword, saltRounds);

    await db.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      newHash,
      req.userId,
    ]);

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
