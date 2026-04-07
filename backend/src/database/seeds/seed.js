// =============================================================
// ClubHub Seed Script — Purdue University Fort Wayne (PFW) Clubs
// Generated from: https://www.pfw.edu/student-life/student-organizations
//
// Cross-references use natural keys:
//   - users are identified by email
//   - clubs are identified by contactEmail
// =============================================================

// When running locally, DB_HOST must be 'localhost' (not the Docker-internal 'db' hostname).
// dotenv won't overwrite a variable that's already set, so we set the default here.
// Override by passing DB_HOST in your shell: DB_HOST=myserver npm run db:seed
if (!process.env.DB_HOST) {
  process.env.DB_HOST = "localhost";
  process.env.DB_PORT = "5433";
}
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const db = require("../../db");

// Bcrypt hash of "Password123!"
const PASSWORD_HASH =
  "$2b$12$cY2f5RVZoeSjB/t.l.3F1.aV5UMrgwGB538FGn1.vMCjPRRByV33u";

// ============================================
// USERS
// Admin accounts + student accounts
// ============================================
const users = [
  // Club admins
  {
    name: "Admin User",
    email: "admin@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "",
    major: "",
    year: "",
  },
  {
    name: "Jordan Ellis",
    email: "jellis@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Theatre director and performing arts enthusiast. I believe the stage is where students find their voice.",
    major: "Theatre",
    year: "Graduate",
  },
  {
    name: "Maya Thompson",
    email: "mthompson@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Business and finance professional mentoring the next generation of accountants and volleyball players.",
    major: "Accounting",
    year: "Graduate",
  },
  {
    name: "Carlos Rivera",
    email: "crivera@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Civil engineering graduate student passionate about infrastructure design and community development.",
    major: "Civil Engineering",
    year: "Graduate",
  },
  {
    name: "Amara Osei",
    email: "aosei@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Pre-med advisor and advocate for underrepresented students in healthcare. Proud member of the PFW community.",
    major: "Biology",
    year: "Graduate",
  },
  {
    name: "Tyler Nguyen",
    email: "tnguyen@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Actuarial science and mathematics enthusiast. I help students navigate the path to professional exams.",
    major: "Mathematics",
    year: "Graduate",
  },
  {
    name: "Priya Patel",
    email: "ppatel@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Biology researcher and content creator. I love connecting science with real-world storytelling.",
    major: "Biology",
    year: "Graduate",
  },
  {
    name: "Marcus Johnson",
    email: "mjohnson@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Microbiology and pre-pharmacy graduate advisor. Passionate about bridging health sciences and student success.",
    major: "Microbiology",
    year: "Graduate",
  },
  {
    name: "Leah Kowalski",
    email: "lkowalski@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Agriculture and cybersecurity double interest. I believe diverse skill sets drive innovation in every field.",
    major: "Computer Science",
    year: "Graduate",
  },
  {
    name: "Daniel Park",
    email: "dpark@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Anthropology and wellness advocate. I explore human culture through fieldwork and daily runs around campus.",
    major: "Anthropology",
    year: "Graduate",
  },
  {
    name: "Sofia Reyes",
    email: "sreyes@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Dance instructor and biology honors alumna. Bringing artistic discipline to scientific curiosity every day.",
    major: "Biology",
    year: "Graduate",
  },
  {
    name: "Ethan Brooks",
    email: "ebrooks@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Black Student Union leader and Habitat for Humanity builder. Community service is my calling.",
    major: "Social Work",
    year: "Graduate",
  },
  {
    name: "Zara Ahmed",
    email: "zahmed@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "African Students Organization co-founder and weightlifting enthusiast. Celebrating culture while staying strong.",
    major: "International Studies",
    year: "Graduate",
  },
  {
    name: "Noah Carter",
    email: "ncarter@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "International student advocate and soccer enthusiast. I help build community for students far from home.",
    major: "Political Science",
    year: "Graduate",
  },
  {
    name: "Isabelle Martin",
    email: "imartin@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "ASL interpreter and tabletop game designer. I believe in accessible communication and creative play.",
    major: "Communication Sciences",
    year: "Graduate",
  },
  {
    name: "James Owusu",
    email: "jowusu@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Mental health advocate, photographer, and MEDLIFE volunteer. I document stories that matter.",
    major: "Psychology",
    year: "Graduate",
  },
  {
    name: "Rachel Kim",
    email: "rkim@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Archery competitor and entrepreneurship mentor. Precision and vision go hand in hand.",
    major: "Business Administration",
    year: "Graduate",
  },
  {
    name: "Omar Hassan",
    email: "ohassan@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Finance and basketball operations enthusiast. I help students understand markets and master the game.",
    major: "Finance",
    year: "Graduate",
  },
  {
    name: "Chloe Bennett",
    email: "cbennett@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Alpha Sigma Alpha sister, public health advocate, and SHRM member. Leadership is a way of life for me.",
    major: "Public Health",
    year: "Graduate",
  },
  {
    name: "Lucas Freeman",
    email: "lfreeman@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Esports organizer, graphic designer, and game developer. I turn passion for gaming into professional skills.",
    major: "Computer Science",
    year: "Graduate",
  },
  {
    name: "Aisha Williams",
    email: "awilliams@pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "admin",
    bio: "Muslim Student Association advisor and film studies enthusiast. Storytelling is the bridge between cultures.",
    major: "Film Studies",
    year: "Graduate",
  },
  // Student accounts
  {
    name: "Sam Torres",
    email: "storres@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Junior CS student obsessed with game development and esports. Always down for a late-night coding session.",
    major: "Computer Science",
    year: "Junior",
  },
  {
    name: "Mia Chen",
    email: "mchen@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Pre-med sophomore with a love for biology and yoga. Aspiring to work in pediatrics one day.",
    major: "Biology",
    year: "Sophomore",
  },
  {
    name: "Jake Murphy",
    email: "jmurphy@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Sports management junior and basketball stat head. If there's a game, I'm either playing or analyzing it.",
    major: "Sports Management",
    year: "Junior",
  },
  {
    name: "Nia Jackson",
    email: "njackson@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Social work sophomore and community advocate. Passionate about equity, culture, and uplifting others.",
    major: "Social Work",
    year: "Sophomore",
  },
  {
    name: "Leo Fischer",
    email: "lfischer@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Finance and actuarial science double major. I spend my free time studying for exams and exploring markets.",
    major: "Finance",
    year: "Senior",
  },
  {
    name: "Hannah Scott",
    email: "hscott@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Communication studies junior with a passion for theatre, ASL, and reproductive health advocacy.",
    major: "Communication Studies",
    year: "Junior",
  },
  {
    name: "Devin Moore",
    email: "dmoore@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Cybersecurity sophomore and competitive basketball player. I defend both networks and paint.",
    major: "Cybersecurity",
    year: "Sophomore",
  },
  {
    name: "Fatima Ali",
    email: "fali@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Political science senior from Senegal. Involved in MSA, SGA, and volunteer outreach across Fort Wayne.",
    major: "Political Science",
    year: "Senior",
  },
  {
    name: "Ryan Bell",
    email: "rbell@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Civil and computer engineering junior. I build robots on weekdays and bridges on weekends.",
    major: "Computer Engineering",
    year: "Junior",
  },
  {
    name: "Grace Liu",
    email: "gliu@student.pfw.edu",
    passwordHash: PASSWORD_HASH,
    role: "student",
    bio: "Pre-med senior focused on microbiology and pharmacy. Lab research is my passion outside of campus clubs.",
    major: "Microbiology",
    year: "Senior",
  },
];

