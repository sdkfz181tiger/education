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

	// Invaders
	let invaders = [];

	// Promise
	let promises = [];
	promises.push(asyncPromise("./models/", "inv01.mtl", "inv01.obj"));
	promises.push(asyncPromise("./models/", "inv02.mtl", "inv02.obj"));
	promises.push(asyncPromise("./models/", "inv03.mtl", "inv03.obj"));
	Promise.all(promises).then(
		(results)=>{readyInvaders(results);},
		(error)=>{console.log(error);});

	// Ready
	function readyInvaders(meshes){
		console.log("Ready!!");

		let rows = meshes.length;
		let cols = 8;
		let padding = 50;
		let startX = -padding * (cols-1) * 0.5;
		let startY = padding * rows * 0.0;
		for(let r=0; r<rows; r++){
			let invader = meshes[r];
			for(let c=0; c<cols; c++){
				let x = startX + padding * c;
				let y = startY + padding * r;
				let clone = invader.clone();
				clone.scale.set(3, 3, 3);
				clone.rotation.set(0, Math.PI, 0);
				clone.position.set(x, y, -300);
				invaders.push(clone);
				scene.add(clone);
			}
		}
	}

	// Animate
	function animate(){
		//console.log("Animate");

		// Stats
		stats.update();

		// Invaders
		for(invader of invaders){
			invader.rotation.x += 0.001;
			invader.rotation.y += 0.001;
			invader.rotation.z += 0.001;
		}

		// Render
		renderer.render(scene, camera);
	};
}

