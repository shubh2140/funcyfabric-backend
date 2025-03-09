const express = require("express");
const productRoutes = require("./routes/productRoutes"); // ✅ Ensure correct path

const app = express();

app.use(express.json()); // ✅ Middleware to parse JSON

// API Routes
app.use("/api/products", productRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Vercel Deployed API!");
});

module.exports = app; // ✅ Export app for Vercel
