import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export function setupScene() {
  /**
   * Debug
   */
  // const gui = new GUI()

  // const parameters = {
  //   materialColor: '#ffeded'
  // }

  // gui
  //   .addColor(parameters, 'materialColor')

  /**
   * Color
   */
  const objColor = 0xffffff;
  const FogColor = 0xCDF7D6;
  const FloorColor = 0x555555;

  /**
   * Base
   */
  // Canvas
  const canvas = document.querySelector('canvas.webgl')

  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(objColor)
  scene.fog = new THREE.Fog(objColor, 2, 8)

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

  window.addEventListener('resize', () =>
  {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * plane
   */
  const planeGeometry = new THREE.PlaneGeometry(30,30,1,1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: FloorColor
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  scene.add(plane)

  /**
   * Environment map
   */
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('./textures/environmentMap/photo_studio_01_1k.hdr', (environmentMap) =>
  {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    // 배경 대신 단색 배경 적용
    scene.background = new THREE.Color(objColor);

    scene.environment = environmentMap
  })

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 3
  scene.add(camera)


  /**
   * Load
   */
  let obj;
  gltfLoader.load('./letter.glb', (gltf) => {
    obj = gltf.scene.children[0];
    scene.add(obj);

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0,
    });

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material; // 모든 메쉬에 재질 적용
      }
    });

    obj.scale.set(13, 13, 13);
    obj.position.y = -1;
    obj.rotation.x = -1.2

    gsap.to(material, {
      opacity: 1,
      duration: 1.2,
      ease: 'power1.out',
    });

    animateModel(obj);
  });


  /**
   * Lights
   */
  const ambiLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add( ambiLight );

  const spotLight = new THREE.DirectionalLight(0xffffff, 2.5);
  spotLight.position.set(10, 0, 1);
  scene.add( spotLight );

  /**
   * Scroll
   */
  let scrollY = window.scrollY

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
  })


  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  /**
   * Animate
   */
  function animateModel(model) {
    const clock = new THREE.Clock();
    const sec2 = document.getElementById('#section2');
    const endPosition = canvas.offsetHeight * 2;


    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: canvas,
        start: "top top",
        end: '+=2000px',
        scrub: true,
      }
    });

    timeline.to(camera.position, {
      y: -0.5,
    })
    .to(model.rotation, {
      x: -1.6,
    },'-=0.5')
    .to(camera.position, {
      y: -2.5,
    });

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      //위아래로 움직이는 애니메이션
      model.position.y = Math.sin(elapsedTime) * 0.1 - 1.4;

      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    }

    tick();
  }

}
