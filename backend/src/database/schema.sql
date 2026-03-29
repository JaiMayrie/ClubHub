-- ClubHub Database Schema
-- PostgreSQL Database for Club Management System

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS join_requests;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS clubs;
DROP TABLE IF EXISTS users;

-- ============================================
-- USERS TABLE
-- ============================================
-- Stores all user accounts (students and club admins)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE CHECK (email = LOWER(email)),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups during login
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- CLUBS TABLE
-- ============================================
-- Stores information about all campus clubs
CREATE TABLE clubs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  meeting_info VARCHAR(255),
  contact_email VARCHAR(255),
  admin_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster filtering by category
CREATE INDEX idx_clubs_category ON clubs(category);

-- Index for faster admin lookups
CREATE INDEX idx_clubs_admin_id ON clubs(admin_id);

-- ============================================
-- MEMBERSHIPS TABLE
-- ============================================
-- Junction table for many-to-many relationship between users and clubs
CREATE TABLE memberships (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  club_id INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, club_id)
);

-- Composite index for faster queries
CREATE INDEX idx_memberships_user_club ON memberships(user_id, club_id);
CREATE INDEX idx_memberships_club_id ON memberships(club_id);

-- ============================================
-- JOIN_REQUESTS TABLE
-- ============================================
-- Stores pending requests from students to join clubs
CREATE TABLE join_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  club_id INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, club_id)
);

-- Index for faster admin queries (get all requests for a club)
CREATE INDEX idx_join_requests_club_id ON join_requests(club_id);
CREATE INDEX idx_join_requests_status ON join_requests(status);

-- ============================================
-- PERFORMANCE INDEXES (Sprint 4 - US-405)
-- ============================================

-- Full-text search index for club name and description (speeds up ILIKE queries)
CREATE INDEX idx_clubs_name_search ON clubs USING gin(to_tsvector('english', name));
CREATE INDEX idx_clubs_description_search ON clubs USING gin(to_tsvector('english', description));

-- Index for join_requests by user (speeds up my-requests endpoint)
CREATE INDEX idx_join_requests_user_id ON join_requests(user_id);

-- Index for pending requests specifically (most common query pattern)
CREATE INDEX idx_join_requests_pending ON join_requests(club_id, status) WHERE status = 'pending';

-- Index for memberships by user (speeds up my-memberships endpoint)
CREATE INDEX idx_memberships_user_id ON memberships(user_id);