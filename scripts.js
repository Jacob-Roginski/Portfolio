// Dark Mode Toggle - Common to all pages
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  const logoImages = document.querySelectorAll('.logo-image');
  const toggleIcon = document.querySelector('.toggle-icon-light');

  // Check for saved dark mode preference or default to light mode
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    htmlElement.classList.add('dark-mode');
    logoImages[0].classList.add('dark-hidden');
    logoImages[1].classList.remove('dark-hidden');
    if (toggleIcon) toggleIcon.src = 'asset/icons/dark_icon.png';
  } else {
    logoImages[0].classList.remove('dark-hidden');
    logoImages[1].classList.add('dark-hidden');
    if (toggleIcon) toggleIcon.src = 'asset/icons/light_icon.png';
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      htmlElement.classList.toggle('dark-mode');
      const isNowDark = htmlElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isNowDark);
      
      // Toggle logo visibility
      if (isNowDark) {
        logoImages[0].classList.add('dark-hidden');
        logoImages[1].classList.remove('dark-hidden');
        if (toggleIcon) toggleIcon.src = 'asset/icons/dark_icon.png';
      } else {
        logoImages[0].classList.remove('dark-hidden');
        logoImages[1].classList.add('dark-hidden');
        if (toggleIcon) toggleIcon.src = 'asset/icons/light_icon.png';
      }
    });
  }
}

// Carousel Navigation - For index.html
function initCarousel() {
  const slides = document.querySelectorAll('input[name="carousel"]');
  const carousel = document.querySelector('.carousel-wrapper');
  
  if (!carousel || slides.length === 0) return;
  
  let currentSlide = 0;
  let isTransitioning = false;

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].checked = true;
    
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Keyboard Navigation (Arrow Keys)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Touch/Swipe Navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next slide
        nextSlide();
      } else {
        // Swiped right - go to previous slide
        prevSlide();
      }
    }
  }

  // Click on control dots
  const controlDots = document.querySelectorAll('.control-dot');
  controlDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Click on carousel to navigate (left/right) - but not on links
  carousel.addEventListener('click', (e) => {
    // Don't navigate if clicking on a link
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      return;
    }
    
    const carouselRect = carousel.getBoundingClientRect();
    const clickX = e.clientX - carouselRect.left;
    const midpoint = carouselRect.width / 2;
    
    if (clickX < midpoint) {
      prevSlide();
    } else {
      nextSlide();
    }
  });
}

// Design Carousels - For waggoner.html and other project pages
function initDesignCarousels() {
  const carouselWrappers = document.querySelectorAll('.design-carousel-wrapper');
  
  if (carouselWrappers.length === 0) return;

  carouselWrappers.forEach((wrapper, carouselIndex) => {
    const slides = wrapper.querySelectorAll(`input[name="design-carousel-${carouselIndex + 1}"]`);
    const controlDots = wrapper.querySelectorAll('.design-control-dot');
    
    let currentSlide = 0;
    let isTransitioning = false;

    function goToSlide(index) {
      if (isTransitioning) return;
      isTransitioning = true;
      
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].checked = true;
      
      setTimeout(() => {
        isTransitioning = false;
      }, 600);
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Control dots
    controlDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Click on carousel to navigate (left/right)
    wrapper.addEventListener('click', (e) => {
      // Don't navigate if clicking on control dots
      if (e.target.classList.contains('design-control-dot')) {
        return;
      }
      
      const carouselRect = wrapper.getBoundingClientRect();
      const clickX = e.clientX - carouselRect.left;
      const midpoint = carouselRect.width / 2;
      
      if (clickX < midpoint) {
        prevSlide();
      } else {
        nextSlide();
      }
    });

    // Touch/Swipe Navigation for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance for a swipe
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - go to next slide
          nextSlide();
        } else {
          // Swiped right - go to previous slide
          prevSlide();
        }
      }
    }
  });
}

// Mobile Navigation - Close on outside click
function initMobileNav() {
  const hamburgerToggle = document.getElementById('hamburger-toggle');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  
  if (!hamburgerToggle || !hamburgerMenu) return;
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    // Check if menu is open and click is outside the hamburger menu
    if (hamburgerToggle.checked && !hamburgerMenu.contains(e.target)) {
      hamburgerToggle.checked = false;
    }
  });
}

// Back button navigation with scroll reset
function goBackWithScroll() {
  // Store a flag to scroll to top on the next page
  sessionStorage.setItem('scrollToTop', 'true');
  
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.history.back();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initCarousel();
  initDesignCarousels();
  initMobileNav();
  
  // Ensure page loads at top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Check if we should scroll to top (from back button)
  if (sessionStorage.getItem('scrollToTop') === 'true') {
    sessionStorage.removeItem('scrollToTop');
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, 0);
  }
});
