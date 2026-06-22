import { salonServices, stylists, lookbookItems, academyCourses, academyFaqs } from "./data.js";

/**
 * Main rendering router endpoint. Mounts the compiled HTML template to the #app-root slot.
 * @param {string} viewName 
 * @param {object} params 
 */
export function renderPage(viewName, params) {
  const appRoot = document.getElementById("app-root");
  if (!appRoot) return;

  let htmlContent = "";

  switch (viewName) {
    case "home":
      htmlContent = compileHomeView();
      break;
    case "about":
      htmlContent = compileAboutView();
      break;
    case "contact":
      htmlContent = compileContactView();
      break;
    case "services":
      htmlContent = compileServicesView();
      break;
    case "team":
      htmlContent = compileTeamView();
      break;
    case "gallery":
      htmlContent = compileGalleryView();
      break;
    case "academy":
      htmlContent = compileAcademyView();
      break;
    case "course-detail":
      htmlContent = compileCourseDetailView(params.id);
      break;
    case "admissions":
      htmlContent = compileAdmissionsView();
      break;
    default:
      htmlContent = compileHomeView();
  }

  appRoot.innerHTML = htmlContent;

  // Bind page-specific post-rendering interactive behaviors
  setTimeout(() => {
    bindPageInteractivity(viewName, params);
  }, 50);
}

/* ==========================================================================
   VIEW 1: HOME PAGE (SPLIT HERO PATH DIRECTOR & BRAND PREVIEW)
   ========================================================================== */
