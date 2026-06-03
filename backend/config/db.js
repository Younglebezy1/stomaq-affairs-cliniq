// ===========================
// config/db.js
// PostgreSQL connection + table setup
// ===========================

const { Pool } = require("pg");

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Create tables if they don't exist
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      name          VARCHAR(150)        NOT NULL,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password      VARCHAR(255),           -- NULL for Google-only accounts
      google_id     VARCHAR(255) UNIQUE,
      reset_token   VARCHAR(255),
      reset_expires TIMESTAMPTZ,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("✅ Database tables ready.");
}

module.exports = { pool, initDB };
