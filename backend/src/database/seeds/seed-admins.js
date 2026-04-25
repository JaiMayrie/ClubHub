// =============================================================
// seed-admins.js
// Seeds the 6 real club admins with a temporary password.
//
// HOW TO RUN:
//   cd backend
//   node src/database/seeds/seed-admins.js
//
// Temporary password for ALL admins: ClubHub2026!
// They will be forced to change it on first login.
// =============================================================

if (!process.env.DB_HOST) {
  process.env.DB_HOST = "localhost";
  process.env.DB_PORT = "5433";
}
require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("../../db");

const TEMP_PASSWORD = "ClubHub2026!";

const realAdmins = [
  {
    name: "Rachel Kim",
    email: "sab@pfw.edu",
    bio: "Student Activities Board administrator.",
    note: "Student Activities Board",
  },
  {
    name: "Jake Murphy",
    email: "mun@pfw.edu",
    bio: "Model United Nations club administrator.",
    note: "Model United Nations",
  },
  {
    name: "Ethan Brooks",
    email: "habitat@pfw.edu",
    bio: "Habitat for Humanity Campus Chapter administrator.",
    note: "Habitat for Humanity",
  },
  {
    name: "James Owusu",
    email: "photoclub@pfw.edu",
    bio: "Photography Club administrator.",
    note: "Photography Club",
  },
  // Test admins
  {
    name: "Shreya Sagar",
    email: "sagas01@pfw.edu",
    bio: "Test admin account.",
    note: "Test Admin (PFW)",
  },
  {
    name: "Shreya Mishra",
    email: "shreyasagar0918@gmail.com",
    bio: "Test admin account.",
    note: "Test Admin (Gmail)",
  },
];

async function seedAdmins() {
  console.log("Seeding real admin accounts...\n");

  const passwordHash = await bcrypt.hash(TEMP_PASSWORD, 12);

  for (const admin of realAdmins) {
    const normalizedEmail = admin.email.toLowerCase();

    // Check if user already exists
    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existing.rows.length > 0) {
      // Update existing user — promote to admin, set temp password
      await db.query(
        `UPDATE users
         SET role                = 'admin',
             password_hash       = $1,
             must_change_password = TRUE,
             name                = $2,
             bio                 = $3
         WHERE email = $4`,
        [passwordHash, admin.name, admin.bio, normalizedEmail]
      );
      console.log(`  ✅ Updated → admin: ${normalizedEmail} (${admin.note})`);
    } else {
      // Create brand new admin account
      await db.query(
        `INSERT INTO users
           (name, email, password_hash, role, bio, major, year, must_change_password)
         VALUES ($1, $2, $3, 'admin', $4, '', '', TRUE)`,
        [admin.name, normalizedEmail, passwordHash, admin.bio]
      );
      console.log(`  ✅ Created admin: ${normalizedEmail} (${admin.note})`);
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Admin seeding complete!

Temporary password for ALL admins: ${TEMP_PASSWORD}

Share this privately with each admin.
They will be forced to change it on first login.

Admins seeded:
${realAdmins.map((a) => `  • ${a.name} <${a.email}>`).join("\n")}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

seedAdmins()
  .catch((err) => {
    console.error("Admin seed failed:", err);
    process.exit(1);
  })
  .finally(() => db.pool.end());