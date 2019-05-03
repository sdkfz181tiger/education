//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// MARKER
const MARKER = "marker";

// Emotions
const EMO_HAPPY    = "happy";
const EMO_ANGRY    = "angry";
const EMO_SAD      = "sad";
const EMO_PLEASANT = "pleasant";

const STEP_FORWARD = "forward";
const STEP_BACK    = "back";
const STEP_LEFT    = "left";
const STEP_RIGHT   = "right";

const tanukiFrame = {
	base: ["tanuki_talk_1.obj"],
	talk: ["tanuki_talk_1.obj", "tanuki_talk_2.obj", "tanuki_talk_1.obj", "tanuki_talk_2.obj"],
	sad:  ["tanuki_sad_1.obj", "tanuki_sad_2.obj", "tanuki_sad_1.obj", "tanuki_sad_2.obj"],
	run:  ["tanuki_run_1.obj", "tanuki_run_2.obj", "tanuki_run_1.obj", "tanuki_run_3.obj"]
}

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"city_1.mtl", obj:"city_1.obj"},
	{dir:"./models/obj/", mtl:"city_2.mtl", obj:"city_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_1.mtl", obj:"tanuki_talk_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_talk_2.mtl", obj:"tanuki_talk_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_1.mtl",  obj:"tanuki_sad_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_sad_2.mtl",  obj:"tanuki_sad_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_1.mtl",  obj:"tanuki_run_1.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_2.mtl",  obj:"tanuki_run_2.obj"},
	{dir:"./models/obj/", mtl:"tanuki_run_3.mtl",  obj:"tanuki_run_3.obj"},
	{dir:"./models/obj/", mtl:"chr_old.mtl",obj:"chr_old.obj"},
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"test_1.mp3"},
	{dir:"./sounds/", mp3:"test_2.mp3"},
	{dir:"./sounds/", mp3:"test_3.mp3"},
	{dir:"./sounds/", mp3:"test_4.mp3"},
]};

const fonts = {data:[
	{dir:"./fonts/", font:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", font:"MisakiMincho_Regular.json"},
]};

let tm = null;
let objLoader   = null;
let soundLoader = null;
let fontLoader  = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	tm = new ThreeManager(0, 60, 90, 0, 10, 25);
	tm._renderer.setAnimationLoop(animate);

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
		()=>{
			console.log("onPressed!!");
		}, 
		()=>{console.log("onReleased!!");});

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		tm.addScene(skybox);

		// Camera
		let cContainer = tm.getCameraContainer();

		// City, Tanuki
		//let city = new City("city_1.obj", 0, -5, 0);
		let tanu = new Tanuki("tanuki_talk_1.obj", 0, 0, 0);
		tanu.startAnimation("talk");

		// Cube
		let geometry = new THREE.BoxGeometry(3, 3, 3);
		let material = new THREE.MeshNormalMaterial();

		let ctlGroup = new THREE.Group();
		ctlGroup.position.set(0, 0, 50);
		tm.addGroup(ctlGroup);

		let ctlForward = new THREE.Mesh(geometry, material);
		ctlForward.position.set(0, 0, +4);
		ctlForward.name = STEP_FORWARD;
		ctlGroup.add(ctlForward);

		let ctlBack = new THREE.Mesh(geometry, material);
		ctlBack.position.set(0, 0, -4);
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
				console.log("distance:" + target.distance + "_" + target.object.name);
				console.log(target);
				let name = target.object.name;
				// Tanuki
				if(name == STEP_FORWARD) tanu.startAnimation("run").stepOut(0.0, 2.5, +5.0);
				if(name == STEP_BACK)    tanu.startAnimation("run").stepOut(0.0, 2.5, -5.0);
				if(name == STEP_LEFT)    tanu.startAnimation("run").stepOut(-5.0, 2.5, 0.0);
				if(name == STEP_RIGHT)   tanu.startAnimation("run").stepOut(+5.0, 2.5, 0.0);
			}
		});
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
		// Test
		//let sound = soundLoader.findSounds("test_1.mp3");
		//sound.play();
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Test
		let font = fontLoader.findFonts("MisakiGothic");
		let text = fontLoader.createText("CROSSY!!", font, 4, 0, 20, 0);
		tm.addGroup(text);
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
}

class Tanuki{

	constructor(name, x, y, z){
		console.log("Tanuki");
		this._x = x; this._y = y; this._z = z;
		this.init();
	}

	init(){
		// Group
		this._group = new THREE.Group();
		tm.addGroup(this._group);// Add to group!!
		// Frame
		this._frameKey   = "base";
		this._frameIndex = 0;
		this._frameAnimation = {};
		for(let key in tanukiFrame){
			this._frameAnimation[key] = [];
			for(let path of tanukiFrame[key]){
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

	motionJump(){
		if(this._motionFlg == true) return;
		this._motionFlg = true;
		console.log("motionJump!!");
		this._motionTl = new TimelineMax({repeat: 0, yoyo: false, onComplete:()=>{
			this._motionFlg = false;
			this.stopAnimation();
		}});
		this._motionTl.to(this._group.position, 0.3, {y: "+=10.0", ease: Sine.easeOut});
		this._motionTl.to(this._group.position, 1.0, {y: "-=10.0", ease: Bounce.easeOut});
	}

	stepOut(sX=0.0, sY=2.5, sZ=0.0){
		if(this._motionFlg == true) return;
		this._motionFlg = true;
		console.log("stepZ!!");
		this._motionTl = new TimelineMax({repeat: 0, yoyo: false, onComplete:()=>{
			this._motionFlg = false;
			this.stopAnimation();
		}});
		let timeUp   = 0.2;
		let timeDown = 0.3;
		this._motionTl.to(this._group.position, timeUp,   {x: "+="+sX, y: "+="+sY, z: "+="+sZ, ease: Sine.easeOut});
		this._motionTl.to(this._group.position, timeDown, {x: "+="+sX, y: "-="+sY, z: "+="+sZ, ease: Bounce.easeOut});
	}

	createClone(name, visible=false){
		console.log("createClone:" + name);
		let clone = objLoader.findModels(name);
		clone.scale.set(1, 1, 1);
		clone.position.set(this._x, this._y, this._z);
		clone.rotation.set(0, 0, 0);
		clone.visible = visible;
		this._group.add(clone);// Add to group!!
		return clone;
	}
}

class City{

	constructor(name, x, y, z){
		console.log("City");
		this._name = name;
		this._x = x; this._y = y; this._z = z;
		this.init();
	}

	init(){
		this._clone = objLoader.findModels(this._name);
		this._clone.scale.set(1, 1, 1);
		this._clone.position.set(this._x, this._y, this._z);
		this._clone.rotation.set(0, Math.PI*-0.5, 0);
		tm.addGroup(this._clone);// Add to group!!
	}
}