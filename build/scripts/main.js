"use strict";

var controller = {
  init: function init() {
    controller.scrollSpy();
    controller.slider();
    controller.navbarToggler();
    controller.filterImg();
    controller.wowAnimations();
    controller.statCounter();
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
    setTimeout(controller.scrollSpy, 3000);
  },
  slider: function slider() {
    var swiper1 = new Swiper(".slider-1", {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
    var swiper2 = new Swiper(".slider-2", {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      initialSlide: 1
    });

    var updateFunct = function updateFunct() {
      swiper1.update();
      swiper2.update();
    };

    window.addEventListener('resize', updateFunct);
    window.addEventListener('load', updateFunct);
    window.addEventListener('orientationchange', updateFunct);
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
  },
  statCounter: function statCounter() {
    jQuery(document).ready(function ($) {
      $('.counter').counterUp({
        delay: 10,
        time: 1000
      });
    });
  },
  wowAnimations: function wowAnimations() {// new WOW().init();
  }
};

window.onload = function () {
  controller.init();
};