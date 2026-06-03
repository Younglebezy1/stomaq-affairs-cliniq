// ===========================
// routes/authRoutes.js
// ===========================

const express    = require("express");
const passport   = require("../config/passport");
const controller = require("../controllers/authController");
const protect    = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/auth/register
router.post("/register", controller.register);

// POST /api/auth/login
router.post("/login", controller.login);

// POST /api/auth/forgot-password
router.post("/forgot-password", controller.forgotPassword);

// GET /api/auth/google  → redirect to Google consent screen
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// GET /api/auth/google/callback  → Google redirects here
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/pages/login.html", session: false }),
  controller.googleCallback
);

// GET /api/auth/me  → get current logged-in user (protected)
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
