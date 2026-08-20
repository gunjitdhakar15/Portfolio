// ==========================================================================
// THEME SWITCHER (LIGHT/DARK MODES PERSISTENCE)
// ==========================================================================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    if (themeIcon) themeIcon.textContent = "☼";
    if (themeText) themeText.textContent = "Light";
  } else {
    document.documentElement.classList.remove("dark");
    if (themeIcon) themeIcon.textContent = "☾";
    if (themeText) themeText.textContent = "Dark";
  }
  localStorage.setItem("theme", theme);
}

// Initial state checks
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDarkNow = document.documentElement.classList.contains("dark");
    applyTheme(isDarkNow ? "light" : "dark");
  });
}

// ==========================================================================
// SECTION TOGGLE BAR (Ankit-style view switching — each tab is its own page)
// ==========================================================================

const tabBar = document.getElementById("tab-bar");
const tabs = tabBar ? Array.from(tabBar.querySelectorAll(".tab-btn")) : [];
const viewSections = Array.from(document.querySelectorAll("main > section"));
const VALID_VIEWS = ["all", "internship", "projects", "notes", "skills", "education", "contact"];

function viewFromHash() {
  const h = (location.hash || "").replace(/^#/, "");
  return VALID_VIEWS.includes(h) ? h : "all";
}

function showView(view) {
  if (!VALID_VIEWS.includes(view)) view = "all";
  viewSections.forEach((sec) => {
    const match = view === "all" || sec.dataset.block === view;
    sec.classList.toggle("is-hidden", !match);
  });
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.filter === view));
}

if (tabBar) {
  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      const f = t.dataset.filter;
      if (f === "resume") {
        window.open(
          "https://drive.google.com/uc?export=download&id=1OkQU7xlfjL6ZPn1i3vh-hpN0p2DPPzmy",
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }
      if (f === "all") {
        if (location.hash) {
          history.pushState("", document.title, location.pathname + location.search);
        }
        showView("all");
      } else {
        location.hash = f; // hashchange handler drives the switch
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Keep the view in sync with the URL (back/forward, shared links, note jumps)
  window.addEventListener("hashchange", () => showView(viewFromHash()));

  // Logo returns to the overview ("All") page
  const logo = document.querySelector(".header-logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      if (location.hash) {
        history.pushState("", document.title, location.pathname + location.search);
      }
      showView("all");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  showView(viewFromHash());
}
