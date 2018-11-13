//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const assets = {data:[
	{dir:"./models/", mtl:"city_1.mtl", obj:"city_1.obj"},
	{dir:"./models/", mtl:"city_2.mtl", obj:"city_2.obj"},
	{dir:"./models/", mtl:"inv_1.mtl", obj:"inv_1.obj"},
	{dir:"./models/", mtl:"inv_2.mtl", obj:"inv_2.obj"},
	{dir:"./models/", mtl:"inv_3.mtl", obj:"inv_3.obj"},
	{dir:"./models/", mtl:"inv_4.mtl", obj:"inv_4.obj"},
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"test_1.mp3"},
	{dir:"./sounds/", mp3:"test_2.mp3"},
	{dir:"./sounds/", mp3:"test_3.mp3"},
	{dir:"./sounds/", mp3:"test_4.mp3"},
]};

const faces = {data:[
	{dir:"./fonts/", face:"MisakiGothic_Regular.json"},
	{dir:"./fonts/", face:"MisakiMincho_Regular.json"},
]};

let tm     = null;
let models = [];
let mp3s   = [];
let fonts  = [];

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	tm = new ThreeManager(0, 10, 45, 0, 0, 0);
	tm._renderer.setAnimationLoop(animate);
	tm.loadAssets(assets,
		(results)=>{onReadyAssets(results);},
		(error)=>{onError(error);});
	tm.loadSounds(sounds,
		(results)=>{onReadySounds(results);},
		(error)=>{console.log(error);});
	tm.loadFaces(faces,
		(results)=>{onReadyFaces(results);},
		(error)=>{console.log(error);});

	// Controller
	let ctlVR = new CtlVR();
	ctlVR.setTouchpadListener(
		(axes)=>{console.log("onPressed:"  + axes[0] + ", " + axes[1]);}, 
		(axes)=>{console.log("onReleased:" + axes[0] + ", " + axes[1]);});
	ctlVR.setTriggerListener(
		()=>{
			console.log("onPressed!!");
			mp3s[0].play();// Test
		}, 
		()=>{console.log("onReleased!!");});

	let invaders = [];
	let cubes    = [];

	// Ready
	function onReadyAssets(results){
		console.log("You are ready to use assets!!");
		models = results;// All assets

		// Camera
		let cContainer = tm.getCameraContainer();
		//let tl = new TimelineMax({repeat: -1, yoyo: true});
		//tl.to(cContainer.position, 10, {y: 50});

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_space.png", 6, 300);
		tm.addScene(skybox);

		showCity("./models/", "city_1.obj", -26, 0, -26);
		showCity("./models/", "city_2.obj", 0,   0, -26);
		showCity("./models/", "city_1.obj", +26, 0, -26);
		showCity("./models/", "city_2.obj", -26, 0, 0);
		showCity("./models/", "city_2.obj", 0,   0, 0);
		showCity("./models/", "city_2.obj", +26, 0, 0);
		showCity("./models/", "city_1.obj", -26, 0, +26);
		showCity("./models/", "city_2.obj", 0,   0, +26);
		showCity("./models/", "city_1.obj", +26, 0, +26);

		helloInvader(0, 15, 0);

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

	function onReadySounds(results){
		console.log("You are ready to use sounds!!");
		mp3s = results;// All sounds
		// Test
		let index = tm.findSounds("./sounds/", "test_1.mp3");
		mp3s[index].play();
	}

	function onReadyFaces(results){
		console.log("You are ready to use faces!!");
		fonts = results;// All fonts
		// Test
		let index = tm.findFaces("./fonts/", "MisakiGothic_Regular.json");
		let text = tm.createText("INVADER!", fonts[index], 8, 0, 10, -15);
		tm.addGroup(text);
	}

	// Error
	function onError(error){
		console.log("Something went wrong...");
		console.log(error);
	}

	function showCity(dir, obj, x, y, z){
		let index = tm.findAssets(dir, obj);
		let rY = Math.floor(Math.random()*4) * Math.PI;
		let clone = models[index].clone();
		clone.scale.set(0.2, 0.2, 0.2);
		clone.position.set(x, y, z);
		clone.rotation.set(0, rY, 0);
		tm.addGroup(clone);// Add to group!!
	}

	function helloInvader(bX, bY, bZ){
		let padding = 4;
		let rows = 7;
		let cols = 13;
		let sX = bX - (cols-1) * padding * 0.5;
		let sY = bY;
		let sZ = bZ;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let num = r % 4 + 1;
				let name = "inv_" + num + ".obj";
				console.log(name);
				let x = sX + c * padding;
				let y = sY + r * padding;
				let inv = new Invader(name, x, y, sZ);
				inv.wander();
			}
		}
	}

	function helloCube(x, y, z){
		console.log("helloCube!!");
		let size = 1;

		// Cube
		let geometry = new THREE.BoxGeometry(size, size, size);
		let material = new THREE.MeshNormalMaterial();
		let cube = new THREE.Mesh(geometry, material);
		cube.position.set(x, y, z);
		tm.addGroup(cube);// Add to group!!
		cubes.push(cube);

		// Timeline
		let dY = Math.floor(Math.random()*20+3) * size;
		let tl = new TimelineMax({repeat: -1, yoyo: true});
		tl.to(cube.position, 2, {y: dY});
		tl.addCallback(()=>{
			tl.timeScale(1.0);
		}, 1.5);
		tl.addCallback(()=>{
			tl.timeScale(0.2);
		}, 1.6);
	}

	// Animate
	function animate(){
		tm.update();   // Manager
		ctlVR.update();// Controller
	};
}

class Invader{

	constructor(name, x, y, z){
		let index = tm.findAssets("./models/", name);
		this._clone = models[index].clone();
		this._clone.scale.set(0.2, 0.2, 0.2);
		this._clone.position.set(x, y, z);
		this._clone.rotation.set(0, Math.PI, 0);
		tm.addGroup(this._clone);// Add to group!!
	}

	wander(){
		let tl = new TimelineMax({repeat: -1, yoyo: false});
		tl.to(this._clone.position, 5.0, {x: "+=3.0"});
		tl.to(this._clone.position, 5.0, {x: "-=3.0"});
	}
}

