# 🍽 Stomaq Affairs Cliniq — Full Stack Website

A full-stack Nigerian restaurant website with authentication, built with:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Auth**: JWT, Google OAuth, Email/Password

---

## 📁 Project Structure

```
stomaq/
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
```

---

## 🖥️ How Files Are Linked

### Frontend links
- `index.html` links → `css/style.css` (styles)
- `index.html` links → `js/menu.js` (menu rendering)
- `index.html` links → `js/main.js` (animations, nav)
- `pages/login.html` links → `../css/style.css` and `../js/auth.js`
- `pages/register.html` links → `../css/style.css` and `../js/auth.js`
- `pages/forgot-password.html` links → same pattern

### Backend links
- `server.js` → imports `config/db.js`, `config/passport.js`, `routes/authRoutes.js`
- `routes/authRoutes.js` → imports `controllers/authController.js`, `middleware/authMiddleware.js`
- `controllers/authController.js` → imports `config/db.js`

---

## ⚙️ Setup in VS Code (Step by Step)

### 1. Install required software
- [Node.js](https://nodejs.org) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/download/)
- [VS Code](https://code.visualstudio.com/)
- **VS Code Extension**: Install **Live Server** by Ritwick Dey (for frontend)

### 2. Open the project in VS Code
```
File → Open Folder → select the `stomaq` folder
```

### 3. Set up the database (PostgreSQL)
Open **pgAdmin** or the **psql** terminal and run:
```sql
CREATE DATABASE stomaq_db;
```
The tables will be created automatically when the server starts.

### 4. Set up backend environment variables
```bash
# In VS Code terminal:
cd backend
cp .env.example .env
```
Then open `.env` and fill in your real values:
- Your PostgreSQL username and password
- A long random string for `JWT_SECRET`
- Your Gmail address and [App Password](https://support.google.com/accounts/answer/185833) for email
- Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)

### 5. Install backend dependencies
```bash
# Make sure you are inside the backend folder:
cd backend
npm install
```

### 6. Start the backend server
```bash
npm run dev
```
You should see:
```
✅ Database tables ready.
✅ Server running on http://localhost:5000
```

### 7. Open the frontend
- Right-click `frontend/index.html` in VS Code
- Click **"Open with Live Server"**
- Your site opens at `http://127.0.0.1:5500`

> ⚠️ Update `FRONTEND_URL` in your `.env` to match the Live Server URL (e.g. `http://127.0.0.1:5500`)

---

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project → Enable **Google+ API**
3. Go to **Credentials** → Create **OAuth 2.0 Client ID**
4. Set **Authorized redirect URI** to:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
5. Copy the **Client ID** and **Client Secret** into your `.env`

---

## 🚀 Pushing to GitHub

### First time (create a new repo)

1. Go to [github.com](https://github.com) → Click **New Repository**
2. Name it `stomaq-affairs-cliniq` → Click **Create repository**
3. In VS Code terminal (from the `stomaq` root folder):

```bash
git init
git add .
git commit -m "Initial commit: Stomaq Affairs Cliniq full stack"
git branch -M main
git remote add origin https://github.com/Younglebezy1/stomaq-affairs-cliniq.git
git push -u origin main
```

### After making changes
```bash
git add .
git commit -m "Describe what you changed"
git push
```

> ✅ Your `.env` file is in `.gitignore` so it will NEVER be pushed to GitHub. Only `.env.example` is pushed.

---

## 🌐 API Endpoints Reference

| Method | Endpoint                    | Description              | Protected |
|--------|-----------------------------|--------------------------|-----------|
| POST   | /api/auth/register          | Create new account       | No        |
| POST   | /api/auth/login             | Login with email+password| No        |
| POST   | /api/auth/forgot-password   | Send password reset email| No        |
| GET    | /api/auth/google            | Start Google OAuth flow  | No        |
| GET    | /api/auth/google/callback   | Google OAuth callback    | No        |
| GET    | /api/auth/me                | Get current user info    | Yes (JWT) |

---

## 🛠️ Recommended VS Code Extensions

- **Live Server** — run frontend without a server
- **Prettier** — auto-format your code
- **ESLint** — catch JavaScript errors
- **PostgreSQL** by Chris Kolkman — view your database inside VS Code
- **Thunder Client** — test your API endpoints (like Postman, but inside VS Code)

---

Built with ❤️ for Stomaq Affairs Cliniq, Lagos Nigeria 🇳🇬
