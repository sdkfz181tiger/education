//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Steps
const STEP_FORWARD = "forward";
const STEP_BACK    = "back";
const STEP_LEFT    = "left";
const STEP_RIGHT   = "right";

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
	{dir:"./sounds/", mp3:"step_ok.mp3"},
	{dir:"./sounds/", mp3:"step_ng.mp3"}
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"},
]};

let tm          = null;
let rootGroup   = null;

let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

let player      = null;
let actors      = null;

window.onload = function(){
	console.log("OnLoad");

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

		// Player
		player = new Player(0, 0, +2, "tanuki_run_1.obj");

		// Camera
		let cContainer = tm.getCameraContainer();

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		rootGroup.add(skybox);

		// Tile
		let road1 = new MyActor(-4, +0, -4, "road_1.obj");
		road1.getPosition().y = -0.5;
		let road2 = new MyActor(+0, +0, -4, "road_1.obj");
		road2.getPosition().y = -0.5;
		let road3 = new MyActor(+4, +0, -4, "road_1.obj");
		road3.getPosition().y = -0.5;

		let river1 = new MyActor(-4, +0, +0, "river_1.obj");
		river1.getPosition().y = -0.5;
		let river2 = new MyActor(+0, +0, +0, "river_1.obj");
		river2.getPosition().y = -0.5;
		let river3 = new MyActor(+4, +0, +0, "river_1.obj");
		river3.getPosition().y = -0.5;

		// Actors
		actors = [];

		let tree1 = new MyActor(+3, +0, -1, "tree_1.obj");
		actors.push(tree1);
		let tree2 = new MyActor(+2, +0, -1, "tree_2.obj");
		actors.push(tree2);
		let tree3 = new MyActor(-2, +0, -1, "tree_2.obj");
		actors.push(tree3);
		let tree4 = new MyActor(-3, +0, -2, "tree_2.obj");
		actors.push(tree4);

		let car1 = new MyActor(+4, +0, -4, "car_1.obj");
		actors.push(car1);
		let car2 = new MyActor(-5, +0, -3, "car_2.obj");
		actors.push(car2);

		let truck1 = new MyActor(-4, +0, -4, "truck_1.obj");
		actors.push(truck1);

		let wood1 = new MyActor(+5, +0, +1, "wood_1.obj", true);
		actors.push(wood1);
		let mWood1 = new TimelineMax({repeat: -1, yoyo: true});
		mWood1.to(wood1._group.position, 6.0, {x: "-="+100.0});

		let wood2 = new MyActor(-3, +0, +0, "wood_2.obj", true);
		actors.push(wood2);
		let mWood2 = new TimelineMax({repeat: -1, yoyo: true});
		mWood2.to(wood2._group.position, 10.0, {x: "+="+60.0});

		// Cube
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();

		let ctlGroup = new THREE.Group();
		ctlGroup.position.set(0, 0, 50);
		rootGroup.add(ctlGroup);

		let ctlForward = new THREE.Mesh(geometry, material);
		ctlForward.position.set(0, 0, -4);
		ctlForward.name = STEP_FORWARD;
		ctlGroup.add(ctlForward);

		let ctlBack = new THREE.Mesh(geometry, material);
		ctlBack.position.set(0, 0, +4);
		ctlBack.name = STEP_BACK;
		ctlGroup.add(ctlBack);

		let ctlLeft = new THREE.Mesh(geometry, material);
		ctlLeft.position.set(-4, 0, 0);
		ctlLeft.name = STEP_LEFT;
		ctlGroup.add(ctlLeft);

		let ctlRight = new THREE.Mesh(geometry, material);
		ctlRight.position.set(+4, 0, 0);
		ctlRight.name = STEP_RIGHT;
		ctlGroup.add(ctlRight);

		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				let name = target.object.name;
				if(name === "") continue;

				// Player
				if(name == STEP_FORWARD){
					let flg = true;
					for(let actor of actors){
						if(actor._boardFlg == true) continue;// Board or not
						if(player.intersectsSensor(actor)) flg = false;// Sensor
					}
					player.stepOut(0.0, 2.5, -5.0, !flg);
				}

				if(name == STEP_BACK){
					let flg = true;
					for(let actor of actors){
						if(actor._boardFlg == true) continue;// Board or not
						if(player.containsPoint(actor, 0, 0, +1)) flg = false;
					}
					player.stepOut(0.0, 2.5, +5.0, !flg);
				}

				if(name == STEP_LEFT){
					let flg = true;
					for(let actor of actors){
						if(actor._boardFlg == true) continue;// Board or not
						if(player.containsPoint(actor, -1, 0, 0)) flg = false;
					}
					player.stepOut(-5.0, 2.5, 0.0, !flg);
				}

				if(name == STEP_RIGHT){
					let flg = true;
					for(let actor of actors){
						if(actor._boardFlg == true) continue;// Board or not
						if(player.containsPoint(actor, +1, 0, 0)) flg = false;
					}
					player.stepOut(+5.0, 2.5, 0.0, !flg);
				}
			}
		});

		// Shadow
		tm._renderer.shadowMap.enabled = true;

		// Animation
		tm._renderer.setAnimationLoop(animate);
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Test
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
		if(player != null) player.surfBoard();// Surfing
	};
}