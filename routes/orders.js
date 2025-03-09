const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Orders");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
