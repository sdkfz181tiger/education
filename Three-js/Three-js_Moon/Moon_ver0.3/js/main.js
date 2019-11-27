//==========
// Three.js
// -> https://threejs.org/

import * as THREE from "../libs/three-js/build/three.module.js";
import Stats      from "../libs/three-js/modules/jsm/libs/stats.module.js";

import {OrbitControls} from "../libs/three-js/modules/jsm/controls/OrbitControls.js";

console.log("Hello Three.js!!");

const WINDOW_WIDTH  = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_ASPECT = window.innerWidth / window.innerHeight;

let camera, scene, renderer, controls;
let moon;

init();
animate();

function init(){

	// Camera
	camera = new THREE.PerspectiveCamera(50, WINDOW_ASPECT, 1, 1000);
	camera.position.set(0, 0, 600);

	// Scene
	scene = new THREE.Scene();

	// Light
	let ambLight = new THREE.AmbientLight(0x333333);
	scene.add(ambLight);

	let dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(5,3,5);
	scene.add(dirLight);

	// Texture
	let txLoader        = new THREE.TextureLoader();
	// let normalMap       = txLoader.load("./textures/tx_moon_1024x512.png");
	// let displacementMap = txLoader.load("./textures/dm_moon_1024x512.png");
	let normalMap       = txLoader.load("../textures/tx_moon_8192x4096.png");
	let displacementMap = txLoader.load("../textures/dm_moon_5760x2880.png");

	// Geometry
	let geometry = new THREE.SphereBufferGeometry(200, 200, 200);

	// Material
	let material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: normalMap,
		displacementMap: displacementMap,
		displacementScale: 5,
		displacementBias: 0.5
	});

	// Moon
	moon = new THREE.Mesh(geometry, material);
	scene.add(moon);

	// Renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
	document.body.appendChild(renderer.domElement);

	// Controls
	controls = new OrbitControls(camera, renderer.domElement);
	controls.minDistance = 210;
	controls.maxDistance = 800;
	controls.maxPolarAngle = Math.PI * 0.5;

	// Resize
	window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize(){

	// Camera
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// Renderer
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(){

	// Moon
	moon.rotation.y += 0.0005;

	// Controls, Renderer, Animation
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}