const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Get from .env
  ssl: {
    rejectUnauthorized: false, // Required for Vercel PostgreSQL
  },
});

module.exports = pool;
