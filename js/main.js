(function ($) {
  "use strict";

  // Spinner
  const hideSpinner = () => {
      setTimeout(() => {
          const spinnerElement = $("#spinner");
          if (spinnerElement.length > 0) {
              spinnerElement.removeClass("show");
          }
      }, 1);
  };
  hideSpinner();

  // Initialize wow.js
  new WOW().init();

  // Sticky Navbar
  $(window).on("scroll", function () {
      const navbar = $(".nav-bar");
      if ($(this).scrollTop() > 45) {
          navbar.addClass("sticky-top");
      } else {
          navbar.removeClass("sticky-top");
      }
  });

  // Back to Top Button
  $(window).on("scroll", function () {
      const backToTopBtn = $(".back-to-top");
      if ($(this).scrollTop() > 300) {
          backToTopBtn.fadeIn("slow");
      } else {
          backToTopBtn.fadeOut("slow");
      }
  });

  $(".back-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
  });

  // Header Carousel
  $(".header-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      nav: true,
      navText: [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>',
      ],
  });

  // Testimonials Carousel
  $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 24,
      dots: false,
      loop: true,
      nav: true,
      navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>',
      ],
      responsive: {
          0: {
              items: 1,
          },
          992: {
              items: 2,
          },
      },
  });
})(jQuery);

// Custom Cursor
document.addEventListener("mousemove", (event) => {
  const posX = event.clientX;
  const posY = event.clientY;
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
});

// Initialize VanillaTilt
VanillaTilt.init(document.querySelectorAll(".box"), {
  max: 25,
  speed: 400,
});

// Navbar Blur on Scroll
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");

  const handleScroll = () => {
      if (window.scrollY >= 90) {
          navbar.classList.add("navbar-blur");
      } else {
          navbar.classList.remove("navbar-blur");
      }
  };

  window.addEventListener("scroll", handleScroll);

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
      window.removeEventListener("scroll", handleScroll);
  });
});

// Section Scroll Animation
$(window).on('scroll', function() {
  const timelineItems = $('#vertical-scrollable-timeline li');
  const checkInView = (elem, index) => {
      const docViewTop = $(window).scrollTop();
      const docViewBottom = docViewTop + $(window).height();
      const elemTop = $(elem).offset().top;
      const elemBottom = elemTop + $(window).height() * 0.5;

      if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
          $(elem).addClass('active');
      } else {
          $(elem).removeClass('active');
      }

      const mainTimeline = $('#vertical-scrollable-timeline')[0];
      const timelineHeight = mainTimeline.getBoundingClientRect().bottom - $(window).height() * 0.5;
      $(mainTimeline).find('.inner').css('height', `${timelineHeight}px`);
  };

  timelineItems.each(checkInView);
});

// Carousel Functionality
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const carousel = document.querySelector('.carousel');
const listHTML = document.querySelector('.carousel .list');
const seeMoreButtons = document.querySelectorAll('.seeMore');
const backButton = document.getElementById('back');

let unacceptClickTimeout;

const showSlider = (direction) => {
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';

  carousel.classList.remove('next', 'prev');
  const items = document.querySelectorAll('.carousel .list .item');
  if (direction === 'next') {
      listHTML.appendChild(items[0]);
      carousel.classList.add('next');
  } else {
      listHTML.prepend(items[items.length - 1]);
      carousel.classList.add('prev');
  }

  clearTimeout(unacceptClickTimeout);
  unacceptClickTimeout = setTimeout(() => {
      nextButton.style.pointerEvents = 'auto';
      prevButton.style.pointerEvents = 'auto';
  }, 2000);
};

nextButton.addEventListener('click', () => showSlider('next'));
prevButton.addEventListener('click', () => showSlider('prev'));

seeMoreButtons.forEach((button) => {
  button.addEventListener('click', () => {
      carousel.classList.remove('next', 'prev');
      carousel.classList.add('showDetail');
  });
});

backButton.addEventListener('click', () => {
  carousel.classList.remove('showDetail');
});


document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.properties-items');
    const filterLinks = document.querySelectorAll('.properties-filter a');

    function filterItems(filter) {
        items.forEach(item => {
            if (filter === '*' || item.classList.contains(filter.substring(1))) {
                item.style.display = 'block'; // Show the item
            } else {
                item.style.display = 'none'; // Hide the item
            }
        });
    }

    function handleFilterClick(event) {
        event.preventDefault();

        // Remove active class from all filter links
        filterLinks.forEach(link => link.classList.remove('is_active'));

        // Add active class to clicked filter link
        event.target.classList.add('is_active');

        // Get filter value and filter items
        const filter = event.target.getAttribute('data-filter');
        filterItems(filter);
    }

    // Initial filter (show all items)
    filterItems('*');

    filterLinks.forEach(link => link.addEventListener('click', handleFilterClick));
});
