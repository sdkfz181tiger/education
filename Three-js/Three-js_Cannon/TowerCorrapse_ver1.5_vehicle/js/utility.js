console.log("utility.js!!");

const DISP_W = 480;
const DISP_H = 320;

const OS_Android = "Android";
const OS_iPhone  = "iPhone";
const OS_iPad    = "iPad";
const OS_iPod    = "iPod";

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// CannonManager
class CannonManager{

	constructor(pcX=0, pcY=0, pcZ=0){
		console.log("CannonManager");

		// PC or Smartphone
		this._modeAndroid = false;
		this._modeiOS     = false;
		if(navigator.userAgent.indexOf(OS_Android) > 0) this._modeAndroid = true;
		if(navigator.userAgent.indexOf(OS_iPhone)  > 0) this._modeiOS = true;
		if(navigator.userAgent.indexOf(OS_iPad)    > 0) this._modeiOS = true;
		if(navigator.userAgent.indexOf(OS_iPod)    > 0) this._modeiOS = true;

		console.log("_modeAndroid:" + this._modeAndroid);
		console.log("_modeiOS:" + this._modeiOS);

		// World
		this._world = new CANNON.World();
		this._world.gravity.set(0, -9.82, 0);// 0, -9.82, 0
		this._world.broadphase = new CANNON.NaiveBroadphase();
		this._world.solver.iterations = 5; // 反復計算回数
		this._world.solver.tolerance = 0.1;// 許容値
		this._world.allowSleep = true;     // Sleep

		// Scene
		this._scene = new THREE.Scene();
		this._scene.fog = new THREE.Fog(0x000000, 1, 100);

		// Debugger
		this._debugRenderer = new THREE.CannonDebugRenderer(this._scene, this._world);

		// Axes
		this._axes = new THREE.AxesHelper(5);
		this._scene.add(this._axes);

		// Stats
		this._stats = new Stats();
		this._stats.setMode(0);
		this._stats.domElement.style.position = "absolute";
		this._stats.domElement.style.left     = "0px";
		this._stats.domElement.style.top      = "0px";
		document.body.appendChild(this._stats.domElement);

		// Camera
		this._camera = new THREE.PerspectiveCamera(30, 650/400, 1, 10000);
		this._camera.position.set(0, 4, 18);            // Default
		this._camera.lookAt(new THREE.Vector3(0, 0, 0));// Default
		this._scene.add(this._camera);

		this._cameraX = new THREE.PerspectiveCamera(30, 650/400, 1, 10000);
		this._cameraX.position.set(4, 4, 18);            // Default
		this._cameraX.lookAt(new THREE.Vector3(0, 0, 0));// Default
		this._scene.add(this._cameraX);

		// Controls
		this._controls = new THREE.TrackballControls(this._camera);// Cameraのみ対応
		this._controls.target.set(0, 0, 0);// Default

		// Renderer
		this._renderer = new THREE.WebGLRenderer({antialias: true});
		this._renderer.setSize(480, 320);
		this._renderer.setClearColor(0x000000, 1);
		this._renderer.shadowMap.enabled = true;
		this._renderer.autoClear = false;// For multi screens
		document.body.appendChild(this._renderer.domElement);

		// DirectionalLight
		let dirLight = new THREE.DirectionalLight(0xffffff, 2);
		dirLight.position.set(3, 10, 3);
		dirLight.castShadow            = true;
		dirLight.shadow.mapSize.width  = 1024;
		dirLight.shadow.mapSize.height = 1024;
		dirLight.shadow.camera.left    = -10;
		dirLight.shadow.camera.right   = 10;
		dirLight.shadow.camera.top     = 10;
		dirLight.shadow.camera.bottom  = -10;
		dirLight.shadow.camera.far     = 100;
		dirLight.shadow.camera.near    = 0;
		this._scene.add(dirLight);

		// AmbientLight
		let ambLight = new THREE.AmbientLight(0x999999);
		this._scene.add(ambLight);

		// Objects
		this._objs = [];
	}

	// Get(Scene, Camera, Controls, Renderer)
	getScene(){return this._scene;}
	getCamera(){return this._camera;}
	getControls(){return this._controls;}
	getRenderer(){return this._renderer;}

	addScene(mesh){
		this._scene.add(mesh);
	}

