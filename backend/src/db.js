const { Pool } = require("pg");

/**
 * Database Configuration
 * ----------------------
 * Creates a PostgreSQL connection pool using environment variables.
 * Exports a reusable query method for controllers/services to interact with the database.
 */

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("error", (err) => {
  if (
    process.env.NODE_ENV === "test" &&
    err?.message?.includes("Connection terminated unexpectedly")
  ) {
    return;
  }

  console.error("Unexpected PostgreSQL pool error:", err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
