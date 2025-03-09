const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from API!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
