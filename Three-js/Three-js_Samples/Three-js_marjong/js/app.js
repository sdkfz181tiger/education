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
camera.position.set(50, 80, 50);
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

// Floor
let geometry = new THREE.BoxGeometry(100, 0, 100);
let material = new THREE.MeshBasicMaterial({color: 0xcccccc});
let floor    = new Physijs.BoxMesh(geometry, material);
floor.position.set(0, 0, 0);
scene.add(floor);

// Block
let blocks   = [];
let paddingX = 10;
let paddingY = 5;
let paddingZ = 30;

// TextureLoader
let txLoader = new THREE.TextureLoader();

txLoader.load("./images/wood.jpg", function(texture){
	for(let y=0; y<5; y++){
		for(let x=-1; x<2; x++){
			let geometry = new THREE.BoxGeometry(10, 5, 30);
			let material = new THREE.MeshBasicMaterial({map:texture, overdraw:0.5});
			let block    = new Physijs.BoxMesh(geometry, material);
			if(y%2 == 0){
				block.position.set(
					paddingX * x, 
					paddingY * y + paddingY * 0.5,
					0);
			}else{
				block.position.set(
					0, 
					paddingY * y + paddingY * 0.5,
					paddingX * x);
				block.rotation.set(0, Math.PI/2, 0);
			}
			scene.add(block);
			blocks.push(block);
		}
	}
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

	renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};