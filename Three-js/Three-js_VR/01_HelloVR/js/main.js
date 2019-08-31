//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Polyfill
const polyfill = new WebVRPolyfill();

window.onload = function(){
	console.log("OnLoad");

	// Scene
	let scene = new THREE.Scene();

	// Stats
	let stats = new Stats();
	stats.setMode(0);
	stats.domElement.style.position = "absolute";
	stats.domElement.style.left = "0px";
	stats.domElement.style.top  = "0px";
	document.body.appendChild(stats.domElement);

	// Axes
	let axes = new THREE.AxisHelper(20);
	scene.add(axes);

	// Camera
	let camera = new THREE.PerspectiveCamera(
		75, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 0);
	camera.lookAt(scene.position);

	// Light
	let directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 0.7, 0.7);
	scene.add(directionalLight);

	// Renderer
	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x333333);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.vr.enabled = true;        // Important
	renderer.setAnimationLoop(animate);// Important
	document.body.appendChild(renderer.domElement);

	// Button
	document.body.appendChild(WEBVR.createButton(renderer));

	// Cube
	let size = 10;
	let geometry = new THREE.BoxGeometry(size, size, size);
	let material = new THREE.MeshNormalMaterial();
	let cube = new THREE.Mesh(geometry, material);
	cube.position.set(0, 0, -300);
	scene.add(cube);

	// Animate
	function animate(){
		//console.log("Animate");

		// Stats
		stats.update();

		// Cube
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		// Render
		renderer.render(scene, camera);
	};
}

