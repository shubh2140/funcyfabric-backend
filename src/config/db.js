require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Vercel PostgreSQL
  },
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected!"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

module.exports = pool;
