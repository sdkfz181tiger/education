console.log("utility.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Three.js
class ThreeManager{

	constructor(pcX=0, pcY=0, pcZ=0, vrX=0, vrY=0, vrZ=0){
		console.log("ThreeManager");

		// PC or VR
		//   false: PC mode(default)
		//   true:  VR mode
		this._modeVR = false;
		if(navigator.activeVRDisplays != null && 0 < navigator.activeVRDisplays.length){
			this._modeVR = true;
		}

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
		this._axes = new THREE.AxesHelper(5);
		this._scene.add(this._axes);

		// Camera
		this._camera = new THREE.PerspectiveCamera(
			75, window.innerWidth/window.innerHeight, 0.1, 1000);

		// Container(for VR)
		this._cameraContainer = new THREE.Object3D();
		this._cameraContainer.add(this._camera);
		this._scene.add(this._cameraContainer);

		// PC or VR
		if(this._modeVR == false){
			// Camera
			this._camera.position.set(pcX, pcY, pcZ);// PCでポジションを移動させる場合
			this._cameraContainer.rotation.set(0*DEG_TO_RAD, 0*DEG_TO_RAD, 0*DEG_TO_RAD);
			// Controls
			this._controls = new THREE.TrackballControls(this._camera);// Cameraのみ対応
			this._controls.target.set(0, 0, 0);
		}else{
			// CameraContainer
			this._cameraContainer.position.set(vrX, vrY, vrZ);// VRでポジションを移動させる場合
			this._cameraContainer.rotation.set(0*DEG_TO_RAD, 0*DEG_TO_RAD, 0*DEG_TO_RAD);
		}

		// HemiLight
		this._hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
		this._hemiLight.position.set(0, 30, 0);
		this._hemiLight.color.setHSL(0.7, 0.9, 0.7);
		this._hemiLight.groundColor.setHSL(1, 1, 1);
		this._scene.add(this._hemiLight);
		this._hemiLightHelper = new THREE.HemisphereLightHelper(this._hemiLight, 10);
		this._scene.add(this._hemiLightHelper);

		// Light
		this._dirLight = new THREE.DirectionalLight(0xffffff);
		this._dirLight.position.set(-20.0, 20.0, 20.0);
		this._scene.add(this._dirLight);
		this._dirLightHelper = new THREE.DirectionalLightHelper(this._dirLight, 5);
		this._scene.add(this._dirLightHelper);

		// Renderer
		this._renderer = new THREE.WebGLRenderer({antialias: true});
		this._renderer.setSize(window.innerWidth, window.innerHeight);
		this._renderer.setPixelRatio(window.devicePixelRatio);
		this._renderer.setClearColor(0x666666);
		this._renderer.gammaOutput = true;
		this._renderer.gammaFactor = 2.2;
		this._renderer.vr.enabled = this._modeVR;// Important(for VR)
		document.body.appendChild(this._renderer.domElement);

		// CSS2DRenderer
		this._cssRenderer = new THREE.CSS2DRenderer();
		this._cssRenderer.setSize(window.innerWidth, window.innerHeight);
		this._cssRenderer.domElement.style.position = "absolute";
		this._cssRenderer.domElement.style.top = 0;
		document.body.appendChild(this._cssRenderer.domElement);

		// Button
		document.body.appendChild(WEBVR.createButton(this._renderer));

		// Wire
		this.createWire(30, 30, 2, {color: 0x999999});

		// Group
		this._group = new THREE.Group();
		this._scene.add(this._group);

		// Raycaster(for PC)
		let mouseVector = new THREE.Vector3();
		let raycaster = new THREE.Raycaster();
		this._raycasterListener = null;

		// Resize
		window.addEventListener("resize", (e)=>{
			this._camera.aspect = window.innerWidth / window.innerHeight;
			this._camera.updateProjectionMatrix();
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			this._cssRenderer.setSize(window.innerWidth, window.innerHeight);
		}, false);

		// Click
		window.addEventListener("click", (e)=>{
			event.preventDefault();
			let x = (e.layerX/window.innerWidth)*2-1;
			let y = - (e.layerY/window.innerHeight)*2+1;
			mouseVector.set(x, y, 0.5);
			raycaster.setFromCamera(mouseVector, this._camera);
			let intersects = raycaster.intersectObject(this._group, true);
			if(this._raycasterListener != null && 0 < intersects.length){
				this._raycasterListener(intersects);// Callback
			}
		}, false);

		/*
		// Raycaster(for VR)
		let tempMatrix = new THREE.Matrix4();
		let raycaster  = new THREE.Raycaster();
		let targets    = this._group;

		this._ctl1 = this._renderer.vr.getController(0);
		this._ctl1.addEventListener("selectstart", onSelectStart);
		this._ctl1.addEventListener("selectend",   onSelectEnd);
		this._cameraContainer.add(this._ctl1);
		this._ctl2 = this._renderer.vr.getController(1);
		this._ctl2.addEventListener("selectstart", onSelectStart);
		this._ctl2.addEventListener("selectend",   onSelectEnd);
		this._cameraContainer.add(this._ctl2);

		// Line
		let geometry = new THREE.BufferGeometry().setFromPoints(
			[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
		let line = new THREE.Line(geometry);
		line.name = "line";
		line.scale.z = 20;// Length of line
		this._ctl1.add(line.clone());
		this._ctl2.add(line.clone());

		// Models, Sounds, Fonts
		this._models = [];
		this._sounds = [];
		this._fonts  = [];

		function onSelectStart(event){
			console.log("onSelectStart");
			let target = event.target;
			tempMatrix.identity().extractRotation(target.matrixWorld);
			raycaster.ray.origin.setFromMatrixPosition(target.matrixWorld);
			raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
			let intersections = raycaster.intersectObjects(targets.children, true);
			if(this._raycasterListener != null && 0 < intersects.length){
				this._raycasterListener(intersects);// Callback
			}
		}

		function onSelectEnd(event){
			console.log("onSelectEnd");
		}
		*/
	}

	update(){
		// Stats
		this._stats.update();

		// Controls(for PC)
		if(this._modeVR == false) this._controls.update();

		// Render
		this._renderer.render(this._scene, this._camera);

		// CSS2DRenderer
		this._cssRenderer.render(this._scene, this._camera);
	}

	getCamera(){
		return this._camera;
	}

	getCameraContainer(){
		return this._cameraContainer;
	}

	addScene(mesh){
		this._scene.add(mesh);
	}

	addGroup(mesh){
		this._group.add(mesh);
	}

	//==========
	// ClickEvent
	setRaycasterListener(callback){
		this._raycasterListener = callback;
	}

	//==========
	// Skybox
	createSkybox(path, total, scale){
		let textures = [];
		for(let i=0; i<total; i++){
			textures[i] = new THREE.Texture();
		}
		let img = new Image();
		img.onload = ()=>{
			let canvas, context;
			let size = img.height;
			for(let i=0; i < textures.length; i++){
				canvas  = document.createElement("canvas");
				context = canvas.getContext("2d");
				canvas.width = size; canvas.height = size;
				context.drawImage(
					img, size*i, 0, size, size, 0, 0, size, size);
				textures[i].image = canvas
				textures[i].needsUpdate = true;
			}
		};
		img.src = path;

		let materials = [];
		for(let i=0; i<textures.length; i++){
			materials.push(new THREE.MeshBasicMaterial({map: textures[i]}));
		}

		let skybox = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), materials);
		skybox.geometry.scale(scale, scale, -scale);
		skybox.position.set(0, 0, 0);
		return skybox;
	}

	//==========
	// Wire
	createWire(rows, cols, p, color){

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
}

