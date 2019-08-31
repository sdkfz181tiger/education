//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const BOX_DISTANCE = 1.5;
const BOX_SIZE     = 0.25;
const BOX_QUANTITY = 12;

let vrDisplay, vrControls, arView;

let scene, renderer, camera, canvas

window.onload = function(){
	console.log("onload!!");
	startAR();
}

function startAR(){
	console.log("startAR!!");

	// ARDisplay
	THREE.ARUtils.getARDisplay().then((display)=>{
		if(display){
			// Supported
			vrDisplay = display;
			initAR();
		}else{
			// Unsupported
			THREE.ARUtils.displayUnsupportedMessage();
		}
	});
}

function initAR(){
	console.log("initAR!!");

	// Three.js(Scene)
	scene = new THREE.Scene();

	// Three.js(Renderer)
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;
	canvas = renderer.domElement;
	document.body.appendChild(canvas);

	// Camera
	camera = new THREE.ARPerspectiveCamera(
		vrDisplay, 60,
		window.innerWidth / window.innerHeight,
		vrDisplay.depthNear, vrDisplay.depthFar
	);

	// ARView
	arView = new THREE.ARView(vrDisplay, renderer);

	// Controls
	vrControls = new THREE.VRControls(camera);

	// Resize
	window.addEventListener("resize", onWindowResize, false);
	// Click
	canvas.addEventListener("touchstart", setBoxes, false);

	// Update
	update();
}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function update(){
	// Clear
	renderer.clearColor();

	arView.render();
	camera.updateProjectionMatrix();
	vrControls.update();

	// Render
	renderer.clearDepth();
	renderer.render(scene, camera);

	// Update
	vrDisplay.requestAnimationFrame(update);
}

function setBoxes(){
	// Create some cubes around the origin point
	for(let i = 0; i < BOX_QUANTITY; i++) {
		let angle = Math.PI * 2 * (i / BOX_QUANTITY);
		let geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
		let material = new THREE.MeshNormalMaterial();
		let cube = new THREE.Mesh(geometry, material);
		let x = Math.cos(angle) * BOX_DISTANCE;
		let y = camera.position.y - 0.25;
		let z = Math.sin(angle) * BOX_DISTANCE;
		cube.position.set(x, y, z);
		scene.add(cube);
	}
}
