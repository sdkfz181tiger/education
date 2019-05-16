console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 1;
const far    = 1000;

window.onload = ()=>{
	// Scene
	let scene = new THREE.Scene();

	// Axes
	let axes = new THREE.AxisHelper(20);
	scene.add(axes);

	// Camera
	let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 100, 200);
	camera.lookAt(scene.position);

	// Light
	let directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0, 0.7, 0.7);
	scene.add(directionalLight);

	// Cube
	let geometry = new THREE.BoxGeometry(10, 10, 10);
	let material = new THREE.MeshNormalMaterial();
	let cube = new THREE.Mesh(geometry, material);
	cube.position.set(0, 0, 0);
	scene.add(cube);

	const radius = 100;

	for(let i=0; i<360; i+=15){
		for(let s=0; s<360; s+=15){
			let rad1 = i * DEG_TO_RAD;
			let rad2 = s * DEG_TO_RAD;
			let x = radius * Math.sin(rad1) * Math.cos(rad2);
			let y = radius * Math.sin(rad1) * Math.sin(rad2);
			let z = radius * Math.cos(rad1);
			let geometry = new THREE.BoxGeometry(10, 10, 10);
			let material = new THREE.MeshNormalMaterial();
			let cube     = new THREE.Mesh(geometry, material);
			cube.position.set(x, y, z);
			scene.add(cube);
		}
	}

	// Renderer
	let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(width, height);
	renderer.setClearColor(0xcccccc);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.getElementById("stage").appendChild(renderer.domElement);

	// Loop
	loop();
	function loop(){

		renderer.render(scene, camera);
		window.requestAnimationFrame(loop);
	};
}