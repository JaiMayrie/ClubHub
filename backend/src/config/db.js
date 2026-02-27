const { Pool } = require("pg");

/**
 * Database Configuration
 * ----------------------
 * Creates a PostgreSQL connection pool using environment variables.
 * Exports a reusable query method for controllers/services to interact with the database.
 */

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "clubhub",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
