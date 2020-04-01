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

  function headerActive() {
    menuBtn.on("click", function (e) {
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
    });
  }

 if (COMMON.isMobile()) {
  headerActive();
 }

  $window.on('resize', function (e) {
    if (COMMON.isMobile()) {
      headerActive();
    } else {
      menuBtn.removeClass('on active');
      header.removeClass('active');
      body.css({
        "overflow": "initial",
        "height": "auto"
      });
    }
  });
});



//resize체크를 안하면 문제가 생긴다.
// var menuBtn = $('.header-menu-btn');

// $(document).ready(function () {
// 	menuBtn.on("click",function(){
// 			var winW = $(window).width();
// 		console.log(winW);
// 		if(winW < 921){
// 			$(this).toggleClass('on active');
// 		}else {
// 			return false;
// 		}
// 	});
// });

// $(window).resize(function(){
// 	var winW = $(window).width();

// 	menuBtn.on("click", function () {
// 		console.log(winW);
// 		if (winW < 921) {
// 			$(this).toggleClass('on active');
// 		} else {
// 			return false;
// 		}
// 	});
// });