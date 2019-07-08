console.log("vehicle.js!!");

// VehicleManager
class VehicleManager{

	constructor(world){
		console.log("VehicleManager");
		// World
		this._world = world;
		// ContactMaterial
		let groundMaterial = new CANNON.Material("groundMaterial");
		let wheelMaterial = new CANNON.Material("wheelMaterial");
		let wheelGroundContactMaterial = window.wheelGroundContactMaterial = 
			new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
				friction: 0.3,                // タイヤの摩擦
				restitution: 0.5,             // タイヤの反発
				contactEquationStiffness: 1000
		});
		this._world.addContactMaterial(wheelGroundContactMaterial);
	}

	createVehicle(name, x=0, y=1, z=0, sX=1.4, sY=1.0, sZ=0.5){

		this._mat = new CANNON.Material(name);
		this._body = new CANNON.Body({mass: 150, material: this._mat});
		this._body.addShape(new CANNON.Box(new CANNON.Vec3(sX, sY, sZ)));
		this._body.position.set(x, y, z);
		this._body.quaternion.set(-1, 0, 0, 1);
		this._body.allowSleep = false;// Sleepをしない様に
		this._body.addEventListener("sleep", (e)=>{
			console.log("sleep: car!!");
		});

		const options = {
			radius: 0.5,     // タイヤの大きさ
			frictionSlip: 50,// タイヤのグリップ
			rollInfluence: 0.01,
			suspensionStiffness: 30,
			suspensionRestLength: 0.3,
			maxSuspensionForce: 100000,
			maxSuspensionTravel: 0.3,
			dampingRelaxation: 2.3,
			dampingCompression: 4.4,
			directionLocal: new CANNON.Vec3(0, 0, -1),
			axleLocal: new CANNON.Vec3(0, 1, 0),
			chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
			customSlidingRotationalSpeed: -30,
			useCustomSlidingRotationalSpeed: true
		};

		// 自動車を作る
		let vehicle = new CANNON.RaycastVehicle({chassisBody: this._body});
		options.chassisConnectionPointLocal.set(1, 1, 0);
		vehicle.addWheel(options);
		options.chassisConnectionPointLocal.set(1, -1, 0);
		vehicle.addWheel(options);
		options.chassisConnectionPointLocal.set(-1, 1, 0);
		vehicle.addWheel(options);
		options.chassisConnectionPointLocal.set(-1, -1, 0);
		vehicle.addWheel(options);

		vehicle.addToWorld(this._world);

		let wheelBodies = [];
		for(let i=0; i<vehicle.wheelInfos.length; i++){
			let wheel = vehicle.wheelInfos[i];
			let cylinderShape = new CANNON.Cylinder(
				wheel.radius, wheel.radius, wheel.radius/2, 20);
			let wheelBody = new CANNON.Body({mass: 0});
			wheelBody.type = CANNON.Body.KINEMATIC;
			wheelBody.collisionFilterGroup = 0;
			let q = new CANNON.Quaternion();
			q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
			wheelBodies.push(wheelBody);
			this._world.addBody(wheelBody);
		}

		// タイヤの更新
		this._world.addEventListener("postStep", function(){
			for(let i=0; i<vehicle.wheelInfos.length; i++){
				vehicle.updateWheelTransform(i);
				let t = vehicle.wheelInfos[i].worldTransform;
				let wheelBody = wheelBodies[i];
				wheelBody.position.copy(t.position);
				wheelBody.quaternion.copy(t.quaternion);
			}
		});
	}

	getMaterial(){
		return this._mat;
	}

	getBody(){
		return this._body;
	}
}

