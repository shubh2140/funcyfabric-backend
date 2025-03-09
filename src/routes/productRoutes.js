const express = require("express");
const { getAllProducts } = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts); // Matches `/api/products`

module.exports = router;
