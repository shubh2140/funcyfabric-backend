const express = require("express");
const productRoutes = require("./routes/productRoutes"); // Ensure correct path

const app = express();

app.use(express.json());

// Mount product routes
app.use("/api/products", productRoutes); 

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Vercel Deployed API!");
});

module.exports = app; // ✅ Correct for Vercel
