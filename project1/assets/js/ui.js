$(document).ready(function () {
  //개빡쳐 너무이상해 동작을안해
  var $window = $(window);
  var body = $('body');
  var header = $('header');
  var nav = $('nav');
  var headerNav = $('.header-nav');
  var headerMenu = $('.header-menu');
  var headerMenuItem = $('.header-menu-item');
  var headerSubMenu = $('.header-submenu');
  var menuBtn = $('.header-menu-btn');
  var COMMON = {
    isMobile: function () {
      return window.innerWidth <= 920;
    },
    isTablet: function () {
      return window.innerWidth <= 1024;
    },
  };
  var prevSize = COMMON.isMobile();

  menuBtn.on("click", function (e) {
    if (COMMON.isMobile()) {
      if ($(this).hasClass('on')) {
        $(this).removeClass('on active');
        header.removeClass('active');
        body.css({
          "overflow": "initial",
          "height": "auto"
        });
      } else {
        $(this).addClass('on active');
        header.addClass('active');
        body.css({
          "overflow": "hidden",
          "height": "100%"
        });
      }
    }
  });

  $window.on("resize", function (e) {
    if (prevSize != COMMON.isMobile()) {
      prevSize = COMMON.isMobile()
      if (!COMMON.isMobile()) {
        menuBtn.removeClass('on active');
        header.removeClass('active');
        body.css({
          "overflow": "initial",
          "height": "auto"
        });
      }
    }

  })
});