	createPlane(name, color=0xffffff){
		// Mesh(Plane)
		let mesh = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.MeshPhongMaterial({color: color}));
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Plane)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 0, material: mat});
		body.addShape(new CANNON.Plane());
		body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -90*DEG_TO_RAD);
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createBox(name, x, y, z, w, h, d, mass=1, color=0xffffff){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.BoxGeometry(w, h, d),
			new THREE.MeshLambertMaterial({color: color}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: mass, material: mat});
		body.addShape(new CANNON.Box(new CANNON.Vec3(w*0.5,h*0.5,d*0.5)));
		body.position.set(x, y, z);
		body.linearDamping   = 0.1;
		body.angularDamping  = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			//console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createSphere(name, x, y, z, radius, mass=1, color=0xffffff){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.SphereGeometry(radius*0.95, 50, 50),
			new THREE.MeshLambertMaterial({color: color}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: mass, material: mat});
		body.addShape(new CANNON.Sphere(radius));
		body.position.set(x, y, z);
		body.linearDamping   = 0.1;
		body.angularDamping  = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			//console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createCylinder(name, x, y, z, t, b, h, seg, mass=1, color=0xffffff){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.CylinderGeometry(t*0.98, b*0.98, h*0.98, seg),
			new THREE.MeshLambertMaterial({color: color}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: mass, material: mat});
		let quat = new CANNON.Quaternion(-1, 0, 0, 1);
		quat.normalize();
		body.addShape(new CANNON.Cylinder(t, b, h, seg), 
			new CANNON.Vec3(), quat);
		body.position.set(x, y, z);
		body.linearDamping   = 0.1;
		body.angularDamping  = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			//console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createBoxWithModel(name, x, y, z, model, scale=0.1, mass=1){
		// Measure
		let box3 = new THREE.Box3().setFromObject(model);
		let w = box3.max.x - box3.min.x;
		let h = box3.max.y - box3.min.y;
		let d = box3.max.z - box3.min.z;
		// Anchor
		model.children[0].position.z   -= d * 0.5;
		model.children[0].castShadow    = true;
		model.children[0].receiveShadow = true;
		// Scale
		model.scale.set(scale, scale, scale);
		this._scene.add(model);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: mass, material: mat});
		body.addShape(new CANNON.Box(new CANNON.Vec3(w*scale*0.5, h*scale*0.5, d*scale*0.5)));
		body.quaternion.set(-1, 0, 0, 1);
		body.position.set(x, y, z);
		body.linearDamping   = 0.1;
		body.angularDamping  = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			//console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: model, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createVehicleWithModel(name, x, y, z, model, scale=0.1){
		// Measure
		let box3 = new THREE.Box3().setFromObject(model);
		let w = box3.max.x - box3.min.x;
		let h = box3.max.y - box3.min.y;
		let d = box3.max.z - box3.min.z;
		// Anchor
		model.children[0].position.z   -= d * 0.5;
		model.children[0].castShadow    = true;
		model.children[0].receiveShadow = true;
		// Scale
		model.scale.set(scale, scale, scale);
		this._scene.add(model);
		// VehicleManager
		let vm = new VehicleManager(this._world);
		vm.createVehicle(name, x, y, z, w*scale*0.5, h*scale*0.5, d*scale*0.5);
		// Object
		let obj = {mesh: model, mat: vm.getMaterial(), body: vm.getBody()};
		this._objs.push(obj);
		return obj;
	}

	createContact(materialA, materialB, fri=0.01, rest=0.3){
		// Contact
		let contact = new CANNON.ContactMaterial(
			materialA, materialB, {
			friction: fri,
			restitution: rest,
			contactEquationStiffness: 1e8,
			contactEquationRelaxation: 3,
			frictionEquationStiffness: 1e8,
			frictionEquationRegularizationTime: 3
		});
		this._world.addContactMaterial(contact);
	}

	update(){
		// Stats
		this._stats.update();
		// Controls(for PC and Devices)
		this._controls.update();
		// World
		this._world.step(1 / 60);
		// Position, Quatanion
		for(let obj of this._objs){
			obj.mesh.position.copy(obj.body.position);
			obj.mesh.quaternion.copy(obj.body.quaternion);
		}
		// Debugger
		this._debugRenderer.update();

		// Multi screen
		this._camera.aspect  = 0.5 * DISP_W / DISP_H;
		this._cameraX.aspect = 0.5 * DISP_W / DISP_H;
		this._camera.updateProjectionMatrix();
		this._cameraX.updateProjectionMatrix();

		this._renderer.setViewport(0, 0, DISP_W, DISP_H);
		this._renderer.clear();

		this._renderer.setViewport(0, 0, DISP_W*0.5, DISP_H);
		this._renderer.render(this._scene, this._camera);
		
		this._renderer.setViewport(DISP_W*0.5, 0, DISP_W*0.5, DISP_H);
		this._renderer.render(this._scene, this._cameraX);

		// Renderer
		//this._renderer.render(this._scene, this._camera);
	}
}

// ObjLoader
class ObjLoader{

	constructor(){
		console.log("ObjLoader");
	}

	loadModels(models, onSuccess, onError){
		let promises = [];
		for(let i=0; i<models.data.length; i++){
			let data = models.data[i];
			promises.push(
				this.asyncModel(data.dir, data.mtl, data.obj));
		}
		Promise.all(promises).then((results)=>{
			this._models = results;// Models
			onSuccess();
		}, (error)=>{
			console.log(error);
			onError();
		});
	}

