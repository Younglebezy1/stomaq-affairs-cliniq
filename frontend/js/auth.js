// ===========================
// STOMAQ AFFAIRS CLINIQ
// auth.js — Auth API Calls
// ===========================

const API = "http://localhost:5000/api/auth";

// ── Show / hide alert box ──
function showAlert(id, msg, type = "error") {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert-box show alert-${type}`;
}

// ── REGISTER ──
async function handleRegister(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Creating account...";

  const name     = document.getElementById("name").value.trim();
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm  = document.getElementById("confirm").value;

  if (password !== confirm) {
    showAlert("alertBox", "Passwords do not match.");
    btn.disabled = false; btn.textContent = "Create Account";
    return;
  }

  try {
    const res  = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed.");
    showAlert("alertBox", "Account created! Redirecting to login...", "success");
    setTimeout(() => (window.location.href = "login.html"), 1800);
  } catch (err) {
    showAlert("alertBox", err.message);
    btn.disabled = false; btn.textContent = "Create Account";
  }
}

// ── LOGIN ──
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Logging in...";

  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res  = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed.");
    localStorage.setItem("stomaq_token", data.token);
    localStorage.setItem("stomaq_name",  data.user.name);
    window.location.href = "../index.html";
  } catch (err) {
    showAlert("alertBox", err.message);
    btn.disabled = false; btn.textContent = "Login";
  }
}

// ── FORGOT PASSWORD ──
async function handleForgot(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Sending...";

  const email = document.getElementById("email").value.trim();

  try {
    const res  = await fetch(`${API}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed.");
    showAlert("alertBox", "✅ Reset link sent! Check your email.", "success");
  } catch (err) {
    showAlert("alertBox", err.message);
  }
  btn.disabled = false; btn.textContent = "Send Reset Link";
}

// ── GOOGLE LOGIN ──
function handleGoogleLogin() {
  window.location.href = `${API}/google`;
}
