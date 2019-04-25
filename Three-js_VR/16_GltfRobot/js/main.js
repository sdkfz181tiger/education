//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const models = {data:[
	{dir:"./models/gltf/RobotExpressive/", glb:"RobotExpressive.glb"},
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

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		// Camera
		let cContainer = tm.getCameraContainer();
		//let tl = new TimelineMax({repeat: -1, yoyo: true});
		//tl.to(cContainer.position, 10, {y: 50});

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		tm.addScene(skybox);

		let robo = new Robot(0, 0, 0);

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
				//helloCube(x, y, z);// Cube
				//helloWire(x, y, z);// Wireframe
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
	};
}

class Robot{

	constructor(cX, cY, cZ){
		this._cX = cX; this._cY = cY; this._cZ = cZ;
		this._group = new THREE.Group();
		this._group.position.set(cX, cY, cZ);
		tm.addGroup(this._group);
		this.setupRobot();
	}

	setupRobot(){
		
		this._robo = tm.findModels("RobotExpressive.glb");
		this._robo.scale.set(1.0, 1.0, 1.0);
		this._robo.position.set(0, 0, 0);
		this._robo.rotation.set(0, 0, 0);
		this._group.add(this._robo);// Add to group!!
	}
}

class Invaders{

	constructor(cX, cY, cZ){
		this._cX = cX; this._cY = cY; this._cZ = cZ;
		this._invaders = [];
		this._group = new THREE.Group();
		this._group.position.set(cX, cY, cZ);
		tm.addGroup(this._group);
		this.setupInvaders();
		this.wonderInvaders();
	}

	setupInvaders(){
		let padding = 4;
		let rows = 7;
		let cols = 13;
		let sX = (cols-1) * padding * -0.5;
		let sY = 0;
		let sZ = 0;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let num = r % 4 + 1;
				let name = "inv_" + num + ".obj";
				let x = sX + c * padding;
				let y = sY + r * padding;
				let z = 0;
				let clone = tm.findModels(name);
				clone.scale.set(0.3, 0.3, 0.3);
				clone.position.set(x, y, z);
				clone.rotation.set(0, Math.PI, 0);
				this._invaders.push(clone);
				this._group.add(clone);// Add to group!!
			}
		}
	}

	wonderInvaders(){
		let tl = new TimelineMax({repeat: -1, yoyo: false});
		tl.to(this._group.position, 1.0, {x: "+=4.0"});
		tl.to(this._group.position, 1.0, {x: "-=4.0"});
		tl.to(this._group.position, 1.0, {x: "-=4.0"});
		tl.to(this._group.position, 1.0, {x: "+=4.0"});
		tl.addCallback(()=>{
			this.stepInvader();
		});
	}

	stepInvader(){
		let area = 100;
		for(let i=0; i<this._invaders.length; i++){
			if(i%2 == 0){
				let rdmX = 100 * Math.random() - area * 0.5;
				let rdmY = 100 * Math.random() - area * 0.5;
				let rdmZ = 100 * Math.random() - area * 0.5;
				let tl = new TimelineMax({repeat: 1, yoyo: true});
				tl.to(this._invaders[i].position, 2.0, 
					{x: rdmX, y: rdmY, x: rdmX, z: rdmZ});
			}
		}
	}
}