function compileHomeView() {
  // Extract top 3 services
  const topServices = salonServices.flatMap(cat => cat.items).slice(0, 3);
  // Extract top 3 courses
  const topCourses = academyCourses.slice(0, 3);

  return `
    <!-- Split Hero Banner Section -->
    <section class="split-hero-container">
      <!-- Salon Left Half -->
      <div class="hero-side hero-salon-side">
        <div class="hero-content">
          <h4>Phoenix Salon</h4>
          <h1>Transform Your Look</h1>
          <p>Indulge in couture haircuts, signature balayage painting, and luxury bridal services by our master stylists.</p>
          <a href="#services" class="btn btn-salon">Explore Menu</a>
        </div>
      </div>
      <!-- Academy Right Half -->
      <div class="hero-side hero-academy-side">
        <div class="hero-content">
          <h4>Phoenix Academy</h4>
          <h1>Launch Your Career</h1>
          <p>Master the craft of beauty. Internationally accredited diplomas, hand-on training, and fast-track employment.</p>
          <a href="#academy" class="btn btn-academy">Explore Courses</a>
        </div>
      </div>
    </section>

    <!-- Brand Introduction -->
    <section class="section-padding container home-about-section">
      <div class="home-about-visual">
        <img src="/src/assets/about_facility.jpg" alt="Phoenix Facility Floor">
      </div>
      <div>
        <h4 style="text-transform: uppercase; font-family: var(--font-sans); letter-spacing: 0.1em; color: var(--salon-primary); margin-bottom: 0.8rem; font-weight: 600;">The Brand Foundation</h4>
        <h2 style="font-size: 2.8rem; margin-bottom: 1.5rem; font-family: var(--font-serif);">Where Luxury Salon Floor Meets Accredited Education</h2>
        <p style="font-size: 1.05rem; opacity: 0.8; margin-bottom: 1.5rem; line-height: 1.7;">
          Phoenix was born from a simple vision: beauty services should be personal, luxurious, and healthy, while the education to create those services must be rigorous, modern, and practical. Founded by celebrity stylist Elena Rostova, Phoenix serves as a high-end salon for discerning clients and a state-of-the-art academy for the next generation of cosmetologists.
        </p>
        <p style="font-size: 1.05rem; opacity: 0.8; margin-bottom: 2rem; line-height: 1.7;">
          Our students train on a live, high-traffic salon floor, working alongside master stylists to bridge the gap between classroom theory and elite salon service.
        </p>
        <a href="#about" class="btn btn-outline">Read Our Story</a>
      </div>
    </section>

    <!-- Highlights Reel Grid -->
    <section class="section-padding" style="background-color: var(--salon-muted);">
      <div class="container">
        <div class="text-center" style="max-width: 700px; margin: 0 auto 3rem;">
          <h2 style="font-size: 2.5rem; margin-bottom: 0.8rem;">Signature Offerings</h2>
          <p style="opacity: 0.8;">Explore our most popular salon treatments and advanced academy pathways.</p>
        </div>

        <div class="home-highlights-grid">
          <!-- Left Column: Salon Highlights -->
          <div>
            <h3 class="highlight-column-title">Client Favorites</h3>
            <div class="highlight-cards-list">
              ${topServices.map(srv => `
                <div class="highlight-item-card glass-panel" style="background: white; border-color: rgba(0,0,0,0.05);">
                  <div>
                    <div class="highlight-item-header">
                      <h3>${srv.name}</h3>
                      <span class="highlight-item-price">${srv.price}</span>
                    </div>
                    <p>${srv.description}</p>
                  </div>
                  <div class="highlight-item-footer">
                    <span class="highlight-item-duration"><i class="fa-regular fa-clock"></i> ${srv.duration}</span>
                    <button class="highlight-item-link btn-book-trigger-btn" style="background:none; border:none; cursor:pointer;" data-id="${srv.id}">Book Now <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Column: Academy Highlights -->
          <div>
            <h3 class="highlight-column-title" style="color: #0b0d10;">Featured Academics</h3>
            <div class="highlight-cards-list">
              ${topCourses.map(course => `
                <div class="highlight-item-card glass-panel" style="background: white; border-color: rgba(0,0,0,0.05);">
                  <div>
                    <div class="highlight-item-header">
                      <h3 style="font-family: var(--font-sans); font-weight: 600;">${course.title}</h3>
                      <span class="highlight-item-price" style="color: var(--academy-primary);">${course.tuition}</span>
                    </div>
                    <p>${course.shortDescription}</p>
                  </div>
                  <div class="highlight-item-footer">
                    <span class="highlight-item-duration"><i class="fa-solid fa-graduation-cap"></i> ${course.duration}</span>
                    <a href="#course?id=${course.id}" class="highlight-item-link" style="color: var(--academy-primary);">View Syllabus <i class="fa-solid fa-arrow-right"></i></a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulated Instagram Grid Section -->
    <section class="section-padding container">
      <div class="text-center" style="max-width: 600px; margin: 0 auto 3rem;">
        <h2 style="font-size: 2.5rem; margin-bottom: 0.8rem;">Follow Our Instagram</h2>
        <p style="opacity: 0.8;">Stay updated with daily salon transformations, student success stories, and beauty tips <a href="https://www.instagram.com/phoenix_womens_salon_atp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener" style="color: var(--salon-primary); font-weight: 500;">@phoenix_womens_salon_atp</a></p>
      </div>

      <div class="instagram-grid">
        <div class="instagram-post-card">
          <img src="/src/assets/lookbook_balayage_after.jpg" alt="Hair transformation">
          <div class="instagram-overlay">
            <i class="fa-brands fa-instagram"></i>
            <span>342 Likes</span>
          </div>
        </div>
        <div class="instagram-post-card">
          <img src="/src/assets/lookbook_bridal_after.jpg" alt="Bridal glam shot">
          <div class="instagram-overlay">
            <i class="fa-brands fa-instagram"></i>
            <span>412 Likes</span>
          </div>
        </div>
        <div class="instagram-post-card">
          <img src="/src/assets/hero_academy.jpg" alt="Students training">
          <div class="instagram-overlay">
            <i class="fa-brands fa-instagram"></i>
            <span>289 Likes</span>
          </div>
        </div>
        <div class="instagram-post-card">
          <img src="/src/assets/about_facility.jpg" alt="Salon styling floor">
          <div class="instagram-overlay">
            <i class="fa-brands fa-instagram"></i>
            <span>356 Likes</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   VIEW 2: ABOUT US (STORY, MISSION, FACILITY & CREDENTIALS)
   ========================================================================== */
function compileAboutView() {
  return `
    <section class="about-hero container">
      <h4 style="text-transform: uppercase; font-family: var(--font-sans); letter-spacing: 0.15em; color: var(--salon-primary); margin-bottom: 0.8rem; font-weight: 600;">Established 2018</h4>
      <h1>Empowering Beauty, Inspiring Careers</h1>
      <p>Phoenix combines an ultra-luxury client experience with state-of-the-art vocational training.</p>
    </section>

    <!-- Block 1: History -->
    <section class="section-padding container">
      <div class="about-grid-content">
        <div class="about-photo-wrapper">
          <img src="/src/assets/hero_salon.jpg" alt="Founder Elena Rostova">
        </div>
        <div class="about-text">
          <h2>The Journey of Phoenix</h2>
          <p>
            Phoenix was founded in 2018 by Elena Rostova, a world-renowned session stylist and educator. After working on high-fashion editorials in Milan and coaching salon owners globally, Elena noticed a recurring issue: many newly graduated beauty school students lacked the hands-on confidence, client communications, and modern styling techniques required in luxury salon environments.
          </p>
          <p>
            Her response was to launch Phoenix Salon & Training Academy, a hybrid workspace where high-end cosmetology education takes place directly next to, and integrated with, a premium, high-traffic commercial salon floor.
          </p>
        </div>
      </div>
    </section>

    <!-- Block 2: Accreditations / Awards -->
    <section class="section-padding" style="background-color: var(--salon-muted);">
      <div class="container">
        <div class="text-center" style="max-width: 700px; margin: 0 auto 3rem;">
          <h2 style="font-size: 2.5rem; margin-bottom: 0.8rem;">Industry Accreditations & Trust</h2>
          <p style="opacity: 0.8;">Our courses are internationally certified, assuring high quality teaching, licensing prep, and workplace readiness.</p>
        </div>

        <div class="awards-flex-container">
          <div class="award-seal-card">
            <div class="award-icon-frame">
              <i class="fa-solid fa-award"></i>
            </div>
            <h4>CIDESCO Accredited</h4>
            <p>Meeting the absolute gold standard in global aesthetic and beauty therapy education.</p>
          </div>

          <div class="award-seal-card">
            <div class="award-icon-frame">
              <i class="fa-solid fa-certificate"></i>
            </div>
            <h4>State Board Certified</h4>
            <p>Our curriculum is fully recognized by State Licensing Boards, preparing you for licensing exams.</p>
          </div>

          <div class="award-seal-card">
            <div class="award-icon-frame">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <h4>Salon of the Year</h4>
            <p>Voted 'Best Luxury Client Experience' by the Professional Beauty Association in 2024.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Block 3: Classrooms vs Salon floor -->
    <section class="section-padding container">
      <div class="about-grid-content reverse">
        <div class="about-text">
          <h2>Our World-Class Facilities</h2>
          <p>
            We believe that environment shapes education. That's why our custom-built facility in Anantapur features two dedicated wings:
          </p>
          <p>
            <strong>The Salon Wing:</strong> A sleek, modern commercial salon floor equipped with premium styling chairs, customized shadowless Ring Lighting, fully stocked organic color bars, and private esthetics rooms.
          </p>
          <p>
            <strong>The Academy Wing:</strong> A modern classroom wing equipped with smartboards, custom student workstation tables, mannequin rigging systems, and video capture setup for close-up styling demonstrations.
          </p>
        </div>
        <div class="about-photo-wrapper">
          <img src="/src/assets/about_facility.jpg" alt="Phoenix Academy Classrooms">
        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   VIEW 3: CONTACT & LOCATION (MAPS, TRANSPORT, CLIENT/STUDENT FORM)
   ========================================================================== */
function compileContactView() {
  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <div class="text-center" style="max-width: 600px; margin: 0 auto 3rem;">
        <h1 style="font-size: 3.5rem; margin-bottom: 0.8rem;">Connect With Us</h1>
        <p style="opacity: 0.8;">Book an appointment, enroll in an upcoming course, or schedule a tour of our facilities.</p>
      </div>

      <div class="contact-layout">
        <!-- Contact Form Card -->
        <div class="contact-card-form glass-panel" style="background: white; border-color: rgba(0,0,0,0.05);">
          <h2>Send a Message</h2>
          <form id="contact-inquiry-form">
            <div class="form-field">
              <label for="inquiry-type">Are you a Client or a Student?</label>
              <select id="inquiry-type" required>
                <option value="client">I am a Salon Client (Bookings / General Enquiry)</option>
                <option value="student">I am a Prospective Student (Admissions / Catalog)</option>
              </select>
            </div>

            <div class="form-group-grid">
              <div class="form-field-half">
                <label for="inquiry-name">Full Name</label>
                <input type="text" id="inquiry-name" required placeholder="Jane Doe">
              </div>
              <div class="form-field-half">
                <label for="inquiry-phone">Phone Number</label>
                <input type="tel" id="inquiry-phone" required placeholder="+91 95024-99079">
              </div>
            </div>

            <div class="form-field">
              <label for="inquiry-email">Email Address</label>
              <input type="email" id="inquiry-email" required placeholder="jane@example.com">
            </div>

            <div class="form-field">
              <label for="inquiry-message">How can we help you?</label>
              <textarea id="inquiry-message" rows="4" required placeholder="Describe your styling goals or educational interests..."></textarea>
            </div>

            <button type="submit" class="btn btn-salon" id="contact-submit-btn" style="width: 100%;">Send Message</button>
          </form>
        </div>

        <!-- Logistics Information -->
        <div class="contact-logistics-info">
          
          <!-- Directions and Transit -->
          <div class="logistics-card">
            <h3>Our Location</h3>
            <p><strong>Address:</strong> Phoenix womens salon and training center, Hfcigovyxig Oi Ucig, Anantapur, Andhra Pradesh 515004</p>
            <p style="margin-top: 1rem;"><strong>Parking:</strong> Parking facilities are available near the center. Street parking is also available nearby.</p>
            <p style="margin-top: 1rem;"><strong>Public Transit:</strong> The salon and training center is easily accessible via local auto-rickshaws and transit buses in Anantapur.</p>
          </div>

          <!-- Differing Hours Box -->
          <div class="logistics-card">
            <h3>Operating Hours</h3>
            <div class="logistics-hours-grid">
              <div class="logistics-hours-box">
                <h4>Salon Floor</h4>
                <p style="font-size: 0.9rem;">Monday - Saturday<br>9:00 AM - 7:00 PM</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Sunday<br>10:00 AM - 5:00 PM</p>
              </div>
              <div class="logistics-hours-box">
                <h4>Academy Desk</h4>
                <p style="font-size: 0.9rem;">Monday - Friday<br>8:00 AM - 4:00 PM</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Saturday - Sunday<br>Closed</p>
              </div>
            </div>
          </div>

          <!-- Styled Maps Widget -->
          <div class="map-wrapper-large">
            <iframe 
              src="https://maps.google.com/maps?q=Phoenix%20womens%20salon%20and%20training%20center,%20Anantapur,%20Andhra%20Pradesh&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   VIEW 4: SALON: SERVICE MENU & PRICING
   ========================================================================== */
function compileServicesView() {
  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <div class="salon-menu-header">
        <h1>Service Menu & Pricing</h1>
        <p>Explore our transparent, tiered pricing list. All chemical styling prices are baseline and include luxury blowout finish.</p>
      </div>

      <!-- Tabbed Menu Headers -->
      <div class="salon-tabs-bar">
        <button class="menu-tab-btn active" data-category="all">All Services</button>
        ${salonServices.map(cat => `
          <button class="menu-tab-btn" data-category="${cat.category}">${cat.category}</button>
        `).join('')}
      </div>

      <!-- Search Bar -->
      <div class="menu-search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="services-search-input" placeholder="Search hair styling, facials, coloring...">
      </div>

      <!-- Compiled Services List -->
      <div class="services-list-container" id="services-list-mount">
        <!-- JS inserts filtered cards here -->
        ${compileServicesSublist("all")}
      </div>
    </section>
  `;
}

/**
 * Compiles a specific category sublist for services.
 */
export function compileServicesSublist(categoryFilter, searchQuery = "") {
  let output = "";
  
  salonServices.forEach(categoryBlock => {
    // Check if category matches filter
    if (categoryFilter !== "all" && categoryBlock.category !== categoryFilter) return;

    // Filter items inside category
    const matchedItems = categoryBlock.items.filter(item => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    });

    if (matchedItems.length === 0) return;

    output += `
      <div class="services-category-block" data-category-name="${categoryBlock.category}">
        <h2 style="font-size: 1.8rem; border-bottom: 2px solid var(--salon-primary); padding-bottom: 0.5rem; margin-bottom: 1.5rem; color: var(--salon-text); font-family: var(--font-serif);">${categoryBlock.category}</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${matchedItems.map(item => `
            <div class="service-item-row glass-panel" style="background: white; border-color: rgba(0,0,0,0.04); border-radius: var(--border-radius-sm);">
              <div class="service-row-details">
                <div class="service-row-meta">
                  <span><i class="fa-regular fa-clock"></i> ${item.duration}</span>
                  <span><i class="fa-solid fa-scissors"></i> Master Level Available</span>
                </div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
              </div>
              <div class="service-row-cta">
                <span class="service-row-price">${item.price}</span>
                <button class="btn btn-salon btn-book-trigger-btn" data-id="${item.id}" data-name="${item.name}">Book This</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  if (!output) {
    return `
      <div class="text-center" style="padding: 4rem 0;">
        <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: #d1d1d1; margin-bottom: 1rem;"></i>
        <h3 style="font-family: var(--font-sans); font-weight: 500;">No services found matching "${searchQuery}"</h3>
      </div>
    `;
  }

  return output;
}

/* ==========================================================================
   VIEW 5: SALON: THE STYLISTS / TEAM
   ========================================================================== */
function compileTeamView() {
  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <div class="text-center" style="max-width: 700px; margin: 0 auto 4rem;">
        <h1 style="font-size: 3.5rem; margin-bottom: 1rem;">Meet Our Master Team</h1>
        <p style="opacity: 0.8;">Beauty is highly personal. Meet our hand-picked specialists, creative directors, and academy mentors who will bring your beauty goals to life.</p>
      </div>

      <div class="stylist-grid">
        ${stylists.map(stylist => `
          <div class="stylist-card glass-panel" style="background: white; border-color: rgba(0,0,0,0.04);">
            <div class="stylist-img-frame">
              <img src="${stylist.image}" alt="${stylist.name}">
            </div>
            <div class="stylist-info-box">
              <div>
                <h3>${stylist.name}</h3>
                <div class="stylist-tier">${stylist.tier}</div>
                <p>${stylist.bio}</p>
                <div class="stylist-specialty-tags">
                  ${stylist.specialties.map(spec => `<span class="specialty-tag">${spec}</span>`).join('')}
                </div>
              </div>
              <div>
                <a href="https://instagram.com" target="_blank" rel="noopener" class="stylist-social-link">
                  <i class="fa-brands fa-instagram"></i> ${stylist.instagram}
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/* ==========================================================================
   VIEW 6: SALON: THE LOOKBOOK / GALLERY (BEFORE-AFTER WIDGETS)
   ========================================================================== */
function compileGalleryView() {
  // Unique categories
  const categories = ["All", "Balayage", "Bridal Makeup", "Styling", "Skin Care", "Academy Work"];

  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <div class="text-center" style="max-width: 700px; margin: 0 auto 4rem;">
        <h1 style="font-size: 3.5rem; margin-bottom: 1rem;">Lookbook & Gallery</h1>
        <p style="opacity: 0.8;">Hover and slide your cursor left-to-right across the images below to reveal our authentic before-and-after transformations.</p>
      </div>

      <!-- Filter Buttons -->
      <div class="gallery-filters-bar">
        ${categories.map(cat => `
          <button class="gallery-filter-btn ${cat === "All" ? "active" : ""}" data-filter="${cat}">${cat}</button>
        `).join('')}
      </div>

      <!-- Filterable Masonry Grid -->
      <div class="gallery-masonry-grid" id="gallery-masonry-mount">
        ${compileGalleryGrid("All")}
      </div>
    </section>
  `;
}

/**
 * Compiles gallery cards filtered by category.
 */
export function compileGalleryGrid(activeFilter) {
  const filtered = lookbookItems.filter(item => {
    if (activeFilter === "All") return true;
    return item.category === activeFilter;
  });

  return filtered.map(item => `
    <div class="lookbook-card glass-panel" style="background: white; border-color: rgba(0,0,0,0.04);" data-category="${item.category}">
      
      <!-- Interactive Before/After Reveal Slider -->
      <div class="slider-reveal-box" data-slider-id="${item.id}">
        <!-- Before image (default base) -->
        <div class="slider-img slider-img-before">
          <img src="${item.beforeImage}" alt="Before styling" style="filter: grayscale(60%) brightness(85%);">
        </div>
        <!-- After image (clipped reveal overlay) -->
        <div class="slider-img slider-img-after">
          <img src="${item.afterImage}" alt="After styling">
        </div>
        
        <!-- Separator Handle line -->
        <div class="slider-handle-bar">
          <div class="slider-handle-circle">
            <i class="fa-solid fa-arrows-left-right"></i>
          </div>
        </div>

        <!-- Indicator Badges -->
        <span class="slider-badge slider-badge-before">Before</span>
        <span class="slider-badge slider-badge-after">After</span>
      </div>

      <div class="lookbook-meta-box">
        <div class="lookbook-category">${item.category}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   VIEW 7: ACADEMY: COURSE CATALOG
   ========================================================================== */
function compileAcademyView() {
  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <div class="text-center" style="max-width: 750px; margin: 0 auto 4rem;">
        <h4 style="text-transform: uppercase; font-family: var(--font-sans); letter-spacing: 0.15em; color: var(--academy-primary); margin-bottom: 0.8rem; font-weight: 600;">Phoenix Training Academy</h4>
        <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-family: var(--font-sans); font-weight: 700;">Our Educational Programs</h1>
        <p style="opacity: 0.85;">Invest in your future. From 2-day hands-on intensive workshops to fully comprehensive 6-month cosmetology diplomas, we have a learning pathway matching your goals.</p>
      </div>

      <!-- Filter Tabs -->
      <div class="courses-filter-bar">
        <button class="menu-tab-btn active" style="background-color: var(--academy-primary); color: black;" id="course-filter-all">All Programs</button>
      </div>

      <!-- Courses Grid -->
      <div class="courses-grid">
        ${academyCourses.map(course => `
          <div class="course-card glass-panel">
            <div>
              <div class="course-badge-row">
                <span class="course-badge badge-level">${course.level} Level</span>
                <span class="course-badge badge-duration">${course.duration}</span>
              </div>
              <h3>${course.title}</h3>
              <p>${course.shortDescription}</p>
            </div>
            
            <div class="course-card-footer">
              <div>
                <span class="sidebar-meta-label" style="display:block; font-size: 0.75rem; opacity: 0.6;">Tuition Cost</span>
                <span class="course-card-price">${course.tuition}</span>
              </div>
              <a href="#course?id=${course.id}" class="btn btn-academy" style="padding: 0.6rem 1.4rem; font-size: 0.85rem;">Learn More</a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/* ==========================================================================
   VIEW 8: ACADEMY: DYNAMIC COURSE DETAIL PAGE
   ========================================================================== */
function compileCourseDetailView(courseId) {
  // Find selected course
  const course = academyCourses.find(c => c.id === courseId) || academyCourses[0];

  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <a href="#academy" style="color: var(--academy-primary); display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; font-weight: 500;">
        <i class="fa-solid fa-arrow-left"></i> Back to Course Catalog
      </a>

      <div class="course-detail-layout">
        <!-- Main Curriculum / Details -->
        <div class="course-detail-main">
          <div class="course-detail-badges">
            <span class="course-badge badge-level" style="background-color: var(--academy-muted); color: var(--academy-accent);">${course.level} Level</span>
            <span class="course-badge badge-duration" style="background-color: rgba(229, 144, 93, 0.15); color: var(--academy-primary);">${course.duration}</span>
          </div>
          <h1>${course.title}</h1>
          <p class="course-detail-summary">${course.shortDescription} Through structured theoretical assignments and immersive live-client application training, students gain real proficiency to clear state certifications and join leading boutique salons.</p>

          <h3 class="course-detail-section-title">What You Will Learn (Curriculum)</h3>
          <!-- Accordion Module List -->
          <div class="curriculum-accordion-list">
            ${course.curriculum.map((mod, index) => `
              <div class="accordion-item" data-index="${index}">
                <div class="accordion-header">
                  <h4>${mod.module}</h4>
                  <i class="fa-solid fa-chevron-down accordion-icon"></i>
                </div>
                <div class="accordion-content">
                  <p>${mod.details}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Academy Instructor Info -->
          <h3 class="course-detail-section-title">Program Instructors</h3>
          <div style="display:flex; gap: 2rem; align-items:center; background-color: var(--academy-muted); padding: 2rem; border-radius: var(--border-radius-sm); border: 1px solid rgba(255,255,255,0.05);">
            <div style="width: 80px; height: 80px; border-radius: 50%; overflow:hidden; border: 2px solid var(--academy-primary);">
              <img src="/src/assets/stylist_elena.jpg" alt="Instructor" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div>
              <h4 style="font-family: var(--font-sans); font-size: 1.25rem; font-weight: 600; color: white;">Lead Mentor: ${course.instructor}</h4>
              <p style="font-size:0.95rem; opacity: 0.8; margin-top: 0.3rem;">Dedicated beauty educators with decades of active commercial experience guiding you step-by-step from foundational physics to licensing preparation.</p>
            </div>
          </div>
        </div>

        <!-- Sidebar Admissions Box & Syllabus Form -->
        <div>
          <div class="course-sidebar-card glass-panel" style="background-color: var(--academy-muted); border-color: rgba(255,255,255,0.05);">
            <h3 style="font-size: 1.5rem; margin-bottom: 1.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.8rem; font-family: var(--font-sans); font-weight: 600;">Program Highlights</h3>
            
            <div class="sidebar-meta-list">
              <div class="sidebar-meta-item">
                <i class="fa-solid fa-wallet"></i>
                <div>
                  <div class="sidebar-meta-label">Tuition Fee</div>
                  <div class="sidebar-meta-val">${course.tuition}</div>
                </div>
              </div>
              <div class="sidebar-meta-item">
                <i class="fa-solid fa-credit-card"></i>
                <div>
                  <div class="sidebar-meta-label">Financing Options</div>
                  <div class="sidebar-meta-val">${course.financing}</div>
                </div>
              </div>
              <div class="sidebar-meta-item">
                <i class="fa-solid fa-user-shield"></i>
                <div>
                  <div class="sidebar-meta-label">Prerequisites</div>
                  <div class="sidebar-meta-val">${course.prerequisites}</div>
                </div>
              </div>
            </div>

            <!-- Syllabus Download Form -->
            <div class="syllabus-download-form">
              <h4>Request Program Syllabus</h4>
              <form id="syllabus-request-form" data-course-title="${course.title}" data-syllabus-file="${course.syllabusPdf}">
                <div class="form-field">
                  <label for="syllabus-email">Email Address</label>
                  <input type="email" id="syllabus-email" required placeholder="name@example.com" style="background-color: #0b0d10; border-color: rgba(255,255,255,0.1);">
                </div>
                <button type="submit" class="btn btn-academy" style="width: 100%;">Download Syllabus PDF</button>
              </form>
            </div>
            
            <button class="btn btn-outline" id="sidebar-apply-btn" style="width:100%; margin-top: 1.5rem; border-color: var(--academy-primary); color: white;">Apply For Enrollment</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   VIEW 9: ACADEMY: ADMISSIONS & FAQS
   ========================================================================== */
function compileAdmissionsView() {
  return `
    <section class="section-padding container" style="padding-top: 5rem;">
      <div class="text-center" style="max-width: 700px; margin: 0 auto 3rem;">
        <h4 style="text-transform: uppercase; font-family: var(--font-sans); letter-spacing: 0.15em; color: var(--academy-primary); margin-bottom: 0.8rem; font-weight: 600;">Admissions</h4>
        <h1 style="font-size: 3.5rem; margin-bottom: 1rem; font-family: var(--font-sans); font-weight: 700;">Enrollment Roadmap</h1>
        <p style="opacity: 0.85;">Entering our academy is straightforward. Follow our structured roadmap to register, secure financing, and launch your cosmetology future.</p>
      </div>

      <!-- Visual Admissions Roadmap Cards -->
      <div class="admissions-roadmap-container">
        
        <div class="roadmap-card glass-panel" style="background-color: var(--academy-muted); border-color: rgba(255,255,255,0.05);">
          <div class="roadmap-step-badge">1</div>
          <h3>Submit Application</h3>
          <p>Fill out our simple digital admissions application form detailing your background and career goals.</p>
        </div>

        <div class="roadmap-card glass-panel" style="background-color: var(--academy-muted); border-color: rgba(255,255,255,0.05);">
          <div class="roadmap-step-badge">2</div>
          <h3>Advisor Consultation</h3>
          <p>Schedule a 20-minute phone interview with our academic advisor to align on course selection and career goals.</p>
        </div>

        <div class="roadmap-card glass-panel" style="background-color: var(--academy-muted); border-color: rgba(255,255,255,0.05);">
          <div class="roadmap-step-badge">3</div>
          <h3>Choose Financing</h3>
          <p>Finalize tuition structures using our interest-free installment plans or educational loan partnerships.</p>
        </div>

        <div class="roadmap-card glass-panel" style="background-color: var(--academy-muted); border-color: rgba(255,255,255,0.05);">
          <div class="roadmap-step-badge">4</div>
          <h3>Secure Seat & Kit</h3>
          <p>Pay your seat registration deposit and receive your curriculum calendar and Phoenix Professional styling kit.</p>
        </div>

      </div>

      <div class="text-center" style="margin-bottom: 8rem;">
        <button class="btn btn-academy" id="admissions-bottom-apply-btn" style="padding: 1rem 3rem;">Start Admissions Form Now</button>
      </div>

      <!-- Collapsible FAQ Accordion Section -->
      <div style="max-width: 850px; margin: 0 auto;">
        <div class="text-center" style="margin-bottom: 3.5rem;">
          <h2 style="font-size: 2.8rem; font-family: var(--font-sans); font-weight: 700;">Academy FAQs</h2>
          <p style="opacity: 0.8; margin-top: 0.5rem;">Common questions about kits, licenses, job opportunities, and financing.</p>
        </div>

        <div class="curriculum-accordion-list">
          ${academyFaqs.map((faq, index) => `
            <div class="accordion-item" data-faq-index="${index}">
              <div class="accordion-header">
                <h4 style="font-family: var(--font-sans); font-weight: 600; color: white;">${faq.question}</h4>
                <i class="fa-solid fa-chevron-down accordion-icon" style="color: var(--academy-primary);"></i>
              </div>
              <div class="accordion-content">
                <p style="color: #cbd5e1; font-weight: 300;">${faq.answer}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   10. INTERACTIVE POST-RENDERING BINDER (ACCORDIONS, TAB FILTERS, BEFORE-AFTER SLIDERS)
   ========================================================================== */
function bindPageInteractivity(viewName, params) {
  // Global book triggers within dynamic pages
  document.querySelectorAll(".btn-book-trigger-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const serviceId = btn.getAttribute("data-id");
      openBookingModal(serviceId);
    });
  });

  // Page Specific Binds
  if (viewName === "services") {
    // 1. Tab buttons color filtering
    const tabs = document.querySelectorAll(".menu-tab-btn");
    const mount = document.getElementById("services-list-mount");
    const searchInput = document.getElementById("services-search-input");

    if (tabs && mount) {
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          tabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          
          const cat = tab.getAttribute("data-category");
          const query = searchInput ? searchInput.value : "";
          mount.innerHTML = compileServicesSublist(cat, query);
          
          // Re-bind modal buttons in newly rendered list
          bindPageInteractivity("services-sublist");
        });
      });
    }

    // 2. Fuzzy Live Search bar filtering
    if (searchInput && mount) {
      searchInput.addEventListener("input", () => {
        const activeTab = document.querySelector(".menu-tab-btn.active");
        const cat = activeTab ? activeTab.getAttribute("data-category") : "all";
        mount.innerHTML = compileServicesSublist(cat, searchInput.value);
        
        // Re-bind modal buttons in newly rendered list
        bindPageInteractivity("services-sublist");
      });
    }
  }

  if (viewName === "gallery") {
    // 1. Category filter buttons
    const filters = document.querySelectorAll(".gallery-filter-btn");
    const mount = document.getElementById("gallery-masonry-mount");
    if (filters && mount) {
      filters.forEach(btn => {
        btn.addEventListener("click", () => {
          filters.forEach(f => f.classList.remove("active"));
          btn.classList.add("active");
          const val = btn.getAttribute("data-filter");
          mount.innerHTML = compileGalleryGrid(val);
          // Re-initialize sliders on new images
          initLookbookSliders();
        });
      });
    }
    // Initial slider activation
    initLookbookSliders();
  }

  if (viewName === "course-detail") {
    // Curriculum Accordions
    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach(item => {
      const header = item.querySelector(".accordion-header");
      if (header) {
        header.addEventListener("click", () => {
          const isActive = item.classList.contains("active");
          accordionItems.forEach(i => i.classList.remove("active"));
          if (!isActive) {
            item.classList.add("active");
          }
        });
      }
    });

    // Syllabus download form submit handler
    const syllabusForm = document.getElementById("syllabus-request-form");
    if (syllabusForm) {
      syllabusForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("syllabus-email").value;
        const file = syllabusForm.getAttribute("data-syllabus-file");
        const title = syllabusForm.getAttribute("data-course-title");
        
        showSuccessNotification(`Syllabus for ${title} sent successfully to ${email}!`);
        syllabusForm.reset();
      });
    }

    // Sidebar Admissions Apply trigger
    const sidebarApply = document.getElementById("sidebar-apply-btn");
    if (sidebarApply) {
      sidebarApply.addEventListener("click", () => {
        openApplicationModal(courseId);
      });
    }
  }

  if (viewName === "admissions") {
    // FAQ Accordions
    const faqItems = document.querySelectorAll(".accordion-item");
    faqItems.forEach(item => {
      const header = item.querySelector(".accordion-header");
      if (header) {
        header.addEventListener("click", () => {
          const isActive = item.classList.contains("active");
          faqItems.forEach(i => i.classList.remove("active"));
          if (!isActive) {
            item.classList.add("active");
          }
        });
      }
    });

    // Bottom apply trigger button
    const admissionsApply = document.getElementById("admissions-bottom-apply-btn");
    if (admissionsApply) {
      admissionsApply.addEventListener("click", () => {
        openApplicationModal("");
      });
    }
  }

  if (viewName === "contact") {
    // Contact Form submit
    const contactForm = document.getElementById("contact-inquiry-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const type = document.getElementById("inquiry-type").value;
        const name = document.getElementById("inquiry-name").value;
        const target = type === "student" ? "Admissions Officer" : "Salon Receptionist";

        showSuccessNotification(`Thank you, ${name}! Your inquiry has been forwarded to our ${target}. We will email you shortly.`);
        contactForm.reset();
      });
    }
  }

  if (viewName === "services-sublist") {
    // Quick helper for tab updates
    document.querySelectorAll(".btn-book-trigger-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const serviceId = btn.getAttribute("data-id");
        openBookingModal(serviceId);
      });
    });
  }
}

