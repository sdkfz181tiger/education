console.log("utility.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Three.js
class ThreeManager{

	constructor(arDisplay){
		console.log("ThreeManager");

		// ARDisplay
		this._arDisplay = arDisplay;

		// Scene
		this._scene = new THREE.Scene();

		// Camera
		this._camera = new THREE.ARPerspectiveCamera(
			this._arDisplay, 60,
			window.innerWidth / window.innerHeight,
			this._arDisplay.depthNear, this._arDisplay.depthFar
		);

		// VRControls
		this._vrControls = new THREE.VRControls(this._camera);

		// Renderer
		this._renderer = new THREE.WebGLRenderer({alpha: true});
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		this._renderer.autoClear = false;
		this._canvas = this._renderer.domElement;
		document.body.appendChild(this._canvas);

		// ARView
		this._arView = new THREE.ARView(this._arDisplay, this._renderer);

		// Shadow
		this._renderer.shadowMap.enabled = true;
		this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// ARDebug
		let arDebug = new THREE.ARDebug(this._arDisplay, this._scene, {
			showLastHit: true,
			showPoseStatus: true,
			showPlanes: true
		});
		document.body.appendChild(arDebug.getElement());

		// HemiLight
		let hemiLight = new THREE.HemisphereLight(0x3333ff, 0x3333ff, 0.7);
		hemiLight.position.set(0, 30, 0);
		hemiLight.color.setHSL(0.7, 0.7, 0.7);
		hemiLight.groundColor.setHSL(1, 1, 1);
		this._scene.add(hemiLight);

		let hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
		this._scene.add(hemiLightHelper);

		// DirectionalLight
		let directionalLight = new THREE.DirectionalLight(0x999999);
		directionalLight.position.set(0, 0.7, 0.7);
		this._scene.add(directionalLight);

		// PlaneGeometry
		let planeGeometry = new THREE.PlaneGeometry(2000, 2000);
		planeGeometry.rotateX(-Math.PI / 2);
		let planeMesh = new THREE.Mesh(planeGeometry, new THREE.ShadowMaterial({
			color: 0x111111, opacity: 0.15
		}));
		planeMesh.receiveShadow = true;
		this._scene.add(planeMesh);

		// Resize
		window.addEventListener("resize", ()=>{
			this.onWindowResize();
		}, false);
	}

	onWindowResize(){
		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(window.innerWidth, window.innerHeight);
	}

	addScene(mesh){
		this._scene.add(mesh);
	}

	update(){
		// Clear
		this._renderer.clearColor();

		this._arView.render();
		this._camera.updateProjectionMatrix();
		this._vrControls.update();

		// // Render
		this._renderer.clearDepth();
		this._renderer.render(this._scene, this._camera);
	}

	addEventListener(type, callback){
		this._canvas.addEventListener(type, callback, false);
	}
}