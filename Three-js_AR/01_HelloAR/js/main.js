//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const BOX_DISTANCE = 1.5;
const BOX_SIZE     = 0.25;
const BOX_QUANTITY = 12;

let arDisplay, vrControls, arView;

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
			arDisplay = display;
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
		arDisplay, 60,
		window.innerWidth / window.innerHeight,
		arDisplay.depthNear, arDisplay.depthFar
	);

	// ARView
	arView = new THREE.ARView(arDisplay, renderer);

	// Controls
	vrControls = new THREE.VRControls(camera);

	// Resize
	window.addEventListener("resize", onWindowResize, false);
	// Click
	canvas.addEventListener("touchstart", onClick, false);

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
	arDisplay.requestAnimationFrame(update);
}

function onClick(){
	// Create some cubes around the origin point
	for(let i = 0; i < BOX_QUANTITY; i++) {
		let angle = Math.PI * 2 * (i / BOX_QUANTITY);
		let geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
		let material = new THREE.MeshNormalMaterial();
		let cube = new THREE.Mesh(geometry, material);
		cube.position.set(Math.cos(angle) * BOX_DISTANCE, camera.position.y - 0.25, Math.sin(angle) * BOX_DISTANCE);
		scene.add(cube);
	}
}
