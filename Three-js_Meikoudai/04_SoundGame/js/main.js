//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"city_1.mtl",        obj:"city_1.obj"},
	{dir:"./models/obj/", mtl:"city_2.mtl",        obj:"city_2.obj"},
	{dir:"./models/obj/", mtl:"obj_red.mtl",       obj:"obj_red.obj"},
	{dir:"./models/obj/", mtl:"obj_green.mtl",     obj:"obj_green.obj"},
	{dir:"./models/obj/", mtl:"obj_blue.mtl",      obj:"obj_blue.obj"},
	{dir:"./models/obj/", mtl:"tree_1.mtl",        obj:"tree_1.obj"},
	{dir:"./models/obj/", mtl:"tree_2.mtl",        obj:"tree_2.obj"},
	{dir:"./models/obj/", mtl:"car_1.mtl",         obj:"car_1.obj"},
	{dir:"./models/obj/", mtl:"car_2.mtl",         obj:"car_2.obj"},
	{dir:"./models/obj/", mtl:"car_3.mtl",         obj:"car_3.obj"}, 
	{dir:"./models/obj/", mtl:"truck_1.mtl",       obj:"truck_1.obj"},
	{dir:"./models/obj/", mtl:"truck_2.mtl",       obj:"truck_2.obj"},
	{dir:"./models/obj/", mtl:"wood_1.mtl",        obj:"wood_1.obj"},
	{dir:"./models/obj/", mtl:"wood_2.mtl",        obj:"wood_2.obj"},
	{dir:"./models/obj/", mtl:"road_1.mtl",        obj:"road_1.obj"},
	{dir:"./models/obj/", mtl:"river_1.mtl",       obj:"river_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_2.mtl", obj:"tanuki_talk_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_1.mtl",  obj:"tanuki_sad_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_2.mtl",  obj:"tanuki_sad_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_1.mtl",  obj:"tanuki_run_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_2.mtl",  obj:"tanuki_run_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_3.mtl",  obj:"tanuki_run_3.obj"},
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"effect_1.mp3"}
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"},
]};

// Howler
let howl        = null;
let currentTime = 0.0;

// ThreeManager
let tm          = null;
let rootGroup   = null;

// Loader
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

window.onload = function(){
	console.log("OnLoad");
	readyHowler();// Ready
}

// Howler.js
function readyHowler(){
	// Howler
	let src = "./sounds/bgm_1.mp3";
	howl = new Howl({src: [src]});

	howl.on("load", function(){
		console.log("Howler:load");
		howl.volume(1.0);// Volume 0.0 ~ 1.0
		readyThreeJS();// Ready
	});

	howl.on("play", function(){
		console.log("Howler:play");
	});

	howl.on("end", function(){
		console.log("Howler:end");
	});
}

// Three.js
function readyThreeJS(){
	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	tm = new ThreeManager(0, 60, 90);

	// RootGroup
	rootGroup = tm.getGroup();

	// Loader
	objLoader = new ObjLoader();
	objLoader.loadModels(models, onReadyModels, onError);
	soundLoader = new SoundLoader(tm.getCamera());
	soundLoader.loadSounds(sounds, onReadySounds, onError);
	fontLoader = new FontLoader();
	fontLoader.loadFonts(fonts, onReadyFonts, onError);

	// Controller
	let ctlVR = new CtlVR();
	ctlVR.setTouchpadListener(
		(axes)=>{console.log("onPressed:"  + axes[0] + ", " + axes[1]);}, 
		(axes)=>{console.log("onReleased:" + axes[0] + ", " + axes[1]);});
	ctlVR.setTriggerListener(
		()=>{console.log("onPressed!!");}, 
		()=>{console.log("onReleased!!");});

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		// Camera
		let cContainer = tm.getCameraContainer();

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		rootGroup.add(skybox);
		
		// Cube
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();

		let ctlGroup = new THREE.Group();
		ctlGroup.position.set(0, 0, 50);
		rootGroup.add(ctlGroup);

		let ctlForward = new THREE.Mesh(geometry, material);
		ctlForward.position.set(0, 0, -4);
		ctlForward.name = "hoge";
		ctlGroup.add(ctlForward);

		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				let name = target.object.name;
				if(name === "") continue;
				console.log("name:" + name);
			}
		});

		// Shadow
		tm._renderer.shadowMap.enabled = true;

		// Animation
		tm._renderer.setAnimationLoop(animate);

		// Howler
		howl.play();
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Font
		let font = fontLoader.findFonts("MisakiGothic");
		let text = fontLoader.createText("How are you!?", font, 4, 0, 20, -50);
		rootGroup.add(text);
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}

	// Animate
	function animate(){
		tm.update();   // Manager
		ctlVR.update();// Controller
		// Time
		let cTime = howl.seek() || 0;
		let tTime = howl.duration();
		let per = Math.floor((cTime/tTime)*100);
		console.log(per + "%");
	};
}