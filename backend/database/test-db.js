import pool from "../config/database.js";

console.log("Environment check:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);
console.log("DB_PASSWORD exists:", !!process.env.DB_PASSWORD);

async function testConnection() {
  try {
    console.log("Testing database connection...\n");

    // Test basic connection
    const timeResult = await pool.query("SELECT NOW()");
    console.log("Database connected successfully!");
    console.log("Current time from DB:", timeResult.rows[0].now);
    console.log("");

    // Verify tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log("Tables in database:");
    tablesResult.rows.forEach((row) => {
      console.log(`   - ${row.table_name}`);
    });
    console.log("");

    // Check data counts
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const clubs = await pool.query("SELECT COUNT(*) FROM clubs");
    const memberships = await pool.query("SELECT COUNT(*) FROM memberships");
    const joinRequests = await pool.query("SELECT COUNT(*) FROM join_requests");

    console.log("Record counts:");
    console.log(`   Users: ${users.rows[0].count}`);
    console.log(`   Clubs: ${clubs.rows[0].count}`);
    console.log(`   Memberships: ${memberships.rows[0].count}`);
    console.log(`   Join Requests: ${joinRequests.rows[0].count}`);
    console.log("");

    // Test join query
    const clubsResult = await pool.query(`
      SELECT clubs.name, clubs.category, users.name as admin_name 
      FROM clubs 
      JOIN users ON clubs.admin_id = users.id
    `);

    console.log("Clubs in database:");
    clubsResult.rows.forEach((club) => {
      console.log(
        `   - ${club.name} (${club.category}) - Admin: ${club.admin_name}`,
      );
    });

    console.log("\nAll tests passed!");

    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error("Database connection error:", err.message);
    console.error("\nMake sure:");
    console.error("   1. PostgreSQL is running");
    console.error('   2. Database "clubhub" exists');
    console.error("   3. .env file has correct credentials");
    console.error("   4. Schema has been loaded");

    await pool.end();
    process.exit(1);
  }
}

testConnection();