// ============================================
// CLUBS
// Real PFW student organizations with authentic descriptions
// Categories: Academic | Sports | Arts | Service | Professional | Special Interest
// adminEmail — references the email of the user who administers this club
// contactEmail — unique natural key used for cross-referencing below
// ============================================
const clubs = [
  {
    name: "Association for Computing Machinery",
    category: "Professional",
    description:
      "The PFW ACM is an organization for students interested in computers and computing at any level. We welcome gamers, hobbyists, entrepreneurs, modders, makers, and anyone who is simply curious. Programming, computing, and digital communications are core parts of our modern world, and we are dedicated to free, equitable, and shared access to computing knowledge. Members participate in hackathons, the Global Game Jam, coding workshops, and networking events with local tech employers.",
    meetingInfo: "Bi-weekly Fridays, 5:00 PM - Kettler Hall 218",
    contactEmail: "acm@pfw.edu",
    adminEmail: "jellis@pfw.edu",
    memberCount: 47,
  },
  {
    name: "Accounting Society",
    category: "Professional",
    description:
      "The Accounting Society at PFW connects students pursuing careers in accounting, finance, and business with professionals, internship opportunities, and academic resources. We host guest speakers from regional CPA firms, organize visits to Big Four offices, and prepare members for the CPA exam. Whether you are a first-year exploring business or a senior ready to recruit, the Accounting Society is your professional home on campus.",
    meetingInfo: "Every other Wednesday, 6:00 PM - Neff Hall 150",
    contactEmail: "accountingsociety@pfw.edu",
    adminEmail: "mthompson@pfw.edu",
    memberCount: 38,
  },
  {
    name: "American Society of Civil Engineers",
    category: "Professional",
    description:
      "The PFW student chapter of the American Society of Civil Engineers is dedicated to advancing both the individual civil engineering student and the broader profession through education, competition, and community service. Members participate in national design competitions such as the Steel Bridge and Concrete Canoe challenges, organize site visits to active construction projects in Fort Wayne, and connect with licensed professional engineers for mentorship.",
    meetingInfo: "Thursdays, 6:30 PM - Neff Hall 260",
    contactEmail: "asce@pfw.edu",
    adminEmail: "crivera@pfw.edu",
    memberCount: 29,
  },
  {
    name: "AMSA Premedical Club",
    category: "Professional",
    description:
      "The PFW chapter of the American Medical Student Association (AMSA) Premedical Club is the premier organization for students aspiring to careers in medicine and healthcare. We host MCAT prep workshops, clinical shadowing opportunities at Parkview and Lutheran hospitals, medical school panel discussions, and community health outreach events. Members gain the mentorship, experiences, and connections needed to build a competitive medical school application.",
    meetingInfo: "Every other Tuesday, 7:00 PM - Science Building 170",
    contactEmail: "amsa@pfw.edu",
    adminEmail: "aosei@pfw.edu",
    memberCount: 55,
  },
  {
    name: "Actuarial Club",
    category: "Professional",
    description:
      "The Actuarial Club supports students preparing for a career in actuarial science by providing study resources for professional exams, networking events with local actuaries, and workshops on industry software. Members collaborate on practice problems, share exam-taking strategies, and connect with employers in insurance and risk management. All math and statistics students with an interest in data and risk are welcome.",
    meetingInfo: "Alternate Tuesdays, 5:30 PM - Kettler Hall 105",
    contactEmail: "actuarialclub@pfw.edu",
    adminEmail: "tnguyen@pfw.edu",
    memberCount: 22,
  },
  {
    name: "Biology Club",
    category: "Academic",
    description:
      "The PFW Biology Club is open to all students fascinated by the living world. We organize laboratory tours, field trips to local nature preserves, guest lectures from faculty researchers, and community outreach including science education at local schools. The club also helps students connect with undergraduate research opportunities and prepares members for graduate school and health-professions program applications.",
    meetingInfo: "Bi-weekly Mondays, 6:00 PM - Science Building 130",
    contactEmail: "bioclub@pfw.edu",
    adminEmail: "ppatel@pfw.edu",
    memberCount: 34,
  },
  {
    name: "American Society of Microbiology",
    category: "Academic",
    description:
      "The PFW student chapter of the American Society for Microbiology brings together students passionate about microbiology, infectious disease, and the invisible world of bacteria, viruses, and fungi. We host seminar series with PFW faculty, organize hands-on culturing workshops, and participate in national ASM events. The club is a great way to build connections for careers in clinical microbiology, public health, and research.",
    meetingInfo: "First and third Mondays, 5:00 PM - Science Building 205",
    contactEmail: "asmicro@pfw.edu",
    adminEmail: "mjohnson@pfw.edu",
    memberCount: 19,
  },
  {
    name: "Agriculture and Preveterinary Club",
    category: "Academic",
    description:
      "The Agriculture and Preveterinary Club at PFW unites students interested in animal sciences, veterinary medicine, sustainable agriculture, and food systems. We coordinate shadowing visits with local veterinary clinics, invite agribusiness professionals to speak on campus, and organize service projects benefiting local farms and animal shelters. Members preparing for vet school gain hands-on animal experience and application guidance from club advisors.",
    meetingInfo: "Every other Thursday, 6:00 PM - Helmke Library Room 253",
    contactEmail: "agprevet@pfw.edu",
    adminEmail: "lkowalski@pfw.edu",
    memberCount: 27,
  },
  {
    name: "Anthropology Club",
    category: "Academic",
    description:
      "The Anthropology Club at PFW explores humanity across cultures, time periods, and disciplines. We organize film screenings, faculty-led discussions on archaeology and cultural anthropology, and volunteer opportunities at local historical sites and museums. Members develop a global perspective and critical thinking skills applicable across social sciences, education, law, and international careers. All majors are warmly welcome.",
    meetingInfo: "Bi-weekly Wednesdays, 4:30 PM - Liberal Arts Building 215",
    contactEmail: "anthroclub@pfw.edu",
    adminEmail: "dpark@pfw.edu",
    memberCount: 16,
  },
  {
    name: "Beta Beta Beta",
    category: "Academic",
    description:
      "Beta Beta Beta (TriBeta) is a national honor society for students of the biological sciences. The PFW chapter recognizes academic achievement and promotes scholastic and scientific achievement among biology students. Inductees have maintained strong GPA standards in biology coursework and participate in service and research activities. The chapter hosts an annual research symposium where members present original undergraduate research.",
    meetingInfo: "Monthly meetings - Science Building 130 (date varies)",
    contactEmail: "tribeta@pfw.edu",
    adminEmail: "sreyes@pfw.edu",
    memberCount: 41,
  },
  {
    name: "Black Student Union",
    category: "Special Interest",
    description:
      "The Black Student Union at PFW is a space that welcomes, celebrates, and empowers Black students on campus. We foster community through cultural events, professional development workshops, mental health discussions, and service initiatives. BSU amplifies Black voices in academic and social spaces, coordinates with national organizations, and partners with campus offices to advocate for an equitable university experience for all students of color.",
    meetingInfo: "Every other Wednesday, 6:30 PM - Walb Student Union 218",
    contactEmail: "bsu@pfw.edu",
    adminEmail: "ebrooks@pfw.edu",
    memberCount: 63,
  },
  {
    name: "African Students Organization",
    category: "Special Interest",
    description:
      "The African Students Organization celebrates and shares the rich cultural heritage of the African continent with the broader PFW community. We host African cultural nights, cuisine showcases, film screenings, and discussions on contemporary African affairs. The organization provides a supportive community for African students navigating campus life while educating all students about the diversity of African cultures, languages, and traditions.",
    meetingInfo: "Bi-weekly Sundays, 4:00 PM - Walb Student Union 113",
    contactEmail: "aso@pfw.edu",
    adminEmail: "zahmed@pfw.edu",
    memberCount: 31,
  },
  {
    name: "Bangladesh Student Association",
    category: "Special Interest",
    description:
      "The Bangladesh Student Association at PFW brings together students from Bangladesh and those interested in Bangladeshi culture, language, and heritage. We celebrate national holidays such as Eid and Independence Day, organize cultural showcases during International Week, and provide a welcoming peer network for new Bangladeshi students adjusting to campus life in Fort Wayne.",
    meetingInfo:
      "Monthly meetings - Walb Student Union 210 (date announced via group chat)",
    contactEmail: "bsa@pfw.edu",
    adminEmail: "ncarter@pfw.edu",
    memberCount: 18,
  },
  {
    name: "American Sign Language Pah! Club",
    category: "Special Interest",
    description:
      'The ASL Pah! Club is dedicated to promoting American Sign Language and Deaf culture at PFW. We offer informal ASL practice sessions, host Deaf guest speakers and cultural events, and work to create a more accessible campus community. Whether you are a fluent signer, a student taking ASL courses, or simply curious about Deaf culture, you are welcome here. "Pah!" is ASL slang for finally getting something right — and that is exactly the feeling we chase.',
    meetingInfo: "Weekly Thursdays, 5:00 PM - Liberal Arts Building 118",
    contactEmail: "aslpah@pfw.edu",
    adminEmail: "imartin@pfw.edu",
    memberCount: 24,
  },
  {
    name: "ActiveMinds",
    category: "Service",
    description:
      "ActiveMinds at PFW is a student-led organization dedicated to mental health awareness and advocacy on campus. We work to change the culture around mental health by hosting open conversations, awareness campaigns, stress-relief events during finals, and training workshops such as Mental Health First Aid. Our goal is to ensure that every Mastodon knows they are not alone and that help is always available.",
    meetingInfo: "Weekly Wednesdays, 5:30 PM - Walb Student Union 110",
    contactEmail: "activeminds@pfw.edu",
    adminEmail: "jowusu@pfw.edu",
    memberCount: 52,
  },
  {
    name: "Archery Club",
    category: "Sports",
    description:
      "The PFW Archery Club welcomes beginners and experienced archers alike. Members practice recurve and compound archery at local ranges, compete in collegiate archery tournaments, and develop focus, discipline, and precision. Equipment is available for new members. The club competes regionally and has sent athletes to national collegiate archery competitions. No prior experience is required — just a willingness to learn and a steady hand.",
    meetingInfo:
      "Tuesdays & Thursdays, 6:00 PM - Gates Tennis Center (indoor range)",
    contactEmail: "archeryclub@pfw.edu",
    adminEmail: "rkim@pfw.edu",
    memberCount: 21,
  },
  {
    name: "Basketball Club",
    category: "Sports",
    description:
      "The PFW Basketball Club is a competitive and recreational basketball organization open to all students. We organize intramural leagues, scrimmages, and compete in regional collegiate club basketball tournaments. Whether you played varsity ball or just love a pickup game, the Basketball Club is the place to develop your skills, stay active, and build friendships with fellow Mastodons who share a passion for the game.",
    meetingInfo:
      "Mondays & Wednesdays, 8:00 PM - Student Recreation and Wellness Center gymnasium",
    contactEmail: "basketballclub@pfw.edu",
    adminEmail: "ohassan@pfw.edu",
    memberCount: 44,
  },
  {
    name: "Alpha Sigma Alpha",
    category: "Special Interest",
    description:
      "Alpha Sigma Alpha is a national social sorority with a strong chapter at PFW. Our four aims — physical, intellectual, social, and spiritual — guide a well-rounded sisterhood experience. Members participate in philanthropic events benefiting Special Olympics, academic support programs, leadership development workshops, and a vibrant social calendar. Alpha Sigma Alpha is committed to developing women of poise and purpose throughout their college years and beyond.",
    meetingInfo:
      "Weekly Chapter meetings - Walb Student Union Ballroom (Sundays, 6:00 PM)",
    contactEmail: "asa@pfw.edu",
    adminEmail: "cbennett@pfw.edu",
    memberCount: 36,
  },
  {
    name: "Mastodon Esports Club",
    category: "Special Interest",
    description:
      "The Mastodon Esports Club is PFW's competitive gaming organization. We field teams in titles such as League of Legends, Valorant, Rocket League, Super Smash Bros., and more, competing in collegiate leagues through NACE and other organizations. Beyond competition, the club hosts casual gaming nights, LAN parties, and industry talks for students interested in game design, streaming, and esports management careers.",
    meetingInfo:
      "Open gaming - Kettler Hall 102 esports lounge (daily); team scrimmages vary by game",
    contactEmail: "esports@pfw.edu",
    adminEmail: "lfreeman@pfw.edu",
    memberCount: 78,
  },
  {
    name: "Muslim Student Association",
    category: "Special Interest",
    description:
      "The Muslim Student Association at PFW strives to serve the spiritual, social, and academic needs of Muslim students while educating the broader campus community about Islam. We organize Friday Jummah prayer gatherings, Ramadan iftars open to all, Islamic Awareness Week events, and community service initiatives. The MSA is a welcoming home for Muslim students and a bridge of understanding for everyone on campus.",
    meetingInfo:
      "Weekly Fridays, 1:30 PM - Walb Student Union (prayer room) + bi-weekly meetings",
    contactEmail: "msa@pfw.edu",
    adminEmail: "awilliams@pfw.edu",
    memberCount: 39,
  },
  {
    name: "International Student Organization",
    category: "Special Interest",
    description:
      "The International Student Organization provides support, brings students together, and embraces customs, traditions, and values from around the world. The organization helps international and domestic students build community through cultural exchange and campus engagement.",
    meetingInfo:
      "Monthly meetings - Walb Student Union (date announced each semester)",
    contactEmail: "iso@pfw.edu",
    adminEmail: "storres@student.pfw.edu",
    memberCount: 28,
  },
  {
    name: "Sociology Student Association",
    category: "Academic",
    description:
      "The Sociology Student Association helps students explore sociology, connect with fellow sociology students, and build a supportive academic community. Members engage in discussion, peer support, and professional development related to sociology and the social sciences.",
    meetingInfo: "Bi-weekly Tuesdays, 5:30 PM - Liberal Arts Building 210",
    contactEmail: "ssa@pfw.edu",
    adminEmail: "mchen@student.pfw.edu",
    memberCount: 17,
  },
  {
    name: "Model United Nations",
    category: "Academic",
    description:
      "Model United Nations gives students the opportunity to participate in simulations and learn about United Nations international politics. Members develop skills in research, diplomacy, public speaking, negotiation, and global problem solving.",
    meetingInfo: "Weekly Thursdays, 6:00 PM - Neff Hall 120",
    contactEmail: "mun@pfw.edu",
    adminEmail: "jmurphy@student.pfw.edu",
    memberCount: 24,
  },
  {
    name: "Human Services Organization",
    category: "Service",
    description:
      "The Human Services Organization helps students develop real-world skills through volunteer opportunities, networking, and guest-speaking events. It connects students interested in service professions with practical experiences and career preparation.",
    meetingInfo: "Every other Wednesday, 5:00 PM - Walb Student Union 214",
    contactEmail: "hso@pfw.edu",
    adminEmail: "njackson@student.pfw.edu",
    memberCount: 19,
  },
  {
    name: "Military Science and Leadership Club",
    category: "Service",
    description:
      "The Military Science and Leadership Club supports community-service projects and military-related events at Purdue Fort Wayne. Members build leadership, teamwork, and service skills while supporting campus and community initiatives.",
    meetingInfo: "Bi-weekly Mondays, 6:00 PM - Walb Student Union 220",
    contactEmail: "mslc@pfw.edu",
    adminEmail: "lfischer@student.pfw.edu",
    memberCount: 14,
  },
  {
    name: "Generation Action",
    category: "Service",
    description:
      "Generation Action works to spread knowledge of reproductive health and provide accurate and unbiased information about pregnancy, parenting issues, and women's health. Members engage in awareness campaigns, education, and advocacy.",
    meetingInfo:
      "Twice monthly, Tuesdays at 6:30 PM - Liberal Arts Building 118",
    contactEmail: "generationaction@pfw.edu",
    adminEmail: "hscott@student.pfw.edu",
    memberCount: 22,
  },
  {
    name: "Purdue FIRST Programs Fort Wayne",
    category: "Academic",
    description:
      "Purdue FIRST Programs Fort Wayne supports STEM outreach and engagement through programs connected to FIRST initiatives. Members promote science, technology, engineering, and mathematics learning through mentoring and community involvement.",
    meetingInfo:
      "Monthly Saturdays - Kettler Hall outreach lab (schedule varies)",
    contactEmail: "pfpfw@pfw.edu",
    adminEmail: "dmoore@student.pfw.edu",
    memberCount: 16,
  },
  {
    name: "Student Government Association",
    category: "Service",
    description:
      "The Student Government Association (SGA) represents the student body and serves as a liaison between students and university administration. Members advocate for student needs, allocate funding to organizations, and promote campus engagement and leadership.",
    meetingInfo: "Weekly Mondays, 7:00 PM - Walb Student Union Ballroom",
    contactEmail: "sga@pfw.edu",
    adminEmail: "fali@student.pfw.edu",
    memberCount: 40,
  },
  {
    name: "Society of Women Engineers",
    category: "Professional",
    description:
      "The Society of Women Engineers (SWE) empowers women to succeed and advance in engineering fields. Members participate in networking, outreach programs, professional development, and national conferences.",
    meetingInfo: "Bi-weekly Wednesdays, 6:00 PM - Neff Hall 170",
    contactEmail: "swe@pfw.edu",
    adminEmail: "rbell@student.pfw.edu",
    memberCount: 26,
  },
  {
    name: "Latino Student Union",
    category: "Special Interest",
    description:
      "The Latino Student Union promotes cultural awareness, unity, and academic success among Latino students and allies. The organization hosts cultural events, community outreach, and leadership opportunities.",
    meetingInfo: "Every other Thursday, 6:30 PM - Walb Student Union 215",
    contactEmail: "lsu@pfw.edu",
    adminEmail: "gliu@student.pfw.edu",
    memberCount: 33,
  },
  {
    name: "Theatre Club",
    category: "Arts",
    description:
      "The Theatre Club provides students with opportunities to participate in acting, directing, stage design, and production. Members collaborate on performances and develop creative expression and stage skills.",
    meetingInfo: "Weekly Tuesdays, 6:00 PM - Williams Theatre",
    contactEmail: "theatre@pfw.edu",
    adminEmail: "jellis@pfw.edu",
    memberCount: 21,
  },
  {
    name: "Volleyball Club",
    category: "Sports",
    description:
      "The Volleyball Club is open to players of all skill levels who enjoy competitive and recreational volleyball. Members participate in practices, scrimmages, and regional tournaments.",
    meetingInfo: "Mondays & Thursdays, 7:00 PM - Rec Center Gym",
    contactEmail: "volleyball@pfw.edu",
    adminEmail: "mthompson@pfw.edu",
    memberCount: 35,
  },
  {
    name: "National Society of Black Engineers",
    category: "Professional",
    description:
      "The National Society of Black Engineers (NSBE) supports the academic and professional success of Black engineering students. Members engage in networking, career development, and community outreach initiatives.",
    meetingInfo: "Bi-weekly Fridays, 5:30 PM - Neff Hall 200",
    contactEmail: "nsbe@pfw.edu",
    adminEmail: "crivera@pfw.edu",
    memberCount: 24,
  },
  {
    name: "Pride Student Union",
    category: "Special Interest",
    description:
      "The Pride Student Union fosters a safe and inclusive environment for LGBTQ+ students and allies. The organization promotes awareness, advocacy, and community through events, discussions, and campus initiatives.",
    meetingInfo: "Weekly Wednesdays, 6:00 PM - Walb Student Union 112",
    contactEmail: "pride@pfw.edu",
    adminEmail: "aosei@pfw.edu",
    memberCount: 27,
  },
  {
    name: "Chemistry Club",
    category: "Academic",
    description:
      "The Chemistry Club connects students interested in chemistry through experiments, guest lectures, and networking opportunities. Members explore real-world applications of chemistry and prepare for careers in science and healthcare.",
    meetingInfo: "Bi-weekly Mondays, 5:00 PM - Science Building 220",
    contactEmail: "chemclub@pfw.edu",
    adminEmail: "tnguyen@pfw.edu",
    memberCount: 18,
  },
  {
    name: "Physics Club",
    category: "Academic",
    description:
      "The Physics Club brings together students passionate about physics and the universe. Members participate in demonstrations, discussions, and outreach activities that promote scientific curiosity and understanding.",
    meetingInfo: "Every other Thursday, 5:30 PM - Science Building 240",
    contactEmail: "physicsclub@pfw.edu",
    adminEmail: "ppatel@pfw.edu",
    memberCount: 15,
  },
  {
    name: "Pre-Pharmacy Club",
    category: "Professional",
    description:
      "The Pre-Pharmacy Club supports students interested in pharmacy careers by providing resources, networking opportunities, and preparation for pharmacy school applications. Members connect with professionals and gain insight into the field.",
    meetingInfo: "Monthly meetings - Science Building 150",
    contactEmail: "prepharmacy@pfw.edu",
    adminEmail: "mjohnson@pfw.edu",
    memberCount: 20,
  },
  {
    name: "Cybersecurity Club",
    category: "Professional",
    description:
      "The Cybersecurity Club focuses on digital security, ethical hacking, and cyber defense. Members participate in competitions, workshops, and hands-on labs to develop technical skills and prepare for careers in cybersecurity.",
    meetingInfo: "Weekly Tuesdays, 6:00 PM - Kettler Hall 210",
    contactEmail: "cyber@pfw.edu",
    adminEmail: "lkowalski@pfw.edu",
    memberCount: 32,
  },
  {
    name: "Running Club",
    category: "Sports",
    description:
      "The Running Club welcomes runners of all levels who want to stay active and build endurance. Members participate in group runs, local races, and fitness challenges throughout the semester.",
    meetingInfo: "Mondays, Wednesdays, Fridays - 7:00 AM - Campus Loop",
    contactEmail: "runningclub@pfw.edu",
    adminEmail: "dpark@pfw.edu",
    memberCount: 22,
  },
  {
    name: "Dance Team",
    category: "Arts",
    description:
      "The Dance Team provides opportunities for students to express themselves through dance while building teamwork and performance skills. Members perform at campus events and compete in regional competitions.",
    meetingInfo: "Weekly rehearsals - Rec Center Studio, 7:00 PM",
    contactEmail: "danceteam@pfw.edu",
    adminEmail: "sreyes@pfw.edu",
    memberCount: 25,
  },
  {
    name: "Habitat for Humanity Campus Chapter",
    category: "Service",
    description:
      "The Habitat for Humanity Campus Chapter engages students in building homes and serving the community. Members volunteer in construction projects, fundraising events, and awareness campaigns to support affordable housing initiatives.",
    meetingInfo: "Bi-weekly Saturdays - Community build sites (times vary)",
    contactEmail: "habitat@pfw.edu",
    adminEmail: "ebrooks@pfw.edu",
    memberCount: 30,
  },
  {
    name: "Weightlifting Club",
    category: "Sports",
    description:
      "The Weightlifting Club provides a space for students to improve strength, fitness, and overall health. Members support each other through workouts, training programs, and fitness challenges.",
    meetingInfo:
      "Mondays, Wednesdays, Fridays - 6:00 PM - Rec Center Weight Room",
    contactEmail: "lifting@pfw.edu",
    adminEmail: "zahmed@pfw.edu",
    memberCount: 28,
  },
  {
    name: "Soccer Club",
    category: "Sports",
    description:
      "The Soccer Club brings together students who enjoy playing and competing in soccer. Members participate in practices, scrimmages, and intercollegiate competitions.",
    meetingInfo: "Tuesdays & Thursdays, 7:30 PM - Intramural Fields",
    contactEmail: "soccer@pfw.edu",
    adminEmail: "ncarter@pfw.edu",
    memberCount: 36,
  },
  {
    name: "Tabletop Gaming Club",
    category: "Special Interest",
    description:
      "The Tabletop Gaming Club is for students who enjoy board games, card games, and role-playing games. Members meet regularly for game nights and tournaments.",
    meetingInfo: "Weekly Fridays, 6:00 PM - Walb Student Union 210",
    contactEmail: "tabletop@pfw.edu",
    adminEmail: "imartin@pfw.edu",
    memberCount: 19,
  },
  {
    name: "Photography Club",
    category: "Arts",
    description:
      "The Photography Club helps students develop their photography skills through workshops, photo walks, and creative projects. Members explore both digital and film photography.",
    meetingInfo: "Bi-weekly Sundays, 4:00 PM - Visual Arts Building 120",
    contactEmail: "photoclub@pfw.edu",
    adminEmail: "jowusu@pfw.edu",
    memberCount: 23,
  },
  {
    name: "Entrepreneurship Club",
    category: "Professional",
    description:
      "The Entrepreneurship Club supports students interested in starting businesses and developing innovative ideas. Members participate in pitch competitions, networking events, and startup workshops.",
    meetingInfo: "Every other Wednesday, 6:00 PM - Neff Hall 180",
    contactEmail: "entrepreneur@pfw.edu",
    adminEmail: "rkim@pfw.edu",
    memberCount: 31,
  },
  {
    name: "Finance Club",
    category: "Professional",
    description:
      "The Finance Club provides students with knowledge and experience in financial markets, investing, and corporate finance. Members participate in simulations, guest lectures, and networking events.",
    meetingInfo: "Bi-weekly Mondays, 6:30 PM - Neff Hall 155",
    contactEmail: "financeclub@pfw.edu",
    adminEmail: "ohassan@pfw.edu",
    memberCount: 27,
  },
  {
    name: "Public Health Club",
    category: "Academic",
    description:
      "The Public Health Club promotes awareness of health issues and prepares students for careers in public health. Members engage in community outreach, education, and health advocacy.",
    meetingInfo: "Monthly meetings - Science Building 140",
    contactEmail: "publichealth@pfw.edu",
    adminEmail: "cbennett@pfw.edu",
    memberCount: 21,
  },
  {
    name: "Graphic Design Club",
    category: "Arts",
    description:
      "The Graphic Design Club brings together students interested in visual design, branding, and digital creativity. Members collaborate on projects, learn design tools, and build professional portfolios.",
    meetingInfo: "Bi-weekly Tuesdays, 6:00 PM - Visual Arts Building 135",
    contactEmail: "designclub@pfw.edu",
    adminEmail: "lfreeman@pfw.edu",
    memberCount: 22,
  },
  {
    name: "Film and Media Club",
    category: "Arts",
    description:
      "The Film and Media Club is for students passionate about filmmaking, editing, and storytelling. Members create short films, analyze cinema, and collaborate on creative media projects.",
    meetingInfo: "Weekly Thursdays, 6:30 PM - Liberal Arts Building 200",
    contactEmail: "filmclub@pfw.edu",
    adminEmail: "awilliams@pfw.edu",
    memberCount: 26,
  },
  {
    name: "Environmental Club",
    category: "Service",
    description:
      "The Environmental Club promotes sustainability and environmental awareness on campus. Members participate in clean-up events, conservation efforts, and sustainability initiatives.",
    meetingInfo: "Monthly Saturdays - Campus & community locations",
    contactEmail: "eco@pfw.edu",
    adminEmail: "storres@student.pfw.edu",
    memberCount: 24,
  },
  {
    name: "Food and Culture Club",
    category: "Special Interest",
    description:
      "The Food and Culture Club explores global cultures through cuisine and shared experiences. Members host tasting events, cultural nights, and discussions celebrating diversity.",
    meetingInfo: "Bi-weekly Fridays, 5:30 PM - Walb Student Union 118",
    contactEmail: "foodculture@pfw.edu",
    adminEmail: "mchen@student.pfw.edu",
    memberCount: 18,
  },
  {
    name: "Chess Club",
    category: "Special Interest",
    description:
      "The Chess Club welcomes players of all skill levels to enjoy casual and competitive chess. Members participate in tournaments, strategy sessions, and friendly matches.",
    meetingInfo: "Weekly Wednesdays, 5:00 PM - Helmke Library Study Room",
    contactEmail: "chess@pfw.edu",
    adminEmail: "jmurphy@student.pfw.edu",
    memberCount: 20,
  },
  {
    name: "Volunteer Outreach Club",
    category: "Service",
    description:
      "The Volunteer Outreach Club connects students with community service opportunities throughout Fort Wayne. Members participate in local volunteering, charity events, and service projects.",
    meetingInfo: "Bi-weekly Sundays, 3:00 PM - Walb Student Union 105",
    contactEmail: "volunteer@pfw.edu",
    adminEmail: "njackson@student.pfw.edu",
    memberCount: 29,
  },
  {
    name: "Women in Technology Club",
    category: "Professional",
    description:
      "The Women in Technology Club supports women pursuing careers in technology through mentorship, networking, and skill-building workshops. Members connect with industry professionals and peers.",
    meetingInfo: "Every other Tuesday, 6:00 PM - Kettler Hall 220",
    contactEmail: "wit@pfw.edu",
    adminEmail: "lfischer@student.pfw.edu",
    memberCount: 23,
  },
  {
    name: "Debate Club",
    category: "Academic",
    description:
      "The Debate Club helps students develop critical thinking, public speaking, and argumentation skills. Members participate in debates, competitions, and structured discussions.",
    meetingInfo: "Weekly Mondays, 6:00 PM - Liberal Arts Building 210",
    contactEmail: "debate@pfw.edu",
    adminEmail: "hscott@student.pfw.edu",
    memberCount: 17,
  },
  {
    name: "Coding Interview Prep Club",
    category: "Professional",
    description:
      "The Coding Interview Prep Club prepares students for technical interviews through practice problems, mock interviews, and peer collaboration.",
    meetingInfo: "Bi-weekly Wednesdays, 7:00 PM - Kettler Hall 215",
    contactEmail: "codingprep@pfw.edu",
    adminEmail: "dmoore@student.pfw.edu",
    memberCount: 34,
  },
  {
    name: "Yoga and Wellness Club",
    category: "Sports",
    description:
      "The Yoga and Wellness Club promotes physical and mental well-being through yoga sessions, meditation, and stress-relief activities.",
    meetingInfo: "Tuesdays & Thursdays, 6:00 PM - Rec Center Studio",
    contactEmail: "yoga@pfw.edu",
    adminEmail: "fali@student.pfw.edu",
    memberCount: 21,
  },
  {
    name: "Book Club",
    category: "Special Interest",
    description:
      "The Book Club brings together students who enjoy reading and discussing literature across genres. Members engage in thoughtful discussions and social reading events.",
    meetingInfo: "Bi-weekly Sundays, 4:00 PM - Helmke Library",
    contactEmail: "bookclub@pfw.edu",
    adminEmail: "rbell@student.pfw.edu",
    memberCount: 19,
  },
  {
    name: "Fashion Club",
    category: "Arts",
    description:
      "The Fashion Club explores style, design, and trends in the fashion industry. Members participate in fashion shows, styling workshops, and creative collaborations.",
    meetingInfo: "Monthly meetings - Walb Student Union 120",
    contactEmail: "fashion@pfw.edu",
    adminEmail: "gliu@student.pfw.edu",
    memberCount: 23,
  },
  {
    name: "Game Development Club",
    category: "Professional",
    description:
      "The Game Development Club focuses on designing and building video games. Members collaborate on projects, learn development tools, and participate in game jams.",
    meetingInfo: "Weekly Fridays, 6:30 PM - Kettler Hall 218",
    contactEmail: "gamedev@pfw.edu",
    adminEmail: "jellis@pfw.edu",
    memberCount: 28,
  },
  {
    name: "Mentorship and Leadership Club",
    category: "Service",
    description:
      "The Mentorship and Leadership Club connects students through mentorship opportunities and leadership development programs. Members support personal and professional growth.",
    meetingInfo: "Bi-weekly Tuesdays, 5:30 PM - Walb Student Union 115",
    contactEmail: "leadership@pfw.edu",
    adminEmail: "mthompson@pfw.edu",
    memberCount: 26,
  },
  {
    name: "Data Analytics Club",
    category: "Academic",
    description:
      "The Data Analytics Club focuses on analyzing data, visualization, and real-world problem solving using modern tools. Members work on projects and build portfolios.",
    meetingInfo: "Bi-weekly Wednesdays, 6:00 PM - Kettler Hall 230",
    contactEmail: "data@pfw.edu",
    adminEmail: "crivera@pfw.edu",
    memberCount: 28,
  },
  {
    name: "Robotics Club",
    category: "Academic",
    description:
      "The Robotics Club allows students to design, build, and program robots while competing in challenges and learning engineering principles.",
    meetingInfo: "Weekly Thursdays, 6:00 PM - Engineering Lab",
    contactEmail: "robotics@pfw.edu",
    adminEmail: "aosei@pfw.edu",
    memberCount: 25,
  },
  {
    name: "Music Production Club",
    category: "Arts",
    description:
      "The Music Production Club helps students create, mix, and produce music. Members collaborate on projects and learn audio engineering techniques.",
    meetingInfo: "Weekly Fridays, 7:00 PM - Music Lab",
    contactEmail: "musicprod@pfw.edu",
    adminEmail: "tnguyen@pfw.edu",
    memberCount: 20,
  },
  {
    name: "Content Creators Club",
    category: "Special Interest",
    description:
      "The Content Creators Club supports students interested in social media, branding, and digital content creation. Members share strategies and collaborate on projects.",
    meetingInfo: "Bi-weekly Tuesdays, 6:30 PM - Walb Student Union 130",
    contactEmail: "creators@pfw.edu",
    adminEmail: "ppatel@pfw.edu",
    memberCount: 31,
  },
  {
    name: "Pre-Law Society",
    category: "Professional",
    description:
      "The Pre-Law Society prepares students for law school through LSAT prep, networking, and discussions about legal careers.",
    meetingInfo: "Monthly meetings - Liberal Arts Building 205",
    contactEmail: "prelaw@pfw.edu",
    adminEmail: "mjohnson@pfw.edu",
    memberCount: 22,
  },
  {
    name: "Culinary Club",
    category: "Special Interest",
    description:
      "The Culinary Club explores cooking techniques and global cuisines. Members participate in cooking sessions and food-related events.",
    meetingInfo: "Bi-weekly Sundays, 5:00 PM - Campus Kitchen",
    contactEmail: "culinary@pfw.edu",
    adminEmail: "lkowalski@pfw.edu",
    memberCount: 18,
  },
  {
    name: "Wellness and Self-Care Club",
    category: "Service",
    description:
      "The Wellness and Self-Care Club promotes mental health, stress management, and self-care practices through events and group activities.",
    meetingInfo: "Weekly Mondays, 6:00 PM - Walb Student Union 118",
    contactEmail: "wellness@pfw.edu",
    adminEmail: "dpark@pfw.edu",
    memberCount: 26,
  },
  {
    name: "MEDLIFE",
    category: "Service",
    description:
      "MEDLIFE is a volunteer-led global health organization that works to help families achieve greater freedom from the constraints of poverty through medicine, education, and community development.",
    meetingInfo: "Monthly meetings - Science Building 150",
    contactEmail: "medlife@pfw.edu",
    adminEmail: "jowusu@pfw.edu",
    memberCount: 17,
  },
  {
    name: "Student Activities Board",
    category: "Service",
    description:
      "The Student Activities Board (SAB) plans and hosts campus-wide events to enhance student life. Members help organize social, cultural, and entertainment events throughout the year.",
    meetingInfo: "Weekly Tuesdays, 6:00 PM - Walb Student Union 222",
    contactEmail: "sab@pfw.edu",
    adminEmail: "rkim@pfw.edu",
    memberCount: 35,
  },
  {
    name: "American Marketing Association",
    category: "Professional",
    description:
      "The American Marketing Association connects students interested in marketing with professional development, networking, and hands-on experiences.",
    meetingInfo: "Bi-weekly Wednesdays, 6:00 PM - Neff Hall 170",
    contactEmail: "ama@pfw.edu",
    adminEmail: "ohassan@pfw.edu",
    memberCount: 28,
  },
  {
    name: "Society of Human Resource Management",
    category: "Professional",
    description:
      "The Society for Human Resource Management (SHRM) prepares students for careers in human resources through networking, guest speakers, and professional development.",
    meetingInfo: "Monthly meetings - Neff Hall 165",
    contactEmail: "shrm@pfw.edu",
    adminEmail: "cbennett@pfw.edu",
    memberCount: 19,
  },
  {
    name: "Criminal Justice Club",
    category: "Academic",
    description:
      "The Criminal Justice Club provides students with opportunities to explore careers in law enforcement, corrections, and the legal system.",
    meetingInfo: "Bi-weekly Mondays, 5:30 PM - Liberal Arts Building 210",
    contactEmail: "cjclub@pfw.edu",
    adminEmail: "lfreeman@pfw.edu",
    memberCount: 23,
  },
  {
    name: "Political Science Club",
    category: "Academic",
    description:
      "The Political Science Club engages students in discussions about government, politics, and public policy while promoting civic engagement.",
    meetingInfo: "Weekly Thursdays, 5:30 PM - Liberal Arts Building 205",
    contactEmail: "psclub@pfw.edu",
    adminEmail: "awilliams@pfw.edu",
    memberCount: 18,
  },
  {
    name: "Education Club",
    category: "Academic",
    description:
      "The Education Club supports students pursuing careers in teaching by offering networking opportunities, workshops, and classroom experience discussions.",
    meetingInfo: "Bi-weekly Tuesdays, 5:00 PM - Neff Hall 140",
    contactEmail: "education@pfw.edu",
    adminEmail: "storres@student.pfw.edu",
    memberCount: 20,
  },
  {
    name: "Communication Club",
    category: "Academic",
    description:
      "The Communication Club helps students build skills in public speaking, media, and interpersonal communication through events and activities.",
    meetingInfo: "Weekly Wednesdays, 6:00 PM - Liberal Arts Building 215",
    contactEmail: "commclub@pfw.edu",
    adminEmail: "mchen@student.pfw.edu",
    memberCount: 17,
  },
  {
    name: "Psychology Club",
    category: "Academic",
    description:
      "The Psychology Club provides students interested in psychology opportunities to explore the field through discussions, guest speakers, and research-related activities.",
    meetingInfo: "Bi-weekly Wednesdays, 5:30 PM - Liberal Arts Building 220",
    contactEmail: "psychclub@pfw.edu",
    adminEmail: "jmurphy@student.pfw.edu",
    memberCount: 24,
  },
  {
    name: "Women in Business",
    category: "Professional",
    description:
      "Women in Business empowers women pursuing careers in business through mentorship, networking, and professional development opportunities.",
    meetingInfo: "Monthly meetings - Neff Hall 150",
    contactEmail: "wib@pfw.edu",
    adminEmail: "njackson@student.pfw.edu",
    memberCount: 21,
  },
  {
    name: "Economics Club",
    category: "Academic",
    description:
      "The Economics Club helps students understand economic theory and real-world financial systems through discussions, events, and guest speakers.",
    meetingInfo: "Bi-weekly Thursdays, 6:00 PM - Neff Hall 160",
    contactEmail: "econclub@pfw.edu",
    adminEmail: "lfischer@student.pfw.edu",
    memberCount: 18,
  },
  {
    name: "History Club",
    category: "Academic",
    description:
      "The History Club explores historical events and their impact on modern society through discussions, presentations, and educational trips.",
    meetingInfo: "Monthly meetings - Liberal Arts Building 210",
    contactEmail: "history@pfw.edu",
    adminEmail: "hscott@student.pfw.edu",
    memberCount: 16,
  },
  {
    name: "Math Club",
    category: "Academic",
    description:
      "The Math Club supports students interested in mathematics through problem-solving sessions, competitions, and collaborative learning.",
    meetingInfo: "Weekly Tuesdays, 5:00 PM - Kettler Hall 105",
    contactEmail: "mathclub@pfw.edu",
    adminEmail: "dmoore@student.pfw.edu",
    memberCount: 20,
  },
  {
    name: "Investment Club",
    category: "Professional",
    description:
      "The Investment Club allows students to explore stock markets, portfolio management, and financial strategies through simulations and discussions.",
    meetingInfo: "Weekly Mondays, 6:00 PM - Neff Hall 155",
    contactEmail: "invest@pfw.edu",
    adminEmail: "fali@student.pfw.edu",
    memberCount: 27,
  },
  {
    name: "Pre-Health Club",
    category: "Professional",
    description:
      "The Pre-Health Club supports students pursuing careers in healthcare through workshops, networking, and application preparation.",
    meetingInfo: "Bi-weekly Wednesdays, 6:30 PM - Science Building 130",
    contactEmail: "prehealth@pfw.edu",
    adminEmail: "rbell@student.pfw.edu",
    memberCount: 23,
  },
  {
    name: "English Club",
    category: "Academic",
    description:
      "The English Club provides a space for students to explore literature, writing, and creative expression through discussions, workshops, and events.",
    meetingInfo: "Bi-weekly Mondays, 5:30 PM - Liberal Arts Building 230",
    contactEmail: "english@pfw.edu",
    adminEmail: "gliu@student.pfw.edu",
    memberCount: 18,
  },
  {
    name: "Creative Writing Club",
    category: "Arts",
    description:
      "The Creative Writing Club allows students to share and develop their writing skills in poetry, fiction, and other forms through workshops and peer feedback.",
    meetingInfo: "Weekly Thursdays, 6:00 PM - Liberal Arts Building 235",
    contactEmail: "writing@pfw.edu",
    adminEmail: "jellis@pfw.edu",
    memberCount: 21,
  },
  {
    name: "Philosophy Club",
    category: "Academic",
    description:
      "The Philosophy Club engages students in discussions about ethics, logic, and philosophical thought through debates and reading groups.",
    meetingInfo: "Bi-weekly Tuesdays, 6:00 PM - Liberal Arts Building 225",
    contactEmail: "philosophy@pfw.edu",
    adminEmail: "mthompson@pfw.edu",
    memberCount: 15,
  },
  {
    name: "Geography Club",
    category: "Academic",
    description:
      "The Geography Club explores global issues, cultures, and environmental systems through discussions, projects, and educational events.",
    meetingInfo: "Monthly meetings - Liberal Arts Building 215",
    contactEmail: "geography@pfw.edu",
    adminEmail: "crivera@pfw.edu",
    memberCount: 14,
  },
  {
    name: "Anime Club",
    category: "Special Interest",
    description:
      "The Anime Club brings together students who enjoy anime and Japanese culture through watch parties, discussions, and themed events.",
    meetingInfo: "Weekly Fridays, 6:00 PM - Walb Student Union 118",
    contactEmail: "anime@pfw.edu",
    adminEmail: "aosei@pfw.edu",
    memberCount: 32,
  },
  {
    name: "eSports Development Club",
    category: "Professional",
    description:
      "The eSports Development Club focuses on the business, production, and development side of esports including streaming, event management, and branding.",
    meetingInfo: "Bi-weekly Wednesdays, 6:30 PM - Kettler Hall 102",
    contactEmail: "esportsdev@pfw.edu",
    adminEmail: "tnguyen@pfw.edu",
    memberCount: 20,
  },
  {
    name: "Community Outreach Club",
    category: "Service",
    description:
      "The Community Outreach Club connects students with volunteer opportunities and service projects throughout the Fort Wayne community.",
    meetingInfo: "Bi-weekly Saturdays - Community locations",
    contactEmail: "outreach@pfw.edu",
    adminEmail: "ppatel@pfw.edu",
    memberCount: 27,
  },
  {
    name: "Basketball Analytics Club",
    category: "Academic",
    description:
      "The Basketball Analytics Club explores sports analytics through data analysis, statistics, and game strategy evaluation.",
    meetingInfo: "Bi-weekly Mondays, 6:00 PM - Kettler Hall 120",
    contactEmail: "ballanalytics@pfw.edu",
    adminEmail: "mjohnson@pfw.edu",
    memberCount: 19,
  },
  {
    name: "Podcasting Club",
    category: "Arts",
    description:
      "The Podcasting Club helps students create and produce podcasts while developing storytelling, audio editing, and broadcasting skills.",
    meetingInfo: "Weekly Thursdays, 7:00 PM - Media Lab",
    contactEmail: "podcast@pfw.edu",
    adminEmail: "lkowalski@pfw.edu",
    memberCount: 22,
  },
  {
    name: "Public Speaking Club",
    category: "Academic",
    description:
      "The Public Speaking Club builds confidence and communication skills through speeches, presentations, and peer feedback.",
    meetingInfo: "Bi-weekly Tuesdays, 5:30 PM - Liberal Arts Building 210",
    contactEmail: "speaking@pfw.edu",
    adminEmail: "dpark@pfw.edu",
    memberCount: 18,
  },
  {
    name: "Tech Innovation Club",
    category: "Professional",
    description:
      "The Tech Innovation Club brings together students interested in emerging technologies, startups, and innovation through collaborative projects.",
    meetingInfo: "Weekly Wednesdays, 6:30 PM - Kettler Hall 215",
    contactEmail: "techinnov@pfw.edu",
    adminEmail: "sreyes@pfw.edu",
    memberCount: 30,
  },
  {
    name: "Art Appreciation Club",
    category: "Arts",
    description:
      "The Art Appreciation Club explores visual arts through museum visits, discussions, and creative activities.",
    meetingInfo: "Monthly meetings - Visual Arts Building 110",
    contactEmail: "art@pfw.edu",
    adminEmail: "ebrooks@pfw.edu",
    memberCount: 16,
  },
  {
    name: "Peer Mentoring Club",
    category: "Service",
    description:
      "The Peer Mentoring Club connects experienced students with newer students to provide guidance, support, and academic success strategies.",
    meetingInfo: "Bi-weekly Wednesdays, 5:00 PM - Walb Student Union 115",
    contactEmail: "mentor@pfw.edu",
    adminEmail: "zahmed@pfw.edu",
    memberCount: 25,
  },
  {
    name: "Fitness and Lifestyle Club",
    category: "Sports",
    description:
      "The Fitness and Lifestyle Club promotes healthy living through workouts, nutrition guidance, and wellness challenges.",
    meetingInfo: "Mondays, Wednesdays - 6:00 PM - Rec Center",
    contactEmail: "fitness@pfw.edu",
    adminEmail: "ncarter@pfw.edu",
    memberCount: 28,
  },
];

