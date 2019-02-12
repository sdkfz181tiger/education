console.log("Hello Three.js!!");

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 300;

// Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x333366);

// Axes
let axes = new THREE.AxesHelper(20);
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
camera.position.set(120, 180, 200);
camera.lookAt(scene.position);

// Light
let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10.0, 10.0, 10.0);
scene.add(directionalLight);

// Renderer
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x333333);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;// GLTFが暗い場合の対応
document.getElementById("stage").appendChild(renderer.domElement);

// Controls
let controls = new THREE.TrackballControls(camera);
controls.target.set(0, 0, 0);

// Floor
let geometry = new THREE.BoxGeometry(100, 0, 100);
let material = new THREE.MeshBasicMaterial({color: 0xcccccc});

// GLTFLoader
let loader = new THREE.GLTFLoader();
loader.load("models/car/scene.gltf", (gltf)=>{
	let object = gltf.scene;
	scene.add(object);
});

// Loop
loop();
function loop(){

	// Stats
	stats.update();

	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};