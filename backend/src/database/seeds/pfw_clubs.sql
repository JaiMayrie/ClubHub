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

SELECT setval('users_id_seq', 30);

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
     20, 39),

(21, 'International Student Organization',
     'Special Interest',
     'The International Student Organization provides support, brings students together, and embraces customs, traditions, and values from around the world. The organization helps international and domestic students build community through cultural exchange and campus engagement.',
     'Monthly meetings – Walb Student Union (date announced each semester)',
     'iso@pfw.edu',
     21, 28),

(22, 'Sociology Student Association',
     'Academic',
     'The Sociology Student Association helps students explore sociology, connect with fellow sociology students, and build a supportive academic community. Members engage in discussion, peer support, and professional development related to sociology and the social sciences.',
     'Bi-weekly Tuesdays, 5:30 PM – Liberal Arts Building 210',
     'ssa@pfw.edu',
     22, 17),

(23, 'Model United Nations',
     'Academic',
     'Model United Nations gives students the opportunity to participate in simulations and learn about United Nations international politics. Members develop skills in research, diplomacy, public speaking, negotiation, and global problem solving.',
     'Weekly Thursdays, 6:00 PM – Neff Hall 120',
     'mun@pfw.edu',
     23, 24),

(24, 'Human Services Organization',
     'Service',
     'The Human Services Organization helps students develop real-world skills through volunteer opportunities, networking, and guest-speaking events. It connects students interested in service professions with practical experiences and career preparation.',
     'Every other Wednesday, 5:00 PM – Walb Student Union 214',
     'hso@pfw.edu',
     24, 19),

(25, 'Military Science and Leadership Club',
     'Service',
     'The Military Science and Leadership Club supports community-service projects and military-related events at Purdue Fort Wayne. Members build leadership, teamwork, and service skills while supporting campus and community initiatives.',
     'Bi-weekly Mondays, 6:00 PM – Walb Student Union 220',
     'mslc@pfw.edu',
     25, 14),

(26, 'Generation Action',
     'Service',
     'Generation Action works to spread knowledge of reproductive health and provide accurate and unbiased information about pregnancy, parenting issues, and women''s health. Members engage in awareness campaigns, education, and advocacy.',
     'Twice monthly, Tuesdays at 6:30 PM – Liberal Arts Building 118',
     'generationaction@pfw.edu',
     26, 22),

(27, 'Purdue FIRST Programs Fort Wayne',
     'Academic',
     'Purdue FIRST Programs Fort Wayne supports STEM outreach and engagement through programs connected to FIRST initiatives. Members promote science, technology, engineering, and mathematics learning through mentoring and community involvement.',
     'Monthly Saturdays – Kettler Hall outreach lab (schedule varies)',
     'pfpfw@pfw.edu',
     27, 16),
(28, 'Student Government Association',
     'Service',
     'The Student Government Association (SGA) represents the student body and serves as a liaison between students and university administration. Members advocate for student needs, allocate funding to organizations, and promote campus engagement and leadership.',
     'Weekly Mondays, 7:00 PM – Walb Student Union Ballroom',
     'sga@pfw.edu',
     28, 40),

(29, 'Society of Women Engineers',
     'Professional',
     'The Society of Women Engineers (SWE) empowers women to succeed and advance in engineering fields. Members participate in networking, outreach programs, professional development, and national conferences.',
     'Bi-weekly Wednesdays, 6:00 PM – Neff Hall 170',
     'swe@pfw.edu',
     29, 26),

(30, 'Latino Student Union',
     'Special Interest',
     'The Latino Student Union promotes cultural awareness, unity, and academic success among Latino students and allies. The organization hosts cultural events, community outreach, and leadership opportunities.',
     'Every other Thursday, 6:30 PM – Walb Student Union 215',
     'lsu@pfw.edu',
     30, 33),

(31, 'Theatre Club',
     'Arts',
     'The Theatre Club provides students with opportunities to participate in acting, directing, stage design, and production. Members collaborate on performances and develop creative expression and stage skills.',
     'Weekly Tuesdays, 6:00 PM – Williams Theatre',
     'theatre@pfw.edu',
     31, 21),

(32, 'Volleyball Club',
     'Sports',
     'The Volleyball Club is open to players of all skill levels who enjoy competitive and recreational volleyball. Members participate in practices, scrimmages, and regional tournaments.',
     'Mondays & Thursdays, 7:00 PM – Rec Center Gym',
     'volleyball@pfw.edu',
     32, 35),

