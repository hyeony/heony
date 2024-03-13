import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures 
 */
const textureLoader = new THREE.TextureLoader();

// const doorColorTexture = textureLoader.load('/static/textures/door/color.jpg')
// const doorAlphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('/static/textures/door/height.jpg')
// const doorNormalTexture = textureLoader.load('/static/textures/door/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('/static/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/static/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/static/textures/gradients/5.jpg')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
//MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();



// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true

//MeshMatrcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

//MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

//MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 700
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial
const material = new THREE.MeshToonMaterial()
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
material.gradientMap = gradientTexture




// material.color = new THREE.Color(0xff0000);
// material.transparent = true
// material.opacity = 0.5

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x= -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    //Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.13 * elapsedTime
    plane.rotation.x = -0.13 * elapsedTime
    torus.rotation.x = -0.13 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()