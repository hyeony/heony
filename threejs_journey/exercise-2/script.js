import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

const scene = new THREE.Scene();
const gridhelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridhelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//make renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//add cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xc71585,
  wireframe: true,
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(0, 0.5, -10);
scene.add(cubeMesh);

//resize function
window.addEventListener('resize', handleWindowResize, false);

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

//add percentage
function linearInterpolation(start, end, ratio) {
  return (1 - ratio) * start + ratio * end;
}

function calculateScalePercentage(start, end) {
  return (scrollPercentage - start) / (end - start);
}

//add animations
const animations = [];

animations.push({
  startTime: 0,
  endTime: 40,
  action: () => {
    camera.lookAt(cubeMesh.position);
    camera, position.set(0, 1, 2);
    cubeMesh.position.z = linearInterpolation(-10, 0, calculateScalePercentage)
  }
});

animations.push({
  startTime: 40,
  endTime: 60,
  action: () => {
      camera.lookAt(cubeMesh.position);
      camera.position.set(0, 1, 2);
      cubeMesh.rotation.z = linearInterpolation(0, Math.PI, calculateScalePercentage(40, 60));
  },
});


animations.push({
  startTime: 80,
  endTime: 101,
  action: () => {
      cubeMesh.rotation.x += 0.01;
      cubeMesh.rotation.y += 0.01;
  },
});

//play anumation function
function playAnimations() {
  animations.forEach((animation) => {
    if (scrollPercentage >= animation.startTime && scrollPercentage < animation.endTime) {
      animation.action();
    }
  });
}

let scrollPercentage = 0;

//add scrollfunction
document.body.onscroll = () => {
  scrollPercentage =
    ((document.documentElement.scrollTop || document.body.scrollTop) /
      ((document.documentElement.scrollHeight || document.body.scrollHeight) -  document.documentElement.clientHeight)) * 100;

    document.getElementById('scrollProgress').innerText = 'Scroll Progress : ' + scrollPercentage.toFixed(2);
};


//make stats
const stats = new Stats();
document.body.appendChild(stats.dom);

//animate function
const animate = () => {
  requestAnimationFrame(animate);
  playAnimations();
  render();
  stats.update();
}

//render function
const render = () => {
  renderer.render(scene, camera);
}

window.scrollTo({ top: 0, behavior: 'smooth' });
//실행
animate();