// GLTFLoader
class GLTFLoader{

	constructor(){
		console.log("GLTFLoader");
	}

	loadModels(models, onSuccess, onError){
		let promises = [];
		for(let i=0; i<models.data.length; i++){
			let data = models.data[i];
			promises.push(
				this.asyncModel(data.dir, data.glb));
		}
		Promise.all(promises).then((results)=>{
			this._models = results;// Models
			onSuccess();
		}, (error)=>{
			console.log(error);
			onError(error);
		});
	}

	findModels(glb){
		for(let i=0; i<this._models.length; i++){
			if(this._models[i].glb != glb) continue;
			return this._models[i];
		}
		return null;
	}

	asyncModel(dir, glb){
		return new Promise((resolve, reject)=>{
			// GLTFLoader
			let path = dir + glb;
			let loader = new THREE.GLTFLoader();
			loader.load(path, (model)=>{
				model.dir = dir; model.glb = glb;
				resolve(model);// Resolve
			}, undefined, (error)=>{
				console.log("onError:" + error);
				reject(error);// Reject
			});
		});
	}
}

class SoundLoader{

	constructor(camera){
		console.log("FontLoader");
		this._camera = camera;
	}

	loadSounds(sounds, onSuccess, onError){
		let promises = [];
		for(let i=0; i<sounds.data.length; i++){
			let data = sounds.data[i];
			promises.push(
				this.asyncSound(data.dir, data.mp3));
		}
		Promise.all(promises).then((results)=>{
			this._sounds = results;// Sounds
			onSuccess();
		}, (error)=>{
			console.log(error);
			onError();
		});
	}

	findSounds(name){
		for(let i=0; i<this._sounds.length; i++){
			if(this._sounds[i].name != name) continue;
			return this._sounds[i];
		}
		return null;
	}

