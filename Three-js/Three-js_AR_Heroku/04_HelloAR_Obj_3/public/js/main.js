//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const SIZE_GRID = 16;

// Data
const pathRoads = {data:[
	{dir:"./models/obj/", mtl:"road_1.mtl", obj:"road_1.obj"},
]};

const pathTrees = {data:[
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj"},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj"}
]};

const pathCars = {data:[
	{dir:"./models/obj/", mtl:"car_1.mtl",  obj:"car_1.obj"}
]};

let arDisplay = null;
let tm        = null;
let rootGroup = null;

let trees     = [];
let cars      = [];
let roads     = [];

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
		THREE.ARUtils.placeObjectAtHit(rootGroup, hit, 1, true);
	}
}

// LoadModels
function loadModels(){
	console.log("loadModels");

	// Group
	rootGroup = new THREE.Group();
	tm.addScene(rootGroup);

	// Load
	loadPathes(pathRoads, roads);
	loadPathes(pathTrees, trees);
	loadPathes(pathCars,  cars);
}

function loadPathes(pathes, array){

	for(let i=0; i<pathes.data.length; i++){
		let data = pathes.data[i];
		// Models
		THREE.ARUtils.loadModel({
			objPath: data.dir + data.obj,
			mtlPath: data.dir + data.mtl,
			OBJLoader: undefined,
			MTLLoader: undefined
		}).then((group)=>{
			group.children.forEach((mesh)=>{mesh.castShadow = true;});
			group.scale.set(0.01, 0.01, 0.01);
			group.position.set(0, 0, 0);// Default
			array.push(group);
			rootGroup.add(group);
		});
	}
}

function putObj(mesh, x, y, z){
	mesh.position.set(x*SIZE_GRID, y*SIZE_GRID, z*SIZE_GRID);
	rootGroup.add(mesh);
}

// Update
function update(){
	tm.update();
	arDisplay.requestAnimationFrame(update);
}