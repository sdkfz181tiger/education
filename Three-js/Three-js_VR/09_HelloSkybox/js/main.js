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

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	let tm = new ThreeManager(0, 5, 10, 0, 0, 0);
	tm._renderer.setAnimationLoop(animate);
	tm.startPromise(assets, 
		(results)=>{onReady(results);},
		(error)=>{onError(error);});

	// Controller
	let ctlVR = new CtlVR();
	ctlVR.setTouchpadListener(
		(axes)=>{console.log("onPressed:"  + axes[0] + ", " + axes[1]);}, 
		(axes)=>{console.log("onReleased:" + axes[0] + ", " + axes[1]);});
	ctlVR.setTriggerListener(
		()=>{console.log("onPressed!!");}, 
		()=>{console.log("onReleased!!");});

	// Invaders
	let models   = [];
	let invaders = [];

	// Ready
	function onReady(meshes){
		console.log("You are ready to start the game!?");
		models = meshes;// All meshes

		// Skybox
		let skybox = tm.createSkybox("./textures/skybox_test.png", 6, 50);
		tm.addScene(skybox);

		// Invaders
		for(let i=0; i<models.length; i++){
			helloInvader(i);
		}
		// Cubes
		let total = 10
		for(let i=0; i<total; i++){
			helloCube();
		}
	}

	// Error
	function onError(error){
		console.log("Something went wrong...");
		console.log(error);
	}

	function helloInvader(index){
		console.log("helloInvader!!");

		if(models.length <= 0) return;

		let area  = 30;
		let x     = Math.floor(Math.random() * area) - area*0.5;
		let y     = Math.floor(Math.random() * area) - area*0.5;
		let z     = Math.floor(Math.random() * area) - area*0.5;

		let clone = models[index].clone();
		clone.scale.set(0.4, 0.4, 0.4);
		clone.rotation.set(0, Math.PI, 0);
		clone.position.set(x, y, z);
		invaders.push(clone);
		tm.addGroup(clone);// Add to group!!

		// Label
		let str = "[" + x + ", " + y + ", " + z + "]";
		clone.add(tm.createLabel(str));
	}

	function helloCube(){
		console.log("helloCube!!");

		// Cube
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshNormalMaterial();
		var cube = new THREE.Mesh(geometry, material);
		let area  = 30;
		let x     = Math.floor(Math.random() * area) - area*0.5;
		let y     = Math.floor(Math.random() * area) - area*0.5;
		let z     = Math.floor(Math.random() * area) - area*0.5;
		cube.position.set(x, y, z);
		tm.addGroup(cube);
	}

	// Animate
	function animate(){
		//console.log("Animate");

		// Invaders
		for(invader of invaders){
			invader.rotation.x += 0.005;
			invader.rotation.y += 0.005;
			//invader.rotation.z += 0.005;
		}

		// Manager
		tm.update();

		// Controller
		ctlVR.update();
	};
}

