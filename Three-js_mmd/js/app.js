console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 100;

// Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

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
camera.position.set(0, 20, 5);
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

// Effect
let effect = new THREE.OutlineEffect(renderer);

// Pronama
let clock = new THREE.Clock();
let helper = new THREE.MMDHelper();
let phyHelper, ikHelper;
initMMD('./models/mmd/pronama/pronama.pmx', ['./models/mmd/vmds/wavefile_v2.vmd']);

// Camera
let deg    = 90;
let radius = 20;
let radian = DEG_TO_RAD * deg;

// Loop
loop();
function loop(){

	// Stats
	stats.update();

	// Pronama
	helper.animate(clock.getDelta());
	if(phyHelper !== undefined && phyHelper.visible) phyHelper.update();
	if(ikHelper !== undefined && ikHelper.visible) ikHelper.update();
	effect.render(scene, camera);

	// Camera
	deg += 0.1;
	if(360 <= deg) deg = 0;
	radian = DEG_TO_RAD * deg;
	camera.position.x = Math.cos(radian) * radius;
	camera.position.z = Math.sin(radian) * radius;
	camera.lookAt(scene.position);

	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};