// ============================================
// MEMBERSHIPS
// userEmail + clubContactEmail as natural keys
// ============================================
const memberships = [
  // Sam Torres
  { userEmail: "storres@student.pfw.edu", clubContactEmail: "acm@pfw.edu" },
  { userEmail: "storres@student.pfw.edu", clubContactEmail: "esports@pfw.edu" },
  { userEmail: "storres@student.pfw.edu", clubContactEmail: "gamedev@pfw.edu" },
  {
    userEmail: "storres@student.pfw.edu",
    clubContactEmail: "codingprep@pfw.edu",
  },
  {
    userEmail: "storres@student.pfw.edu",
    clubContactEmail: "tabletop@pfw.edu",
  },
  // Mia Chen
  { userEmail: "mchen@student.pfw.edu", clubContactEmail: "amsa@pfw.edu" },
  { userEmail: "mchen@student.pfw.edu", clubContactEmail: "bioclub@pfw.edu" },
  { userEmail: "mchen@student.pfw.edu", clubContactEmail: "tribeta@pfw.edu" },
  { userEmail: "mchen@student.pfw.edu", clubContactEmail: "prehealth@pfw.edu" },
  { userEmail: "mchen@student.pfw.edu", clubContactEmail: "yoga@pfw.edu" },
  {
    userEmail: "mchen@student.pfw.edu",
    clubContactEmail: "activeminds@pfw.edu",
  },
  // Jake Murphy
  {
    userEmail: "jmurphy@student.pfw.edu",
    clubContactEmail: "basketballclub@pfw.edu",
  },
  {
    userEmail: "jmurphy@student.pfw.edu",
    clubContactEmail: "activeminds@pfw.edu",
  },
  {
    userEmail: "jmurphy@student.pfw.edu",
    clubContactEmail: "ballanalytics@pfw.edu",
  },
  { userEmail: "jmurphy@student.pfw.edu", clubContactEmail: "soccer@pfw.edu" },
  { userEmail: "jmurphy@student.pfw.edu", clubContactEmail: "sab@pfw.edu" },
  // Nia Jackson
  { userEmail: "njackson@student.pfw.edu", clubContactEmail: "bsu@pfw.edu" },
  {
    userEmail: "njackson@student.pfw.edu",
    clubContactEmail: "activeminds@pfw.edu",
  },
  { userEmail: "njackson@student.pfw.edu", clubContactEmail: "aso@pfw.edu" },
  {
    userEmail: "njackson@student.pfw.edu",
    clubContactEmail: "generationaction@pfw.edu",
  },
  {
    userEmail: "njackson@student.pfw.edu",
    clubContactEmail: "volunteer@pfw.edu",
  },
  { userEmail: "njackson@student.pfw.edu", clubContactEmail: "sga@pfw.edu" },
  // Leo Fischer
  { userEmail: "lfischer@student.pfw.edu", clubContactEmail: "acm@pfw.edu" },
  {
    userEmail: "lfischer@student.pfw.edu",
    clubContactEmail: "actuarialclub@pfw.edu",
  },
  {
    userEmail: "lfischer@student.pfw.edu",
    clubContactEmail: "accountingsociety@pfw.edu",
  },
  {
    userEmail: "lfischer@student.pfw.edu",
    clubContactEmail: "financeclub@pfw.edu",
  },
  { userEmail: "lfischer@student.pfw.edu", clubContactEmail: "invest@pfw.edu" },
  { userEmail: "lfischer@student.pfw.edu", clubContactEmail: "data@pfw.edu" },
  // Hannah Scott
  {
    userEmail: "hscott@student.pfw.edu",
    clubContactEmail: "activeminds@pfw.edu",
  },
  { userEmail: "hscott@student.pfw.edu", clubContactEmail: "aslpah@pfw.edu" },
  {
    userEmail: "hscott@student.pfw.edu",
    clubContactEmail: "anthroclub@pfw.edu",
  },
  { userEmail: "hscott@student.pfw.edu", clubContactEmail: "bookclub@pfw.edu" },
  { userEmail: "hscott@student.pfw.edu", clubContactEmail: "theatre@pfw.edu" },
  { userEmail: "hscott@student.pfw.edu", clubContactEmail: "debate@pfw.edu" },
  // Devin Moore
  {
    userEmail: "dmoore@student.pfw.edu",
    clubContactEmail: "basketballclub@pfw.edu",
  },
  { userEmail: "dmoore@student.pfw.edu", clubContactEmail: "esports@pfw.edu" },
  {
    userEmail: "dmoore@student.pfw.edu",
    clubContactEmail: "ballanalytics@pfw.edu",
  },
  { userEmail: "dmoore@student.pfw.edu", clubContactEmail: "cyber@pfw.edu" },
  { userEmail: "dmoore@student.pfw.edu", clubContactEmail: "fitness@pfw.edu" },
  // Fatima Ali
  { userEmail: "fali@student.pfw.edu", clubContactEmail: "msa@pfw.edu" },
  { userEmail: "fali@student.pfw.edu", clubContactEmail: "bsa@pfw.edu" },
  {
    userEmail: "fali@student.pfw.edu",
    clubContactEmail: "activeminds@pfw.edu",
  },
  { userEmail: "fali@student.pfw.edu", clubContactEmail: "iso@pfw.edu" },
  { userEmail: "fali@student.pfw.edu", clubContactEmail: "volunteer@pfw.edu" },
  { userEmail: "fali@student.pfw.edu", clubContactEmail: "wellness@pfw.edu" },
  // Ryan Bell
  { userEmail: "rbell@student.pfw.edu", clubContactEmail: "asce@pfw.edu" },
  { userEmail: "rbell@student.pfw.edu", clubContactEmail: "acm@pfw.edu" },
  { userEmail: "rbell@student.pfw.edu", clubContactEmail: "robotics@pfw.edu" },
  { userEmail: "rbell@student.pfw.edu", clubContactEmail: "cyber@pfw.edu" },
  { userEmail: "rbell@student.pfw.edu", clubContactEmail: "techinnov@pfw.edu" },
  // Grace Liu
  { userEmail: "gliu@student.pfw.edu", clubContactEmail: "amsa@pfw.edu" },
  { userEmail: "gliu@student.pfw.edu", clubContactEmail: "asmicro@pfw.edu" },
  { userEmail: "gliu@student.pfw.edu", clubContactEmail: "tribeta@pfw.edu" },
  { userEmail: "gliu@student.pfw.edu", clubContactEmail: "bioclub@pfw.edu" },
  {
    userEmail: "gliu@student.pfw.edu",
    clubContactEmail: "prepharmacy@pfw.edu",
  },
  { userEmail: "gliu@student.pfw.edu", clubContactEmail: "chemclub@pfw.edu" },
];

