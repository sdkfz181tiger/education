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
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

let rootGroup   = null;
let player      = null;
let actors      = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	tm = new ThreeManager(0, 60, 90);

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

		// ThreeManager
		tm._renderer.setAnimationLoop(animate);

		// RootGroup
		rootGroup = tm.getGroup();

		// Player
		player = new Player(0, 0, +2, "tanuki_run_1.obj");

		// Camera
		let cContainer = tm.getCameraContainer();

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		rootGroup.add(skybox);

		// Tile
		let tile1 = new MyActor(-4, +0, +0, "road_1.obj");
		tile1.getPosition().y = -0.5;
		let tile2 = new MyActor(+0, +0, +0, "road_1.obj");
		tile2.getPosition().y = -0.5;
		let tile3 = new MyActor(+4, +0, +0, "road_1.obj");
		tile3.getPosition().y = -0.5;

		// Actors
		actors = [];

		let tree1 = new MyActor(+3, +0, -1, "tree_1.obj");
		actors.push(tree1);
		let tree2 = new MyActor(-1, +0, -1, "tree_2.obj");
		actors.push(tree2);

		let car1 = new MyActor(+4, +0, +0, "car_1.obj");
		actors.push(car1);
		let car2 = new MyActor(-5, +0, +1, "car_2.obj");
		actors.push(car2);

		let truck1 = new MyActor(-4, +0, +0, "truck_1.obj");
		actors.push(truck1);

		let wood1 = new MyActor(+6, +0, +1, "wood_1.obj", true);
		actors.push(wood1);
		let mWood1 = new TimelineMax({repeat: -1, yoyo: true});
		mWood1.to(wood1._group.position, 6.0, {x: "-="+120.0});

		let wood2 = new MyActor(-6, +0, +0, "wood_2.obj", true);
		actors.push(wood2);
		let mWood2 = new TimelineMax({repeat: -1, yoyo: true});
		mWood2.to(wood2._group.position, 10.0, {x: "+="+120.0});

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
						if(player.containsPoint(actor, 0, 0, -1)) flg = false;
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

	function createCube(w=3, h=3, d=3, x=0, y=0, z=0){
		let geometry = new THREE.BoxGeometry(w, h, d);
		let material = new THREE.MeshNormalMaterial();
		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		return mesh;
	}
}

class Player{

	constructor(gX, gY, gZ, name){
		console.log("Player");
		this._x = SIZE_GRID*gX; 
		this._y = SIZE_GRID*gY; 
		this._z = SIZE_GRID*gZ;
		this._name = name;
		this.init();
	}

	init(){
		// Group
		this._group = new THREE.Group();
		this._group.position.set(this._x, this._y, this._z);
		rootGroup.add(this._group);// Add to group!!
		// Clone
		let clone = objLoader.findModels(this._name);
		clone.scale.set(0.5, 0.5, 0.5);
		clone.position.set(0, 0, 0);
		clone.rotation.set(0, 0, 0);
		this._group.add(clone);// Add to group!!
		// Motion
		this._motionFlg = false;
		this._motionTl  = null;
	}

	getPosition(){
		return this._group.position;
	}

	containsPoint(target, offX=0, offY=0, offZ=0){
		let pX = this._group.position.x + offX*SIZE_GRID;
		let pY = this._group.position.y + offY*SIZE_GRID;
		let pZ = this._group.position.z + offZ*SIZE_GRID;
		let point = new THREE.Vector3(pX, pY, pZ);
		let box3 = new THREE.Box3().setFromObject(target._group);
		return box3.containsPoint(point);
	}