(33, 'National Society of Black Engineers',
     'Professional',
     'The National Society of Black Engineers (NSBE) supports the academic and professional success of Black engineering students. Members engage in networking, career development, and community outreach initiatives.',
     'Bi-weekly Fridays, 5:30 PM – Neff Hall 200',
     'nsbe@pfw.edu',
     33, 24),

(34, 'Pride Student Union',
     'Special Interest',
     'The Pride Student Union fosters a safe and inclusive environment for LGBTQ+ students and allies. The organization promotes awareness, advocacy, and community through events, discussions, and campus initiatives.',
     'Weekly Wednesdays, 6:00 PM – Walb Student Union 112',
     'pride@pfw.edu',
     34, 27),

     (35, 'Chemistry Club',
     'Academic',
     'The Chemistry Club connects students interested in chemistry through experiments, guest lectures, and networking opportunities. Members explore real-world applications of chemistry and prepare for careers in science and healthcare.',
     'Bi-weekly Mondays, 5:00 PM – Science Building 220',
     'chemclub@pfw.edu',
     35, 18),

(36, 'Physics Club',
     'Academic',
     'The Physics Club brings together students passionate about physics and the universe. Members participate in demonstrations, discussions, and outreach activities that promote scientific curiosity and understanding.',
     'Every other Thursday, 5:30 PM – Science Building 240',
     'physicsclub@pfw.edu',
     36, 15),

(37, 'Pre-Pharmacy Club',
     'Professional',
     'The Pre-Pharmacy Club supports students interested in pharmacy careers by providing resources, networking opportunities, and preparation for pharmacy school applications. Members connect with professionals and gain insight into the field.',
     'Monthly meetings – Science Building 150',
     'prepharmacy@pfw.edu',
     37, 20),

(38, 'Cybersecurity Club',
     'Professional',
     'The Cybersecurity Club focuses on digital security, ethical hacking, and cyber defense. Members participate in competitions, workshops, and hands-on labs to develop technical skills and prepare for careers in cybersecurity.',
     'Weekly Tuesdays, 6:00 PM – Kettler Hall 210',
     'cyber@pfw.edu',
     38, 32),

(39, 'Running Club',
     'Sports',
     'The Running Club welcomes runners of all levels who want to stay active and build endurance. Members participate in group runs, local races, and fitness challenges throughout the semester.',
     'Mondays, Wednesdays, Fridays – 7:00 AM – Campus Loop',
     'runningclub@pfw.edu',
     39, 22),

(40, 'Dance Team',
     'Arts',
     'The Dance Team provides opportunities for students to express themselves through dance while building teamwork and performance skills. Members perform at campus events and compete in regional competitions.',
     'Weekly rehearsals – Rec Center Studio, 7:00 PM',
     'danceteam@pfw.edu',
     40, 25),

(41, 'Habitat for Humanity Campus Chapter',
     'Service',
     'The Habitat for Humanity Campus Chapter engages students in building homes and serving the community. Members volunteer in construction projects, fundraising events, and awareness campaigns to support affordable housing initiatives.',
     'Bi-weekly Saturdays – Community build sites (times vary)',
     'habitat@pfw.edu',
     41, 30)

     (42, 'Weightlifting Club',
     'Sports',
     'The Weightlifting Club provides a space for students to improve strength, fitness, and overall health. Members support each other through workouts, training programs, and fitness challenges.',
     'Mondays, Wednesdays, Fridays – 6:00 PM – Rec Center Weight Room',
     'lifting@pfw.edu',
     42, 28),

(43, 'Soccer Club',
     'Sports',
     'The Soccer Club brings together students who enjoy playing and competing in soccer. Members participate in practices, scrimmages, and intercollegiate competitions.',
     'Tuesdays & Thursdays, 7:30 PM – Intramural Fields',
     'soccer@pfw.edu',
     43, 36),

(44, 'Tabletop Gaming Club',
     'Special Interest',
     'The Tabletop Gaming Club is for students who enjoy board games, card games, and role-playing games. Members meet regularly for game nights and tournaments.',
     'Weekly Fridays, 6:00 PM – Walb Student Union 210',
     'tabletop@pfw.edu',
     44, 19),

(45, 'Photography Club',
     'Arts',
     'The Photography Club helps students develop their photography skills through workshops, photo walks, and creative projects. Members explore both digital and film photography.',
     'Bi-weekly Sundays, 4:00 PM – Visual Arts Building 120',
     'photoclub@pfw.edu',
     45, 23),

