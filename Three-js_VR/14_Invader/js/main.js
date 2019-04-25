//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const models = {data:[
	{dir:"./models/", mtl:"city_1.mtl", obj:"city_1.obj"},
	{dir:"./models/", mtl:"city_2.mtl", obj:"city_2.obj"},
	{dir:"./models/", mtl:"inv_1.mtl",  obj:"inv_1.obj"},
	{dir:"./models/", mtl:"inv_2.mtl",  obj:"inv_2.obj"},
	{dir:"./models/", mtl:"inv_3.mtl",  obj:"inv_3.obj"},
	{dir:"./models/", mtl:"inv_4.mtl",  obj:"inv_4.obj"},
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

		let city = new City(0, -25, 0);
		let invaders = new Invaders(0, 10, -10);

		/*
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
		*/
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
		let text = tm.createText("INVADER!", font, 8, 0, 5, 0);
		tm.addGroup(text);
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}

	// function helloCube(x, y, z){
	// 	console.log("helloCube!!");
	// 	let size = 1;

	// 	// Cube
	// 	let geometry = new THREE.BoxGeometry(size, size, size);
	// 	let material = new THREE.MeshNormalMaterial();
	// 	let cube = new THREE.Mesh(geometry, material);
	// 	cube.position.set(x, y, z);
	// 	tm.addGroup(cube);// Add to group!!
	// 	cubes.push(cube);

	// 	// Timeline
	// 	let dY = Math.floor(Math.random()*20+3) * size;
	// 	let tl = new TimelineMax({repeat: -1, yoyo: true});
	// 	tl.to(cube.position, 2, {y: dY});
	// 	tl.addCallback(()=>{
	// 		tl.timeScale(1.0);
	// 	}, 1.5);
	// 	tl.addCallback(()=>{
	// 		tl.timeScale(0.2);
	// 	}, 1.6);
	// }

	// Animate
	function animate(){
		tm.update();   // Manager
		ctlVR.update();// Controller
	};
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

class City{

	constructor(cX=0, cY=0, cZ=0){
		this._cX = cX; this._cY = cY; this._cZ = cZ;
		this._panels = [];
		this._group = new THREE.Group();
		this._group.position.set(cX, cY, cZ);
		tm.addGroup(this._group);
		this.setupCilinder();
		this.checkCilinder();
		this.rollCilinder();
	}

	setupCilinder(){
		let radius  = 24;
		let padding = 11;
		let rows    = 360;
		let cols    = 5;
		for(let r=0; r<rows; r+=30){
			for(let c=0; c<cols; c++){
				let num = Math.floor(Math.random() * 2) + 1;
				let name = "city_" + num + ".obj";
				let rad = r * DEG_TO_RAD;
				let x  = padding * c - (cols-1) * padding * 0.5;
				let y  = radius * Math.sin(rad);
				let z  = radius * Math.cos(rad);
				let rX = -rad + Math.PI * 0.5;
				let rY = 0;
				let rZ = 0;
				let clone = tm.findModels(name);
				clone.scale.set(0.1, 0.1, 0.1);
				clone.position.set(x, y, z);
				clone.rotation.set(rX, rY, rZ);
				this._panels.push(clone);
				this._group.add(clone);// Add to group!!
			}
		}
	}

	checkCilinder(){
		if(this._panels.length <= 0) return;
		for(let i=0; i<this._panels.length; i++){
			let position = this._panels[i].position;
			let rad = this._panels[i].rotation.x + this._group.rotation.x;
			let deg = (rad * RAD_TO_DEG + 90) % 360;
			if(45 < deg && deg < 180){
				this._panels[i].visible = true;
			}else{
				this._panels[i].visible = false;
			}
		}
		setTimeout(()=>{this.checkCilinder();}, 500);
	}

	rollCilinder(){
		let rad = Math.PI;
		let tl = new TimelineMax({repeat: -1, yoyo: true});
		tl.to(this._group.rotation, 5.0, {x: "+="+rad});
		tl.addCallback(()=>{console.log("yoyo!!");}, 0);
	}
}
