import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import imageSource from './color.jpg'

// console.log(imageSource)

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () =>
// {
//     console.log('loading started')
// }
// loadingManager.onLoad = () =>
// {
//     console.log('loading finished')
// }
// loadingManager.onProgress = () =>
// {
//     console.log('loading progressing')
// }
// loadingManager.onError = () =>
// {
//     console.log('loading error')
// }


const textureLoader = new THREE.TextureLoader(loadingManager)
const colortexture = textureLoader.load('/static/textures/minecraft.png');
colortexture.colorSpace = THREE.SRGBColorSpace

const alphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/static/textures/door/height.jpg')
const normalTexture = textureLoader.load('/static/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/static/textures/door/roughness.jpg')

// colortexture.repeat.x = 1
// colortexture.repeat.y = 1
// colortexture.wrapS = THREE.RepeatWrapping
// colortexture.wrapT = THREE.RepeatWrapping

// colortexture.minFilter = THREE.NearestFilter
colortexture.generateMipmaps = false;
colortexture.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map:colortexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()