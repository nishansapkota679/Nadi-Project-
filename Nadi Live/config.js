// ===== NADI INVESTMENT — SUPABASE CONNECTION =====
// Paste your two details here ONCE. Every page (login, dashboard, admin, password) uses this file.
// Keep the quotes. Use the PUBLISHABLE key only — never the secret key.

const SUPABASE_URL = "https://ewwhiazafxbjhehbwgeo.supabase.co";        // e.g. "https://abcdxyz.supabase.co" (nothing after .co)
const SUPABASE_KEY = "sb_publishable_gdeKwTF_Po9TyZ63YI6IeQ_RjBZyR0W";    // e.g. "sb_publishable_xxxxxxxx"

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ----- Shared helpers used by the pages -----

// Nepali-style money: Rs 1,27,430
function rs(n) { return "Rs " + Math.round(Number(n)).toLocaleString("en-IN"); }

// Number with fixed decimals, Nepali grouping
function num(n, d) { return Number(n).toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }); }

// Dark / light button that remembers the choice (needs #page and #themeBtn on the page)
function setupTheme(onChange) {
  const page = document.getElementById("page");
  const btn = document.getElementById("themeBtn");
  function apply(mode) {
    page.classList.toggle("light", mode === "light");
    if (btn) btn.setAttribute("aria-label", mode === "light" ? "Switch to dark mode" : "Switch to light mode");
    if (onChange) onChange();
  }
  try { apply(localStorage.getItem("nadiTheme") || "dark"); } catch (e) { apply("dark"); }
  if (btn) btn.addEventListener("click", function () {
    const mode = page.classList.contains("light") ? "dark" : "light";
    apply(mode);
    try { localStorage.setItem("nadiTheme", mode); } catch (e) {}
  });
}
