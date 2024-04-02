import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from 'gsap';
import GUI from 'lil-gui';
import particlesVertexShader from './shaders/particles/vertex.glsl';
import particlesFragmentShader from './shaders/particles/fragment.glsl';

// Base
const gui = new GUI({
  width: 340
});
const debugObject = {};

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Loaders
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
};

// Resize event handler
const handleResize = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
};

window.addEventListener('resize', handleResize);

// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 15);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);

// Debug
debugObject.clearColor = '#160920';
gui.addColor(debugObject, 'clearColor').onChange(() => {
  renderer.setClearColor(debugObject.clearColor);
});
renderer.setClearColor(debugObject.clearColor);

// Arrays to store model and particle data
const modelDataArray = [];

// Function to move particles
function moveParticles(modelData, x, y, z) {
  const model = modelData.gltf.scene;
  model.position.set(x, y, z);

  const particles = modelData.particles;

  const newPositions = particles.positions.map(position => {
    const originalArray = position.array;
    const newArray = new Float32Array(originalArray.length);

    for (let i = 0; i < originalArray.length; i += 3) {
      newArray[i] = originalArray[i] + x;
      newArray[i + 1] = originalArray[i + 1] + y;
      newArray[i + 2] = originalArray[i + 2] + z;
    }

    return new THREE.Float32BufferAttribute(newArray, 3);
  });

  particles.geometry.setAttribute('position', newPositions[0]);
  particles.geometry.attributes.position.needsUpdate = true;
}

// Function to handle GLTF loading
// Function to handle GLTF loading
function handleGLTFLoad(gltf, particles, x, y, z) {
  addModelData(gltf, particles, x, y, z);

  const modelData = modelDataArray[modelDataArray.length - 1]; // Get the most recent model data

  const model = modelData.gltf.scene;

  const positions = model.children.map(child => child.geometry.attributes.position);
  model.position.x = x;

  // Find the maximum count among all positions
  particles.maxCount = Math.max(...positions.map(position => position.count));


  particles.positions = positions.map(position => {
    const originalArray = position.array;
    const newArray = new Float32Array(particles.maxCount * 3);

    for (let i = 0; i < particles.maxCount; i++) {
      const i3 = i * 3;

      if (i3 < originalArray.length) {
        newArray[i3 + 0] = originalArray[i3 + 0];
        newArray[i3 + 1] = originalArray[i3 + 1];
        newArray[i3 + 2] = originalArray[i3 + 2];
      } else {
        const randomIndex = Math.floor(position.count * Math.random()) * 3;
        newArray[i3 + 0] = originalArray[randomIndex + 0];
        newArray[i3 + 1] = originalArray[randomIndex + 1];
        newArray[i3 + 2] = originalArray[randomIndex + 2];
      }
    }

    return new THREE.Float32BufferAttribute(newArray, 3);
  });

  const sizesArray = new Float32Array(particles.maxCount);
  for (let i = 0; i < particles.maxCount; i++) {
    sizesArray[i] = Math.random();
  }

  particles.geometry = new THREE.BufferGeometry();
  particles.geometry.setAttribute('position', particles.positions[0]);
  particles.geometry.setAttribute('aPositionTarget', particles.positions[0]);
  particles.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

  particles.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms: {
      uSize: { value: 0.4 },
      uResolution: { value: new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio) },
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color(particles.colorA) },
      uColorB: { value: new THREE.Color(particles.colorB) }
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Points
  const points = new THREE.Points(particles.geometry, particles.material);
  points.frustumCulled = false;
  scene.add(points);

  moveParticles(modelData, x, y, z);

  // Methods
  particles.morph = (modelFrom, modelTo) => {
    // Update attributes
    particles.geometry.attributes.position = modelFrom.particles.positions[0];
    particles.geometry.attributes.aPositionTarget = modelTo.particles.positions[0];
    particles.geometry.attributes.aSize = modelFrom.particles.geometry.attributes.aSize;
  
    // Animate uProgress
    gsap.fromTo(
      particles.material.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 3, ease: 'linear' }
    );
  };
  

  // Tweaks
  gui.addColor(particles, 'colorA').onChange(() => { particles.material.uniforms.uColorA.value.set(particles.colorA) });
  gui.addColor(particles, 'colorB').onChange(() => { particles.material.uniforms.uColorB.value.set(particles.colorB) });
  gui.add(particles.material.uniforms.uProgress, 'value').min(0).max(1).step(0.001).name('uProgress').listen();


  // Tweaks
  particles.morphA = () => { 
    particles.morph(modelDataArray[0], modelDataArray[1]);
    console.log(modelDataArray);
  };
  particles.morphB = () => { particles.morph(modelDataArray[1], modelDataArray[0]); };

  gui.add(particles, 'morphA');
  gui.add(particles, 'morphB');

    if (particles.geometry !== undefined) {
      particles.geometry.setDrawRange(0, particles.maxCount);
    } else {
        // Create a new geometry if it doesn't exist
        particles.geometry = new THREE.BufferGeometry();
        // Set other attributes as needed
        particles.geometry.setAttribute('position', particles.positions[0]);
        particles.geometry.setAttribute('aPositionTarget', particles.positions[0]);
        particles.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));
  }

}


// Function to add model data to the array
function addModelData(gltf, particles, x, y, z) {
  const modelData = {
    gltf: gltf,
    particles: particles,
    x: x,
    y: y,
    z: z
  };
  modelDataArray.push(modelData);
}

// 각 모델의 초기 파티클 데이터를 저장할 변수들 추가
let initialParticlesAmongUs = null;
let initialParticlesRocket = null;


// Rocket 모델 로드 후 초기 파티클 데이터 설정
gltfLoader.load('./rocket.glb', (gltf) => {
  const particlesRocket = {
    index: 0,
    colorA: '#ff7300',
    colorB: '#0091ff'
  };

  handleGLTFLoad(gltf, particlesRocket, 0, 0, 0);
  initialParticlesRocket = { ...particlesRocket }; // 초기 파티클 데이터 저장
});

// Among Us 모델 로드 후 초기 파티클 데이터 설정
gltfLoader.load('./among_us.glb', (gltf) => {
  const particlesAmongUs = {
    index: 0,
    colorA: '#ff7300',
    colorB: '#0091ff'
  };
  
  // 모델 데이터를 배열에 추가하지 않고 즉시 처리합니다.
  handleGLTFLoad(gltf, particlesAmongUs, 0, -2, 0);

  // 파티클 제거
  scene.remove(particlesAmongUs.points);

  // 초기 파티클 데이터 저장
  initialParticlesAmongUs = { ...particlesAmongUs };
});





// Animate
const animate = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  
};

animate();
