// ===========================
// middleware/authMiddleware.js
// Protect routes with JWT
// ===========================

const jwt  = require("jsonwebtoken");
const { pool } = require("../config/db");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Not authorised. Please log in." });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result  = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [decoded.id]);
    if (result.rows.length === 0)
      return res.status(401).json({ message: "User not found." });
    req.user = result.rows[0];
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
