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
		this._camera.position.set(0, 10, 40);
		this._camera.lookAt(new THREE.Vector3(0, 2, 0));
		this._scene.add(this._camera);

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

		var ambLight = new THREE.AmbientLight(0x999999);
		this._scene.add(ambLight);

		this._objs = [];
		let plane  = this.createPlane("myPlane");
		let box1   = this.createBox("myBox1", 0, 3, 0, 1);
		let sph1   = this.createSphere("mySphere1", 0, 6, 0, 1);
		let sph2   = this.createSphere("mySphere2", 0, 9, 0, 1);
		

		//this.createContact(plane.mat, box1.mat);
		//this.createContact(plane.mat, sph1.mat);
		//this.createContact(plane.mat, sph2.mat);
	}

	createPlane(name){
		// Mesh(Plane)
		let mesh = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.MeshPhongMaterial({color: 0x999999}));
		mesh.rotation.x = -Math.PI / 2;
		mesh.position.y = 0;
		mesh.receiveShadow = true;
		this._scene.add(mesh);
		// Material(Plane)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 0, material: mat});
		body.addShape(new CANNON.Plane());
		body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createBox(name, x, y, z, size){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.BoxGeometry(size, size, size),
			new THREE.MeshLambertMaterial({color: 0xffffff}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);

		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 1, material: mat});
		body.addShape(new CANNON.Box(new CANNON.Vec3(size*0.5,size*0.5,size*0.5)));
		body.position.set(x, y, z);
		//body.angularVelocity.set(5, 5, 5);
		//body.angularDamping = 0.1;
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createSphere(name, x, y, z, size){
		// Mesh(Sphere)
		let mesh = new THREE.Mesh(
			new THREE.SphereGeometry(size*0.9, 50, 50),
			new THREE.MeshLambertMaterial({color: 0xffffff}));
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		this._scene.add(mesh);

		// Material(Sphere)
		let mat = new CANNON.Material(name);
		let body = new CANNON.Body({mass: 1, material: mat});
		body.addShape(new CANNON.Sphere(size));
		body.position.set(x, y, z);
		//body.angularVelocity.set(5, 5, 5);
		//body.angularDamping = 0.1;
		this._world.add(body);
		// Object
		let obj = {mesh: mesh, mat: mat, body: body};
		this._objs.push(obj);
		return obj;
	}

	createContact(materialA, materialB){
		// Contact
		let contact = new CANNON.ContactMaterial(
			materialA, materialB, {
			contactEquationRelaxation: 3,        // 接触式の緩和性
			contactEquationStiffness: 10000000,  // 接触式の剛性
			friction: 0.3,                       // 摩擦係数
			frictionEquationRelaxation: 3,       // 摩擦式の剛性
			frictionEquationStiffness: 10000000, // 摩擦式の緩和性
			restitution: 0.3                     // 反発係数
		});
		this._world.addContactMaterial(contact);
	}

	update(){
		// Stats
		this._stats.update();
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
