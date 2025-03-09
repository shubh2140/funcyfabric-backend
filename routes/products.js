const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getNewArrivals,
  getFeatureProducts,
  getMenProducts,
  getWomenProducts,
  getProductById,
} = require("../controllers/productsController");

router.get("/", getAllProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/feature", getFeatureProducts);
router.get("/men", getMenProducts);
router.get("/women", getWomenProducts);
router.get("/:id", getProductById);

module.exports = router;
