// 1. Header Scroll Effect
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header.toggleAttribute("data-scrolled", window.scrollY > 16);
});

// 2. Smooth Scrolling for Navigation Anchors
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// 3. Theme Toggle Implementation (Light/Dark Mode)
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = themeToggle.querySelector(".theme-toggle-icon");
const themeToggleText = themeToggle.querySelector(".theme-toggle-text");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    themeToggleIcon.textContent = "☼";
    themeToggleText.textContent = "Light";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  } else {
    themeToggleIcon.textContent = "☾";
    themeToggleText.textContent = "Dark";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  }
}

// Initial Theme Setup
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// 4. Scroll Reveal Animations (Intersection Observer)
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target); // Keep it visible once revealed
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px", // Animates slightly before coming into view
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for browsers that don't support IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("revealed");
  });
}
