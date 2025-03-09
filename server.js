const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Import path module
require('dotenv').config(); // ✅ Load environment variables

const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/products'); // ✅ Import product routes

const app = express();

app.use(express.json()); // ✅ Enables JSON parsing
app.use(cors()); // ✅ Enables CORS

// ✅ Serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes); // ✅ Register product routes

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
