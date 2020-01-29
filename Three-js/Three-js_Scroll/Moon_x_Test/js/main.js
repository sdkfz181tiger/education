//==========
// Three.js
// -> https://threejs.org/

import * as THREE from "../libs/three-js/build/three.module.js";
import Stats      from "../libs/three-js/modules/jsm/libs/stats.module.js";
import Scroller   from "./scroller.js";

console.log("Hello Three.js!!");

const WINDOW_WIDTH  = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_ASPECT = window.innerWidth / window.innerHeight;

let camera, scene, renderer, moon;

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
	let normalMap       = txLoader.load("./textures/tx_moon_1024x512.png");
	let displacementMap = txLoader.load("./textures/dm_moon_1024x512.png");

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
	moon.rX = 0;
	moon.rY = 0;
	moon.rZ = 0;
	scene.add(moon);

	// Renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

	// Append to html
	let div = document.getElementById("three");
	div.appendChild(renderer.domElement);

	// Resize
	window.addEventListener("resize", onWindowResize, false);

	//==========
	// このあたりから参考にしてください

	// Scroller
	let scroller = new Scroller();
	window.onscroll = (e)=>{scroller.onScroll(e);};

	scroller.addEventListener("boxA", ()=>{
		console.log("boxA!!");
		moon.rX = 0;
		moon.rY = 0.01;
		moon.rZ = 0;
	});

	scroller.addEventListener("boxB", ()=>{
		console.log("boxB!!");
		moon.rX = 0;
		moon.rY = -0.01;
		moon.rZ = 0;
	});

	scroller.addEventListener("boxC", ()=>{
		console.log("boxC!!");
		moon.rX = 0.01;
		moon.rY = 0;
		moon.rZ = 0;
	});

	scroller.addEventListener("boxD", ()=>{
		console.log("boxD!!");
		moon.rX = -0.01;
		moon.rY = 0;
		moon.rZ = 0;
	});

	scroller.addEventListener("boxE", ()=>{
		console.log("boxE!!");
		moon.rX = 0;
		moon.rY = 0;
		moon.rZ = 0.01;
	});

	scroller.addEventListener("boxF", ()=>{
		console.log("boxF!!");
		moon.rX = 0;
		moon.rY = 0;
		moon.rZ = -0.01;
	});

	scroller.addEventListener("boxG", ()=>{
		console.log("boxG!!");
		moon.rX = 0;
		moon.rY = 0;
		moon.rZ = 0;
	});
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
	moon.rotation.x += moon.rX;
	moon.rotation.y += moon.rY;
	moon.rotation.z += moon.rZ;

	// Renderer, Animation
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}