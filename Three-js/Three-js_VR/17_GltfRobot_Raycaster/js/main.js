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
let gltfLoader  = null;
let soundLoader = null;
let fontLoader  = null;

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	tm = new ThreeManager(0, 10, 25, 0, 10, 25);
	tm._renderer.setAnimationLoop(animate);

	gltfLoader = new GLTFLoader();
	gltfLoader.loadModels(models, onReadyModels, onError);

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

	// Robot
	let robot = new Robot(0, 0, -15);

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

		// Cube
		let geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
		let material = new THREE.MeshNormalMaterial();
		let p = 1.5;
		let startS = p * ACT_STATES.length * 0.5 - p*0.5;
		for(let i=0; i<ACT_STATES.length; i++){
			let cube = new THREE.Mesh(geometry, material);
			cube.position.set(p*i-startS, 0.5, 14);
			cube.name = ACT_STATES[i];
			tm.addGroup(cube);
		}
		let startE = p * ACT_EMOTES.length * 0.5 - p*0.5;
		for(let i=0; i<ACT_EMOTES.length; i++){
			let cube = new THREE.Mesh(geometry, material);
			cube.position.set(p*i-startE, 0.5, 14+p);
			cube.name = ACT_EMOTES[i];
			tm.addGroup(cube);
		}

		// Raycaster
		tm.setRaycasterListener((intersects)=>{
			for(let target of intersects){
				console.log("distance:" + target.distance + "_" + target.object.name);
				let name = target.object.name;
				if(name == "Idle")     robot.action("Idle", 3);
				if(name == "Walking")  robot.action("Walking", 3);
				if(name == "Running")  robot.action("Running", 3);
				if(name == "Dance")    robot.action("Dance", 3);
				if(name == "Death")    robot.action("Death", 3);
				if(name == "Sitting")  robot.action("Sitting", 3);
				if(name == "Standing") robot.action("Standing", 3);
				if(name == "Jump")     robot.action("Jump", 1.5);
				if(name == "Yes")      robot.action("Yes", 1.5);
				if(name == "No")       robot.action("No", 1.5);
				if(name == "Wave")     robot.action("Wave", 1.5);
				if(name == "Punch")    robot.action("Punch", 1.5);
				if(name == "ThumbsUp") robot.action("ThumbsUp", 1.5);
				if(name == "Head_1" || name == "Head_2") robot.action("Death", 5);
			}
		});
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
		// Test
		let sound = soundLoader.findSounds("test_1.mp3");
		sound.play();
	}

	function onReadyFonts(){
		console.log("You are ready to use fonts!!");
		// Test
		let font = fontLoader.findFonts("MisakiGothic");
		let text = fontLoader.createText("Robot!", font, 4, 0, 10, 0);
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
		this._model = gltfLoader.findModels("RobotExpressive.glb");
		// GLTF
		this._gltf = this._model.scene;
		this._gltf.scale.set(1.5, 1.5, 1.5);
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
				console.log(clip.name);
				action.clampWhenFinished = true;
				action.loop = THREE.LoopOnce;
			}
		}
		// Active
		this._previousAction = null;
		this._activeAction   = this._actions[ACT_STATES[0]];
		this._activeAction.play();
		// Flg
		this._actionFlg = false;
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
		if(this._actionFlg == true) return;
		this._actionFlg = true;// Flg
		let tl = new TimelineMax({repeat: 0, yoyo: false});
		tl.addCallback(()=>{this.actionRobot("Jump");});
		tl.to(this._group.position, 0.0, {delay: 1.2});
		tl.addCallback(()=>{this.actionRobot("Walking");});
		tl.to(this._group.position, 4.0, {z: "+=15.0"});
		tl.addCallback(()=>{this.actionRobot("Wave");});
		tl.to(this._group.position, 0.0, {delay: 1.2});
		tl.addCallback(()=>{
			this.actionRobot("Idle");
			this._actionFlg = false;// Flg
		});
	}

	action(name, sec){
		if(ACT_STATES.indexOf(name) < 0 && ACT_EMOTES.indexOf(name) < 0) return;
		if(this._actionFlg == true) return;
		this._actionFlg = true;// Flg
		let tl = new TimelineMax({repeat: 0, yoyo: false});
		tl.addCallback(()=>{this.actionRobot(name);});
		tl.to(this._group.position, 0.0, {delay: sec});
		tl.addCallback(()=>{
			this.actionRobot("Idle");
			this._actionFlg = false;// Flg
		});
	}

	update(){
		let dt = this._clock.getDelta();
		if(this._animationMixer) this._animationMixer.update(dt);
	}
}