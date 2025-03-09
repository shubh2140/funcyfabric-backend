const pool = require("../config/db");

const getAllProducts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM products"); // ✅ Fetch all products
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllProducts };
