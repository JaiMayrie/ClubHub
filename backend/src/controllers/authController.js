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
