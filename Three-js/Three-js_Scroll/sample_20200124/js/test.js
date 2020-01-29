//==========
// Three.js
// -> https://threejs.org/

import * as THREE from "../libs/three-js/build/three.module.js";
// import Stats      from "../libs/three-js/modules/jsm/libs/stats.module.js";
import Scroller   from "./scroller.js";

console.log("テストだよ!!");

const WINDOW_WIDTH  = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_ASPECT = window.innerWidth / window.innerHeight;

let camera, scene, renderer,
		particles,materials = [],parameters,i,h,color,size,object;

init();
animate();

function init(){


	// Camera
	camera = new THREE.PerspectiveCamera(50, WINDOW_ASPECT, 1, 1000);
	// camera.position.set(0, 0, 600);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 600;
	camera.pZ = 600;

	// Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xffffff, 0.0001);

	window.camMoving = false;
	window.camMoviingTime = 0;

	window.CamFirst = new THREE.Vector3(0,0,0);  //開始位置
	window.CamEnd = new THREE.Vector3(0,0,0);  //終了位置

	// // Light

	// let ambLight = new THREE.AmbientLight(0x333333);
	// scene.add(ambLight);
	//
	// let dirLight = new THREE.DirectionalLight(0xffffff, 1);
	// dirLight.position.set(5,3,5);
	// scene.add(dirLight);
	//

	// // Texture

	// let txLoader        = new THREE.TextureLoader();
	// let normalMap       = txLoader.load("./textures/tx_moon_1024x512.png");
	// let displacementMap = txLoader.load("./textures/dm_moon_1024x512.png");

	// Geometry
	let geometry = new THREE.Geometry();
		for ( i = 0; i< 2000; i++) {
			let vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2000 - 100;
			vertex.y = Math.random() * 2000 - 1000;
			vertex.z = Math.random() * 2000 - 1000;
			geometry.vertices.push ( vertex );
		}
	// Parameters
		parameters = [
			[ [1, 1, 0.5], 5],
			[ [0.95, 1, 0.5], 4],
			[ [0.90, 1, 0.5], 3],
			[ [0.85, 1, 0.5], 2],
			[ [0.80, 1, 0.5], 1]
		];

		// Particles size,color,material
		for ( i = 0; i < parameters.length; i++){
			color = parameters[i][0];
			size = parameters[i][1];
			materials[i] = new THREE.PointsMaterial( {size: size} );
			particles = new THREE.Points( geometry, materials[i] );
			particles.rotation.x = Math.random() * 6;
			particles.rotation.y = Math.random() * 6;
			particles.rotation.z = Math.random() * 6;
			scene.add(particles);
		}


	// Material
	// let material = new THREE.MeshPhongMaterial({
	// 	color:0xffffff,
	// 	map: normalMap,
	// 	displacementMap: displacementMap,
	// 	displacementScale: 5,
	// 	displacementBias: 0.5
	// });

	// Moon
	// moon = new THREE.Mesh(geometry, material);
	// particles.rX = 0;
	// particles.rY = 0;
	// particles.rZ = 0;
	// scene.add(moon);

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
		console.log("boxAだよ!!");
		// camera.pZ = 700;
		window.CamEnd = new THREE.Vector3(0,0,700);  //終了位置
	});

	scroller.addEventListener("boxB", ()=>{
		console.log("boxBよ!!");
		// camera.pZ = 800;
		window.CamEnd = new THREE.Vector3(0,0,800);  //終了位置と指定してあげたいが発火されない
	});

	scroller.addEventListener("boxC", ()=>{
		console.log("boxCよ!!");
		// camera.pZ = 900;
		window.CamEnd = new THREE.Vector3(0,0,900);  //終了位置
	});

	scroller.addEventListener("boxD", ()=>{
		console.log("boxDよ!!");
		// camera.pZ = 1000;
		window.CamEnd = new THREE.Vector3(0,0,1000);  //終了位置
	});

	scroller.addEventListener("boxE", ()=>{
		console.log("boxEよ!!");
		// camera.pZ = 1100;
		window.CamEnd = new THREE.Vector3(0,0,1100);  //終了位置
	});

	scroller.addEventListener("boxF", ()=>{
		console.log("boxFよ!!");
		// camera.pZ = 1200;
		window.CamEnd = new THREE.Vector3(0,0,1200);  //終了位置
	});

	scroller.addEventListener("boxG", ()=>{
		console.log("boxGよ!!");
		// camera.pZ = 1300;
	});

	scroller.addEventListener("boxH", ()=>{
		console.log("boxHよ!!");
		// camera.pZ = 1400;
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
	// moon.rotation.x += moon.rX;
	// moon.rotation.y += moon.rY;
	// moon.rotation.z += moon.rZ;


	// Renderer, Animation
	// renderer.render(scene, camera);
	
	requestAnimationFrame(animate);
	render();
}

function render() {
	let time = Date.now() * 0.00005;
	 for ( i = 0; i < scene.children.length; i++){
		  object = scene.children[i];
		 if( object instanceof THREE.Points) {
			 object.rotation.y = time * ( i< 4 ? i + 1 : - ( i + 1 ) );
		 }
	 }
	 for ( i = 0; i < materials.length; i++) {
		 color = parameters[i][0];
		 h = ( 360 * ( color[0] + time ) % 360) / 360;
		 materials[i].color.setHSL( h, color[1], color[2] );
	 }

	 // camera.position.z = camera.pZ;

	 if(window.camMoving){

			//すごく単純に、50フレーム（1秒弱）でカメラが移動しきる感じにしてあります。
	　　if(window.camMoviingTime < 50){

					window.camMoviingTime++;  //経過フレーム数

					//中間地点の入れ物を作ります。
					const movingCam = window.CamFirst.lerp(window.CamEnd , window.camMoviingTime * 0.002 )

					camera.position.copy(movingCam);

			}
	 }


	 camera.lookAt( scene.position );
	 renderer.render( scene, camera);
}
