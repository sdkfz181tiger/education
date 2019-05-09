console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 0.1;
const far    = 10.0;

let pathes = [
	// "./models/fbx/tanuki/computer/sitting.fbx",
	// "./models/fbx/tanuki/computer/sittotype.fbx",
	// "./models/fbx/tanuki/computer/typetosit.fbx",
	// "./models/fbx/tanuki/computer/typing.fbx",

	"./models/fbx/tanuki/dance/breakdance.fbx",
	"./models/fbx/tanuki/dance/dancing.fbx",
	"./models/fbx/tanuki/dance/rumba.fbx",
	"./models/fbx/tanuki/dance/salsa.fbx",
	"./models/fbx/tanuki/dance/twist.fbx",

	// "./models/fbx/tanuki/motion/angry.fbx",
	// "./models/fbx/tanuki/motion/bow_1.fbx",
	// "./models/fbx/tanuki/motion/bow_2.fbx",
	// "./models/fbx/tanuki/motion/elect.fbx",
	// "./models/fbx/tanuki/motion/happy.fbx",
	// "./models/fbx/tanuki/motion/jump.fbx",
	// "./models/fbx/tanuki/motion/lookingaround.fbx",
	// "./models/fbx/tanuki/motion/standup.fbx",
	// "./models/fbx/tanuki/motion/walkbackwards_1.fbx",
	// "./models/fbx/tanuki/motion/walkbackwards_2.fbx",
	// "./models/fbx/tanuki/motion/yelling.fbx",

	// "./models/fbx/tanuki/idle/bored.fbx",
	// "./models/fbx/tanuki/idle/breathing.fbx",
	// "./models/fbx/tanuki/idle/button.fbx",
	// "./models/fbx/tanuki/idle/happy.fbx",
	// "./models/fbx/tanuki/idle/holding.fbx",
	// "./models/fbx/tanuki/idle/sad.fbx",
	// "./models/fbx/tanuki/idle/standing.fbx",
];

// Size
const SIZE_FBX = 0.05;

// Data
const models = {data:[
	{dir:"./models/fbx/tanuki/dance/", fbx:"breakdance.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"dancing.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"rumba.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"salsa.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"twist.fbx"},
]};

window.onload = function(){
	console.log("OnLoad");

	// Scene
	let scene = new THREE.Scene();
	scene.background = new THREE.Color(0x333366);

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
	camera.position.set(0, 0.4, -1.0);
	camera.lookAt({x:0, y:0, z:0});

	// HemiLight
	let hemiLight = new THREE.HemisphereLight(0x3333ff, 0x3333ff, 0.7);
	hemiLight.position.set(0, 30, -30);
	hemiLight.color.setHSL(0.7, 0.7, 0.7);
	hemiLight.groundColor.setHSL(1, 1, 1);
	scene.add(hemiLight);
	hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
	scene.add(hemiLightHelper);

	// Light
	let directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0.0, 30.0, -30.0);
	scene.add(directionalLight);

	// Renderer
	let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(width, height);
	renderer.setClearColor(0x000000, 0);
	renderer.setPixelRatio(window.devicePixelRatio);
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
	controls.target.set(0, 0.5, 0);

	// Clock
	let clock = new THREE.Clock();

	// FbxLoader
	let fbxLoader = new FbxLoader();
	fbxLoader.loadModels(models, onReadyModels, onError);

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");

		let model = fbxLoader.findModels("twist.fbx");
		scene.add(model);
		console.log(model);
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}

	// Loop
	loop();
	function loop(){

		// Stats
		stats.update();

		controls.update();
		renderer.render(scene, camera);

		// Clock, AnimationMixer
		if(clock){
			// TODO
		}

		window.requestAnimationFrame(loop);
	};
}