(46, 'Entrepreneurship Club',
     'Professional',
     'The Entrepreneurship Club supports students interested in starting businesses and developing innovative ideas. Members participate in pitch competitions, networking events, and startup workshops.',
     'Every other Wednesday, 6:00 PM – Neff Hall 180',
     'entrepreneur@pfw.edu',
     46, 31),

(47, 'Finance Club',
     'Professional',
     'The Finance Club provides students with knowledge and experience in financial markets, investing, and corporate finance. Members participate in simulations, guest lectures, and networking events.',
     'Bi-weekly Mondays, 6:30 PM – Neff Hall 155',
     'financeclub@pfw.edu',
     47, 27),

(48, 'Public Health Club',
     'Academic',
     'The Public Health Club promotes awareness of health issues and prepares students for careers in public health. Members engage in community outreach, education, and health advocacy.',
     'Monthly meetings – Science Building 140',
     'publichealth@pfw.edu',
     48, 21), 

     (49, 'Graphic Design Club',
     'Arts',
     'The Graphic Design Club brings together students interested in visual design, branding, and digital creativity. Members collaborate on projects, learn design tools, and build professional portfolios.',
     'Bi-weekly Tuesdays, 6:00 PM – Visual Arts Building 135',
     'designclub@pfw.edu',
     49, 22),

(50, 'Film and Media Club',
     'Arts',
     'The Film and Media Club is for students passionate about filmmaking, editing, and storytelling. Members create short films, analyze cinema, and collaborate on creative media projects.',
     'Weekly Thursdays, 6:30 PM – Liberal Arts Building 200',
     'filmclub@pfw.edu',
     50, 26),

(51, 'Environmental Club',
     'Service',
     'The Environmental Club promotes sustainability and environmental awareness on campus. Members participate in clean-up events, conservation efforts, and sustainability initiatives.',
     'Monthly Saturdays – Campus & community locations',
     'eco@pfw.edu',
     51, 24),

(52, 'Food and Culture Club',
     'Special Interest',
     'The Food and Culture Club explores global cultures through cuisine and shared experiences. Members host tasting events, cultural nights, and discussions celebrating diversity.',
     'Bi-weekly Fridays, 5:30 PM – Walb Student Union 118',
     'foodculture@pfw.edu',
     52, 18),

(53, 'Chess Club',
     'Special Interest',
     'The Chess Club welcomes players of all skill levels to enjoy casual and competitive chess. Members participate in tournaments, strategy sessions, and friendly matches.',
     'Weekly Wednesdays, 5:00 PM – Helmke Library Study Room',
     'chess@pfw.edu',
     53, 20),

(54, 'Volunteer Outreach Club',
     'Service',
     'The Volunteer Outreach Club connects students with community service opportunities throughout Fort Wayne. Members participate in local volunteering, charity events, and service projects.',
     'Bi-weekly Sundays, 3:00 PM – Walb Student Union 105',
     'volunteer@pfw.edu',
     54, 29),

(55, 'Women in Technology Club',
     'Professional',
     'The Women in Technology Club supports women pursuing careers in technology through mentorship, networking, and skill-building workshops. Members connect with industry professionals and peers.',
     'Every other Tuesday, 6:00 PM – Kettler Hall 220',
     'wit@pfw.edu',
     55, 23), 

     (56, 'Debate Club',
     'Academic',
     'The Debate Club helps students develop critical thinking, public speaking, and argumentation skills. Members participate in debates, competitions, and structured discussions.',
     'Weekly Mondays, 6:00 PM – Liberal Arts Building 210',
     'debate@pfw.edu',
     56, 17),

(57, 'Coding Interview Prep Club',
     'Professional',
     'The Coding Interview Prep Club prepares students for technical interviews through practice problems, mock interviews, and peer collaboration.',
     'Bi-weekly Wednesdays, 7:00 PM – Kettler Hall 215',
     'codingprep@pfw.edu',
     57, 34),

(58, 'Yoga and Wellness Club',
     'Sports',
     'The Yoga and Wellness Club promotes physical and mental well-being through yoga sessions, meditation, and stress-relief activities.',
     'Tuesdays & Thursdays, 6:00 PM – Rec Center Studio',
     'yoga@pfw.edu',
     58, 21),

