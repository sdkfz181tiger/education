//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj"},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj"},
	{dir:"./models/obj/", mtl:"car_1.mtl",  obj:"car_1.obj"}
]};

let arDisplay = null;
let tm        = null;
let model     = null;

window.onload = function(){
	console.log("onload!!");

	// ARDisplay
	THREE.ARUtils.getARDisplay().then((display)=>{
		if(display){
			// Supported
			arDisplay = display
			tm = new ThreeManager(arDisplay);
			// EventListener
			tm.addEventListener("click", onClick);
			// Load
			loadModels();
			// Update
			update();
		}else{
			// Unsupported
			THREE.ARUtils.displayUnsupportedMessage();
		}
	});
}

// Click
function onClick(e){
	console.log("onClick!!");
	let x = e.clientX / window.innerWidth;
	let y = e.clientY / window.innerHeight;
	let hits = arDisplay.hitTest(x, y);
	if(hits && hits.length){
		let hit = hits[0];

		var matrix = new THREE.Matrix4();
		matrix.fromArray(hit.modelMatrix);
		var position = new THREE.Vector3();
		position.setFromMatrixPosition(matrix);
		//planeMesh.position.y = position.y;

		// Place
		if(model == null) return;
		THREE.ARUtils.placeObjectAtHit(model, hit, 1, true);
	}
}

// LoadModels
function loadModels(){
	console.log("loadModels");
	
	// Models
	THREE.ARUtils.loadModel({
		objPath: "./models/obj/car_1.obj",
		mtlPath: "./models/obj/car_1.mtl",
		OBJLoader: undefined,
		MTLLoader: undefined
	}).then((group)=>{
		model = group;
		model.children.forEach((mesh)=>{mesh.castShadow = true;});
		model.scale.set(0.01, 0.01, 0.01);
		model.position.set(10000, 10000, 10000);// Default
		tm.addScene(model);
	});
}

// Update
function update(){
	tm.update();
	arDisplay.requestAnimationFrame(update);
}