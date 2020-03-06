
var nav = $('nav');
var headerNav = $('.header-nav');
var headerMenu = $('.header-menu');
var headerMenuItem = $('.header-menu-item');
var headerSubMenu = $('.header-submenu');

function headerActive() {
	var winW = $(window).width();
	var body = $('body');
	var header = $('header');
	var menuBtn = $('.header-menu-btn');
	// $(document).off('click', menuBtn);
		menuBtn.on('click', function (e) {
			console.log("click");
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

$(document).ready(function () {
	var winW = $(window).width();

});

$(window).resize(function(){
	var winW = $(window).width();
	var header = $('header');
	var body = $('body');
	var menuBtn = $('.header-menu-btn');
	
	console.log($(window).width());
	if(winW < 921){
		headerActive();
	}

});









