// Header include
function updateActiveHashLink(clickedLink) {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    if (link === clickedLink) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function addSmoothScrollListeners() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.length > 1) {
      link.addEventListener("click", function (event) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          updateActiveHashLink(link);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });
}

function observeMobileSectionScroll() {
  const menuLinks = document.querySelectorAll(
    '.mobile-menu .menu-list a[href^="#"]',
  );
  if (!menuLinks.length) return;

  const sections = Array.from(menuLinks)
    .map((link) => {
      const href = link.getAttribute("href");
      const id = href && href.startsWith("#") ? href.slice(1) : null;
      return {
        link,
        section: id ? document.getElementById(id) : null,
      };
    })
    .filter((item) => item.section);

  const contactSection = document.getElementById("contact");

  function updateActiveLinkForScroll() {
    if (contactSection) {
      const contactRect = contactSection.getBoundingClientRect();
      if (contactRect.top < window.innerHeight && contactRect.bottom > 0) {
        menuLinks.forEach((link) => link.classList.remove("active"));
        return;
      }
    }

    const scrollPosition = window.scrollY + 120;
    let found = false;

    for (let i = sections.length - 1; i >= 0; i--) {
      const item = sections[i];
      const top = item.section.offsetTop;
      if (scrollPosition >= top) {
        menuLinks.forEach((link) =>
          link.classList.toggle("active", link === item.link),
        );
        found = true;
        break;
      }
    }

    if (!found) {
      menuLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  window.addEventListener("scroll", updateActiveLinkForScroll, {
    passive: true,
  });
  updateActiveLinkForScroll();
}

$(function () {
  $("#header").load("header.html", function (response, status) {
    if (status === "error") {
      console.error("Header could not be loaded.");
    }

    const currentPath = window.location.pathname;
    const links = document.querySelectorAll(".main-menu a[href]");

    links.forEach(function (link) {
      const href = link.getAttribute("href");

      if (
        currentPath.endsWith(href) ||
        ((href === "index.html" || href === "./") &&
          (currentPath.endsWith("/") ||
            currentPath.endsWith("/longreach") ||
            currentPath.endsWith("index.html")))
      ) {
        link.classList.add("active");
      }
    });

    addSmoothScrollListeners();
    observeMobileSectionScroll();

    // Show header and page content together
    document.body.classList.add("page-ready");
  });
});

// Splash Screen Logic
document.addEventListener("DOMContentLoaded", function () {
  addSmoothScrollListeners();

  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    splashScreen.addEventListener("click", function () {
      splashScreen.classList.add("fade-out");
      document.body.classList.remove("overflow-hidden");

      // Optionally remove element from DOM after transition
      setTimeout(() => {
        splashScreen.style.display = "none";
      }, 500); // matches transition time in CSS
    });
  }

  // Victoria Point Splash Sequence
  const vpSplash1 = document.getElementById("vp-splash-1");
  const vpSplash2 = document.getElementById("vp-splash-2");
  
  if (vpSplash1 && vpSplash2) {
    // Click on Splash 1 -> go to Splash 2
    vpSplash1.addEventListener("click", function () {
      vpSplash1.classList.add("fade-out");
      vpSplash2.classList.remove("fade-out"); // ensure it's visible
    });

    // Click on Splash 2 -> enter the page
    vpSplash2.addEventListener("click", function () {
      vpSplash1.classList.add("fade-out");
      vpSplash2.classList.add("fade-out");
      document.body.classList.remove("no-scroll");
      
      setTimeout(() => {
        vpSplash1.style.display = 'none';
        vpSplash2.style.display = 'none';
      }, 500);
    });
  }

  // Menzies Malvern Splash Screen
  const mmSplashScreen = document.querySelector(".stage");
  if (mmSplashScreen) {
    mmSplashScreen.addEventListener("click", function () {
      mmSplashScreen.classList.add("fade-out");
      document.body.classList.remove("no-scroll");
      setTimeout(() => {
        mmSplashScreen.style.display = "none";
      }, 500);
    });
  }
});

// Loader (fallback for pages without dynamic header)
window.addEventListener("load", function () {
  const loader = document.querySelector(".page-loader");

  if (loader) {
    loader.classList.add("loader-hide");
  }
});

// Slider
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".property-slider");
  sliders.forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1500,
      loop: true,
      effect: "fade",

      fadeEffect: {
        crossFade: true,
      },

      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },

      navigation: {
        nextEl: slider.querySelector(".property-slider-next"),
        prevEl: slider.querySelector(".property-slider-prev"),
      },
    });
  });
});

// Mobile Redirect Logic
function checkMobileRedirect() {
  if (window.innerWidth <= 767) {
    const path = window.location.pathname;
    const isHome =
      path.endsWith("index.html") ||
      path.endsWith("/") ||
      path.endsWith("/longreach");
    if (!isHome) {
      window.location.href = "index.html";
    }
  }
}

window.addEventListener("resize", checkMobileRedirect);
checkMobileRedirect();