	stepOut(sX=0.0, sY=2.5, sZ=0.0, skipFlg=false){
		if(this._motionFlg == true) return;
		this._motionFlg = true;
		//console.log("stepOut:" + sX + ", " + sY + ", " + sZ);
		let timeUp   = 0.05;
		let timeDown = 0.1;
		this.ridingOff();// Riding off
		this._motionTl = new TimelineMax({repeat: 0, yoyo: false, onComplete:()=>{
			this._motionFlg = false;
			this.checkBoard();// Checking boards
		}});

		// Fit to grid
		let disX = this._group.position.x % SIZE_GRID;
		let cntX = Math.floor(this._group.position.x / SIZE_GRID);
		if(0 < disX){
			if(SIZE_GRID*0.5 < disX) cntX++;
			this._group.position.x = cntX * SIZE_GRID;
		}
		if(disX < 0){
			if(SIZE_GRID*-0.5 < disX) cntX++;
			this._group.position.x = cntX * SIZE_GRID;
		}

		if(sX != 0.0){
			let flg = (0.0 < sX)?+1:-1;
			this._motionTl.to(this._group.rotation, 0.1, 
				{y: Math.PI*flg*0.5, ease: Sine.easeOut});
		}
		if(sZ != 0.0){
			let flg = (0.0 < sZ)?0:1;
			this._motionTl.to(this._group.rotation, 0.1, 
				{y: Math.PI*flg, ease: Sine.easeOut});
		}
		if(skipFlg == false){
			// Sound
			soundLoader.playSound("step_ok.mp3");
		}else{
			sX = 0.0;
			sZ = 0.0;
			// Sound
			soundLoader.playSound("step_ng.mp3");
		}
		this._motionTl.to(this._group.position, timeUp,   
			{x: "+="+sX, y: "+="+sY, z: "+="+sZ, ease: Sine.easeOut});
		this._motionTl.to(this._group.position, timeDown, 
			{x: "+="+sX, y: "-="+sY, z: "+="+sZ, ease: Bounce.easeOut});
	}

	checkBoard(){
		console.log("checkBoard");
		for(let actor of actors){
			if(actor._boardFlg == false) continue;
			if(this.containsPoint(actor)){
				this.ridingOn(actor);// Riding on
			}
		}
	}

	ridingOn(board){
		if(this._board == null){
			console.log("ridingOn!!");
			this._board = board;
			this._surfX = this._group.position.x - board._group.position.x;
			this._surfY = this._group.position.y - board._group.position.y;
			this._surfZ = this._group.position.z - board._group.position.z;
		}
	}

	ridingOff(board){
		if(this._board != null){
			console.log("ridingOff!!");
			this._board = null;
			this._surfX = 0;
			this._surfY = 0;
			this._surfZ = 0;
		}
	}

	surfBoard(){
		if(this._board == null) return;
		let x = this._board._group.position.x + this._surfX;
		let y = this._board._group.position.y + this._surfY;
		let z = this._board._group.position.z + this._surfZ;
		this._group.position.set(x, y, z);
	}

	createClone(name, visible=false){
		//console.log("createClone:" + name);
		let clone = objLoader.findModels(name);
		clone.scale.set(0.5, 0.5, 0.5);
		clone.position.set(0, 0, 0);
		clone.rotation.set(0, 0, 0);
		clone.visible = visible;
		this._group.add(clone);// Add to group!!
		return clone;
	}
}

class MyActor{

	constructor(gX, gY, gZ, name, boardFlg=false){
		console.log("Actor");
		this._x = SIZE_GRID*gX; 
		this._y = SIZE_GRID*gY; 
		this._z = SIZE_GRID*gZ;
		this._name = name;
		this._boardFlg = boardFlg;
		this.init();
	}

	init(){
		// Group
		this._group = new THREE.Group();
		this._group.position.set(this._x, this._y, this._z);
		rootGroup.add(this._group);// Add to group!!
		// Clone
		let clone = objLoader.findModels(this._name);
		clone.scale.set(0.625, 0.625, 0.625);
		clone.position.set(0, 0, 0);
		clone.rotation.set(0, 0, 0);
		this._group.add(clone);// Add to group!!
	}

	getPosition(){
		return this._group.position;
	}
}