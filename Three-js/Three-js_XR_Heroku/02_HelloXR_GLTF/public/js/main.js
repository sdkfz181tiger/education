//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const ACT_STATES = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"];
const ACT_EMOTES = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];

// Data
const modelsGLTF = {data:[
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

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	let tm    = null;
	let robot = null;

	// XRUtils
	THREE.WebXRUtils.getDisplays().then((displays)=>{
		// ThreeManager
		tm = new ThreeManager(displays);

		// Raycaster
		tm.setRaycasterListener((intersects)=>{

			for(let target of intersects){
				console.log("distance:" + target.distance + "_" + target.object.name);
				// Reticle
				if(target.object.name == NAME_RETICLE){
					// Cube
					console.log("Catch!!");
				}
			}

			// Model
			let model = gltfLoader.findModels("RobotExpressive.glb");
			robot = new Robot(model);
			let gltf = robot.getGLTF();
			gltf.scale.set(0.02, 0.02, 0.02);
			tm.moveToReticle(gltf);// Add to group!!
		});

		let gltfLoader = new GLTFLoader();
		gltfLoader.loadModels(modelsGLTF, onReadyModels, onError);

		let fontLoader = new FontLoader();
		fontLoader.loadFonts(fonts, onReadyFonts, onError);

		function onReadyModels(){
			console.log("onReadyModels");
		}

		function onReadyFonts(){
			console.log("onReadyFonts");
		}

		// Error
		function onError(error){
			console.log("Something went wrong...");
			console.log(error);
		}
	});
}

class Robot{

	constructor(model){
		this._model = model;
		this._gltf = model.scene;
	}

	getGLTF(){
		return this._gltf;
	}
}