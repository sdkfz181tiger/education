console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 0.1;
const far    = 10.0;

// Clock
const clock  = new THREE.Clock();

// Scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x666666);
scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

// Axes
let axes = new THREE.AxesHelper(1);
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
camera.position.set(0, 3, 5);
camera.lookAt({x:0, y:2.5, z:0});

// Light
let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(0, 20, 0);
scene.add(hemisphereLight);

let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0.0, 20.0, 0.0);
scene.add(directionalLight);

// Renderer
let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
document.getElementById("stage").appendChild(renderer.domElement);

// Plane
let geometry = new THREE.PlaneGeometry(5, 5);
let material = new THREE.MeshBasicMaterial({color: 0xcccccc});
let plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);

// Controls
let controls = new THREE.TrackballControls(camera);
controls.target.set(0, 2.5, 0);

// Init
initGLTFCharacter("./models/gltf/RobotExpressive/RobotExpressive.glb");

// Loop
loop();
function loop(){
	// Delta
	let dt = clock.getDelta();

	// AnimationMixer
	if(animationMixer) animationMixer.update(dt);

	// Statc, Controls, Renderer
	if(stats)    stats.update();
	if(controls) controls.update();
	if(renderer) renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
}