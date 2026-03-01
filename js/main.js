/* ══════════════════════════════════════════
   METTLE - Main JavaScript
   ══════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Language ──
  const savedLang = localStorage.getItem("mettle-lang") || "ar";
  setLanguage(savedLang);

  // ── Navbar Scroll ──
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ── Hamburger Menu ──
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // ── Language Dropdown ──
  const langBtn = document.querySelector(".lang-btn");
  const langDropdown = document.querySelector(".lang-dropdown");

  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      langDropdown.classList.remove("active");
    });

    langDropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = e.target.dataset.lang;
        setLanguage(lang);
        localStorage.setItem("mettle-lang", lang);
        langDropdown.classList.remove("active");
      });
    });
  }

  // ── Active Nav Link ──
  setActiveNavLink();

  // ── Contact Form ──
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log("Form submitted:", data);
      // Show a simple confirmation
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "✓";
      btn.style.background = "#315931";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        contactForm.reset();
      }, 2000);
    });
  }
});

// ── Set Language ──
function setLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  // Direction & class
  document.body.setAttribute("dir", t.dir);
  document.documentElement.setAttribute("lang", t.lang);

  // Font class
  document.body.classList.remove("lang-ar", "lang-en", "lang-ur", "lang-id", "lang-tr");
  document.body.classList.add(t.fontClass);

  // Update lang button text
  const langBtn = document.querySelector(".lang-btn-text");
  if (langBtn) langBtn.textContent = t.langName;

  // Mark active language in dropdown
  document.querySelectorAll(".lang-dropdown a").forEach((a) => {
    a.classList.toggle("active", a.dataset.lang === lang);
  });

  // Translate all [data-i18n] elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Translate placeholders [data-i18n-placeholder]
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) {
      el.setAttribute("placeholder", t[key]);
    }
  });
}

// ── Set Active Nav Link ──
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
    const page = link.getAttribute("data-page");
    if (currentPage === page || (currentPage === "" && page === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
