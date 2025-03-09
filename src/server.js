const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Vercel Deployed API!");
});

module.exports = app; // ✅ Export app instead of app.listen()
