// ===========================
// config/passport.js
// Google OAuth Strategy
// ===========================

const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { pool } = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email    = profile.emails[0].value;
        const name     = profile.displayName;
        const googleId = profile.id;

        // Check if user exists by Google ID or email
        let result = await pool.query(
          "SELECT * FROM users WHERE google_id = $1 OR email = $2",
          [googleId, email]
        );

        if (result.rows.length > 0) {
          // User exists — update google_id if needed
          const user = result.rows[0];
          if (!user.google_id) {
            await pool.query("UPDATE users SET google_id = $1 WHERE id = $2", [googleId, user.id]);
          }
          return done(null, user);
        }

        // New user — create account
        result = await pool.query(
          "INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *",
          [name, email, googleId]
        );
        return done(null, result.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Not using sessions — but Passport requires these
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id }));

module.exports = passport;
