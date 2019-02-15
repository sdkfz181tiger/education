//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

const BOX_DISTANCE = 5.0;
const BOX_SIZE     = 0.025;
const BOX_QUANTITY = 4;

let vrDisplay, vrControls, arView;

let scene, renderer, camera;
let ambientLight, directionalLight, canvas;

let planeGeometry, planeMesh;
let model;

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

	// ARDebug
	var arDebug = new THREE.ARDebug(vrDisplay, scene, {
		showLastHit: true,
		showPoseStatus: true,
		showPlanes: true
	});
	document.body.appendChild(arDebug.getElement());

	// ARView
	arView = new THREE.ARView(vrDisplay, renderer);

	// Camera
	camera = new THREE.ARPerspectiveCamera(
		vrDisplay, 60,
		window.innerWidth / window.innerHeight,
		vrDisplay.depthNear, vrDisplay.depthFar
	);

	// Controls
	vrControls = new THREE.VRControls(camera);

	// Shadow
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// AmbientLight
	ambientLight = new THREE.AmbientLight();
	scene.add(ambientLight);

	// DirectionalLight
	directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 0.7, 0.7);
	scene.add(directionalLight);

	// PlaneGeometry
	planeGeometry = new THREE.PlaneGeometry(4000, 4000);
	planeGeometry.rotateX(-Math.PI / 2);
	planeMesh = new THREE.Mesh(planeGeometry, new THREE.ShadowMaterial({
		color: 0xffffff, opacity: 0.8
	}));
	planeMesh.receiveShadow = true;
	scene.add(planeMesh);

	// Loading
	THREE.ARUtils.loadModel({
		objPath: "./models/chickin.obj",
		mtlPath: "./models/chickin.mtl",
		OBJLoader: undefined, // uses window.THREE.OBJLoader by default
		MTLLoader: undefined // uses window.THREE.MTLLoader by default
	}).then((group)=>{
		model = group;
		model.children.forEach((mesh)=>{mesh.castShadow = true;});
		model.scale.set(BOX_SIZE, BOX_SIZE, BOX_SIZE);
		model.position.set(10000, 10000, 10000);// Default
		scene.add(model);
	});

	// Resize
	window.addEventListener("resize", onWindowResize, false);
	// Click
	canvas.addEventListener("click", onClick, false);

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

function onClick(e){
	if(model == null) return;

	let x = e.clientX / window.innerWidth;
	let y = e.clientY / window.innerHeight;
	console.log("onClick:" + x + ", " + y);

	let hits = vrDisplay.hitTest(x, y);
	if(hits && hits.length){
		let hit = hits[0];
		console.log(hit);

		var matrix = new THREE.Matrix4();
		var position = new THREE.Vector3();
		matrix.fromArray(hit.modelMatrix);
		position.setFromMatrixPosition(matrix);
		planeMesh.position.y = position.y;

		THREE.ARUtils.placeObjectAtHit(model, hit, 1, true);
	}
}