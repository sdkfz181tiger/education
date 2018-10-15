//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const assets = {data:[
	{path:"./models/", mtl:"inv01.mtl", obj:"inv01.obj"},
	{path:"./models/", mtl:"inv02.mtl", obj:"inv02.obj"},
	{path:"./models/", mtl:"inv03.mtl", obj:"inv03.obj"},
	{path:"./models/", mtl:"inv04.mtl", obj:"inv04.obj"},
]};

const sounds = {data:[
	{path:"./sounds/", mp3:"test_1.mp3"},
	{path:"./sounds/", mp3:"test_2.mp3"},
	{path:"./sounds/", mp3:"test_3.mp3"},
	{path:"./sounds/", mp3:"test_4.mp3"},
]};

window.onload = function(){
	console.log("OnLoad");

	let models   = [];
	let mp3s     = [];

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	let tm = new ThreeManager(0, 5, 10, 0, 0, 0);
	tm._renderer.setAnimationLoop(animate);
	tm.loadAssets(assets,
		(results)=>{onReadyAssets(results);},
		(error)=>{onError(error);});
	tm.loadSounds(sounds,
		(results)=>{onReadySounds(results);},
		(error)=>{console.log(error);});

	// Controller
	let ctlVR = new CtlVR();
	ctlVR.setTouchpadListener(
		(axes)=>{console.log("onPressed:"  + axes[0] + ", " + axes[1]);}, 
		(axes)=>{console.log("onReleased:" + axes[0] + ", " + axes[1]);});
	ctlVR.setTriggerListener(
		()=>{
			console.log("onPressed!!");
			mp3s[0].play();// Test
		}, 
		()=>{
			console.log("onReleased!!");
			mp3s[1].play();// Test
		});

	let invaders = [];
	let cubes    = [];

	// Ready
	function onReadyAssets(results){
		console.log("You are ready to use assets!!");
		models = results;// All assets

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_test.png", 6, 50);
		tm.addScene(skybox);

		// Camera
		let cContainer = tm.getCameraContainer();
		//let tl = new TimelineMax({repeat: 100, yoyo: true});
		//tl.to(cContainer.position, 10, {y: 50});

		// Invaders
		for(let i=0; i<20; i++){
			let index = i % models.length;
			helloInvader(index);
		}

		// Cubes
		for(let i=0; i<30; i++){
			helloCube();
		}
	}

	function onReadySounds(results){
		console.log("You are ready to use sounds!!");
		mp3s = results;// All sounds
	}

	// Error
	function onError(error){
		console.log("Something went wrong...");
		console.log(error);
	}

	function helloInvader(index){
		console.log("helloInvader!!");

		if(models.length <= 0) return;

		let clone = models[index].clone();
		clone.scale.set(0.2, 0.2, 0.2);
		clone.rotation.set(0, Math.PI, 0);
		tm.addGroup(clone);// Add to group!!
		invaders.push(clone);

		// Timeline
		let area = 30;
		let x = Math.floor(Math.random() * area) - area*0.5;
		let y = Math.floor(Math.random() * area) + 2;
		let z = Math.floor(Math.random() * area) - area*0.5;
		clone.position.set(x, y, z);
		let tl = new TimelineMax({repeat: 60, yoyo: true});
		tl.to(clone.position, 60, {x: 0, y: 0, z: 0});

		// Label
		//let str = "[" + x + ", " + y + ", " + z + "]";
		//clone.add(tm.createLabel(str));
	}

	function helloCube(){
		console.log("helloCube!!");

		// Cube
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		let material = new THREE.MeshNormalMaterial();
		let cube = new THREE.Mesh(geometry, material);
		tm.addGroup(cube);// Add to group!!
		cubes.push(cube);

		// Timeline
		let area = 30;
		let x = Math.floor(Math.random() * area) - area*0.5;
		let y = Math.floor(Math.random() * area) + 2;
		let z = Math.floor(Math.random() * area) - area*0.5;
		cube.position.set(x, y, z);
		//let tl = new TimelineMax({repeat: 10, yoyo: true});
		//tl.to(cube.position, 5, {x: x, y: y, z: z});
	}

	// Animate
	function animate(){
		//console.log("Animate");

		// Manager
		tm.update();

		// Controller
		ctlVR.update();
	};
}

