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

  // Swipe/Drag Navigation
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let dragStartX = 0;

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentDrag = e.clientX - dragStartX;
  });

  carousel.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    touchEndX = e.clientX;
  });

  carousel.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
    }
  });

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
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let dragStartX = 0;

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
      goToSlide(currentSlide + 1)
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Mouse drag navigation
    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const currentDrag = e.clientX - dragStartX;
    });

    wrapper.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      touchEndX = e.clientX;
      handleSwipe();
    });

    wrapper.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
      }
    });

    // Touch navigation
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    });

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
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initCarousel();
  initDesignCarousels();
});
