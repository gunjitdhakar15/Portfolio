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
// SECTION TOGGLE BAR (smooth-scroll to a section, like a table of contents)
// ==========================================================================

const tabBar = document.getElementById("tab-bar");
const tabs = tabBar ? Array.from(tabBar.querySelectorAll(".tab-btn")) : [];
const sectionIds = ["internship", "projects", "notes", "skills", "education", "contact"];

function scrollToSection(id) {
  const el = id === "all" ? document.getElementById("top") : document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setActiveTab(id) {
  tabs.forEach((t) =>
    t.classList.toggle("active", t.getAttribute("data-filter") === id)
  );
}

if (tabBar) {
  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      const f = t.getAttribute("data-filter");
      scrollToSection(f);
      setActiveTab(f === "all" ? "all" : f);
    });
  });

  // Scroll-spy: keep the active tab in sync with what's on screen
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id !== "top") {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  setActiveTab("all");
}
