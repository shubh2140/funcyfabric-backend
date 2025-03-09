const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql, poolPromise } = require("../config/db");

const signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
      city,
      postal_code,
      country,
      role,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await poolPromise;
    await pool
      .request()
      .input("first_name", sql.VarChar, first_name)
      .input("last_name", sql.VarChar, last_name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .input("phone", sql.VarChar, phone)
      .input("address", sql.VarChar, address)
      .input("city", sql.VarChar, city)
      .input("postal_code", sql.VarChar, postal_code)
      .input("country", sql.VarChar, country)
      .input("role", sql.VarChar, role || "user") // Default role as "user"
      .query(`
                INSERT INTO Users (first_name, last_name, email, password, phone, address, city, postal_code, country, role, created_at) 
                VALUES (@first_name, @last_name, @email, @password, @phone, @address, @city, @postal_code, @country, @role, GETDATE())
            `);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(
        "SELECT id, first_name, last_name, email, password, role FROM Users WHERE email = @email"
      );

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login };
