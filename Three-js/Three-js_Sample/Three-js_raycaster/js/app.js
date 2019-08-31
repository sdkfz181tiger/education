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
camera.position.set(0, 20, 20);
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

var group = new THREE.Group();
scene.add( group );

// Cube
var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 10, 0);
group.add(cube);

var spriteA = new THREE.Sprite(new THREE.SpriteMaterial({color: "#69f"}));
spriteA.position.set(6, 5, 5);
spriteA.scale.set(2, 5, 1);
group.add(spriteA);

var spriteB = new THREE.Sprite(new THREE.SpriteMaterial({color: "#6f6"}));
spriteB.material.rotation = Math.PI / 3 * 4;
spriteB.position.set(-8, 2, 2);
spriteB.center.set(0.5, 0);
spriteB.scale.set(1, - 5, 1);
group.add(spriteB);

// Renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("stage").appendChild(renderer.domElement);

// Raycaster
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("mousemove", onDocumentMouseMove, false);

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event){
	event.preventDefault();
	var intersects = getIntersects(event.layerX, event.layerY);
	console.log(intersects.length);
}

function getIntersects(x, y){
	x = (x/window.innerWidth)*2-1;
	y = - (y/window.innerHeight)*2+1;
	mouseVector.set(x, y, 0.5);
	raycaster.setFromCamera(mouseVector, camera);
	return raycaster.intersectObject(group, true);
}

// Loop
loop();
function loop(){

	// Cube
	cube.rotation.x += 0.05;
	cube.rotation.y += 0.05;

	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};