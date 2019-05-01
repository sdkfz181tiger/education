//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const ACT_STATES = ["SMILE", "ANGRY", "SAD"];
const ACT_EMOTES = ["Jump", "Yes", "No"];

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"city_1.mtl", obj:"city_1.obj"},
	{dir:"./models/obj/", mtl:"city_2.mtl", obj:"city_2.obj"},
	{dir:"./models/obj/", mtl:"inv_1.mtl",  obj:"inv_1.obj"},
	{dir:"./models/obj/", mtl:"inv_2.mtl",  obj:"inv_2.obj"},
	{dir:"./models/obj/", mtl:"inv_3.mtl",  obj:"inv_3.obj"},
	{dir:"./models/obj/", mtl:"inv_4.mtl",  obj:"inv_4.obj"},
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
	tm = new ThreeManager(0, 10, 25, 0, 10, 25);
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

		let num = 1;
		let name = "inv_" + num + ".obj";
		let clone = objLoader.findModels(name);
		clone.scale.set(0.3, 0.3, 0.3);
		clone.position.set(0, 0, 0);
		clone.rotation.set(0, Math.PI, 0);
		tm.addGroup(clone);// Add to group!!

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
		let text = fontLoader.createText("CROSSY!!", font, 4, 0, 10, 0);
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