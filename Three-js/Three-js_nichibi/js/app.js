console.log("Hello Three.js!!");

var width  = 480;
var height = 320;
var fov    = 60;
var aspect = width / height;
var near   = 1;
var far    = 1000;

// Scene
var scene = new THREE.Scene();

// Axes
var axes = new THREE.AxisHelper(20);
scene.add(axes);

// Camera
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 100, 200);
camera.lookAt(scene.position);

// Light
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.7, 0.7);
scene.add(directionalLight);

// Plane
var geometry = new THREE.PlaneGeometry(100, 200);
var material = new THREE.MeshBasicMaterial({color: 0x666666});
var plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 0, 0);
plane.rotation.set(-90 * Math.PI / 180, 0, 0);
scene.add(plane);

// Cube
var geometry = new THREE.BoxGeometry(30, 30, 30);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 50, 0);
scene.add(cube);

// Renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);

// Loop
loop();
function loop(){

	// Cube
	cube.rotation.x += 0.05;
	cube.rotation.y += 0.05;

	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};