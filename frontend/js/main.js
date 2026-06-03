// ===========================
// STOMAQ AFFAIRS CLINIQ
// main.js — UI Utilities
// ===========================

// ── Scroll fade-in ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
  { threshold: 0.1 }
);
document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// ── Toast helper (used by menu.js too) ──
function showToast(msg) {
  const toast = document.getElementById("cartToast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

// ── Update nav based on login state ──
function updateNav() {
  const token = localStorage.getItem("stomaq_token");
  const name  = localStorage.getItem("stomaq_name");
  const authLinks = document.querySelectorAll(".nav-auth-btn");
  if (token && name) {
    authLinks.forEach(el => {
      if (el.classList.contains("signup")) {
        el.textContent = "Logout";
        el.href = "#";
        el.onclick = () => { localStorage.clear(); window.location.reload(); };
      } else {
        el.textContent = `Hi, ${name.split(" ")[0]}`;
        el.href = "#";
      }
    });
  }
}

updateNav();
