//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const SIZE_GRID = 0.025;
const SCALE     = 0.002;

// Data
const pathRoads = {data:[
	{dir:"./models/obj/", mtl:"road_1.mtl", obj:"road_1.obj", x:-5, y:0, z: 0},
	{dir:"./models/obj/", mtl:"road_1.mtl", obj:"road_1.obj", x: 0, y:0, z: 0},
	{dir:"./models/obj/", mtl:"road_1.mtl", obj:"road_1.obj", x:+5, y:0, z: 0},
	{dir:"./models/obj/", mtl:"road_2.mtl", obj:"road_2.obj", x:-5, y:0, z:-5},
	{dir:"./models/obj/", mtl:"road_2.mtl", obj:"road_2.obj", x: 0, y:0, z:-5},
	{dir:"./models/obj/", mtl:"road_2.mtl", obj:"road_2.obj", x:+5, y:0, z:-5},
]};

const pathTrees = {data:[
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj", x:-5, y:0, z: -1},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj", x:-1, y:0, z: -1},
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj", x:-2, y:0, z: -2},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj", x:+5, y:0, z: -2},
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj", x:-6, y:0, z: -6},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj", x:-3, y:0, z: -6},
	{dir:"./models/obj/", mtl:"tree_1.mtl", obj:"tree_1.obj", x:+4, y:0, z: -6},
	{dir:"./models/obj/", mtl:"tree_2.mtl", obj:"tree_2.obj", x:+5, y:0, z: -6},
	{dir:"./models/obj/", mtl:"car_2.mtl",  obj:"car_2.obj",  x:+2, y:0, z: 2},
	{dir:"./models/obj/", mtl:"car_3.mtl",  obj:"car_3.obj",  x:+4, y:0, z: 2},
	{dir:"./models/obj/", mtl:"truck_1.mtl",  obj:"truck_1.obj", x:-6, y:0, z: -2}
]};

const pathCars = {data:[
	{dir:"./models/obj/", mtl:"car_1.mtl",  obj:"car_1.obj", x:+10, y:0, z: 0},
	{dir:"./models/obj/", mtl:"truck_2.mtl",  obj:"truck_2.obj", x:+10, y:0, z: 1}
]};

const pathWoods = {data:[
	{dir:"./models/obj/", mtl:"wood_1.mtl", obj:"wood_1.obj", x:+5, y:0, z: -5},
	{dir:"./models/obj/", mtl:"wood_1.mtl", obj:"wood_1.obj", x:+0, y:0, z: -4},
	{dir:"./models/obj/", mtl:"wood_2.mtl", obj:"wood_2.obj", x:-3, y:0, z: -5}
]};

const pathTanukis = {data:[
	{dir:"./models/obj/", mtl:"tanuki_run_1.mtl",  obj:"tanuki_run_1.obj", x:0, y:0, z:-1}
]};

let arDisplay = null;
let tm        = null;
let rootGroup = null;

let roads     = [];
let trees     = [];
let cars      = [];
let woods     = [];
let tanukis   = [];

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

	setTimeout(()=>{

	}, 3000);
}

// Click
function onClick(e){
	console.log("onClick!!");

	let x = e.clientX / window.innerWidth;
	let y = e.clientY / window.innerHeight;
	let hits = arDisplay.hitTest(x, y);
	if(hits && hits.length){
		let hit = hits[0];

		let matrix = new THREE.Matrix4();
		matrix.fromArray(hit.modelMatrix);
		let position = new THREE.Vector3();
		position.setFromMatrixPosition(matrix);
		//planeMesh.position.y = position.y;

		// Place
		THREE.ARUtils.placeObjectAtHit(rootGroup, hit, 1, true);
	}

		// Tween
		let tlMax0 = new TimelineMax({repeat: -1, yoyo: false, onComplete:()=>{
			console.log("onComplete");
		}});
		tlMax0.to(cars[0].position, 5.0, {x: SIZE_GRID*-10, ease: Power0.easeNone});
		tlMax0.to(cars[0].position, 0.0, {x: SIZE_GRID*10, ease: Power0.easeNone});

		let tlMax1 = new TimelineMax({repeat: -1, yoyo: false, onComplete:()=>{
			console.log("onComplete");
		}});
		tlMax1.to(cars[1].position, 4.0, {x: SIZE_GRID*-10, ease: Power0.easeNone});
		tlMax1.to(cars[1].position, 0.0, {x: SIZE_GRID*10, ease: Power0.easeNone});

		let tlMax2 = new TimelineMax({repeat: -1, yoyo: false, onComplete:()=>{
			console.log("onComplete");
		}});
		tlMax2.to(tanukis[0].position, 0.2, {y: "+="+0.01, ease: Sine.easeOut});
		tlMax2.to(tanukis[0].position, 0.2, {y: "-="+0.01, ease: Bounce.easeOut});
		tlMax2.to(tanukis[0].position, 3, {y: 0, ease: Bounce.easeOut});

		let tlMax3 = new TimelineMax({repeat: -1, yoyo: true, onComplete:()=>{
			console.log("onComplete");
		}});
		tlMax3.to(woods[0].position, 8.0, {x: SIZE_GRID*1, ease: Power0.easeNone});

		let tlMax4 = new TimelineMax({repeat: -1, yoyo: true, onComplete:()=>{
			console.log("onComplete");
		}});
		tlMax4.to(woods[1].position, 7.0, {x: SIZE_GRID*1, ease: Power0.easeNone});

		let tlMax5 = new TimelineMax({repeat: -1, yoyo: true, onComplete:()=>{
			console.log("onComplete");
		}});
		tlMax5.to(woods[2].position, 6.0, {x: SIZE_GRID*1, ease: Power0.easeNone});
	
}

// LoadModels
function loadModels(){
	console.log("loadModels");

	// Group
	rootGroup = new THREE.Group();
	rootGroup.position.set(0, 100, 0);// Default
	tm.addScene(rootGroup);

	// Load
	loadPathes(pathRoads,   roads);
	loadPathes(pathTrees,   trees);
	loadPathes(pathCars,    cars);
	loadPathes(pathWoods,   woods);
	loadPathes(pathTanukis, tanukis);
}

function loadPathes(pathes, array){
	console.log("loadPathes");

	for(let i=0; i<pathes.data.length; i++){
		let data = pathes.data[i];
		let x = data.x * SIZE_GRID;
		let y = data.y * SIZE_GRID;
		let z = data.z * SIZE_GRID;
		// Models
		THREE.ARUtils.loadModel({
			objPath: data.dir + data.obj,
			mtlPath: data.dir + data.mtl,
			OBJLoader: undefined,
			MTLLoader: undefined
		}).then((group)=>{
			group.children.forEach((mesh)=>{mesh.castShadow = true;});
			group.scale.set(SCALE, SCALE, SCALE);
			console.log("mesh:" + x + ", " + y + ", " + z);
			group.position.set(x, y, z);// Default
			array.push(group);
			rootGroup.add(group);
		});
	}
}

// Update
function update(){
	tm.update();
	arDisplay.requestAnimationFrame(update);
}