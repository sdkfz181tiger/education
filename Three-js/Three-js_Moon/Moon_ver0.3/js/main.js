//==========
// Three.js
// -> https://threejs.org/

import * as THREE from '../libs/three-js/build/three.module.js';
import Stats from '../libs/three-js/modules/jsm/libs/stats.module.js';

import { OrbitControls } from '../libs/three-js/modules/jsm/controls/OrbitControls.js';

console.log("Hello Three.js!!");

var camera, scene, renderer, controls;
var light1, light2, light3, light4;
var moon;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 450;

	scene = new THREE.Scene();

	scene.add(new THREE.AmbientLight(0x333333));
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(5,3,5);
	scene.add(light);

	var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );

	light1 = new THREE.PointLight( 0xff0040, 2, 50 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
	scene.add( light2 );

	light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
	scene.add( light3 );

	light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
	scene.add( light4 );

	var textureLoader = new THREE.TextureLoader();
	var normalMap = textureLoader.load( "../textures/tx_moon_8192x4096.png" );
	var displacementMap = textureLoader.load( "../textures/dm_moon_5760x2880.png" );

	var material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: normalMap,
		displacementMap: displacementMap,
		displacementScale: 5,
		displacementBias: 0.5
	});

	var geometry = new THREE.SphereBufferGeometry( 200, 200, 200 );
	moon = new THREE.Mesh( geometry, material );
	scene.add( moon );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// Controls
	controls = new OrbitControls( camera, renderer.domElement );

	//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 30;
	controls.maxDistance = 500;

	controls.maxPolarAngle = Math.PI;

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

	requestAnimationFrame( animate );

	var time = Date.now() * 0.0005;

	moon.rotation.y += 0.0005;

	light1.position.x = Math.sin( time * 0.7 ) * 30;
	light1.position.y = Math.cos( time * 0.5 ) * 40;
	light1.position.z = Math.cos( time * 0.3 ) * 30;

	light2.position.x = Math.cos( time * 0.3 ) * 30;
	light2.position.y = Math.sin( time * 0.5 ) * 40;
	light2.position.z = Math.sin( time * 0.7 ) * 30;

	light3.position.x = Math.sin( time * 0.7 ) * 30;
	light3.position.y = Math.cos( time * 0.3 ) * 40;
	light3.position.z = Math.sin( time * 0.5 ) * 30;

	light4.position.x = Math.sin( time * 0.3 ) * 30;
	light4.position.y = Math.cos( time * 0.7 ) * 40;
	light4.position.z = Math.sin( time * 0.5 ) * 30;

	controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

	renderer.render( scene, camera );
}