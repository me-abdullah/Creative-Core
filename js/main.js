(function ($) {
  "use strict";
  const hideSpinner = () => {
    setTimeout(() => {
      const spinnerElement = $("#spinner");
      if (spinnerElement.length > 0) {
        spinnerElement.removeClass("show");
      }
    }, 1);
  };
  hideSpinner();
  $(window).on("scroll", function () {
    const navbar = $(".nav-bar");
    if ($(this).scrollTop() > 45) {
      navbar.addClass("sticky-top");
    } else {
      navbar.removeClass("sticky-top");
    }
  });
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
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1e3,
    margin: 24,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: { 0: { items: 1 }, 992: { items: 2 } },
  });
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
  document.addEventListener("mouseover", (event) => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    if (event.target.matches("a, button, .interactive")) {
      cursorDot.classList.add("hover");
      cursorOutline.classList.add("hover");
    } else {
      cursorDot.classList.remove("hover");
      cursorOutline.classList.remove("hover");
    }
  });
  VanillaTilt.init(document.querySelectorAll(".box"), { max: 25, speed: 400 });
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
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("scroll", handleScroll);
    });
  });
  $(window).on("scroll", function () {
    const timelineItems = $("#vertical-scrollable-timeline li");
    const checkInView = (elem) => {
      const docViewTop = $(window).scrollTop();
      const docViewBottom = docViewTop + $(window).height();
      const elemTop = $(elem).offset().top;
      const elemBottom = elemTop + $(window).height() * 0.5;
      if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
        $(elem).addClass("active");
      } else {
        $(elem).removeClass("active");
      }
      const mainTimeline = $("#vertical-scrollable-timeline")[0];
      const timelineHeight =
        mainTimeline.getBoundingClientRect().bottom - $(window).height() * 0.5;
      $(mainTimeline).find(".inner").css("height", `${timelineHeight}px`);
    };
    timelineItems.each(checkInView);
  });
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  const carousel = document.querySelector(".carousel");
  const listHTML = document.querySelector(".carousel .list");
  const seeMoreButtons = document.querySelectorAll(".seeMore");
  const backButton = document.getElementById("back");
  let unacceptClickTimeout;
  const showSlider = (direction) => {
    nextButton.style.pointerEvents = "none";
    prevButton.style.pointerEvents = "none";
    carousel.classList.remove("next", "prev");
    const items = document.querySelectorAll(".carousel .list .item");
    if (direction === "next") {
      listHTML.appendChild(items[0]);
      carousel.classList.add("next");
    } else {
      listHTML.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
    }
    clearTimeout(unacceptClickTimeout);
    unacceptClickTimeout = setTimeout(() => {
      nextButton.style.pointerEvents = "auto";
      prevButton.style.pointerEvents = "auto";
    }, 2e3);
  };
  nextButton.addEventListener("click", () => showSlider("next"));
  prevButton.addEventListener("click", () => showSlider("prev"));
  seeMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      carousel.classList.remove("next", "prev");
      carousel.classList.add("showDetail");
    });
  });
  backButton.addEventListener("click", () => {
    carousel.classList.remove("showDetail");
  });
  document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".properties-items");
    const filterLinks = document.querySelectorAll(".properties-filter a");
    const filterItems = (filter) => {
      items.forEach((item) => {
        if (filter === "*" || item.classList.contains(filter.substring(1))) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    };
    const handleFilterClick = (event) => {
      event.preventDefault();
      filterLinks.forEach((link) => link.classList.remove("is_active"));
      event.target.classList.add("is_active");
      const filter = event.target.getAttribute("data-filter");
      filterItems(filter);
    };
    filterItems("*");
    filterLinks.forEach((link) =>
      link.addEventListener("click", handleFilterClick)
    );
  });
})(jQuery);
