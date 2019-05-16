console.log("Hello Three.js!!");

const DEG_TO_RAD = Math.PI / 180;

const width  = 480;
const height = 320;
const fov    = 60;
const aspect = width / height;
const near   = 0.1;
const far    = 10.0;

// Size
const SIZE_FBX = 0.05;

// Data
const models = {data:[
	{dir:"./models/fbx/tanuki/computer/", fbx:"sitting.fbx"},
	{dir:"./models/fbx/tanuki/computer/", fbx:"sittotype.fbx"},
	{dir:"./models/fbx/tanuki/computer/", fbx:"typetosit.fbx"},
	{dir:"./models/fbx/tanuki/computer/", fbx:"typing.fbx"},

	{dir:"./models/fbx/tanuki/dance/", fbx:"breakdance.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"dancing.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"rumba.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"salsa.fbx"},
	{dir:"./models/fbx/tanuki/dance/", fbx:"twist.fbx"},

	{dir:"./models/fbx/tanuki/idle/", fbx:"bored_1.fbx"},
	{dir:"./models/fbx/tanuki/idle/", fbx:"bored_2.fbx"},
	{dir:"./models/fbx/tanuki/idle/", fbx:"breathing.fbx"},
	{dir:"./models/fbx/tanuki/idle/", fbx:"holding.fbx"},
	{dir:"./models/fbx/tanuki/idle/", fbx:"sad.fbx"},
	{dir:"./models/fbx/tanuki/idle/", fbx:"standing.fbx"},

	{dir:"./models/fbx/tanuki/motion/", fbx:"angry.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"bow_1.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"bow_2.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"button.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"happy.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"jump.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"lookingaround.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"shocking.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"standup.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"terrible_1.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"terrible_2.fbx"},
	{dir:"./models/fbx/tanuki/motion/", fbx:"yelling.fbx"},
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
	camera.position.set(0, 0.4, -1.2);
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
	let fbxModels = [];

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");
		fbxModels = fbxLoader.getAllModels();
		for(let i=0; i<fbxModels.length; i++){
			if(0 < i) fbxModels[i].visible = false;// Default
			scene.add(fbxModels[i]);
		}
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

		// Clock
		let delta = clock.getDelta();

		// AnimationMixer
		for(let fbxModel of fbxModels){
			fbxModel.animationMixer.update(delta);
		}

		window.requestAnimationFrame(loop);
	};

	// Testing
	$(".bShow").click((e)=>{
		let name = $(e.target).attr("name");
		fbxLoader.showModel(name);
	});

	$("#bPlay").click(()=>{
		for(let fbxModel of fbxModels) fbxModel.action.play();
	});

	$("#bStop").click(()=>{
		for(let fbxModel of fbxModels) fbxModel.action.stop();
	});

	$("#bPause").click(()=>{
		
	});
}