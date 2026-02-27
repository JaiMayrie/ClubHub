-- ClubHub Seed Data
-- Test data for development and testing

-- ============================================
-- INSERT TEST USERS
-- ============================================
-- Note: Password hashes are examples only. Use bcrypt to generate real hashes
INSERT INTO users (name, email, password_hash, role) VALUES
('Alice Johnson', 'alice@purdue.edu', '$2b$10$examplehash1', 'admin'),
('Bob Smith', 'bob@purdue.edu', '$2b$10$examplehash2', 'student'),
('Carol White', 'carol@purdue.edu', '$2b$10$examplehash3', 'student'),
('David Lee', 'david@purdue.edu', '$2b$10$examplehash4', 'admin');

-- ============================================
-- INSERT TEST CLUBS
-- ============================================
INSERT INTO clubs (name, category, description, meeting_info, contact_email, admin_id) VALUES
('Purdue Hackers', 'Academic', 'Student-run community of builders and hackers interested in software, hardware, and entrepreneurship.', 'Fridays 6PM, Lawson B134', 'team@purduehackers.com', 1),
('Chess Club', 'Special Interest', 'Weekly chess games and tournaments for players of all skill levels.', 'Wednesdays 7PM, PMU East Faculty Lounge', 'chess@purdue.edu', 4),
('Data Mine Corporate Partners', 'Professional Development', 'Work on real-world data science projects with industry partners.', 'Tuesdays 5PM, Hillenbrand Hall', 'datamine@purdue.edu', 1),
('Boilermaker Aquatic Club', 'Sports & Recreation', 'Competitive swimming and water polo for serious athletes.', 'Mon/Wed/Fri 6AM, CoRec Pool', 'swim@purdue.edu', 4);

-- ============================================
-- INSERT TEST MEMBERSHIPS
-- ============================================
INSERT INTO memberships (user_id, club_id) VALUES
(2, 1),  -- Bob joins Purdue Hackers
(2, 2),  -- Bob joins Chess Club
(3, 1),  -- Carol joins Purdue Hackers
(3, 4);  -- Carol joins Aquatic Club

-- ============================================
-- UPDATE MEMBER COUNTS
-- ============================================
UPDATE clubs SET member_count = (
  SELECT COUNT(*) FROM memberships WHERE club_id = clubs.id
);

-- ============================================
-- INSERT TEST JOIN REQUEST
-- ============================================
INSERT INTO join_requests (user_id, club_id, message) VALUES
(3, 2, 'I love chess and would like to join!');