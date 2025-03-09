const express = require("express");
const productRoutes = require("./routes/productRoutes");
require("./config/db"); // Ensure DB connection

const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Vercel Deployed API!");
});

module.exports = app; // ✅ Export app for Vercel