/**
 * Custom logic to enable interactive mouse and touch sliding on Lookbook Before-After photos.
 */
function initLookbookSliders() {
  const sliders = document.querySelectorAll(".slider-reveal-box");
  
  sliders.forEach(slider => {
    const afterImg = slider.querySelector(".slider-img-after");
    const handleBar = slider.querySelector(".slider-handle-bar");
    
    if (!afterImg || !handleBar) return;

    // Set slider position function
    const setSliderPosition = (xPos) => {
      const rect = slider.getBoundingClientRect();
      let x = xPos - rect.left;
      
      // Constraint checks
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      
      const percentage = (x / rect.width) * 100;
      
      // Update clip path polygon and handle coordinate
      afterImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
      handleBar.style.left = `${percentage}%`;
    };

    // Event listeners for Mouse
    const onMouseMove = (e) => {
      setSliderPosition(e.clientX);
    };

    slider.addEventListener("mousemove", onMouseMove);

    // Event listeners for Touch screens
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setSliderPosition(e.touches[0].clientX);
      }
    };

    slider.addEventListener("touchmove", onTouchMove, { passive: true });
  });
}

/* ==========================================================================
   GLOBAL UTILITIES FOR POPUPS (LINKED TO SHELL MODALS)
   ========================================================================== */
function openBookingModal(serviceId) {
  const modal = document.getElementById("booking-modal-overlay");
  const select = document.getElementById("booking-service");
  if (modal) {
    if (select && serviceId) {
      select.value = serviceId;
    }
    modal.classList.add("active");
  }
}

function openApplicationModal(courseId) {
  const modal = document.getElementById("application-modal-overlay");
  const select = document.getElementById("app-course");
  if (modal) {
    if (select && courseId) {
      select.value = courseId;
    }
    modal.classList.add("active");
  }
}

function showSuccessNotification(message) {
  const bubble = document.getElementById("success-notification-bubble");
  const text = document.getElementById("success-notification-text");
  
  if (bubble && text) {
    text.textContent = message;
    bubble.classList.add("active");
    
    setTimeout(() => {
      bubble.classList.remove("active");
    }, 4500);
  }
}
