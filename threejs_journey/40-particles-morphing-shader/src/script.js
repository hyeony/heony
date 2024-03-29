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
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

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

let particlesAmongUs = null;
let particlesRocket = null;


gltfLoader.load('./among_us.glb', (gltf) => {
  particlesAmongUs = {};
  particlesAmongUs.index = 0;
  gltf.scene.position.x = 10;

  const positions = gltf.scene.children.map(child => child.geometry.attributes.position);

  particlesAmongUs.maxCount = 0;

  for (const position of positions) {
    if (position.count > particlesAmongUs.maxCount)
      particlesAmongUs.maxCount = position.count;
  }

  particlesAmongUs.positions = positions.map(position => {
    const originalArray = position.array;
    const newArray = new Float32Array(particlesAmongUs.maxCount * 3);

    for (let i = 0; i < particlesAmongUs.maxCount; i++) {
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

  const sizesArray = new Float32Array(particlesAmongUs.maxCount);

  for (let i = 0; i < particlesAmongUs.maxCount; i++)
    sizesArray[i] = Math.random();

  // Geometry
  particlesAmongUs.geometry = new THREE.BufferGeometry();
  particlesAmongUs.geometry.setAttribute('position', particlesAmongUs.positions[particlesAmongUs.index]);
  particlesAmongUs.geometry.setAttribute('aPositionTarget', particlesAmongUs.positions[0]);
  particlesAmongUs.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

  // Material
  particlesAmongUs.colorA = '#ff7300';
  particlesAmongUs.colorB = '#0091ff';
  particlesAmongUs.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(0.4),
      uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
      uProgress: new THREE.Uniform(0),
      uColorA: new THREE.Uniform(new THREE.Color(particlesAmongUs.colorA)),
      uColorB: new THREE.Uniform(new THREE.Color(particlesAmongUs.colorB))
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Points
  const pointsAmongUs = new THREE.Points(particlesAmongUs.geometry, particlesAmongUs.material);
  pointsAmongUs.frustumCulled = false;
  scene.add(pointsAmongUs);
});

gltfLoader.load('./rocket.glb', (gltf) => {
  particlesRocket = {};
  particlesRocket.index = 0;
  scene.add(gltf.scene);

  // Rocket 모델의 위치를 조정합니다.
  gltf.scene.position.set(-4, 0, 0); // x, y, z 축으로 이동

  const positions = gltf.scene.children.map(child => child.geometry.attributes.position);

  particlesRocket.maxCount = 0;

  for (const position of positions) {
    if (position.count > particlesRocket.maxCount)
      particlesRocket.maxCount = position.count;
  }

  particlesRocket.positions = positions.map(position => {
    const originalArray = position.array;
    const newArray = new Float32Array(particlesRocket.maxCount * 3);

    for (let i = 0; i < particlesRocket.maxCount; i++) {
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

  const sizesArray = new Float32Array(particlesRocket.maxCount);

  for (let i = 0; i < particlesRocket.maxCount; i++)
    sizesArray[i] = Math.random();

  // Geometry
  particlesRocket.geometry = new THREE.BufferGeometry();
  particlesRocket.geometry.setAttribute('position', particlesRocket.positions[particlesRocket.index]);
  particlesRocket.geometry.setAttribute('aPositionTarget', particlesRocket.positions[0]);
  particlesRocket.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1));

  // Material
  particlesRocket.colorA = '#ff7300';
  particlesRocket.colorB = '#0091ff';
  particlesRocket.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(0.4),
      uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
      uProgress: new THREE.Uniform(0),
      uColorA: new THREE.Uniform(new THREE.Color(particlesRocket.colorA)),
      uColorB: new THREE.Uniform(new THREE.Color(particlesRocket.colorB))
    },
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  // Points
  const pointsRocket = new THREE.Points(particlesRocket.geometry, particlesRocket.material);
  pointsRocket.frustumCulled = false;
  scene.add(pointsRocket);

});
//Load models
// let particles = null
// gltfLoader.load('./models.glb', (gltf) => {

//   /**
//    * Particles
//    */
//   const particles = {}
//   particles.index = 0

//   //Positions
//   //모델 위치 정보 추출
//   const positions = gltf.scene.children.map(child =>
//     child.geometry.attributes.position
//   )

//   particles.maxCount = 0
//   //버퍼속성(bufferAttrigute) 에서 최대 정점 수를 찾기위한 코드
//   for (const position of positions) {
//     if (position.count > particles.maxCount)
//       particles.maxCount = position.count
//   }

//   particles.positions = positions.map( position => {
//     const originalArray = position.array
//     const newArray = new Float32Array(particles.maxCount * 3)

//     for (let i = 0; i < particles.maxCount; i++) {
//       const i3 = i * 3

//       if (i3 < originalArray.length) {
//         newArray[i3 + 0] = originalArray[i3 + 0]
//         newArray[i3 + 1] = originalArray[i3 + 1]
//         newArray[i3 + 2] = originalArray[i3 + 2]
//       } else {
//         const randomIndex = Math.floor(position.count * Math.random()) * 3
//         newArray[i3 + 0] = originalArray[randomIndex + 0]
//         newArray[i3 + 1] = originalArray[randomIndex + 1]
//         newArray[i3 + 2] = originalArray[randomIndex + 2]
//       }
//     }

//     return new THREE.Float32BufferAttribute(newArray, 3)
//   })


//   // console.log(particles.positions)
//   const sizesArray = new Float32Array(particles.maxCount)

//   for (let i = 0; i < particles.maxCount; i++)
//     sizesArray[i] = Math.random()
//   // console.log(sizesArray)

//   // Geometry
//   particles.geometry = new THREE.BufferGeometry()
//   particles.geometry.setAttribute('position', particles.positions[particles.index])
//   particles.geometry.setAttribute('aPositionTarget', particles.positions[2])
//   particles.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1))
//   //index의 제거방법에대해 기억...


//   // Material
//   particles.colorA = '#ff7300'
//   particles.colorB = '#0091ff'
//   particles.material = new THREE.ShaderMaterial({
//     vertexShader: particlesVertexShader,
//     fragmentShader: particlesFragmentShader,
//     uniforms: {
//       uSize: new THREE.Uniform(0.4),
//       uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
//       uProgress: new THREE.Uniform(0),
//       uColorA: new THREE.Uniform(new THREE.Color(particles.colorA)),
//       uColorB: new THREE.Uniform(new THREE.Color(particles.colorB))
//     },
//     blending: THREE.AdditiveBlending,
//     depthWrite: false
//   })

//   // Points
//   particles.points = new THREE.Points(particles.geometry, particles.material)
//   particles.points.frustumCulled = false
//   scene.add(particles.points)


//   //Methods
//   particles.morph = (index) => {
//     // Update attributes, particles, geometry...
//     particles.geometry.attributes.position = particles.positions[particles.index]
//     particles.geometry.attributes.aPositionTarget = particles.positions[index]

//     //Animate uProgress
//     gsap.fromTo(
//       particles.material.uniforms.uProgress, {
//         value: 0
//       }, {
//         value: 1,
//         duration: 3,
//         ease: 'linear'
//       }
//     )

//     //Save index
//     particles.index = index
//   }

//   particles.morph0 = () => {
//     particles.morph(0)
//   }
//   particles.morph1 = () => {
//     particles.morph(1)
//   }
//   particles.morph2 = () => {
//     particles.morph(2)
//   }
//   particles.morph3 = () => {
//     particles.morph(3)
//   }

//   // 모프 함수 정의
// const morph = (index) => {
//   // 모델 모프 처리
//   particles.morph(index)
// }


// // ScrollTrigger 플러그인 등록
// gsap.registerPlugin(ScrollTrigger);

// const sectionRefs = document.querySelectorAll('.section');
// const sections = Array.from(sectionRefs);

// // 각 섹션에 대해 ScrollTrigger를 생성하여 모델 모핑
// sections.forEach((section, i) => {
//   ScrollTrigger.create({
//     trigger: section,
//     start: "top bottom-=1",
//     end: "bottom top+=1",
//     scrub: true,
//     onEnter: () => {
//       // 섹션에 진입할 때 모델 모핑
//       const index = sections.indexOf(section);
//       if (index !== -1) {
//         particles.morph(index);
//       }
//     },
//     onEnterBack: () => {
//       // 섹션에 뒤로 돌아갈 때 모델 모핑
//       const index = sections.indexOf(section);
//       if (index !== -1) {
//         particles.morph(index);
//       }
//     }
//   });
// });
// /**
//  * Animate
//  */
// const tick = () => {
//   // Render normal scene
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// }

// tick();


//   // Tweaks
//   gui.add(particles.material.uniforms.uProgress, 'value')
//     .min(0).max(1).step(0.001).name('uProgress')

//   gui.addColor(particles, 'colorA').onChange(() => {
//     particles.material.uniforms.uColorA.value.set(particles.colorA)
//   })
//   gui.addColor(particles, 'colorB').onChange(() => {
//     particles.material.uniforms.uColorB.value.set(particles.colorB)
//   })

//   gui.add(particles, 'morph0')
//   gui.add(particles, 'morph1')
//   gui.add(particles, 'morph2')
//   gui.add(particles, 'morph3')

//   // Tweaks
//   gui.add(particles.material.uniforms.uProgress, 'value').min(0).max(1).step(0.001).name('uProgress').listen()

// })

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