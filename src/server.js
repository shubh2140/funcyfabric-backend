require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ Import cors

const productRoutes = require("./routes/productRoutes");
require("./config/db"); // Ensure DB connection

const app = express();

app.use(cors()); // ✅ Enable CORS for all routes
app.use(express.json());

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});


app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Vercel Deployed API!");
});

module.exports = app; // ✅ Export app for Vercel
