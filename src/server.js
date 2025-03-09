const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON
app.use("/api/products", productRoutes); // Mount product routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Vercel Deployed API!");
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // For Vercel
