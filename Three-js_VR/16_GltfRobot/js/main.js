//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const ACT_STATES = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"];
const ACT_EMOTES = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

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
	tm = new ThreeManager(0, 10, 25, 0, 10, 25);
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
		setTimeout(()=>{
			robot.greeting();
		}, 500);

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
		let text = tm.createText("Robot!", font, 4, 0, 10, 0);
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
		this._gltf.scale.set(2.0, 2.0, 2.0);
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
		this._actions = {};
		for(let i=0; i<animations.length; i++){
			let clip   = animations[i];
			let action = this._animationMixer.clipAction(clip);
			this._actions[clip.name] = action;
			if(4 <= ACT_STATES.indexOf(clip.name) || 0 <= ACT_EMOTES.indexOf(clip.name)){
				action.clampWhenFinished = true;
				action.loop = THREE.LoopOnce;
			}
		}
		// Active
		this._previousAction = null;
		this._activeAction   = this._actions[ACT_STATES[0]];
		this._activeAction.play();
	}

	actionRobot(name){
		if(ACT_STATES.indexOf(name) < 0 && ACT_EMOTES.indexOf(name) < 0) return;

		this._previousAction = this._activeAction;
		this._activeAction   = this._actions[name];
		if(this._activeAction !== this._previousAction){
			this._previousAction.fadeOut(0.5);
		}

		this._activeAction.reset()
						.setEffectiveTimeScale(1)
						.setEffectiveWeight(1)
						.fadeIn(0.5)
						.play();
	}

	greeting(){
		let tl = new TimelineMax({repeat: 0, yoyo: false});
		tl.addCallback(()=>{this.actionRobot("Jump");});
		tl.to(this._group.position, 0.0, {delay: 1.2});
		tl.addCallback(()=>{this.actionRobot("Walking");});
		tl.to(this._group.position, 4.0, {z: "+=15.0"});
		tl.addCallback(()=>{this.actionRobot("Wave");});
		tl.to(this._group.position, 0.0, {delay: 1.2});
		tl.addCallback(()=>{this.actionRobot("Idle");});
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