// ============================================
// JOIN REQUESTS
// ============================================
const joinRequests = [
  // Pending
  {
    userEmail: "storres@student.pfw.edu",
    clubContactEmail: "accountingsociety@pfw.edu",
    status: "pending",
    message:
      "I am a junior in Accounting and want to get more involved in the professional community before I start recruiting.",
  },
  {
    userEmail: "mchen@student.pfw.edu",
    clubContactEmail: "acm@pfw.edu",
    status: "pending",
    message:
      "I love Python and have been working on a personal game project — would love to connect with other CS-interested students.",
  },
  {
    userEmail: "jmurphy@student.pfw.edu",
    clubContactEmail: "esports@pfw.edu",
    status: "pending",
    message:
      "I play Valorant and Rocket League competitively. Excited to represent PFW!",
  },
  {
    userEmail: "lfischer@student.pfw.edu",
    clubContactEmail: "esports@pfw.edu",
    status: "pending",
    message:
      "Long-time gamer and aspiring game developer. Would love to join the esports community.",
  },
  {
    userEmail: "hscott@student.pfw.edu",
    clubContactEmail: "asa@pfw.edu",
    status: "pending",
    message:
      "I am interested in Greek life and Alpha Sigma Alpha's values align with what I am looking for in a sisterhood.",
  },
  {
    userEmail: "rbell@student.pfw.edu",
    clubContactEmail: "agprevet@pfw.edu",
    status: "pending",
    message:
      "Pre-vet student interested in shadowing opportunities and networking with vet professionals.",
  },
  // Approved
  {
    userEmail: "dmoore@student.pfw.edu",
    clubContactEmail: "archeryclub@pfw.edu",
    status: "approved",
    message:
      "I did archery in high school and want to keep competing at the collegiate level.",
  },
  {
    userEmail: "fali@student.pfw.edu",
    clubContactEmail: "aso@pfw.edu",
    status: "approved",
    message:
      "I am from Senegal and want to connect with other African students and share our culture with the PFW community.",
  },
  {
    userEmail: "gliu@student.pfw.edu",
    clubContactEmail: "bioclub@pfw.edu",
    status: "approved",
    message:
      "Biology pre-med student looking for field trip and research opportunities outside the classroom.",
  },
  {
    userEmail: "njackson@student.pfw.edu",
    clubContactEmail: "msa@pfw.edu",
    status: "approved",
    message:
      "I am a practicing Muslim and would love to have a campus community for prayer and connection.",
  },
  // Rejected
  {
    userEmail: "jmurphy@student.pfw.edu",
    clubContactEmail: "tribeta@pfw.edu",
    status: "rejected",
    message:
      "I am interested in biology honors and would like to be considered for Beta Beta Beta.",
  },
  {
    userEmail: "storres@student.pfw.edu",
    clubContactEmail: "asa@pfw.edu",
    status: "rejected",
    message:
      "I would like to learn more about Alpha Sigma Alpha and potentially join as a supporter.",
  },
];