(59, 'Book Club',
     'Special Interest',
     'The Book Club brings together students who enjoy reading and discussing literature across genres. Members engage in thoughtful discussions and social reading events.',
     'Bi-weekly Sundays, 4:00 PM – Helmke Library',
     'bookclub@pfw.edu',
     59, 19),

(60, 'Fashion Club',
     'Arts',
     'The Fashion Club explores style, design, and trends in the fashion industry. Members participate in fashion shows, styling workshops, and creative collaborations.',
     'Monthly meetings – Walb Student Union 120',
     'fashion@pfw.edu',
     60, 23),

(61, 'Game Development Club',
     'Professional',
     'The Game Development Club focuses on designing and building video games. Members collaborate on projects, learn development tools, and participate in game jams.',
     'Weekly Fridays, 6:30 PM – Kettler Hall 218',
     'gamedev@pfw.edu',
     61, 28),

(62, 'Mentorship and Leadership Club',
     'Service',
     'The Mentorship and Leadership Club connects students through mentorship opportunities and leadership development programs. Members support personal and professional growth.',
     'Bi-weekly Tuesdays, 5:30 PM – Walb Student Union 115',
     'leadership@pfw.edu',
     62, 26),

(63, 'Data Analytics Club',
     'Academic',
     'The Data Analytics Club focuses on analyzing data, visualization, and real-world problem solving using modern tools. Members work on projects and build portfolios.',
     'Bi-weekly Wednesdays, 6:00 PM – Kettler Hall 230',
     'data@pfw.edu',
     63, 28),

(64, 'Robotics Club',
     'Academic',
     'The Robotics Club allows students to design, build, and program robots while competing in challenges and learning engineering principles.',
     'Weekly Thursdays, 6:00 PM – Engineering Lab',
     'robotics@pfw.edu',
     64, 25),

(65, 'Music Production Club',
     'Arts',
     'The Music Production Club helps students create, mix, and produce music. Members collaborate on projects and learn audio engineering techniques.',
     'Weekly Fridays, 7:00 PM – Music Lab',
     'musicprod@pfw.edu',
     65, 20),

(66, 'Content Creators Club',
     'Special Interest',
     'The Content Creators Club supports students interested in social media, branding, and digital content creation. Members share strategies and collaborate on projects.',
     'Bi-weekly Tuesdays, 6:30 PM – Walb Student Union 130',
     'creators@pfw.edu',
     66, 31),

(67, 'Pre-Law Society',
     'Professional',
     'The Pre-Law Society prepares students for law school through LSAT prep, networking, and discussions about legal careers.',
     'Monthly meetings – Liberal Arts Building 205',
     'prelaw@pfw.edu',
     67, 22),

(68, 'Culinary Club',
     'Special Interest',
     'The Culinary Club explores cooking techniques and global cuisines. Members participate in cooking sessions and food-related events.',
     'Bi-weekly Sundays, 5:00 PM – Campus Kitchen',
     'culinary@pfw.edu',
     68, 18),

(69, 'Wellness and Self-Care Club',
     'Service',
     'The Wellness and Self-Care Club promotes mental health, stress management, and self-care practices through events and group activities.',
     'Weekly Mondays, 6:00 PM – Walb Student Union 118',
     'wellness@pfw.edu',
     69, 26),

     (63, 'Finance Society',
     'Professional',
     'The Finance Society helps students understand and interact with finance, banking, investments, and the economy while supporting their academic and professional development.',
     'Bi-weekly Wednesdays, 6:00 PM – Neff Hall 160',
     'finance@pfw.edu',
     63, 21),

(70, 'International Student Organization',
     'Special Interest',
     'The International Student Organization provides support, brings students together, and embraces customs, traditions, and values from around the world.',
     'Monthly meetings – Walb Student Union 210',
     'iso@pfw.edu',
     64, 29),

(71, 'Sociology Student Association',
     'Academic',
     'The Sociology Student Association helps students explore sociology, connect with fellow sociology students, and build a supportive academic community.',
     'Bi-weekly Tuesdays, 5:30 PM – Liberal Arts Building 215',
     'sociology@pfw.edu',
     71, 16),

(72, 'Model United Nations',
     'Academic',
     'Model United Nations gives students the opportunity to participate in simulations and learn about United Nations international politics.',
     'Weekly Thursdays, 6:00 PM – Liberal Arts Building 200',
     'modelun@pfw.edu',
    72, 18),

