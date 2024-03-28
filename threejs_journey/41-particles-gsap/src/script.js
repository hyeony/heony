import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

console.clear();

//전역유니폼
let gu = {
  time: { value: 0 }
};

/**
 * Base
 */
// Scene
let scene = new THREE.Scene();

/**
 * Camera
 */
// Base camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 0, 1).setLength(20);

/**
 * Renderer
 */
let renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement).classList.add('webgl')

window.addEventListener("resize", (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/**
 * Light
 */
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

/**
 *  Pointer, loader
 */
//define the amount of points
let amount = 50000;
let g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(new Array(amount * 3).fill(0), 3));

//loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'https://threejs.org/examples/jsm/libs/draco/gltf/' );
const loader = new GLTFLoader();

loader.setDRACOLoader( dracoLoader );
loader.setPath( 'https://threejs.org/examples/models/gltf/AVIFTest/' );

let gltf1 = await loader.loadAsync( 'forest_house.glb');
gltf1.scene.updateMatrixWorld(true);
let model1 = new THREE.Mesh(mergeModel(gltf1.scene));
//positionStart 속성 추가
g.setAttribute("positionStart", pointification(model1, amount));

// Draco 로더를 해제합니다.
loader.setDRACOLoader( null );
loader.setPath( "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/" );

let gltf2 = await loader.loadAsync( 'DamagedHelmet.gltf' );
gltf2.scene.updateMatrixWorld(true);
let model2 = new THREE.Mesh(mergeModel(gltf2.scene, 5));
// positionEnd 속성을 추가
g.setAttribute("positionEnd", pointification(model2, amount));

// rotDir 속성을 추가
g.setAttribute("rotDir", new THREE.Float32BufferAttribute(new Array(amount).fill().map(p => Math.random() < 0.5 ? -1: 1), 1));

let pu = {
  morphRatio: {value: 0}
}
// 포인트를 생성하고 씬에 추가
scene.add(
  new THREE.Points(
    g,
    new THREE.PointsMaterial({
      color: 0x44ffff,
      size: 0.05,
      onBeforeCompile: shader => {
        // morphRatio 유니폼 추가
        shader.uniforms.morphRatio = pu.morphRatio;
        // 쉐이더 코드 수정
        shader.vertexShader = `
          uniform float morphRatio;
          attribute vec3 positionStart;
          attribute vec3 positionEnd;
          attribute float rotDir;

          mat2 rot2d(float a){ return mat2(cos(a), sin(a), -sin(a), cos(a));}
          ${shader.vertexShader}
        `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>

            vec3 pStart = positionStart;
            vec3 pEnd = positionEnd;

            float distRatio = sin(morphRatio * PI);

            vec3 pos = mix(pStart, pEnd, morphRatio);
            pos.xz *= rot2d(PI2 * morphRatio);
            transformed = pos + normalize(pos) * distRatio * 2.5;
          `
        );
      }
    })
  )
);


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".webgl",
    start: "top top",
    end: "bottom bottom",
    onUpdate: self => {
      // 스크롤 위치에 따라 모델 변환
      gsap.to(pu.morphRatio, { value: self.progress, duration: 1, ease: "Power1.easeInOut" }); // 전환 속도 조절

      updateModel();
    }
  });

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  let dt = clock.getDelta();
  renderer.render(scene, camera);
});

function updateModel() {
    let morphRatio = pu.morphRatio.value;
    let positionsStart = g.attributes.positionStart.array;
    let positionsEnd = g.attributes.positionEnd.array;
    let positions = g.attributes.position.array;

    for (let i = 0; i < amount; i++) {
      let x0 = positionsStart[i * 3];
      let y0 = positionsStart[i * 3 + 1];
      let z0 = positionsStart[i * 3 + 2];

      let x1 = positionsEnd[i * 3];
      let y1 = positionsEnd[i * 3 + 1];
      let z1 = positionsEnd[i * 3 + 2];

      positions[i * 3] = THREE.MathUtils.lerp(x0, x1, morphRatio);
      positions[i * 3 + 1] = THREE.MathUtils.lerp(y0, y1, morphRatio);
      positions[i * 3 + 2] = THREE.MathUtils.lerp(z0, z1, morphRatio);
    }

    g.attributes.position.needsUpdate = true;
  }

function mergeModel(model, scale = 1){
  let gs = [];
  model.traverse(child => {
    if(child.isMesh){
      let g = child.geometry.clone().toNonIndexed();
      for(let a in g.attributes){
        if (a != "position") g.deleteAttribute(a);
      }
      g.applyMatrix4(child.matrixWorld);
      gs.push(g);
    }
  })
  return mergeGeometries(gs).center().scale(scale, scale, scale);
}

function pointification(mesh, amount){
  let mss = new MeshSurfaceSampler(mesh).build();
  let pointsData = [];
  let v = new THREE.Vector3();
  for(let i = 0; i < amount; i++){
    mss.sample(v);
    v.toArray(pointsData, i * 3);
  }
  return new THREE.Float32BufferAttribute(pointsData, 3);
}