// ============================================
// SEED FUNCTION
// ============================================
async function seed() {
  console.log("Seeding database...");

  const schema = fs.readFileSync(path.join(__dirname, "../schema.sql"), "utf8");
  await db.query(schema);
  console.log("  Applied schema (tables dropped and recreated).");

  // Insert users and build email → id map
  const userIdByEmail = {};
  for (const user of users) {
    const { rows } = await db.query(
      "INSERT INTO users (name, email, password_hash, role, bio, major, year) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email",
      [
        user.name,
        user.email,
        user.passwordHash,
        user.role,
        user.bio ?? "",
        user.major ?? "",
        user.year ?? "",
      ],
    );
    userIdByEmail[rows[0].email] = rows[0].id;
  }
  console.log(`  Inserted ${users.length} users.`);

  // Insert clubs and build contactEmail → id map
  const clubIdByContactEmail = {};
  for (const club of clubs) {
    const adminId = userIdByEmail[club.adminEmail];
    const { rows } = await db.query(
      `INSERT INTO clubs (name, category, description, meeting_info, contact_email, admin_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, contact_email`,
      [
        club.name,
        club.category,
        club.description,
        club.meetingInfo,
        club.contactEmail,
        adminId,
      ],
    );
    clubIdByContactEmail[rows[0].contact_email] = rows[0].id;

    // Add the admin as a member of their own club
    await db.query(
      "INSERT INTO memberships (user_id, club_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [adminId, rows[0].id],
    );
  }
  console.log(`  Inserted ${clubs.length} clubs.`);

  // Insert memberships
  for (const m of memberships) {
    await db.query(
      "INSERT INTO memberships (user_id, club_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userIdByEmail[m.userEmail], clubIdByContactEmail[m.clubContactEmail]],
    );
  }
  console.log(`  Inserted ${memberships.length} memberships.`);

  // Insert join requests
  for (const jr of joinRequests) {
    await db.query(
      "INSERT INTO join_requests (user_id, club_id, message, status) VALUES ($1, $2, $3, $4)",
      [
        userIdByEmail[jr.userEmail],
        clubIdByContactEmail[jr.clubContactEmail],
        jr.message,
        jr.status,
      ],
    );
  }
  console.log(`  Inserted ${joinRequests.length} join requests.`);

  console.log("Database seeded successfully.");
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => db.pool.end());
