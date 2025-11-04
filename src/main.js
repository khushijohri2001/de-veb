// Minimal Three.js scene with an animated Icosahedron
import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 6);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambient);

const keyLight = new THREE.PointLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Icosahedron geometry
const geometry = new THREE.IcosahedronGeometry(2, 50, 50);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: {
      value: 0,
    },
    uColorChange: {
      value: 0,
    },
  },
});

const icosa = new THREE.Mesh(geometry, material);
scene.add(icosa);

icosa.position.y = -2.5;

// Animations GSAP
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing",
    start: "top top",
    end: "bottom center",
    scrub: 2,
  },
});

tl.to(
  icosa.position,
  {
    y: 0,
    z: -2,
    ease: "power2.inOut",
  },
  "a"
).to(
  material.uniforms.uColorChange,
  {
    value: 1,
    ease: "linear",
  },
  "a"
).to(
  ".landing h1", {
    opacity: 0
  },
  "a"
).to(
  ".landing p", {
    opacity: 1
  }
)

// Resize handling
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  material.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}

animate();