(73, 'Human Services Organization',
     'Service',
     'The Human Services Organization helps students develop real-world skills through volunteer opportunities, networking, and guest-speaking events.',
     'Every other Wednesday, 5:00 PM – Walb Student Union 214',
     'hso@pfw.edu',
     73, 20),

(74, 'Military Science and Leadership Club',
     'Service',
     'The Military Science and Leadership Club supports community-service projects and military-related events and helps students build leadership through service.',
     'Bi-weekly Mondays, 6:00 PM – Walb Student Union 220',
     'armyrotc@pfw.edu',
     74, 14),

(75, 'MEDLIFE',
     'Service',
     'MEDLIFE is a volunteer-led global health organization that works to help families achieve greater freedom from the constraints of poverty through medicine, education, and community development.',
     'Monthly meetings – Science Building 150',
     'medlife@pfw.edu',
     75, 17),

 (76, 'Student Activities Board',
     'Service',
     'The Student Activities Board (SAB) plans and hosts campus-wide events to enhance student life. Members help organize social, cultural, and entertainment events throughout the year.',
     'Weekly Tuesdays, 6:00 PM – Walb Student Union 222',
     'sab@pfw.edu',
     76, 35),

(76, 'American Marketing Association',
     'Professional',
     'The American Marketing Association connects students interested in marketing with professional development, networking, and hands-on experiences.',
     'Bi-weekly Wednesdays, 6:00 PM – Neff Hall 170',
     'ama@pfw.edu',
     76, 28),

(77, 'Society of Human Resource Management',
     'Professional',
     'The Society for Human Resource Management (SHRM) prepares students for careers in human resources through networking, guest speakers, and professional development.',
     'Monthly meetings – Neff Hall 165',
     'shrm@pfw.edu',
     77, 19),

(78, 'Criminal Justice Club',
     'Academic',
     'The Criminal Justice Club provides students with opportunities to explore careers in law enforcement, corrections, and the legal system.',
     'Bi-weekly Mondays, 5:30 PM – Liberal Arts Building 210',
     'cjclub@pfw.edu',
     78, 23),

(79 , 'Political Science Club',
     'Academic',
     'The Political Science Club engages students in discussions about government, politics, and public policy while promoting civic engagement.',
     'Weekly Thursdays, 5:30 PM – Liberal Arts Building 205',
     'psclub@pfw.edu',
     79, 18),

(80, 'Education Club',
     'Academic',
     'The Education Club supports students pursuing careers in teaching by offering networking opportunities, workshops, and classroom experience discussions.',
     'Bi-weekly Tuesdays, 5:00 PM – Neff Hall 140',
     'education@pfw.edu',
     80, 20),

(81, 'Communication Club',
     'Academic',
     'The Communication Club helps students build skills in public speaking, media, and interpersonal communication through events and activities.',
     'Weekly Wednesdays, 6:00 PM – Liberal Arts Building 215',
     'commclub@pfw.edu',
     81, 17),

(82, 'Psychology Club',
     'Academic',
     'The Psychology Club provides students interested in psychology opportunities to explore the field through discussions, guest speakers, and research-related activities.',
     'Bi-weekly Wednesdays, 5:30 PM – Liberal Arts Building 220',
     'psychclub@pfw.edu',
     82, 24),

(83, 'Women in Business',
     'Professional',
     'Women in Business empowers women pursuing careers in business through mentorship, networking, and professional development opportunities.',
     'Monthly meetings – Neff Hall 150',
     'wib@pfw.edu',
     83, 21),

(84, 'Economics Club',
     'Academic',
     'The Economics Club helps students understand economic theory and real-world financial systems through discussions, events, and guest speakers.',
     'Bi-weekly Thursdays, 6:00 PM – Neff Hall 160',
     'econclub@pfw.edu',
     84, 18),

(85, 'History Club',
     'Academic',
     'The History Club explores historical events and their impact on modern society through discussions, presentations, and educational trips.',
     'Monthly meetings – Liberal Arts Building 210',
     'history@pfw.edu',
     85, 16),

(86, 'Math Club',
     'Academic',
     'The Math Club supports students interested in mathematics through problem-solving sessions, competitions, and collaborative learning.',
     'Weekly Tuesdays, 5:00 PM – Kettler Hall 105',
     'mathclub@pfw.edu',
     86, 20),

(87, 'Investment Club',
     'Professional',
     'The Investment Club allows students to explore stock markets, portfolio management, and financial strategies through simulations and discussions.',
     'Weekly Mondays, 6:00 PM – Neff Hall 155',
     'invest@pfw.edu',
     87, 27),

