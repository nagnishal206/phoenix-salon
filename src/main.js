import { initRouter } from "./router.js";
import "./style.css"; // Ensures stylesheet is loaded by Vite bundler

document.addEventListener("DOMContentLoaded", () => {
  // Initialize SPA Hash Router
  initRouter();

  // Wires Global Shell Interactivity
  initGlobalShell();
});

function initGlobalShell() {
  /* ==========================================================================
     1. MODALS TOGGLE LISTENERS
     ========================================================================== */
  const bookingModal = document.getElementById("booking-modal-overlay");
  const applicationModal = document.getElementById("application-modal-overlay");

  // Book Salon Button (Header + FAB)
  const bookSalonBtn = document.getElementById("cta-book-salon");
  const fabBookingBtn = document.getElementById("fab-booking-btn");
  const bookingClose = document.getElementById("booking-modal-close");

  const openBooking = () => {
    if (bookingModal) {
      document.getElementById("booking-service").value = ""; // Clear selection
      bookingModal.classList.add("active");
    }
  };

  const closeBooking = () => {
    if (bookingModal) bookingModal.classList.remove("active");
  };

  if (bookSalonBtn) bookSalonBtn.addEventListener("click", openBooking);
  if (fabBookingBtn) fabBookingBtn.addEventListener("click", openBooking);
  if (bookingClose) bookingClose.addEventListener("click", closeBooking);

  // Apply Academy Button (Header)
  const applyAcademyBtn = document.getElementById("cta-apply-academy");
  const applicationClose = document.getElementById("application-modal-close");

  const openApplication = () => {
    if (applicationModal) {
      document.getElementById("app-course").value = ""; // Clear selection
      applicationModal.classList.add("active");
    }
  };

  const closeApplication = () => {
    if (applicationModal) applicationModal.classList.remove("active");
  };

  if (applyAcademyBtn) applyAcademyBtn.addEventListener("click", openApplication);
  if (applicationClose) applicationClose.addEventListener("click", closeApplication);

  // Close modals when clicking outside window frame
  window.addEventListener("click", (e) => {
    if (e.target === bookingModal) closeBooking();
    if (e.target === applicationModal) closeApplication();
  });

  /* ==========================================================================
     2. FORM SUBMISSIONS & NOTIFICATIONS
     ========================================================================== */
  const bookingForm = document.getElementById("salon-booking-form");
  const applicationForm = document.getElementById("academy-application-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("booking-name").value;
      const serviceSelect = document.getElementById("booking-service");
      const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
      const date = document.getElementById("booking-date").value;
      const time = document.getElementById("booking-time").value;

      closeBooking();
      showNotification(`Reservation Confirmed! Thank you, ${name}. We look forward to seeing you for your ${serviceName} on ${date} at ${time}.`);
      bookingForm.reset();
    });
  }

  if (applicationForm) {
    applicationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("app-name").value;
      const courseSelect = document.getElementById("app-course");
      const courseName = courseSelect.options[courseSelect.selectedIndex].text;

      closeApplication();
      showNotification(`Application Submitted! Thank you, ${name}. An academic advisor will contact you to review your ${courseName} application.`);
      applicationForm.reset();
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION HAMBURGER TOGGLE
     ========================================================================== */
  const menuToggle = document.getElementById("menu-toggle-btn");
  const navMenus = document.getElementById("nav-menus-menu");

  if (menuToggle && navMenus) {
    menuToggle.addEventListener("click", () => {
      const isMobileOpen = navMenus.style.display === "flex";
      
      if (isMobileOpen) {
        navMenus.style.display = "";
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      } else {
        // Toggle mobile styling dynamically
        navMenus.style.display = "flex";
        navMenus.style.flexDirection = "column";
        navMenus.style.position = "absolute";
        navMenus.style.top = "90px";
        navMenus.style.left = "0";
        navMenus.style.right = "0";
        navMenus.style.background = "var(--current-bg)";
        navMenus.style.padding = "2rem";
        navMenus.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
        navMenus.style.boxShadow = "var(--shadow-lg)";
        navMenus.style.zIndex = "99";
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
    });

    // Mobile dropdown toggle logic
    const dropdowns = document.querySelectorAll(".nav-dropdown");
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector(".dropdown-trigger");
      if (trigger) {
        trigger.addEventListener("click", (e) => {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            e.stopPropagation();
            const isActive = dropdown.classList.contains("mobile-active");
            // Collapse other dropdowns
            dropdowns.forEach(d => d.classList.remove("mobile-active"));
            if (!isActive) {
              dropdown.classList.add("mobile-active");
            }
          }
        });
      }
    });

    // Close menu when clicking final destination links
    document.querySelectorAll(".dropdown-item, .dropdown-trigger").forEach(link => {
      link.addEventListener("click", (e) => {
        // If it's a sub-menu trigger, don't close the menu itself
        if (link.classList.contains("dropdown-trigger") && link.closest(".nav-dropdown")) {
          return;
        }
        
        if (window.innerWidth <= 992) {
          navMenus.style.display = "";
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
          dropdowns.forEach(d => d.classList.remove("mobile-active"));
        }
      });
    });
  }
}

/**
 * Helper to display Toast messages at the bottom left.
 * @param {string} msg 
 */
function showNotification(msg) {
  const bubble = document.getElementById("success-notification-bubble");
  const text = document.getElementById("success-notification-text");

  if (bubble && text) {
    text.textContent = msg;
    bubble.classList.add("active");

    setTimeout(() => {
      bubble.classList.remove("active");
    }, 5000);
  }
}
