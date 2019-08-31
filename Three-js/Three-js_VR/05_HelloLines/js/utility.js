console.log("utility.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Three.js
class ThreeManager{

	constructor(mode=false, 
		x=0, y=0, z=0, rX=0, rY=0, rZ=0){
		console.log("ThreeManager");

		// PC or VR
		//   false: PC mode(default)
		//   true:  VR mode
		this._mode = mode;

		// Polyfill(for VR)
		this._polyfill = new WebVRPolyfill();

		// Scene
		this._scene = new THREE.Scene();

		// Stats
		this._stats = new Stats();
		this._stats.setMode(0);
		this._stats.domElement.style.position = "absolute";
		this._stats.domElement.style.left     = "0px";
		this._stats.domElement.style.top      = "0px";
		document.body.appendChild(this._stats.domElement);

		// Axes
		this._axes = new THREE.AxisHelper(5);
		this._scene.add(this._axes);

		// Camera
		this._camera = new THREE.PerspectiveCamera(
			75, window.innerWidth/window.innerHeight, 0.1, 1000);

		// Container(for VR)
		this._cameraContainer = new THREE.Object3D();
		this._cameraContainer.add(this._camera);
		this._scene.add(this._cameraContainer);

		// PC or VR
		if(this._mode == false){
			// Camera
			this._camera.position.set(x, y, z);// PCでポジションを移動させる場合
			this._cameraContainer.rotation.set(rX*DEG_TO_RAD, rY*DEG_TO_RAD, rZ*DEG_TO_RAD);
			// Controls
			this._controls = new THREE.TrackballControls(this._camera);// Cameraのみ対応
			this._controls.target.set(0, 0, 0);
		}else{
			// CameraContainer
			this._cameraContainer.position.set(x, y, z);// VRでポジションを移動させる場合
			this._cameraContainer.rotation.set(rX*DEG_TO_RAD, rY*DEG_TO_RAD, rZ*DEG_TO_RAD);
		}

		// Light
		this._directionalLight = new THREE.DirectionalLight(0xffffff);
		this._directionalLight.position.set(0, 0.7, 0.7);
		this._scene.add(this._directionalLight);

		// Renderer
		this._renderer = new THREE.WebGLRenderer({antialias: true});
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		this._renderer.setClearColor(0x333333);
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.vr.enabled = this._mode;// Important(for VR)
		document.body.appendChild(this._renderer.domElement);

		// Button
		document.body.appendChild(WEBVR.createButton(this._renderer));

		// Promises
		this._promises = [];

		// Wire
		this.wireFrame(30, 30, 2, {color: 0x999999});
	}

	wireFrame(rows, cols, p, color){

		let sX = -p*cols*0.5;
		let sY = 0;
		let sZ = -p*rows*0.5;
		let material = new THREE.LineBasicMaterial(color);
		for(let r=0; r<=rows; r++){
			let h = new THREE.Geometry();
			h.vertices.push(new THREE.Vector3(sX, sY, sZ+p*r));
			h.vertices.push(new THREE.Vector3(sX+p*cols, sY, sZ+p*r));
			this._scene.add(new THREE.Line(h, material));
		}
		for(let c=0; c<=cols; c++){
			let v = new THREE.Geometry();
			v.vertices.push(new THREE.Vector3(sX+p*c, sY, sZ));
			v.vertices.push(new THREE.Vector3(sX+p*c, sY, sZ+p*cols));
			this._scene.add(new THREE.Line(v, material));
		}
	}

	animate(){

		// Stats
		this._stats.update();

		// Controls(for PC)
		if(this._mode == false) this._controls.update();

		// Render
		this._renderer.render(this._scene, this._camera);
	}

	//==========
	// Promise
	startPromise(assets, onSuccess, onError){

		for(let i=0; i<assets.data.length; i++){
			console.log(assets.data[i]);
			let data = assets.data[i];
			this._promises.push(
				this.asyncPromise(data.path, data.mtl, data.obj));
		}
		Promise.all(this._promises).then(onSuccess, onError);
	}

	// Promise
	asyncPromise(path, mtl, obj){
		return new Promise((resolve, reject)=>{
			// MTLLoader
			let mtlLoader = new THREE.MTLLoader();
			mtlLoader.setPath(path);
			mtlLoader.load(mtl, (materials)=>{
				console.log("onLoaded:" + mtl);
				materials.preload();
				// OBJLoader
				let objLoader = new THREE.OBJLoader();
				objLoader.setPath(path);
				objLoader.setMaterials(materials);
				objLoader.load(obj, (meshes)=>{
					meshes.children.forEach((mesh)=>{
						mesh.geometry.computeFaceNormals();
						mesh.geometry.computeVertexNormals();
					});
					meshes.scale.set(1, 1, 1);
					meshes.rotation.set(0, Math.PI, 0);
					meshes.position.set(0, 0, 0);
					resolve(meshes);// Resolve
				});
			}, (progress)=>{
				console.log("onProgress");
			}, (error)=>{
				console.log("onError:" + error);
				reject(error);// Reject
			});
		});
	}
}