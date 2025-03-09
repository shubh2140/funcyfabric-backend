const { getAllProducts } = require("../models/productModel");

const fetchAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products); // ✅ Return products as JSON
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { fetchAllProducts };
