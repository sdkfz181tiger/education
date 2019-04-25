//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const STATES = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"];
const EMOTES = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

// Data
const models = {data:[
	{dir:"./models/gltf/RobotExpressive/", glb:"RobotExpressive.glb"}
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

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	tm = new ThreeManager(0, 10, 45, 0, 0, 0);
	tm._renderer.setAnimationLoop(animate);
	tm.loadModels(models, onReadyModels, onError);
	tm.loadSounds(sounds, onReadySounds, onError);
	tm.loadFonts(fonts,   onReadyFonts,  onError);

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

	// Robot
	let robot = new Robot(0, 0, 0);

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		tm.addScene(skybox);

		// Camera
		let cContainer = tm.getCameraContainer();

		// Robot
		robot.setupRobot();
		robot.wanderRobot();

		// Cubes / Wireframe
		let pad  = 2;
		let rows = 10;
		let cols = 10;
		let startX = (cols-1) * pad * -0.5;
		let startZ = (rows-1) * pad * -0.5;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let x = startX + c * pad;
				let y = 0;
				let z = startZ + r * pad;
			}
		}
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
		// Test
		let sound = tm.findSounds("test_1.mp3");
		sound.play();
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Test
		let font = tm.findFonts("MisakiGothic");
		let text = tm.createText("Robot!", font, 8, 0, 5, 0);
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
		robot.update();// Robot
	};
}

class Robot{

	constructor(cX, cY, cZ){
		this._cX = cX; this._cY = cY; this._cZ = cZ;
		this._clock = new THREE.Clock();
		this._group = new THREE.Group();
		this._group.position.set(cX, cY, cZ);
		tm.addGroup(this._group);
	}

	setupRobot(){
		// Model
		this._model = tm.findModels("RobotExpressive.glb");
		// GLTF
		this._gltf = this._model.scene;
		this._gltf.scale.set(3.0, 3.0, 3.0);
		this._gltf.position.set(0, 0, 0);
		this._gltf.rotation.set(0, 0, 0);
		this._group.add(this._gltf);// Add to group!!
		// Animations
		this._animations = this._model.animations;
		this.readyAnimationMixer(this._gltf, this._animations);
	}

	readyAnimationMixer(gltf, animations){
		// AnimationMixer
		this._animationMixer = new THREE.AnimationMixer(gltf);
		let actions = {};
		for(let i=0; i<animations.length; i++){
			let clip   = animations[i];
			let action = this._animationMixer.clipAction(clip);
			console.log(clip.name);
			actions[clip.name] = action;
			if(0 <= EMOTES.indexOf(clip.name) || 4 <= STATES.indexOf(clip.name)){
				action.clampWhenFinished = true;
				action.loop = THREE.LoopOnce;
			}
		}
		// Active
		this._activeAction = actions[STATES[0]];
		this._activeAction.play();
	}

	wanderRobot(){
		let tl = new TimelineMax({repeat: -1, yoyo: false});
		tl.to(this._group.position, 1.0, {x: "+=4.0"});
		tl.to(this._group.position, 1.0, {x: "-=4.0"});
		tl.to(this._group.position, 1.0, {x: "-=4.0"});
		tl.to(this._group.position, 1.0, {x: "+=4.0"});
		tl.addCallback(()=>{
			this.stepRobot();
		});
	}

	stepRobot(){
		let area = 30;
		let rdmX = area * Math.random() - area * 0.5;
		let rdmY = 0.0;
		let rdmZ = area * Math.random() - area * 0.5;
		let tl = new TimelineMax({repeat: 1, yoyo: true});
		tl.to(this._group.position, 2.0, 
			{x: rdmX, y: rdmY, x: rdmX, z: rdmZ});
	}

	update(){
		let dt = this._clock.getDelta();
		if(this._animationMixer) this._animationMixer.update(dt);
	}
}