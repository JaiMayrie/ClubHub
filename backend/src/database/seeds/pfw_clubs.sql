-- =============================================================
-- ClubHub Seed Data — Purdue University Fort Wayne (PFW) Clubs
-- Generated from: https://www.pfw.edu/student-life/student-organizations
-- =============================================================

-- Clear existing data (reverse FK order) and reset sequences
TRUNCATE TABLE join_requests, memberships, clubs, users RESTART IDENTITY CASCADE;

-- ============================================
-- USERS
-- Admin accounts (one per club) + student accounts
-- Passwords are bcrypt hashes of "Password123!" for demo purposes
-- ============================================
INSERT INTO users (id, name, email, password_hash, role) VALUES
-- Club admins
(1,  'Jordan Ellis',     'jellis@pfw.edu',        '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(2,  'Maya Thompson',   'mthompson@pfw.edu',     '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(3,  'Carlos Rivera',   'crivera@pfw.edu',       '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(4,  'Amara Osei',      'aosei@pfw.edu',         '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(5,  'Tyler Nguyen',    'tnguyen@pfw.edu',       '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(6,  'Priya Patel',     'ppatel@pfw.edu',        '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(7,  'Marcus Johnson',  'mjohnson@pfw.edu',      '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(8,  'Leah Kowalski',   'lkowalski@pfw.edu',     '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(9,  'Daniel Park',     'dpark@pfw.edu',         '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(10, 'Sofia Reyes',     'sreyes@pfw.edu',        '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(11, 'Ethan Brooks',    'ebrooks@pfw.edu',       '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(12, 'Zara Ahmed',      'zahmed@pfw.edu',        '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(13, 'Noah Carter',     'ncarter@pfw.edu',       '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(14, 'Isabelle Martin', 'imartin@pfw.edu',       '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(15, 'James Owusu',     'jowusu@pfw.edu',        '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(16, 'Rachel Kim',      'rkim@pfw.edu',          '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(17, 'Omar Hassan',     'ohassan@pfw.edu',       '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(18, 'Chloe Bennett',   'cbennett@pfw.edu',      '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(19, 'Lucas Freeman',   'lfreeman@pfw.edu',      '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
(20, 'Aisha Williams',  'awilliams@pfw.edu',     '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'admin'),
-- Student accounts
(21, 'Sam Torres',      'storres@student.pfw.edu',  '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(22, 'Mia Chen',        'mchen@student.pfw.edu',    '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(23, 'Jake Murphy',     'jmurphy@student.pfw.edu',  '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(24, 'Nia Jackson',     'njackson@student.pfw.edu', '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(25, 'Leo Fischer',     'lfischer@student.pfw.edu', '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(26, 'Hannah Scott',    'hscott@student.pfw.edu',   '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(27, 'Devin Moore',     'dmoore@student.pfw.edu',   '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(28, 'Fatima Ali',      'fali@student.pfw.edu',     '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(29, 'Ryan Bell',       'rbell@student.pfw.edu',    '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student'),
(30, 'Grace Liu',       'gliu@student.pfw.edu',     '$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u', 'student');

-- ============================================
-- CLUBS
-- Real PFW student organizations with authentic descriptions
-- Categories: Academic | Sports | Arts | Service | Professional | Special Interest
-- ============================================
INSERT INTO clubs (id, name, category, description, meeting_info, contact_email, admin_id, member_count) VALUES

(1,  'Association for Computing Machinery',
     'Professional',
     'The PFW ACM is an organization for students interested in computers and computing at any level. We welcome gamers, hobbyists, entrepreneurs, modders, makers, and anyone who is simply curious. Programming, computing, and digital communications are core parts of our modern world, and we are dedicated to free, equitable, and shared access to computing knowledge. Members participate in hackathons, the Global Game Jam, coding workshops, and networking events with local tech employers.',
     'Bi-weekly Fridays, 5:00 PM – Kettler Hall 218',
     'acm@pfw.edu',
     1, 47),

(2,  'Accounting Society',
     'Professional',
     'The Accounting Society at PFW connects students pursuing careers in accounting, finance, and business with professionals, internship opportunities, and academic resources. We host guest speakers from regional CPA firms, organize visits to Big Four offices, and prepare members for the CPA exam. Whether you are a first-year exploring business or a senior ready to recruit, the Accounting Society is your professional home on campus.',
     'Every other Wednesday, 6:00 PM – Neff Hall 150',
     'accountingsociety@pfw.edu',
     2, 38),

(3,  'American Society of Civil Engineers',
     'Professional',
     'The PFW student chapter of the American Society of Civil Engineers is dedicated to advancing both the individual civil engineering student and the broader profession through education, competition, and community service. Members participate in national design competitions such as the Steel Bridge and Concrete Canoe challenges, organize site visits to active construction projects in Fort Wayne, and connect with licensed professional engineers for mentorship.',
     'Thursdays, 6:30 PM – Neff Hall 260',
     'asce@pfw.edu',
     3, 29),

(4,  'AMSA Premedical Club',
     'Professional',
     'The PFW chapter of the American Medical Student Association (AMSA) Premedical Club is the premier organization for students aspiring to careers in medicine and healthcare. We host MCAT prep workshops, clinical shadowing opportunities at Parkview and Lutheran hospitals, medical school panel discussions, and community health outreach events. Members gain the mentorship, experiences, and connections needed to build a competitive medical school application.',
     'Every other Tuesday, 7:00 PM – Science Building 170',
     'amsa@pfw.edu',
     4, 55),

(5,  'Actuarial Club',
     'Professional',
     'The Actuarial Club supports students preparing for a career in actuarial science by providing study resources for professional exams, networking events with local actuaries, and workshops on industry software. Members collaborate on practice problems, share exam-taking strategies, and connect with employers in insurance and risk management. All math and statistics students with an interest in data and risk are welcome.',
     'Alternate Tuesdays, 5:30 PM – Kettler Hall 105',
     'actuarialclub@pfw.edu',
     5, 22),

(6,  'Biology Club',
     'Academic',
     'The PFW Biology Club is open to all students fascinated by the living world. We organize laboratory tours, field trips to local nature preserves, guest lectures from faculty researchers, and community outreach including science education at local schools. The club also helps students connect with undergraduate research opportunities and prepares members for graduate school and health-professions program applications.',
     'Bi-weekly Mondays, 6:00 PM – Science Building 130',
     'bioclub@pfw.edu',
     6, 34),

(7,  'American Society of Microbiology',
     'Academic',
     'The PFW student chapter of the American Society for Microbiology brings together students passionate about microbiology, infectious disease, and the invisible world of bacteria, viruses, and fungi. We host seminar series with PFW faculty, organize hands-on culturing workshops, and participate in national ASM events. The club is a great way to build connections for careers in clinical microbiology, public health, and research.',
     'First and third Mondays, 5:00 PM – Science Building 205',
     'asmicro@pfw.edu',
     7, 19),

(8,  'Agriculture and Preveterinary Club',
     'Academic',
     'The Agriculture and Preveterinary Club at PFW unites students interested in animal sciences, veterinary medicine, sustainable agriculture, and food systems. We coordinate shadowing visits with local veterinary clinics, invite agribusiness professionals to speak on campus, and organize service projects benefiting local farms and animal shelters. Members preparing for vet school gain hands-on animal experience and application guidance from club advisors.',
     'Every other Thursday, 6:00 PM – Helmke Library Room 253',
     'agprevet@pfw.edu',
     8, 27),

(9,  'Anthropology Club',
     'Academic',
     'The Anthropology Club at PFW explores humanity across cultures, time periods, and disciplines. We organize film screenings, faculty-led discussions on archaeology and cultural anthropology, and volunteer opportunities at local historical sites and museums. Members develop a global perspective and critical thinking skills applicable across social sciences, education, law, and international careers. All majors are warmly welcome.',
     'Bi-weekly Wednesdays, 4:30 PM – Liberal Arts Building 215',
     'anthroclub@pfw.edu',
     9, 16),

(10, 'Beta Beta Beta',
     'Academic',
     'Beta Beta Beta (TriBeta) is a national honor society for students of the biological sciences. The PFW chapter recognizes academic achievement and promotes scholastic and scientific achievement among biology students. Inductees have maintained strong GPA standards in biology coursework and participate in service and research activities. The chapter hosts an annual research symposium where members present original undergraduate research.',
     'Monthly meetings – Science Building 130 (date varies)',
     'tribeta@pfw.edu',
     10, 41),

(11, 'Black Student Union',
     'Special Interest',
     'The Black Student Union at PFW is a space that welcomes, celebrates, and empowers Black students on campus. We foster community through cultural events, professional development workshops, mental health discussions, and service initiatives. BSU amplifies Black voices in academic and social spaces, coordinates with national organizations, and partners with campus offices to advocate for an equitable university experience for all students of color.',
     'Every other Wednesday, 6:30 PM – Walb Student Union 218',
     'bsu@pfw.edu',
     11, 63),

(12, 'African Students Organization',
     'Special Interest',
     'The African Students Organization celebrates and shares the rich cultural heritage of the African continent with the broader PFW community. We host African cultural nights, cuisine showcases, film screenings, and discussions on contemporary African affairs. The organization provides a supportive community for African students navigating campus life while educating all students about the diversity of African cultures, languages, and traditions.',
     'Bi-weekly Sundays, 4:00 PM – Walb Student Union 113',
     'aso@pfw.edu',
     12, 31),

(13, 'Bangladesh Student Association',
     'Special Interest',
     'The Bangladesh Student Association at PFW brings together students from Bangladesh and those interested in Bangladeshi culture, language, and heritage. We celebrate national holidays such as Eid and Independence Day, organize cultural showcases during International Week, and provide a welcoming peer network for new Bangladeshi students adjusting to campus life in Fort Wayne.',
     'Monthly meetings – Walb Student Union 210 (date announced via group chat)',
     'bsa@pfw.edu',
     13, 18),

(14, 'American Sign Language Pah! Club',
     'Special Interest',
     'The ASL Pah! Club is dedicated to promoting American Sign Language and Deaf culture at PFW. We offer informal ASL practice sessions, host Deaf guest speakers and cultural events, and work to create a more accessible campus community. Whether you are a fluent signer, a student taking ASL courses, or simply curious about Deaf culture, you are welcome here. "Pah!" is ASL slang for finally getting something right — and that is exactly the feeling we chase.',
     'Weekly Thursdays, 5:00 PM – Liberal Arts Building 118',
     'aslpah@pfw.edu',
     14, 24),

(15, 'ActiveMinds',
     'Service',
     'ActiveMinds at PFW is a student-led organization dedicated to mental health awareness and advocacy on campus. We work to change the culture around mental health by hosting open conversations, awareness campaigns, stress-relief events during finals, and training workshops such as Mental Health First Aid. Our goal is to ensure that every Mastodon knows they are not alone and that help is always available.',
     'Weekly Wednesdays, 5:30 PM – Walb Student Union 110',
     'activeminds@pfw.edu',
     15, 52),

(16, 'Archery Club',
     'Sports',
     'The PFW Archery Club welcomes beginners and experienced archers alike. Members practice recurve and compound archery at local ranges, compete in collegiate archery tournaments, and develop focus, discipline, and precision. Equipment is available for new members. The club competes regionally and has sent athletes to national collegiate archery competitions. No prior experience is required — just a willingness to learn and a steady hand.',
     'Tuesdays & Thursdays, 6:00 PM – Gates Tennis Center (indoor range)',
     'archeryclub@pfw.edu',
     16, 21),

(17, 'Basketball Club',
     'Sports',
     'The PFW Basketball Club is a competitive and recreational basketball organization open to all students. We organize intramural leagues, scrimmages, and compete in regional collegiate club basketball tournaments. Whether you played varsity ball or just love a pickup game, the Basketball Club is the place to develop your skills, stay active, and build friendships with fellow Mastodons who share a passion for the game.',
     'Mondays & Wednesdays, 8:00 PM – Student Recreation and Wellness Center gymnasium',
     'basketballclub@pfw.edu',
     17, 44),

(18, 'Alpha Sigma Alpha',
     'Special Interest',
     'Alpha Sigma Alpha is a national social sorority with a strong chapter at PFW. Our four aims — physical, intellectual, social, and spiritual — guide a well-rounded sisterhood experience. Members participate in philanthropic events benefiting Special Olympics, academic support programs, leadership development workshops, and a vibrant social calendar. Alpha Sigma Alpha is committed to developing women of poise and purpose throughout their college years and beyond.',
     'Weekly Chapter meetings – Walb Student Union Ballroom (Sundays, 6:00 PM)',
     'asa@pfw.edu',
     18, 36),

(19, 'Mastodon Esports Club',
     'Special Interest',
     'The Mastodon Esports Club is PFW''s competitive gaming organization. We field teams in titles such as League of Legends, Valorant, Rocket League, Super Smash Bros., and more, competing in collegiate leagues through NACE and other organizations. Beyond competition, the club hosts casual gaming nights, LAN parties, and industry talks for students interested in game design, streaming, and esports management careers.',
     'Open gaming – Kettler Hall 102 esports lounge (daily); team scrimmages vary by game',
     'esports@pfw.edu',
     19, 78),

(20, 'Muslim Student Association',
     'Special Interest',
     'The Muslim Student Association at PFW strives to serve the spiritual, social, and academic needs of Muslim students while educating the broader campus community about Islam. We organize Friday Jummah prayer gatherings, Ramadan iftars open to all, Islamic Awareness Week events, and community service initiatives. The MSA is a welcoming home for Muslim students and a bridge of understanding for everyone on campus.',
     'Weekly Fridays, 1:30 PM – Walb Student Union (prayer room) + bi-weekly meetings',
     'msa@pfw.edu',
     20, 39);

-- ============================================
-- MEMBERSHIPS
-- Students joined to clubs (admin memberships are implicit via admin_id;
-- these represent regular student members)
-- ============================================
INSERT INTO memberships (user_id, club_id) VALUES
-- Sam Torres (21)
(21, 1),  -- ACM
(21, 19), -- Esports
-- Mia Chen (22)
(22, 4),  -- AMSA Premedical
(22, 6),  -- Biology Club
(22, 10), -- Beta Beta Beta
-- Jake Murphy (23)
(23, 17), -- Basketball Club
(23, 15), -- ActiveMinds
-- Nia Jackson (24)
(24, 11), -- Black Student Union
(24, 15), -- ActiveMinds
(24, 12), -- African Students Organization
-- Leo Fischer (25)
(25, 1),  -- ACM
(25, 5),  -- Actuarial Club
(25, 2),  -- Accounting Society
-- Hannah Scott (26)
(26, 15), -- ActiveMinds
(26, 14), -- ASL Pah! Club
(26, 9),  -- Anthropology Club
-- Devin Moore (27)
(27, 17), -- Basketball Club
(27, 19), -- Esports
-- Fatima Ali (28)
(28, 20), -- Muslim Student Association
(28, 13), -- Bangladesh Student Association
(28, 15), -- ActiveMinds
-- Ryan Bell (29)
(29, 3),  -- ASCE
(29, 1),  -- ACM
-- Grace Liu (30)
(30, 4),  -- AMSA Premedical
(30, 7),  -- American Society of Microbiology
(30, 10); -- Beta Beta Beta

-- ============================================
-- JOIN REQUESTS
-- Mix of pending, approved, and rejected requests
-- ============================================
INSERT INTO join_requests (user_id, club_id, message, status) VALUES

-- Pending requests
(21, 2,  'I am a junior in Accounting and want to get more involved in the professional community before I start recruiting.',                 'pending'),
(22, 1,  'I love Python and have been working on a personal game project — would love to connect with other CS-interested students.',          'pending'),
(23, 19, 'I play Valorant and Rocket League competitively. Excited to represent PFW!',                                                        'pending'),
(25, 19, 'Long-time gamer and aspiring game developer. Would love to join the esports community.',                                            'pending'),
(26, 18, 'I am interested in Greek life and Alpha Sigma Alpha''s values align with what I am looking for in a sisterhood.',                   'pending'),
(29, 8,  'Pre-vet student interested in shadowing opportunities and networking with vet professionals.',                                       'pending'),

-- Approved requests
(27, 16, 'I did archery in high school and want to keep competing at the collegiate level.',                                                   'approved'),
(28, 12, 'I am from Senegal and want to connect with other African students and share our culture with the PFW community.',                   'approved'),
(30, 6,  'Biology pre-med student looking for field trip and research opportunities outside the classroom.',                                  'approved'),
(24, 20, 'I am a practicing Muslim and would love to have a campus community for prayer and connection.',                                     'approved'),

-- Rejected requests
(23, 10, 'I am interested in biology honors and would like to be considered for Beta Beta Beta.',                                             'rejected'),
(21, 18, 'I would like to learn more about Alpha Sigma Alpha and potentially join as a supporter.',                                           'rejected');