// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Route 1: Hello API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel!" });
});

// Route 2: Status API
app.get("/api/status", (req, res) => {
  res.json({ status: "Server is running smoothly!" });
});

// Start server (for local testing)
if (process.env.NODE_ENV !== "vercel") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;
