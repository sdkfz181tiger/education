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
				restitution: 0.8,             // タイヤの反発
				contactEquationStiffness: 1000
		});
		this._world.addContactMaterial(wheelGroundContactMaterial);
	}

	// w=1.0, h=0.2, d=0.5,
	createVehicle(name, x=0, y=1, z=0, w, h, d){

		this._mat = new CANNON.Material(name);
		this._body = new CANNON.Body({mass: 200, material: this._mat});
		this._body.addShape(new CANNON.Box(new CANNON.Vec3(w, h, d)));
		this._body.quaternion.set(-1, 0, 0, 1);
		this._body.position.set(x, y, z);
		this._body.allowSleep = false;// Sleepをしない様に
		this._body.addEventListener("sleep", (e)=>{
			console.log("sleep: car!!");
		});

		const options = {
			radius:               0.2, // タイヤの大きさ
			frictionSlip:         50,  // タイヤのグリップ
			rollInfluence:        0.01,
			suspensionStiffness:  30,
			suspensionRestLength: 0.5,
			maxSuspensionForce:   100000,
			maxSuspensionTravel:  0.2,
			dampingRelaxation:    2.3,
			dampingCompression:   4.4,
			directionLocal: new CANNON.Vec3(0, 0, -1),
			axleLocal: new CANNON.Vec3(0, 1, 0),
			chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
			customSlidingRotationalSpeed: -30,
			useCustomSlidingRotationalSpeed: true
		};

		// 自動車を作る
		let vehicle = new CANNON.RaycastVehicle({chassisBody: this._body});
		options.chassisConnectionPointLocal.set(w-0.1, d, 0);
		vehicle.addWheel(options);
		options.chassisConnectionPointLocal.set(w-0.1, -d, 0);
		vehicle.addWheel(options);
		options.chassisConnectionPointLocal.set(-w+0.1, d, 0);
		vehicle.addWheel(options);
		options.chassisConnectionPointLocal.set(-w+0.1, -d, 0);
		vehicle.addWheel(options);

		vehicle.addToWorld(this._world);

		let wheelBodies = [];
		for(let i=0; i<vehicle.wheelInfos.length; i++){
			let wheel = vehicle.wheelInfos[i];
			let cylinderShape = new CANNON.Cylinder(
				wheel.radius, wheel.radius, wheel.radius/2, 10);
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

		document.onkeydown = handler;
		document.onkeyup   = handler;
		const maxSteerVal  = 0.5;// ステアリング最大値
		const maxForce     = 500;// エンジン最大値
		const brakeForce   = 50;// ブレーキ最大値
		function handler(event){
			let up = (event.type == "keyup");
			if(!up && event.type !== "keydown"){
				return;
			}
			// ブレーキ解除
			vehicle.setBrake(0, 0);
			vehicle.setBrake(0, 1);
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
			case 32: // ブレーキ(一定時間経過後に解除)
				vehicle.setBrake(brakeForce, 0);
				vehicle.setBrake(brakeForce, 1);
				setTimeout(()=>{
					vehicle.setBrake(0, 0);
					vehicle.setBrake(0, 1);
				}, 100);
				break;
			}
		}
	}

	getMaterial(){
		return this._mat;
	}

	getBody(){
		return this._body;
	}
}