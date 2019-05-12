//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Emotions
const STEP_FORWARD = "forward";
const STEP_BACK    = "back";
const STEP_LEFT    = "left";
const STEP_RIGHT   = "right";

const playerFrame = {
	base: ["tanuki_talk_1.obj"],
	talk: ["tanuki_talk_1.obj", "tanuki_talk_2.obj", "tanuki_talk_1.obj", "tanuki_talk_2.obj"],
	sad:  ["tanuki_sad_1.obj", "tanuki_sad_2.obj", "tanuki_sad_1.obj", "tanuki_sad_2.obj"],
	run:  ["tanuki_run_1.obj", "tanuki_run_2.obj", "tanuki_run_1.obj", "tanuki_run_3.obj"]
}

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
let rootGroup   = null;
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

let walls = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	tm = new ThreeManager(0, 60, 90);
	tm._renderer.setAnimationLoop(animate);

	rootGroup = tm.getGroup();

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

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		rootGroup.add(skybox);

		// Camera
		let cContainer = tm.getCameraContainer();

		// Player
		let player = new Player(0, 0, 0);
		player.startAnimation("base");

		// Tile
		let tile1 = new MyModel(-4, +0, +0, "road_1.obj");
		tile1.getPosition().y = -0.5;
		let tile2 = new MyModel(+0, +0, +0, "road_1.obj");
		tile2.getPosition().y = -0.5;
		let tile3 = new MyModel(+4, +0, +0, "road_1.obj");
		tile3.getPosition().y = -0.5;

		// Walls
		walls = [];
		let wallR = new MyModel(+3, +0, -1, "tree_1.obj");
		walls.push(wallR);
		let wallG = new MyModel(-1, +0, -1, "tree_2.obj");
		walls.push(wallG);
		let wallB = new MyModel(+1, +0, +0, "car_1.obj");
		walls.push(wallB);

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
					for(let wall of walls){
						let dist = player.calcDistance(wall.getPosition(), 0, -1);
						if(dist < SIZE_GRID*0.5) flg = false;
					}
					if(flg){
						player.startAnimation("run").stepOut(0.0, 2.5, -5.0);
					}else{
						player.startAnimation("run").stepOut(0.0, 2.5, 0.0);
					}
				}

				if(name == STEP_BACK){
					let flg = true;
					for(let wall of walls){
						let dist = player.calcDistance(wall.getPosition(), 0, +1);
						if(dist < SIZE_GRID*0.5) flg = false;
					}
					if(flg){
						player.startAnimation("run").stepOut(0.0, 2.5, +5.0);
					}else{
						player.startAnimation("run").stepOut(0.0, 2.5, 0.0);
					}
				}

				if(name == STEP_LEFT){
					let flg = true;
					for(let wall of walls){
						let dist = player.calcDistance(wall.getPosition(), -1, 0);
						if(dist < SIZE_GRID*0.5) flg = false;
					}
					if(flg){
						player.startAnimation("run").stepOut(-5.0, 2.5, 0.0);
					}else{
						player.startAnimation("run").stepOut(0.0, 2.5, 0.0);
					}
				}

				if(name == STEP_RIGHT){
					let flg = true;
					for(let wall of walls){
						let dist = player.calcDistance(wall.getPosition(), +1, 0);
						if(dist < SIZE_GRID*0.5) flg = false;
					}
					if(flg){
						player.startAnimation("run").stepOut(+5.0, 2.5, 0.0);
					}else{
						player.startAnimation("run").stepOut(0.0, 2.5, 0.0);
					}
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
	};

	function createCube(w=3, h=3, d=3, x=0, y=0, z=0){
		let geometry = new THREE.BoxGeometry(w, h, d);
		let material = new THREE.MeshNormalMaterial();
		let mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		return mesh;
	}
}

class City{

	constructor(gX, gY, gZ, name){
		console.log("Wall");
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
		// Random
		let rdm = Math.floor(Math.random() * 2);
		// Clone
		let clone = objLoader.findModels(this._name);
		clone.scale.set(0.5, 0.5, 0.5);
		clone.position.set(0, 0, 0);
		clone.rotation.set(0, Math.PI*rdm, 0);
		this._group.add(clone);// Add to group!!
	}

