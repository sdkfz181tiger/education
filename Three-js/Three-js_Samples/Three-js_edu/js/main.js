console.log("Hello Three.js!!");

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 1000;

// Scene
let scene = new THREE.Scene();

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
camera.position.set(0, 100, 200);
camera.lookAt(scene.position);

// Controls
let controls = new THREE.TrackballControls(camera);

// HemiLight
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
hemiLight.position.set(0, 100, 0);
hemiLight.color.setHSL(0.7, 0.7, 0.7);
hemiLight.groundColor.setHSL(1, 1, 1);
scene.add(hemiLight);
let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
scene.add(hemiLightHelper);

// Light
let directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(-40.0, 100.0, 40.0);
directionalLight.castShadow = true;
scene.add(directionalLight);

//Set up shadow properties for the light
directionalLight.shadow.mapSize.width  = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.near    = 0.5;
directionalLight.shadow.camera.far     = 180;
directionalLight.shadow.camera.top     = 130;
directionalLight.shadow.camera.bottom  = -130;
directionalLight.shadow.camera.left    = -130;
directionalLight.shadow.camera.right   = 130;

// Renderer
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x333333);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.getElementById("stage").appendChild(renderer.domElement);

//Create a helper for the shadow camera (optional)
let helper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(helper);

// Plane
let geometry = new THREE.PlaneBufferGeometry(200, 200);
let material = new THREE.MeshStandardMaterial({color: 0xffffff});
let plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

// TextureLoader
let txLoader = new THREE.TextureLoader();

// Earth
let earth = null;
txLoader.load("./textures/earth.jpg", function(texture){
		let geometry = new THREE.SphereBufferGeometry(30, 30, 30);
		let material = new THREE.MeshStandardMaterial({map:texture, overdraw:0.5});
		earth = new THREE.Mesh(geometry, material);
		earth.position.set(0, 50, 0);
		earth.castShadow    = true;
		earth.receiveShadow = false;
		scene.add(earth);
});

// Moon
let moon = null;
txLoader.load("./textures/moon.jpg", function(texture){
	let geometry = new THREE.SphereBufferGeometry(10, 10, 10);
	let material = new THREE.MeshStandardMaterial({map:texture, overdraw:0.5});
	moon = new THREE.Mesh(geometry, material);
	moon.position.set(100, 50, 0);
	moon.castShadow    = true;
	moon.receiveShadow = false;
	scene.add(moon);
});

// Radian
// 360 = 2 * PI
// 180 = PI
let radius = 60;
let degree = 0;

// Loop
loop();
function loop(){

	// Stats
	stats.update();

	// Earth, Moon
	degree += 0.5;
	if(360 <= degree) degree = 0;

	let radian = degree * Math.PI / 180;
	let x = radius * Math.cos(radian);
	let y = radius * Math.sin(radian);
	if(earth != null){
		earth.rotation.set(0, radian, 0);
	}
	if(moon != null){
		moon.rotation.set(0, radian, 0);
		moon.position.set(y, 50, x);
	}

	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};