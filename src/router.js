import { renderPage } from "./views.js";

// Routes map
const routes = {
  "": "home",
  "#home": "home",
  "#about": "about",
  "#contact": "contact",
  "#services": "services",
  "#team": "team",
  "#gallery": "gallery",
  "#academy": "academy",
  "#course": "course-detail",
  "#admissions": "admissions"
};

// Determines which theme applies to each route
const routeThemes = {
  "home": "neutral", // Neutral split theme
  "about": "salon",   // Warm, soft styling
  "contact": "salon", // Warm, soft styling
  "services": "salon",
  "team": "salon",
  "gallery": "salon",
  "academy": "academy", // Deep slate charcoal dark theme
  "course-detail": "academy",
  "admissions": "academy"
};

/**
 * Navigates to a specific hash route programmatically.
 * @param {string} hash 
 */
export function navigateTo(hash) {
  window.location.hash = hash;
}

/**
 * Parses the current hash location and extracts route + query parameters.
 * E.g. "#course?id=course-cosmetology-diploma" -> { route: "#course", params: { id: "course-cosmetology-diploma" } }
 */
export function parseCurrentLocation() {
  const hash = window.location.hash || "";
  
  // Separate path from query string
  const questionMarkIdx = hash.indexOf("?");
  let path = hash;
  let params = {};

  if (questionMarkIdx !== -1) {
    path = hash.substring(0, questionMarkIdx);
    const queryString = hash.substring(questionMarkIdx + 1);
    
    // Parse key-value query parameters
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
  }

  return { path, params };
}

/**
 * Handles routing logic, updates DOM body class theme, scroll positioning, and triggers page view render.
 */
export function handleRouting() {
  const { path, params } = parseCurrentLocation();
  
  // Fallback to home if route not registered
  const routeKey = routes[path] ? path : "";
  const viewName = routes[routeKey] || "home";
  const theme = routeThemes[viewName] || "neutral";

  // Apply Theme Classes to Body
  const bodyEl = document.body;
  if (theme === "salon") {
    bodyEl.className = "theme-salon";
  } else if (theme === "academy") {
    bodyEl.className = "theme-academy";
  } else {
    bodyEl.className = ""; // Neutral (home split theme)
  }

  // Fade out current page container
  const appRoot = document.getElementById("app-root");
  if (appRoot) {
    appRoot.style.opacity = "0";
    appRoot.style.transform = "translateY(10px)";
    
    setTimeout(() => {
      // Render view content
      renderPage(viewName, params);
      
      // Update active state in Navigation links
      updateActiveNavLinks(path, params);

      // Scroll to top
      window.scrollTo(0, 0);

      // Fade in new view
      appRoot.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      appRoot.style.opacity = "1";
      appRoot.style.transform = "translateY(0)";
    }, 150);
  }
}

/**
 * Adds an 'active' style class to the corresponding navigation link.
 */
function updateActiveNavLinks(path, params) {
  // Clear previous active links
  document.querySelectorAll(".dropdown-item, .dropdown-trigger").forEach(link => {
    link.style.color = "";
    link.style.fontWeight = "";
  });

  // Highlight based on route path
  let activeSelector = `a[href="${path}"]`;
  if (path === "#course") {
    activeSelector = `a[href="#academy"]`; // Highlight parent dropdown
  }

  const activeLinks = document.querySelectorAll(activeSelector);
  activeLinks.forEach(link => {
    // If it's a dropdown item, let's also highlight the parent trigger
    const parentDropdown = link.closest(".nav-dropdown");
    if (parentDropdown) {
      const trigger = parentDropdown.querySelector(".dropdown-trigger");
      if (trigger) {
        trigger.style.color = "var(--current-primary)";
        trigger.style.fontWeight = "600";
      }
    }
    link.style.color = "var(--current-primary)";
  });
}

// Initialise Routing Listeners
export function initRouter() {
  window.addEventListener("hashchange", handleRouting);
  // Initial load
  handleRouting();
}