	asyncSound(dir, mp3){
		return new Promise((resolve, reject)=>{
			// AudioLoader
			let aListener = new THREE.AudioListener();
			this._camera.add(aListener);
			let sound = new THREE.PositionalAudio(aListener);
			let aLoader = new THREE.AudioLoader();
			let path = dir + mp3;
			aLoader.load(path, (buffer)=>{
				sound.setBuffer(buffer);
				sound.setRefDistance(10);
				sound.name = mp3;// Name
				resolve(sound);  // Resolve
			}, (progress)=>{
				//console.log("onProgress");
			}, (error)=>{
				console.log("onError:" + error);
				reject(error);// Reject
			});
		});
	}
}

class FontLoader{

	constructor(){
		console.log("FontLoader");
	}

	loadFonts(fonts, onSuccess, onError){
		let promises = [];
		for(let i=0; i<fonts.data.length; i++){
			let data = fonts.data[i];
			promises.push(
				this.asyncFonts(data.dir, data.font));
		}
		Promise.all(promises).then((results)=>{
			this._fonts = results;// Fonts
			onSuccess();
		}, (error)=>{
			console.log(error);
			onError();
		});
	}

	findFonts(name){
		for(let i=0; i<this._fonts.length; i++){
			if(this._fonts[i].data.familyName != name) continue;
			return this._fonts[i];
		}
		return null;
	}

	asyncFonts(dir, font){
		return new Promise((resolve, reject)=>{
			// FontLoader
			let loader = new THREE.FontLoader();
			let path = dir + font;
			loader.load(path, (result)=>{
				resolve(result);// Resolve
			}, (progress)=>{
				//console.log("onProgress");
			}, (error)=>{
				console.log("onError:" + error);
				reject(error);// Reject
			});
		});
	}

	//==========
	// Label, Text
	createLabel(str="***", className="label"){
		let div = document.createElement("div");
		div.textContent = str;
		div.className = className;
		let label = new THREE.CSS2DObject(div);
		label.position.set(0, 0, 0);
		return label;
	}

	createText(str="***", font, size=4, x=0, y=4, z=-0){
		let textGeo = new THREE.TextGeometry(str, {
			font: font, size: size, height: 2, curveSegments: 4,
			bevelThickness: 2, bevelSize: 0.2, bevelEnabled: false
		});
		textGeo.computeBoundingBox();
		textGeo.computeVertexNormals();
		let materials = [
			new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true}),
			new THREE.MeshPhongMaterial({color: 0xffffff })
		];
		let centerOffset = (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) * 0.5;
		let textMesh = new THREE.Mesh(textGeo, materials);
		textMesh.position.x = x - centerOffset;
		textMesh.position.y = y;
		textMesh.position.z = z;
		textMesh.rotation.x = 0;
		textMesh.rotation.y = Math.PI * 2;
		return textMesh;
	}
}

class CtlVR{

	constructor(){
		console.log("Controller(VR)");

		// State
		this._state = {
			buttons: [false, false]// Touchpad, Trigger
		};

		// Listener
		this._onTouchpadPressed  = null;
		this._onTouchpadReleased = null;
		this._onTriggerPressed   = null;
		this._onTriggerReleased  = null;
	}

	setTouchpadListener(onPressed, onReleased){
		if(onPressed != null)  this._onTouchpadPressed  = onPressed;
		if(onReleased != null) this._onTouchpadReleased = onReleased;
	}

	setTriggerListener(onPressed, onReleased){
		if(onPressed != null)  this._onTriggerPressed  = onPressed;
		if(onReleased != null) this._onTriggerReleased = onReleased;
	}

	update(){
		let gamePad = navigator.getGamepads()[0];
		if(gamePad == null) return;
		//console.log("GamePad:" + gamePad.id);

		if(gamePad.axes == null || gamePad.buttons == null) return;
		let axes    = gamePad.axes;
		let buttons = gamePad.buttons;

		if(this._state.buttons[0] != buttons[0].pressed){
			this._state.buttons[0] = buttons[0].pressed;
			if(buttons[0].pressed){
				console.log("Touchpad has pressed!!");
				if(this._onTouchpadPressed) this._onTouchpadPressed(axes);
			}else{
				console.log("Touchpad has released!!");
				if(this._onTouchpadPressed) this._onTouchpadPressed(axes);
			}
		}

		if(this._state.buttons[1] != buttons[1].pressed){
			this._state.buttons[1] = buttons[1].pressed;
			if(buttons[1].pressed){
				console.log("Trigger has pressed!!");
				if(this._onTriggerPressed) this._onTriggerPressed();
			}else{
				console.log("Trigger has released!!");
				if(this._onTriggerReleased) this._onTriggerReleased();
			}
		}
	}
}