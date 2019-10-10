//==========
// Three.js
// -> https://threejs.org/

import * as THREE from '../libs/three-js/build/three.module.js';
import Stats from '../libs/three-js/jsm/libs/stats.module.js';

console.log("Hello Three.js!!");

var camera, scene, renderer;
var light1, light2, light3, light4, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 100;

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
	var normalMap = textureLoader.load( "./textures/tx_moon_nasa.jpg" );
	var displacementMap = textureLoader.load( "./textures/dm_moon_nasa.jpg" );

	var material = new THREE.MeshPhongMaterial({
		color:0xffffff,
		map: normalMap,
		displacementMap: displacementMap,
		displacementScale: 2,
		displacementBias: 3
	});

	var geometry = new THREE.SphereBufferGeometry( 40, 40, 40 );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

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

	renderer.render( scene, camera );
}