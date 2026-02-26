const { Pool } = require('pg');

/**
 * Database Configuration
 * ----------------------
 * Creates a PostgreSQL connection pool using environment variables.
 * Exports a reusable query method for controllers/services to interact with the database.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Stored securely in env
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};