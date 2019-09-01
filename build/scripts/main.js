"use strict";

var controller = {
  init: function init() {
    controller.scrollSpy();
    controller.slider();
    controller.navbarToggler();
    controller.filterImg();
  },
  scrollSpy: function scrollSpy() {
    var sections = {};
    document.querySelectorAll(".section").forEach(function (e) {
      sections[e.id] = e.offsetTop - 50;
    });

    var changeNavBackground = function changeNavBackground() {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

      for (var elem in sections) {
        if (sections[elem] <= scrollPosition) {
          document.querySelector('.active1').classList.remove('active1');
          document.querySelector('a[href*=' + elem + ']').classList.add('active1');
        }

        var anchorBtnOffset = document.getElementsByClassName('anchorBtn')[0].offsetTop;

        if (anchorBtnOffset > scrollPosition) {
          document.getElementById("navbar").style.background = '';
        } else {
          document.getElementById("navbar").style.background = 'rgba(0, 0, 0, 0.3)';
        }
      }
    };

    changeNavBackground();
    window.addEventListener('scroll', changeNavBackground);
    window.addEventListener('load', controller.scrollSpy);
    window.addEventListener('resize', controller.scrollSpy);
  },
  slider: function slider() {
    $(document).ready(function () {
      $(".slideshow").slideshow({
        speed: 500,
        pause: 2000,
        effect: "slide",
        tabClass: ".dot1",
        auto: false
      });
    });
    var carouselSlide = document.querySelector('.slider');
    var sliderItems = document.querySelectorAll('.testimonial-item');
    var prevBtn = document.querySelector('#prevBtn');
    var nextBtn = document.querySelector('#nextBtn');
    var counter = 1;
    var size;

    var transformCarousel = function transformCarousel() {
      carouselSlide.style.transform = 'translateX(' + -size * counter + 'px)';
    };

    var sizeOfCarousel = function sizeOfCarousel() {
      size = carouselSlide.clientWidth;
      transformCarousel();
    };

    sizeOfCarousel();
    transformCarousel();

    var automaticallySlide = function automaticallySlide() {
      if (counter >= sliderItems.length - 1) {
        return;
      }

      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      counter++;
      transformCarousel();
    };

    nextBtn.addEventListener('click', function () {
      if (counter >= sliderItems.length - 1) {
        return;
      }

      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      counter++;
      transformCarousel();
    });
    prevBtn.addEventListener('click', function () {
      if (counter <= 0) {
        return;
      }

      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      counter--;
      transformCarousel();
    });
    carouselSlide.addEventListener('transitionend', function () {
      if (sliderItems[counter].id == 'lastClone') {
        carouselSlide.style.transition = 'none';
        counter = sliderItems.length - 2;
        transformCarousel();
      }

      if (sliderItems[counter].id == 'firstClone') {
        carouselSlide.style.transition = 'none';
        counter = sliderItems.length - counter;
        transformCarousel();
      }
    });
    window.addEventListener("resize", sizeOfCarousel);
    window.addEventListener("load", sizeOfCarousel);
  },
  navbarToggler: function navbarToggler() {
    if (window.innerWidth <= 945) {
      var navbarAttrChanging = document.querySelectorAll(".nav-a");

      var toggleNav = function toggleNav(percantage) {
        document.getElementById("mySidebar").style.width = percantage;
      };

      document.getElementsByClassName('openbtn')[0].addEventListener('click', function () {
        document.body.style.overflowY = "hidden";
        toggleNav("40%");
      });
      document.getElementsByClassName('closebtn')[0].addEventListener('click', function () {
        document.body.style.overflowY = "visible";
        toggleNav("0");
      });
      navbarAttrChanging.forEach(function (e) {
        e.addEventListener('click', function () {
          document.body.style.overflowY = "visible";
          toggleNav("0");
        });
      });
    }

    window.addEventListener("resize", controller.navbarToggler);
    window.addEventListener("scroll", controller.navbarToggler);
    window.addEventListener("load", controller.navbarToggler);
  },
  filterImg: function filterImg() {
    var $grid = $('.grid').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows'
    });
    var filterFns = {}; // bind filter button click

    $('#filters').on('click', '.button', function (e) {
      var filterValue = $(e.currentTarget).attr('data-filter'); // use filterFn if matches value

      filterValue = filterFns[filterValue] || filterValue;
      $grid.isotope({
        filter: filterValue
      });
    }); // change is-checked class on buttons

    $('.button-group').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', '.button', function (e) {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(e.currentTarget).addClass('is-checked');
      });
    });
  }
};

window.onload = function () {
  controller.init();
};