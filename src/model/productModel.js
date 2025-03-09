const pool = require("../config/db");

// Get all products
const getAllProducts = async () => {
  const result = await pool.query(
    "SELECT id, name, category, price, discount_price AS discountPrice, is_new_collection AS isNew, image_url AS image FROM Products"
  );
  return result.rows;
};

module.exports = { getAllProducts };