/*
function createVehicleWithModel(world, name, x=0, y=1, z=0, model, sX=1.4, sY=1.0, sZ=0.5){

	let groundMaterial = new CANNON.Material("groundMaterial");
	let wheelMaterial = new CANNON.Material("wheelMaterial");
	let wheelGroundContactMaterial = window.wheelGroundContactMaterial = 
		new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
			friction: 0.3,                // タイヤの摩擦
			restitution: 0.5,             // タイヤの反発
			contactEquationStiffness: 1000
	});
	world.addContactMaterial(wheelGroundContactMaterial);

	let mat = new CANNON.Material(name);
	let body = new CANNON.Body({mass: 150, material: mat});// 車両の重さ
	body.addShape(new CANNON.Box(new CANNON.Vec3(sX, sY, sZ)));
	body.position.set(x, y, z);
	body.quaternion.set(-1, 0, 0, 1);
	body.allowSleep = false;// Sleepをしない様に
	body.addEventListener("sleep", (e)=>{
		console.log("sleep: car!!");
	});

	const options = {
		radius: 0.5,     // タイヤの大きさ
		frictionSlip: 50,// タイヤのグリップ
		rollInfluence: 0.01,
		suspensionStiffness: 30,
		suspensionRestLength: 0.3,
		maxSuspensionForce: 100000,
		maxSuspensionTravel: 0.3,
		dampingRelaxation: 2.3,
		dampingCompression: 4.4,
		directionLocal: new CANNON.Vec3(0, 0, -1),
		axleLocal: new CANNON.Vec3(0, 1, 0),
		chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
		customSlidingRotationalSpeed: -30,
		useCustomSlidingRotationalSpeed: true
	};

	// 自動車を作る
	let vehicle = new CANNON.RaycastVehicle({chassisBody: body});
	options.chassisConnectionPointLocal.set(1, 1, 0);
	vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(1, -1, 0);
	vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(-1, 1, 0);
	vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(-1, -1, 0);
	vehicle.addWheel(options);

	vehicle.addToWorld(world);

	let wheelBodies = [];
	for(let i=0; i<vehicle.wheelInfos.length; i++){
		let wheel = vehicle.wheelInfos[i];
		let cylinderShape = new CANNON.Cylinder(
			wheel.radius, wheel.radius, wheel.radius/2, 20);
		let wheelBody = new CANNON.Body({mass: 0});
		wheelBody.type = CANNON.Body.KINEMATIC;
		wheelBody.collisionFilterGroup = 0;
		let q = new CANNON.Quaternion();
		q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
		wheelBodies.push(wheelBody);
		world.addBody(wheelBody);
	}

	// タイヤの更新
	world.addEventListener("postStep", function(){
		for (let i = 0; i < vehicle.wheelInfos.length; i++) {
			vehicle.updateWheelTransform(i);
			let t = vehicle.wheelInfos[i].worldTransform;
			let wheelBody = wheelBodies[i];
			wheelBody.position.copy(t.position);
			wheelBody.quaternion.copy(t.quaternion);
		}
	});

	document.onkeydown = handler;
	document.onkeyup   = handler;
	const maxSteerVal  = 0.5;// ステアリング最大値
	const maxForce     = 500;// エンジン最大値
	const brakeForce   = 100;// ブレーキ最大値
	function handler(event){
		let up = (event.type == "keyup");
		if(!up && event.type !== "keydown"){
			return;
		}
		// ブレーキ解除
		vehicle.setBrake(0, 0);
		vehicle.setBrake(0, 1);
		vehicle.setBrake(0, 2);
		vehicle.setBrake(0, 3);
		switch(event.keyCode){
		case 38: // 前進
			vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
			vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
			break;
		case 40: // 後退
			vehicle.applyEngineForce(up ? 0 : maxForce, 2);
			vehicle.applyEngineForce(up ? 0 : maxForce, 3);
			break;
		case 39: // 右旋回
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
			break;
		case 37: // 左旋回
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
			break;
		case 32: // ブレーキ開始
			vehicle.setBrake(brakeForce, 0);
			vehicle.setBrake(brakeForce, 1);
			vehicle.setBrake(brakeForce, 2);
			vehicle.setBrake(brakeForce, 3);
			break;
		}
	}
}
*/