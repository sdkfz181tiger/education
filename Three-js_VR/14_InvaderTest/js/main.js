//==========
// Three.js
// -> https://threejs.org/

console.log("Hello Three.js!!");

// Data
const assets = {data:[
	{dir:"./models/", mtl:"city_1.mtl", obj:"city_1.obj"},
	{dir:"./models/", mtl:"city_2.mtl", obj:"city_2.obj"},
	{dir:"./models/", mtl:"inv_1.mtl", obj:"inv_1.obj"},
	{dir:"./models/", mtl:"inv_2.mtl", obj:"inv_2.obj"},
	{dir:"./models/", mtl:"inv_3.mtl", obj:"inv_3.obj"},
	{dir:"./models/", mtl:"inv_4.mtl", obj:"inv_4.obj"},
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"test_1.mp3"},
	{dir:"./sounds/", mp3:"test_2.mp3"},
	{dir:"./sounds/", mp3:"test_3.mp3"},
	{dir:"./sounds/", mp3:"test_4.mp3"},
]};

window.onload = function(){
	console.log("OnLoad");

	let models   = [];
	let mp3s     = [];

	// ThreeManager
	// 	Camera position(PC): pcX, pcY, pcZ
	// 	Camera position(VR): vrX, vrY, vrZ
	let tm = new ThreeManager(0, 20, 25, 0, 0, 0);
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
		()=>{console.log("onReleased!!");});

	let invaders = [];
	let cubes    = [];

	// Ready
	function onReadyAssets(results){
		console.log("You are ready to use assets!!");
		models = results;// All assets

		// Camera
		let cContainer = tm.getCameraContainer();
		//let tl = new TimelineMax({repeat: -1, yoyo: true});
		//tl.to(cContainer.position, 10, {y: 50});

		// Skybox
		//let skybox = tm.createSkybox("./textures/skybox_test.png", 6, 50);
		//tm.addScene(skybox);

		showCity();
		for(let i=0; i<20; i++){
			helloInvader();
		}

		// Cubes / Wireframe
		let pad  = 2;
		let rows = 10;
		let cols = 10;
		let startX = (cols-1) * pad * -0.5;
		let startZ = (rows-1) * pad * -0.5;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let x = startX + c * pad;
				let y = 0;
				let z = startZ + r * pad;
				//helloCube(x, y, z);// Cube
				//helloWire(x, y, z);// Wireframe
			}
		}

		// Font(Test)
		let loader = new THREE.FontLoader();
		let path = "./fonts/MisakiGothic_Regular.json";
		loader.load(path, (font)=>{
			console.log(font.data.familyName);

			let str = "INVADER!!";
			let textGeo = new THREE.TextGeometry(str, {
				font: font, size: 8, height: 2, curveSegments: 4,
				bevelThickness: 2, bevelSize: 0.2, bevelEnabled: false
			});
			textGeo.computeBoundingBox();
			textGeo.computeVertexNormals();

			let materials = [
				new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true}),
				new THREE.MeshPhongMaterial({color: 0xffffff })
			];

			let centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

			let textMesh = new THREE.Mesh(textGeo, materials);
			textMesh.position.x = centerOffset;
			textMesh.position.y = 8;
			textMesh.position.z = -10;
			textMesh.rotation.x = 0;
			textMesh.rotation.y = Math.PI * 2;
			tm.addGroup(textMesh);

		}, (progress)=>{
			//console.log("onProgress");
		}, (error)=>{
			console.log("onError:" + error);
		});
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

	function showCity(){
		let index = tm.findAssets("./models/", "city_2.obj");
		let clone = models[index].clone();
		clone.scale.set(0.2, 0.2, 0.2);
		clone.rotation.set(0, Math.PI, 0);
		tm.addGroup(clone);// Add to group!!
		clone.position.set(0, 0, 0);
	}

	function helloInvader(){
		let num = Math.floor(Math.random() * 4) + 1;
		let fileName = "inv_" + num + ".obj";
		let index = tm.findAssets("./models/", fileName);
		let clone = models[index].clone();
		clone.scale.set(0.2, 0.2, 0.2);
		clone.rotation.set(0, Math.PI, 0);
		tm.addGroup(clone);// Add to group!!
		invaders.push(clone);

		// Timeline
		let area = 30;
		let x = Math.floor(Math.random() * 60) - 60*0.5;
		let y = Math.floor(Math.random() * 15) + 2;
		let z = Math.floor(Math.random() * 30) - 30*0.5;
		clone.position.set(x, y, z);
		let tl = new TimelineMax({repeat: -1, yoyo: false});
		tl.to(clone.position, 5.0, {x: "+=3.0"});
		tl.to(clone.position, 5.0, {x: "-=3.0"});

		// Label
		//let str = "[" + x + ", " + y + ", " + z + "]";
		//clone.add(tm.createLabel(str));
	}

	function helloCube(x, y, z){
		console.log("helloCube!!");
		let size = 1;

		// Cube
		let geometry = new THREE.BoxGeometry(size, size, size);
		let material = new THREE.MeshNormalMaterial();
		let cube = new THREE.Mesh(geometry, material);
		cube.position.set(x, y, z);
		tm.addGroup(cube);// Add to group!!
		cubes.push(cube);

		// Timeline
		let dY = Math.floor(Math.random()*20+3) * size;
		let tl = new TimelineMax({repeat: -1, yoyo: true});
		tl.to(cube.position, 2, {y: dY});
		tl.addCallback(()=>{
			tl.timeScale(1.0);
		}, 1.5);
		tl.addCallback(()=>{
			tl.timeScale(0.2);
		}, 1.6);
	}

	function helloWire(x, y, z){
		console.log("helloWire!!");
		let size = 1;

		// Cube
		let geometry = new THREE.WireframeGeometry(
			new THREE.BoxGeometry(size, size, size));
		let matLineBasic = new THREE.LineBasicMaterial(
			{color: 0x4080ff});
		let matLineDashed = new THREE.LineDashedMaterial(
			{scale: 1, dashSize: 1, gapSize: 1});
		let wf = new THREE.LineSegments(geometry, matLineBasic);
		wf.position.set(x, y, z);
		wf.computeLineDistances();
		wf.visible = true;
		tm.addGroup(wf);

		// Timeline
		let dY = Math.floor(Math.random()*20+3) * size;
		let tl = new TimelineMax({repeat: -1, yoyo: true});
		tl.to(wf.position, 2, {y: dY});
		tl.addCallback(()=>{
			tl.timeScale(1.0);
		}, 1.5);
		tl.addCallback(()=>{
			tl.timeScale(0.2);
		}, 1.6);
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