(88, 'Pre-Health Club',
     'Professional',
     'The Pre-Health Club supports students pursuing careers in healthcare through workshops, networking, and application preparation.',
     'Bi-weekly Wednesdays, 6:30 PM – Science Building 130',
     'prehealth@pfw.edu',
     88, 23),

(89, 'English Club',
     'Academic',
     'The English Club provides a space for students to explore literature, writing, and creative expression through discussions, workshops, and events.',
     'Bi-weekly Mondays, 5:30 PM – Liberal Arts Building 230',
     'english@pfw.edu',
     89, 18),

(90, 'Creative Writing Club',
     'Arts',
     'The Creative Writing Club allows students to share and develop their writing skills in poetry, fiction, and other forms through workshops and peer feedback.',
     'Weekly Thursdays, 6:00 PM – Liberal Arts Building 235',
     'writing@pfw.edu',
     90, 21),

(91, 'Philosophy Club',
     'Academic',
     'The Philosophy Club engages students in discussions about ethics, logic, and philosophical thought through debates and reading groups.',
     'Bi-weekly Tuesdays, 6:00 PM – Liberal Arts Building 225',
     'philosophy@pfw.edu',
     91, 15),

(92, 'Geography Club',
     'Academic',
     'The Geography Club explores global issues, cultures, and environmental systems through discussions, projects, and educational events.',
     'Monthly meetings – Liberal Arts Building 215',
     'geography@pfw.edu',
     92, 14),

(93, 'Anime Club',
     'Special Interest',
     'The Anime Club brings together students who enjoy anime and Japanese culture through watch parties, discussions, and themed events.',
     'Weekly Fridays, 6:00 PM – Walb Student Union 118',
     'anime@pfw.edu',
     93, 32),

(94, 'eSports Development Club',
     'Professional',
     'The eSports Development Club focuses on the business, production, and development side of esports including streaming, event management, and branding.',
     'Bi-weekly Wednesdays, 6:30 PM – Kettler Hall 102',
     'esportsdev@pfw.edu',
     94, 20),

(95, 'Community Outreach Club',
     'Service',
     'The Community Outreach Club connects students with volunteer opportunities and service projects throughout the Fort Wayne community.',
     'Bi-weekly Saturdays – Community locations',
     'outreach@pfw.edu',
     95, 27),

(96, 'Basketball Analytics Club',
     'Academic',
     'The Basketball Analytics Club explores sports analytics through data analysis, statistics, and game strategy evaluation.',
     'Bi-weekly Mondays, 6:00 PM – Kettler Hall 120',
     'ballanalytics@pfw.edu',
     96, 19),

(97, 'Podcasting Club',
     'Arts',
     'The Podcasting Club helps students create and produce podcasts while developing storytelling, audio editing, and broadcasting skills.',
     'Weekly Thursdays, 7:00 PM – Media Lab',
     'podcast@pfw.edu',
     97, 22),

(98, 'Public Speaking Club',
     'Academic',
     'The Public Speaking Club builds confidence and communication skills through speeches, presentations, and peer feedback.',
     'Bi-weekly Tuesdays, 5:30 PM – Liberal Arts Building 210',
     'speaking@pfw.edu',
     98, 18),

(99, 'Tech Innovation Club',
     'Professional',
     'The Tech Innovation Club brings together students interested in emerging technologies, startups, and innovation through collaborative projects.',
     'Weekly Wednesdays, 6:30 PM – Kettler Hall 215',
     'techinnov@pfw.edu',
     99, 30),

(100, 'Art Appreciation Club',
     'Arts',
     'The Art Appreciation Club explores visual arts through museum visits, discussions, and creative activities.',
     'Monthly meetings – Visual Arts Building 110',
     'art@pfw.edu',
     100, 16),

(101, 'Peer Mentoring Club',
     'Service',
     'The Peer Mentoring Club connects experienced students with newer students to provide guidance, support, and academic success strategies.',
     'Bi-weekly Wednesdays, 5:00 PM – Walb Student Union 115',
     'mentor@pfw.edu',
     101, 25),

(102, 'Fitness and Lifestyle Club',
     'Sports',
     'The Fitness and Lifestyle Club promotes healthy living through workouts, nutrition guidance, and wellness challenges.',
     'Mondays, Wednesdays – 6:00 PM – Rec Center',
     'fitness@pfw.edu',
     102, 28); 


SELECT setval('clubs_id_seq',102);

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