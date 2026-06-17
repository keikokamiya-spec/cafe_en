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
  var track = document.querySelector('.carousel-track');
  var cards = document.querySelectorAll('.product-card');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var nextBtn = document.querySelector('.carousel-btn.next');
  var carouselIndex = 0;

  function getVisibleCount() {
    return window.innerWidth < 480 ? 1 : 3;
  }

  function updateCarousel() {
    var visibleCount = getVisibleCount();
    var pct = (100 / visibleCount) * carouselIndex;
    track.style.transform = 'translateX(-' + pct + '%)';
  }

  function updateCardWidth() {
    var visibleCount = getVisibleCount();
    cards.forEach(function (c) {
      c.style.flex = '0 0 ' + (100 / visibleCount) + '%';
    });
  }

  if (track && cards.length) {
    updateCardWidth();
    window.addEventListener('resize', function () {
      updateCardWidth();
      carouselIndex = 0;
      updateCarousel();
    });

    nextBtn && nextBtn.addEventListener('click', function () {
      var maxIndex = cards.length - getVisibleCount();
      carouselIndex = Math.min(carouselIndex + 1, Math.max(maxIndex, 0));
      updateCarousel();
    });
    prevBtn && prevBtn.addEventListener('click', function () {
      carouselIndex = Math.max(carouselIndex - 1, 0);
      updateCarousel();
    });
  }

  // Gallery carousel
  var galleryTrack = document.querySelector('.gallery-track');
  var galleryDots = document.querySelectorAll('.gallery-dot');
  var galleryIndex = 0;

  function updateGallery(i) {
    galleryIndex = i;
    galleryTrack.style.transform = 'translateX(' + (-i * 100) + '%)';
    galleryDots.forEach(function (d, idx) {
      d.classList.toggle('active', idx === i);
    });
  }

  if (galleryTrack && galleryDots.length) {
    galleryDots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () { updateGallery(idx); });
    });
    setInterval(function () {
      updateGallery((galleryIndex + 1) % galleryDots.length);
    }, 4000);
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
