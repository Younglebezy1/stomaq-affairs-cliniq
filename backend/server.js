require("dotenv").config();

const express    = require("express");
const cors       = require("cors");
const passport   = require("./config/passport");
const { initDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// ── Routes ──
app.use("/api/auth", authRoutes);

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ message: "🍽 Stomaq Affairs Cliniq API is running!" });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// ── Start server after DB init ──
initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)
  })
  .catch(err => {
    console.error("❌ DB init failed:", err);
    process.exit(1);
  });
