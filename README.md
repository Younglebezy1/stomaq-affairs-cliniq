stomaq affairs/
├── frontend/
│   ├── index.html              ← Main homepage
│   ├── css/
│   │   └── style.css           ← All styles
│   ├── js/
│   │   ├── main.js             ← Scroll animations, nav, toast
│   │   ├── menu.js             ← Menu data and logic
│   │   └── auth.js             ← Login/register/forgot API calls
│   └── pages/
│       ├── login.html          ← Login page
│       ├── register.html       ← Create account page
│       ├── forgot-password.html← Forgot password page
│       └── oauth-success.html  ← Google login redirect handler
│
├── backend/
│   ├── server.js               ← Express entry point
│   ├── package.json            ← Backend dependencies
│   ├── .env.example            ← Environment variable template
│   ├── config/
│   │   ├── db.js               ← PostgreSQL connection + table setup
│   │   └── passport.js         ← Google OAuth strategy
│   ├── controllers/
│   │   └── authController.js   ← Register, login, forgot, Google callback
│   ├── middleware/
│   │   └── authMiddleware.js   ← JWT protection for routes
│   └── routes/
│       └── authRoutes.js       ← All /api/auth/* routes
│
├── .gitignore
└── README.md
