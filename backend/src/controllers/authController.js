/**
 * Auth Controller
 * Handles user registration and login.
 * Currently uses mocked users (no database integration yet).
 * JWT is used for authentication.
 */

// TODO: Replace mocked logic with DB implementation once users table is finalized.

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Generates a JWT token containing userId and role
// Token expires in 7 days

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // In register, after checking if (!name || !email || !password)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // =====================================================
    // DATABASE IMPLEMENTATION (Uncomment when DB ready)
    // =====================================================

    /*
    // 1. Check duplicate email
    const existing = await db.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
    );

    if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'Email already registered' });
    }

    // 2. Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Insert user
    const result = await db.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
    [name, email, passwordHash, 'student']
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.role);

    return res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    });
    */

    // =====================================================
    // TEMP MOCK USER (Current Sprint Implementation)
    // =====================================================
    const user = {
      id: 1,
      name,
      email,
      role: 'student'
    };

    const token = generateToken(user.id, user.role);

    return res.status(201).json({
      message: 'User registered (mocked)',
      token,
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // =====================================================
    // DATABASE IMPLEMENTATION (Uncomment when DB ready)
    // =====================================================

    /*
    const result = await db.query(
    'SELECT id, name, email, password_hash, role FROM users WHERE email = $1',
    [email]
    );

    if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.role);

    return res.json({
    message: 'Login successful',
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    });
    */

    // =====================================================
    // TEMP MOCK (Current Sprint)
    // =====================================================
    const user = {
      id: 1,
      name: 'Mock User',
      email,
      role: 'student'
    };

    const token = generateToken(user.id, user.role);

    return res.json({
      message: 'Login successful (mocked)',
      token,
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};