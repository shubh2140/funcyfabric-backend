const db = require("../config/db");
const BASE_URL = "https://api.funcyfabric.in";

// ✅ Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await db.any(`
      SELECT id, name, category, price, discount_price AS "discountPrice", 
             is_new_collection AS "isNew", image_url AS image 
      FROM products
    `);

    res.json(products.map((product) => ({
      ...product,
      image: `${BASE_URL}/${product.image}`,
    })));
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get New Arrivals
const getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await db.any(`
      SELECT id, name, category, price, discount_price AS "discountPrice", 
             is_new_collection AS "isNew", image_url AS image 
      FROM products
      WHERE is_new_collection = true
      ORDER BY created_at DESC
    `);

    res.json(newArrivals.map((product) => ({
      ...product,
      image: `${BASE_URL}/${product.image}`,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Featured Products
const getFeatureProducts = async (req, res) => {
  try {
    const featureProducts = await db.any(`
      SELECT id, name, category, price, discount_price AS "discountPrice", 
             is_new_collection AS "isNew", image_url AS image 
      FROM products
      WHERE is_new_collection = false
      ORDER BY created_at DESC
    `);

    res.json(featureProducts.map((product) => ({
      ...product,
      image: `${BASE_URL}/${product.image}`,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Men Products
const getMenProducts = async (req, res) => {
  try {
    const menProducts = await db.any(`
      SELECT id, name, category, price, discount_price AS "discountPrice", 
             is_new_collection AS "isNew", image_url AS image 
      FROM products
      WHERE category = 'Men'
      ORDER BY created_at DESC
    `);

    res.json(menProducts.map((product) => ({
      ...product,
      image: `${BASE_URL}/${product.image}`,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Women Products
const getWomenProducts = async (req, res) => {
  try {
    const womenProducts = await db.any(`
      SELECT id, name, category, price, discount_price AS "discountPrice", 
             is_new_collection AS "isNew", image_url AS image 
      FROM products
      WHERE category = 'Women'
      ORDER BY created_at DESC
    `);

    res.json(womenProducts.map((product) => ({
      ...product,
      image: `${BASE_URL}/${product.image}`,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Product By ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Fetch product details
    const product = await db.oneOrNone(`
      SELECT id, name, category, price, discount_price AS "discountPrice", 
             description, image_url AS image, is_new_collection AS "isNew"
      FROM products
      WHERE id = $1
    `, [id]);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.image = `${BASE_URL}/${product.image}`;

    // ✅ Fetch "Can be liked" products
    const likedProducts = await db.any(`
      SELECT p.id, p.name, p.category, p.price, p.discount_price AS "discountPrice", 
             p.image_url AS image, p.is_new_collection AS "isNew"
      FROM product_can_be_liked pcl
      INNER JOIN products p ON pcl.liked_product_id = p.id
      WHERE pcl.product_id = $1
    `, [id]);

    // ✅ Fetch related products
    const relatedProducts = await db.any(`
      SELECT p.id, p.name, p.category, p.price, p.discount_price AS "discountPrice", 
             p.image_url AS image, p.is_new_collection AS "isNew"
      FROM products p
      INNER JOIN related_products rp ON p.id = rp.related_product_id
      WHERE rp.product_id = $1
    `, [id]);

    // ✅ Fetch additional attributes
    const colors = await db.any(`SELECT color FROM product_colors WHERE product_id = $1`, [id]);
    const sizes = await db.any(`SELECT size FROM product_sizes WHERE product_id = $1`, [id]);
    const features = await db.any(`SELECT feature FROM product_features WHERE product_id = $1`, [id]);
    const shipping = await db.any(`SELECT shipping_info AS shipping FROM product_shipping WHERE product_id = $1`, [id]);

    product.likedProducts = likedProducts.map((item) => ({
      ...item,
      image: `${BASE_URL}/${item.image}`,
    }));
    product.relatedProducts = relatedProducts.map((item) => ({
      ...item,
      image: `${BASE_URL}/${item.image}`,
    }));
    product.colors = colors.map((c) => c.color);
    product.sizes = sizes.map((s) => s.size);
    product.features = features.map((f) => f.feature);
    product.shipping = shipping.map((s) => s.shipping);

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getNewArrivals,
  getFeatureProducts,
  getMenProducts,
  getWomenProducts,
  getProductById,
};
