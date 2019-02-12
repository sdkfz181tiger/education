console.log("Hello Three.js!!");

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 300;

// Scene
let scene = new Physijs.Scene();
scene.setGravity(new THREE.Vector3(0, -10, 0));

// Axes
let axes = new THREE.AxisHelper(20);
scene.add(axes);

// Stats
let stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top  = "0px";
document.getElementById("stage").appendChild(stats.domElement);

// Camera
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(20, 25, 30);
camera.lookAt(scene.position);

// Light
let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.7, 0.7);
scene.add(directionalLight);

// Renderer
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x333333);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);

// Controls
let controls = new THREE.TrackballControls(camera);
controls.target.set(0, 0, 0);

// Floor
let geometry = new THREE.BoxGeometry(100, 0, 100);
let material = new THREE.MeshBasicMaterial({color: 0xcccccc});
let floor    = new Physijs.BoxMesh(geometry, material);
floor.position.set(0, 0, 0);
scene.add(floor);

// MTLLoader
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("./models/");
mtlLoader.load("tower.mtl", function(materials){
	materials.preload();

	// OBJLoader
	var objLoader = new THREE.OBJLoader();
	objLoader.setPath("./models/");
	objLoader.setMaterials(materials);
	objLoader.load("tower.obj", function(meshes){
		meshes.children.forEach(function(mesh){
			mesh.geometry.computeFaceNormals();
			mesh.geometry.computeVertexNormals();
		});
		meshes.scale.set(1, 1, 1);
		meshes.rotation.set(0, Math.PI, 0);
		meshes.position.set(0, 0, 0);
		scene.add(meshes);
	});
});

// Handling
initEventHandling();

// Loop
loop();
function loop(){

	// Stats
	stats.update();

	// Physijs
	scene.simulate();

	// Handling
	loopEventHandling();

	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};