console.log("utility.js!!");

const OS_Android = "Android";
const OS_iPhone  = "iPhone";
const OS_iPad    = "iPad";
const OS_iPod    = "iPod";

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

// Three.js
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
		this._world.gravity.set(0, -9.82, 0);
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
		this._camera.position.set(0, 15, 20);
		this._camera.lookAt(new THREE.Vector3(0, 2, 0));
		this._scene.add(this._camera);

		// Controls
		this._controls = new THREE.TrackballControls(this._camera);// Cameraのみ対応
		this._controls.target.set(0, 0, 0);

		// Renderer
		this._renderer = new THREE.WebGLRenderer({antialias: true});
		this._renderer.setSize(480, 320);
		this._renderer.setClearColor(0x000000, 1);
		this._renderer.shadowMap.enabled = true;
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

		let ambLight = new THREE.AmbientLight(0x999999);
		this._scene.add(ambLight);

		this._objs = [];
		let ground = this.createPlane("myGround");
		let box1   = this.createBox("myBox1", 0, 1, 0, 2, 0.5, 2, 0x333333);
		// let box2   = this.createBox("myBox2", 0, 2, 0, 2, 0.5, 2, 0x333333);
		// let box3   = this.createBox("myBox3", 0, 3, 0, 2, 0.5, 2, 0x333333);
		let sph1   = this.createSphere("mySphere1", 0, 6, -10, 1);
		let sph2   = this.createSphere("mySphere2", 0, 9, -15, 1);
		let cyl1   = this.createCylinder("myCylinder1", 0, 6, -5, 1, 1, 1, 10, 0x993333);
		// let cyl2   = this.createCylinder("myCylinder2", 0, 4, 0, 1, 1, 1, 10, 0x339933);
		// let cyl3   = this.createCylinder("myCylinder3", 0, 5, 0, 1, 1, 1, 10, 0x333399);

		ground.body.addEventListener("collide", (e)=>{
			// console.log(e.contact.bi.material.name);
			// console.log(e.contact.bj.material.name);
		});

		this.createContact(ground.mat, ground.mat);
		this.createContact(ground.mat, box1.mat, 0.01);
		this.createContact(ground.mat, cyl1.mat, 0.0001);
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
		body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -80*DEG_TO_RAD);
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createBox(name, x, y, z, w, h, d, color=0xffffff){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.BoxGeometry(w, h, d),
			new THREE.MeshLambertMaterial({color: color}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 1, material: mat});
		body.addShape(new CANNON.Box(new CANNON.Vec3(w*0.5,h*0.5,d*0.5)));
		body.position.set(x, y, z);
		//body.angularVelocity.set(5, 5, 5);
		//body.angularDamping = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createSphere(name, x, y, z, radius, color=0xffffff){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.SphereGeometry(radius*0.95, 50, 50),
			new THREE.MeshLambertMaterial({color: color}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 1, material: mat});
		body.addShape(new CANNON.Sphere(radius));
		body.position.set(x, y, z);
		//body.angularVelocity.set(5, 5, 5);
		//body.angularDamping = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createCylinder(name, x, y, z, t, b, h, seg, color=0xffffff){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.CylinderGeometry(t*0.95, b*0.95, h*0.95, seg),
			new THREE.MeshLambertMaterial({color: color}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 1, material: mat});
		let vec3 = new CANNON.Vec3();
		let quat = new CANNON.Quaternion(1, 0, 0, 1);
		quat.normalize();
		body.addShape(new CANNON.Cylinder(t, b, h, seg), vec3, quat);
		body.position.set(x, y, z);
		//body.angularVelocity.set(5, 5, 5);
		//body.angularDamping = 0.1;
		body.allowSleep = true;// Sleep
		body.addEventListener("sleep", (e)=>{
			console.log("sleep:" + name);
		});
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createContact(materialA, materialB, fri=0.4, rest=0.3){
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
		// Renderer
		this._renderer.render(this._scene, this._camera);
	}
}
