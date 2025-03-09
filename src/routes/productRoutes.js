const express = require("express");
const { fetchAllProducts } = require("../controllers/productController");

const router = express.Router();

router.get("/", fetchAllProducts);

module.exports = router;
