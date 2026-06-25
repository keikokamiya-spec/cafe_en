document.addEventListener('DOMContentLoaded', function () {
  // Slideshow
  var photos = document.querySelectorAll('.store-photo');
  var current = 0;
  if (photos.length > 1) {
    setInterval(function () {
      photos[current].classList.remove('active');
      current = (current + 1) % photos.length;
      photos[current].classList.add('active');
    }, 4000);
  }

  // Carousel
  var wrapper = document.querySelector('.carousel-wrapper');
  var track = document.querySelector('.carousel-track');
  var cards = document.querySelectorAll('.product-card');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var nextBtn = document.querySelector('.carousel-btn.next');
  var carouselCounter = document.querySelector('.carousel-counter');
  var carouselIndex = 0;

  function isMobileCarousel() {
    return window.innerWidth < 768;
  }

  function getVisibleCount() {
    if (!isMobileCarousel()) {
      return cards.length || 1;
    }
    return 1;
  }

  function updateCounter() {
    if (!carouselCounter) {
      return;
    }
    if (!isMobileCarousel()) {
      carouselCounter.textContent = '';
      return;
    }
    carouselCounter.textContent = (carouselIndex + 1) + '/' + cards.length;
  }

  function syncCarouselPosition(behavior) {
    if (!wrapper || !track) {
      return;
    }
    if (!isMobileCarousel()) {
      wrapper.scrollLeft = 0;
      updateCounter();
      return;
    }
    var activeCard = cards[carouselIndex];
    var offset = activeCard ? activeCard.offsetLeft : 0;
    wrapper.scrollTo({
      left: offset,
      behavior: behavior || 'smooth'
    });
    updateCounter();
  }

  function updateCardWidth() {
    cards.forEach(function (c) {
      if (isMobileCarousel() && wrapper) {
        c.style.flex = '0 0 ' + wrapper.clientWidth + 'px';
      } else {
        c.style.flex = '0 0 ' + (100 / getVisibleCount()) + '%';
      }
    });
  }

  function updateIndexFromScroll() {
    if (!wrapper || !cards.length || !isMobileCarousel()) {
      return;
    }
    var nearestIndex = 0;
    var nearestDistance = Infinity;
    cards.forEach(function (card, idx) {
      var distance = Math.abs(card.offsetLeft - wrapper.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = idx;
      }
    });
    carouselIndex = nearestIndex;
    updateCounter();
  }

  if (wrapper && track && cards.length) {
    updateCardWidth();
    syncCarouselPosition('auto');

    wrapper.addEventListener('scroll', function () {
      updateIndexFromScroll();
    }, { passive: true });

    window.addEventListener('resize', function () {
      updateCardWidth();
      syncCarouselPosition('auto');
    });

    nextBtn && nextBtn.addEventListener('click', function () {
      if (!isMobileCarousel()) {
        return;
      }
      var maxIndex = cards.length - getVisibleCount();
      carouselIndex = Math.min(carouselIndex + 1, Math.max(maxIndex, 0));
      syncCarouselPosition('smooth');
    });
    prevBtn && prevBtn.addEventListener('click', function () {
      if (!isMobileCarousel()) {
        return;
      }
      carouselIndex = Math.max(carouselIndex - 1, 0);
      syncCarouselPosition('smooth');
    });
  }

  // Gallery carousel on mobile
  var galleryViewport = document.querySelector('.gallery-viewport');
  var galleryGrid = document.querySelector('.gallery-grid');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var galleryDots = document.querySelectorAll('.gallery-dot');
  var galleryIndex = 0;
  var galleryTimer = null;

  function isMobileGallery() {
    return window.innerWidth <= 768;
  }

  function setActiveGalleryDot() {
    galleryDots.forEach(function (dot, idx) {
      dot.classList.toggle('active', idx === galleryIndex);
    });
  }

  function syncGalleryPosition() {
    if (!galleryGrid || !galleryItems.length) {
      return;
    }
    if (!isMobileGallery()) {
      galleryGrid.style.transform = '';
      galleryIndex = 0;
      setActiveGalleryDot();
      return;
    }
    var slideWidth = galleryViewport ? galleryViewport.clientWidth : 0;
    galleryGrid.style.transform = 'translateX(-' + (galleryIndex * slideWidth) + 'px)';
    setActiveGalleryDot();
  }

  function stopGalleryAutoplay() {
    if (galleryTimer) {
      clearInterval(galleryTimer);
      galleryTimer = null;
    }
  }

  function startGalleryAutoplay() {
    stopGalleryAutoplay();
    if (!isMobileGallery() || galleryItems.length < 2) {
      return;
    }
    galleryTimer = setInterval(function () {
      galleryIndex = (galleryIndex + 1) % galleryItems.length;
      syncGalleryPosition();
    }, 4000);
  }

  if (galleryGrid && galleryItems.length) {
    syncGalleryPosition();
    startGalleryAutoplay();

    galleryDots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () {
        galleryIndex = idx;
        syncGalleryPosition();
        startGalleryAutoplay();
      });
    });

    window.addEventListener('resize', function () {
      syncGalleryPosition();
      startGalleryAutoplay();
    });
  }

  // Hamburger menu
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
  }
});
