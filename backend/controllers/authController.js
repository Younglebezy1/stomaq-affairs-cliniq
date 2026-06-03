// ===========================
// controllers/authController.js
// ===========================

const bcrypt     = require("bcryptjs");
const jwt        = require("jsonwebtoken");
const crypto     = require("crypto");
const nodemailer = require("nodemailer");
const { pool }   = require("../config/db");

// ── Helper: generate JWT ──
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// ── Helper: send email ──
async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({ from: `"Stomaq Affairs Cliniq" <${process.env.EMAIL_USER}>`, to, subject, html });
}

// ── REGISTER ──
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required." });
    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters." });

    // Check if email already exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0)
      return res.status(409).json({ message: "An account with this email already exists." });

    const hashed = await bcrypt.hash(password, 12);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );
    const user  = result.rows[0];
    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// ── LOGIN ──
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user   = result.rows[0];
    if (!user || !user.password)
      return res.status(401).json({ message: "Invalid email or password." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password." });

    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// ── FORGOT PASSWORD ──
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required." });

    const result = await pool.query("SELECT id, name FROM users WHERE email = $1", [email]);
    // Always respond the same way (security: don't reveal if email exists)
    if (result.rows.length === 0)
      return res.json({ message: "If that email exists, a reset link has been sent." });

    const user  = result.rows[0];
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await pool.query(
      "UPDATE users SET reset_token = $1, reset_expires = $2 WHERE id = $3",
      [token, expires, user.id]
    );

    const resetLink = `${process.env.FRONTEND_URL}/pages/reset-password.html?token=${token}`;
    await sendEmail({
      to: email,
      subject: "Reset your Stomaq password",
      html: `
        <h2>Password Reset</h2>
        <p>Hi ${user.name},</p>
        <p>Click below to reset your password. This link expires in 1 hour.</p>
        <a href="${resetLink}" style="background:#d4621a;color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:bold;">
          Reset Password
        </a>
        <p style="margin-top:16px;color:#888;">If you didn't request this, you can ignore this email.</p>
      `,
    });

    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// ── GOOGLE OAUTH CALLBACK (called by Passport) ──
exports.googleCallback = (req, res) => {
  const token = generateToken(req.user.id);
  // Redirect to frontend with token in URL (frontend stores it)
  res.redirect(
    `${process.env.FRONTEND_URL}/pages/oauth-success.html?token=${token}&name=${encodeURIComponent(req.user.name)}`
  );
};
