import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import {  DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 340
})
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

  // Materials
  if (particles)
    particles.material.uniforms.uResolution.value.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 10)

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

debugObject.clearColor = '#160920'
gui.addColor(debugObject, 'clearColor').onChange(() => {
  renderer.setClearColor(debugObject.clearColor)
})
renderer.setClearColor(debugObject.clearColor)

let particlesIlbuni = null;
let particlesRocket = null;

let newModel = new THREE.Object3D();
gltfLoader.load('./earth.glb', (gltf) => {

  newModel = gltf.scene;
  console.log(newModel)
  particlesIlbuni = {};
  particlesIlbuni.index = 0;

  const positions = [];
  newModel.traverse((child) => {
    if (child.isMesh && child.geometry.attributes.position) {
      positions.push(child.geometry.attributes.position);
    }
  });

  console.log(positions);

  particlesIlbuni.maxCount = 0;

  for (const position of positions) {
    if (position.count > particlesIlbuni.maxCount)
      particlesIlbuni.maxCount = position.count;
  }

  particlesIlbuni.positions = positions.map(position => {
    const originalArray = position.array;
    const newArray = new Float32Array(particlesIlbuni.maxCount * 3);

    for (let i = 0; i < particlesIlbuni.maxCount; i++) {
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

  const sizesArray = new Float32Array(particlesIlbuni.maxCount);

  for (let i = 0; i < particlesIlbuni.maxCount; i++)
    sizesArray[i] = Math.random();

  // Geometry
  particlesIlbuni.geometry = new THREE.BufferGeometry();
  particlesIlbuni.geometry.setAttribute('position', particlesIlbuni.positions[particlesIlbuni.index]);
  particlesIlbuni.geometry.setAttribute('aPositionTarget', particlesIlbuni.positions[0]);
  particlesIlbuni.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

  // Material
  particlesIlbuni.colorA = '#ff7300';
  particlesIlbuni.colorB = '#0091ff';
  particlesIlbuni.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(0.4),
      uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
      uProgress: new THREE.Uniform(0),
      uColorA: new THREE.Uniform(new THREE.Color(particlesIlbuni.colorA)),
      uColorB: new THREE.Uniform(new THREE.Color(particlesIlbuni.colorB))
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Points
  const pointsAmongUs = new THREE.Points(particlesIlbuni.geometry, particlesIlbuni.material);
  pointsAmongUs.position.y = -1
  pointsAmongUs.frustumCulled = false;
  scene.add(pointsAmongUs);
});

// gltfLoader.load('./rocket.glb', (gltf) => {
//   // console.log("rocket :", gltf.scene.children)
//   particlesRocket = {};
//   particlesRocket.index = 0;

//   const positions = gltf.scene.children.map(child => child.geometry.attributes.position);


//   console.log( "로켓", gltf.scene.children[0].geometry.attributes.position)
//   console.log("로켓", positions)

//   particlesRocket.maxCount = 0;

//   for (const position of positions) {
//     if (position.count > particlesRocket.maxCount)
//       particlesRocket.maxCount = position.count;
//   }

//   particlesRocket.positions = positions.map(position => {
//     const originalArray = position.array;
//     const newArray = new Float32Array(particlesRocket.maxCount * 3);

//     for (let i = 0; i < particlesRocket.maxCount; i++) { 
//       const i3 = i * 3;

//       if (i3 < originalArray.length) {
//         newArray[i3 + 0] = originalArray[i3 + 0];
//         newArray[i3 + 1] = originalArray[i3 + 1];
//         newArray[i3 + 2] = originalArray[i3 + 2];
//       } else {
//         const randomIndex = Math.floor(position.count * Math.random()) * 3;
//         newArray[i3 + 0] = originalArray[randomIndex + 0];
//         newArray[i3 + 1] = originalArray[randomIndex + 1];
//         newArray[i3 + 2] = originalArray[randomIndex + 2];
//       }
//     }

//     return new THREE.Float32BufferAttribute(newArray, 3);
//   });

//   const sizesArray = new Float32Array(particlesRocket.maxCount);

//   for (let i = 0; i < particlesRocket.maxCount; i++)
//     sizesArray[i] = Math.random();

//   // Geometry
//   particlesRocket.geometry = new THREE.BufferGeometry();
//   particlesRocket.geometry.setAttribute('position', particlesRocket.positions[particlesRocket.index]);
//   particlesRocket.geometry.setAttribute('aPositionTarget', particlesRocket.positions[0]);
//   particlesRocket.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

//   // Material
//   particlesRocket.colorA = '#ff7300';
//   particlesRocket.colorB = '#0091ff';
//   particlesRocket.material = new THREE.ShaderMaterial({
//     vertexShader: particlesVertexShader,
//     fragmentShader: particlesFragmentShader,
//     uniforms: {
//       uSize: new THREE.Uniform(0.4),
//       uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
//       uProgress: new THREE.Uniform(0),
//       uColorA: new THREE.Uniform(new THREE.Color(particlesRocket.colorA)),
//       uColorB: new THREE.Uniform(new THREE.Color(particlesRocket.colorB))
//     },
//     blending: THREE.AdditiveBlending,
//     depthWrite: false
//   });

//   // Points
//   const pointsRocket = new THREE.Points(particlesRocket.geometry, particlesRocket.material);
//   pointsRocket.frustumCulled = false;
//   scene.add(pointsRocket);

// });

/**
 * Animate
 */
const tick = () => {
  // Update controls
  // controls.update()

  // Render normal scene
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()