	getPosition(){
		return this._group.position;
	}
}

class Player{

	constructor(gX, gY, gZ){
		console.log("Player");
		this._x = SIZE_GRID*gX; 
		this._y = SIZE_GRID*gY; 
		this._z = SIZE_GRID*gZ;
		this.init();
	}

	init(){
		// Group
		this._group = new THREE.Group();
		this._group.position.set(this._x, this._y, this._z);
		rootGroup.add(this._group);// Add to group!!
		// Frame
		this._frameAnimation = {};
		for(let key in playerFrame){
			this._frameAnimation[key] = [];
			for(let path of playerFrame[key]){
				let clone = this.createClone(path);
				this._frameAnimation[key].push(clone);
			}
		}
		this._tickFlg = false;
		this._tickId  = null;
		// Motion
		this._motionFlg = false;
		this._motionTl  = null;
	}

	getPosition(){
		return this._group.position;
	}

	calcDistance(position, offX=0, offZ=0){
		let difX = position.x - (this._group.position.x + offX*SIZE_GRID);
		let difZ = position.z - (this._group.position.z + offZ*SIZE_GRID);
		let dist = Math.floor(Math.sqrt(difX*difX + difZ*difZ));
		return dist;
	}

	createSensor(x=0, y=0, z=0, w=2, h=2, d=2){
		let geometry = new THREE.BoxGeometry(w, h, d);
		let material = new THREE.MeshNormalMaterial();
		let sensor = new THREE.Mesh(geometry, material);
		sensor.position.set(x, y+h*0.5, z);
		return sensor;
	}

	startAnimation(key){
		this._frameKey   = key;
		this._frameIndex = 0;
		for(let key in this._frameAnimation){
			let animation = this._frameAnimation[key];
			for(let animate of animation){
				animate.visible = false;
			}
		}
		this._tickFlg = true;
		this.tickAnimation();
		return this;
	}

	stopAnimation(){
		this._tickFlg = false;
		if(this._tickId) clearTimeout(this._tickId);
	}

	tickAnimation(){
		//console.log("tick:" + this._frameKey + ", " + this._frameIndex);
		this._frameIndex++;
		let total = this._frameAnimation[this._frameKey].length;
		if(total <= 1) this._tickFlg = false;
		if(total <= this._frameIndex){
			this._frameIndex = 0;
		}
		for(let i=0; i<total; i++){
			if(i === this._frameIndex){
				this._frameAnimation[this._frameKey][i].visible = true;
			}else{
				this._frameAnimation[this._frameKey][i].visible = false;
			}
		}
		if(this._tickFlg == false) return;
		if(this._tickId) clearTimeout(this._tickId);
		this._tickId = setTimeout(()=>{this.tickAnimation();}, 150);
	}

	stepOut(sX=0.0, sY=2.5, sZ=0.0){
		if(this._motionFlg == true) return;
		this._motionFlg = true;
		//console.log("stepOut:" + sX + ", " + sZ);
		let timeUp   = 0.2;
		let timeDown = 0.3;
		this._motionTl = new TimelineMax({repeat: 0, yoyo: false, onComplete:()=>{
			this._motionFlg = false;
			this.stopAnimation();
		}});
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
		this._motionTl.to(this._group.position, timeUp,   
			{x: "+="+sX, y: "+="+sY, z: "+="+sZ, ease: Sine.easeOut});
		this._motionTl.to(this._group.position, timeDown, 
			{x: "+="+sX, y: "-="+sY, z: "+="+sZ, ease: Bounce.easeOut});
		// Sound
		if(sX != 0.0 || sZ != 0.0){
			soundLoader.playSound("step_ok.mp3");
		}else{
			soundLoader.playSound("step_ng.mp3");	
		}
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

class MyModel{

	constructor(gX, gY, gZ, name){
		console.log("Wall");
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
		clone.scale.set(0.625, 0.625, 0.625);
		clone.position.set(0, 0, 0);
		clone.rotation.set(0, 0, 0);
		this._group.add(clone);// Add to group!!
	}

	getPosition(){
		return this._group.position;
	}
}