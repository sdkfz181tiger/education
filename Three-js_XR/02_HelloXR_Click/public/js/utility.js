console.log("utility.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const options = {AR_AUTOSTART: true};

// Three.js
class ThreeManager{

	constructor(displays){
		console.log("ThreeManager");

		// Clock
		this._clock = new THREE.Clock();

		// Container
		let container = document.createElement("div");
		document.body.appendChild(container);

		// Scene, Camera, Renderer
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera();
		this._scene.add(this._camera);
		this._renderer = new THREE.WebGLRenderer({alpha: true});
		this._renderer.autoClear = false;
		container.appendChild(this._renderer.domElement);

		// Stats
		this._stats = new Stats();
		this._stats.setMode(0);
		this._stats.domElement.style.position = "absolute";
		this._stats.domElement.style.left     = "0px";
		this._stats.domElement.style.top      = "0px";
		document.body.appendChild(this._stats.domElement);

		// Axes
		this._axes = new THREE.AxesHelper(2);
		this._scene.add(this._axes);

		// Reticle
		this._reticle = new THREE.Mesh(
			new THREE.RingGeometry(0.04, 0.05, 36, 64),
			new THREE.MeshBasicMaterial({color: "#DDFFDD"})
		);
		this._reticle.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));
		this._reticle.visible = false;
		this._scene.add(this._reticle);

		// Window resize
		window.addEventListener("resize", this.resetWindow, false);

		// Raycaster
		let mouseVector = new THREE.Vector3();
		let raycaster = new THREE.Raycaster();
		this._raycasterListener = null;

		// Click
		window.addEventListener("click", (e)=>{
			event.preventDefault();
			let x = (e.layerX/window.innerWidth)*2-1;
			let y = - (e.layerY/window.innerHeight)*2+1;
			mouseVector.set(x, y, 0.5);
			raycaster.setFromCamera(mouseVector, this._camera);
			let intersects = raycaster.intersectObject(this._scene, true);
			if(this._raycasterListener != null && 0 < intersects.length){
				this._raycasterListener(intersects);// Callback
			}
		}, false);

		// WebXRManager
		this._renderer.xr = new THREE.WebXRManager(options, displays, 
			this._renderer, this._camera, this._scene, (frame)=>{
				this.update(frame);
			});
		this._renderer.xr.addEventListener("sessionStarted", (data)=>{
			console.log("onSessionStarted:" + data.session.realityType);
			this.resetWindow();
		});
	}

	resetWindow(){
		setTimeout(() => {
			this._camera.aspect = window.innerWidth / window.innerHeight;
			this._camera.updateProjectionMatrix();
		}, 200);
	}

	setRaycasterListener(callback){
		this._raycasterListener = callback;
	}

	update(frame){
		// Stats
		this._stats.update();

		let hit = frame.hitTestNoAnchor(0.5, 0.5);
		let model     = new THREE.Matrix4();
		let tempPos   = new THREE.Vector3();
		let tempQuat  = new THREE.Quaternion();
		let tempScale = new THREE.Vector3();
		if(hit && hit.length > 0){
			this._reticle.visible = true;
			model.fromArray(hit[0].modelMatrix);
			model.decompose(tempPos, tempQuat, tempScale);
			this._reticle.position.copy(tempPos);
			this._reticle.quaternion.copy(tempQuat);
		}
	}
}