	findModels(name){
		for(let i=0; i<this._models.length; i++){
			if(this._models[i].name != name) continue;
			return this._models[i].clone();
		}
		return null;
	}

	asyncModel(dir, mtl, obj){
		return new Promise((resolve, reject)=>{
			// MTLLoader
			let mtlLoader = new THREE.MTLLoader();
			mtlLoader.setPath(dir);
			mtlLoader.load(mtl, (materials)=>{
				materials.preload();
				// OBJLoader
				let objLoader = new THREE.OBJLoader();
				objLoader.setPath(dir);
				objLoader.setMaterials(materials);
				objLoader.load(obj, (meshes)=>{
					meshes.children.forEach((mesh)=>{
						mesh.geometry.computeFaceNormals();
						mesh.geometry.computeVertexNormals();
					});
					meshes.name = obj;// Name
					resolve(meshes);  // Resolve
				});
			}, (progress)=>{
				//console.log("onProgress");
			}, (error)=>{
				console.log("onError:" + error);
				reject(error);// Reject
			});
		});
	}
}

class SoundLoader{

	constructor(camera){
		console.log("SoundLoader");
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

	findAndPlay(name){
		let sound = this.findSounds(name);
		if(!sound) return;
		if(sound.isPlaying) sound.stop();
		sound.play();
	}

	findAndStop(name){
		let sound = this.findSounds(name);
		if(!sound) return;
		if(sound.isPlaying) sound.stop();
	}
}

// GamepadHelper
class GamepadHelper{

	constructor(){
		console.log("GamePadHelper");
		// Connect / Disconnect
		this._connectedListener    = null;
		this._disconnectedListener = null;
		// Gamepads
		this._gamepads        = {};
		this._prevAxes        = {};
		this._prevButtons     = {};
		this._axesListener    = null;
		this._buttonsListener = null;
		this.init();
	}

	init(){
		// Connected
		window.addEventListener("gamepadconnected", (e)=>{
			if(this._connectedListener) this._connectedListener(e.gamepad);
			this.gamepadHandler(e.gamepad, true);
		});

		// Disconeccted
		window.addEventListener("gamepaddisconnected", (e)=>{
			if(this._diconnectedListener) this._diconnectedListener(e.gamepad);
			this.gamepadHandler(e.gamepad, false);
		});
	}

	setConnectedListener(callback){
		this._connectedListener = callback;
	}

	setDisconnectedListener(callback){
		this._diconnectedListener = callback;
	}

	gamepadHandler(gamepad, connectFlg){
		console.log("gamepadHandler");
		// Note:
		// gamepad === navigator.getGamepads()[gamepad.index]
		if(connectFlg){
			this._gamepads[gamepad.index]    = gamepad;
			this._prevAxes[gamepad.index]    = gamepad.axes.concat();
			this._prevButtons[gamepad.index] = gamepad.buttons.concat();
			for(let i=0; i<this._prevAxes[gamepad.index].length; i++){
				this._prevAxes[gamepad.index][i] = 0;
			}
			for(let i=0; i<this._prevButtons[gamepad.index].length; i++){
				this._prevButtons[gamepad.index][i] = false;
			}
			this.loop();
		}else{
			delete this._gamepads[gamepad.index];
		}
	}

	setAxesXListener(callback){
		this._axesXCallback = callback;
	}

	setAxesYListener(callback){
		this._axesYCallback = callback;
	}

	setButtonsListener(callback){
		this._buttonsCallback = callback;
	}

	loop(){
		setTimeout(()=>{
			for(let index in this._gamepads){
				let gamepad = this._gamepads[index];

				// Axes(X)
				let disX = this._prevAxes[index][0] - Math.round(gamepad.axes[0]);
				if(disX < 0) disX *= -1.0;
				if(0.5 < disX){
					this._prevAxes[index][0] = Math.round(gamepad.axes[0]);
					if(this._axesXCallback){
						this._axesXCallback(index, this._prevAxes[index][0]);
					}
				}

				// Axes(Y)
				let disY = this._prevAxes[index][1] - Math.round(gamepad.axes[1]);
				if(disY < 0) disY *= -1.0;
				if(0.5 < disY){
					this._prevAxes[index][1] = Math.round(gamepad.axes[1]);
					if(this._axesYCallback){
						this._axesYCallback(index, this._prevAxes[index][1]);
					}
				}

				// Buttons
				for(let i=0; i<gamepad.buttons.length; i++){
					if(this._prevButtons[index][i] != gamepad.buttons[i].pressed){
						this._prevButtons[index][i] = gamepad.buttons[i].pressed;
						if(this._buttonsCallback){
							this._buttonsCallback(index, i, gamepad.buttons[i].pressed);
						}
					}
				}
			}
			if(this._gamepads.length <= 0) return;
			this.loop();
		}, 100);
	}
}