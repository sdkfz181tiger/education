console.log("vehicle.js!!");

function createVehicle(cm, x=0, y=1, z=0, sX=1.4, sY=1.0, sZ=0.5){

	let groundMaterial = new CANNON.Material("groundMaterial");
	let wheelMaterial = new CANNON.Material("wheelMaterial");
	let wheelGroundContactMaterial = window.wheelGroundContactMaterial = 
		new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
			friction: 0.3,                // タイヤの摩擦
			restitution: 0.5,             // タイヤの反発
			contactEquationStiffness: 1000
	});
	cm._world.addContactMaterial(wheelGroundContactMaterial);

	let chassisShape = new CANNON.Box(new CANNON.Vec3(sX, sY, sZ));
	let chassisBody = new CANNON.Body({mass: 150});// 車両の重さ
	chassisBody.addShape(chassisShape);
	chassisBody.position.set(x, y, z);
	chassisBody.quaternion.set(-1, 0, 0, 1);
	chassisBody.allowSleep = false;// Sleep
	chassisBody.addEventListener("sleep", (e)=>{
		console.log("sleep: car!!");
	});

	const options = {
		radius: 0.5,
		directionLocal: new CANNON.Vec3(0, 0, -1),
		suspensionStiffness: 30,
		suspensionRestLength: 0.3,
		frictionSlip: 10,
		dampingRelaxation: 2.3,
		dampingCompression: 4.4,
		maxSuspensionForce: 100000,
		rollInfluence:  0.01,
		axleLocal: new CANNON.Vec3(0, 1, 0),
		chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
		maxSuspensionTravel: 0.3,
		customSlidingRotationalSpeed: -30,
		useCustomSlidingRotationalSpeed: true
	};

	// Create the vehicle
	let vehicle = new CANNON.RaycastVehicle({
		chassisBody: chassisBody,
	});
	options.chassisConnectionPointLocal.set(1, 1, 0);
	vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(1, -1, 0);
	vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(-1, 1, 0);
	vehicle.addWheel(options);
	options.chassisConnectionPointLocal.set(-1, -1, 0);
	vehicle.addWheel(options);

	vehicle.addToWorld(cm._world);

	let wheelBodies = [];
	for(let i=0; i<vehicle.wheelInfos.length; i++){
		let wheel = vehicle.wheelInfos[i];
		let cylinderShape = new CANNON.Cylinder(
			wheel.radius, wheel.radius, wheel.radius/2, 20);
		let wheelBody = new CANNON.Body({mass: 0});
		wheelBody.type = CANNON.Body.KINEMATIC;
		wheelBody.collisionFilterGroup = 0; // Turn off collisions
		let q = new CANNON.Quaternion();
		q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
		wheelBodies.push(wheelBody);
		cm._world.addBody(wheelBody);
	}

	// Update wheels
	cm._world.addEventListener("postStep", function(){
		for (let i = 0; i < vehicle.wheelInfos.length; i++) {
			vehicle.updateWheelTransform(i);
			let t = vehicle.wheelInfos[i].worldTransform;
			let wheelBody = wheelBodies[i];
			wheelBody.position.copy(t.position);
			wheelBody.quaternion.copy(t.quaternion);
		}
	});

	document.onkeydown = handler;
	document.onkeyup = handler;
	let maxSteerVal = 0.5;
	let maxForce = 1000;
	let brakeForce = 1000000;
	function handler(event){
		let up = (event.type == "keyup");
		if(!up && event.type !== "keydown"){
			return;
		}
		// vehicle.setBrake(0, 0);
		// vehicle.setBrake(0, 1);
		// vehicle.setBrake(0, 2);
		// vehicle.setBrake(0, 3);
		switch(event.keyCode){
		case 38: // forward
			vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
			vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
			break;
		case 40: // backward
			vehicle.applyEngineForce(up ? 0 : maxForce, 2);
			vehicle.applyEngineForce(up ? 0 : maxForce, 3);
			break;
		case 39: // right
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
			break;
		case 37: // left
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
			break;
		case 66: // Brake
			// vehicle.setBrake(brakeForce, 0);
			// vehicle.setBrake(brakeForce, 1);
			// vehicle.setBrake(brakeForce, 2);
			// vehicle.setBrake(brakeForce, 3);
			break;
		}
	}
}