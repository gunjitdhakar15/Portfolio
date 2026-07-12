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
