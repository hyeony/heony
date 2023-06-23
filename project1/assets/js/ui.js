$(document).ready(function () {
  //개빡쳐 너무이상해 동작을안해
  var $window = $(window);
  var win_sTop = $(window).scrollTop();
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

  //gnb fixed
  if (win_sTop > 0) {
    header.addClass('fixed');
  } else {
    header.removeClass('fixed');
  }

  //mobile menu click
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

  $window.scroll(function () {

  })

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

// Scene
var scene = new THREE.Scene();
var backgroundColor = new THREE.Color(0xfefefe); // 예시로 fefefe 파스텔 그레이 컬러 사용
// Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(backgroundColor); // 배경색 설정

var canvas = document.createElement('div'); // 새로운 <canvas> 요소 생성
var targetElement = document.querySelector('.webgl'); // <canvas>를 추가할 요소 선택
canvas.id = 'myCanvas'; // 요소의 ID를 설정
renderer.setSize(targetElement.offsetWidth, targetElement.offsetHeight); // webgl 요소의 크기를 사용하여 renderer의 사이즈 설정
canvas.appendChild(renderer.domElement); // renderer의 domElement를 생성한 <canvas> 요소에 추가

targetElement.appendChild(canvas); // 선택한 요소에 생성한 <canvas> 추가

// Sphere Geometry
// 파스텔 컬러 값
var pastelColor = new THREE.Color(0xf2c1d7); // 예시로 f2c1d7 파스텔 핑크색 사용

// 재질 생성
var material = new THREE.MeshBasicMaterial({ color: pastelColor });

// 3D 객체 생성
var geometry = new THREE.SphereGeometry(1, 32, 32);
var sphere = new THREE.Mesh(geometry, material);

// 장면에 3D 객체 추가
scene.add(sphere);


// Light
var light = new THREE.PointLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Start Animation
animate();