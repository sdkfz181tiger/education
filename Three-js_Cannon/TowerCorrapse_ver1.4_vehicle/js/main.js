console.log("Hello Three.js!!");

const C_BLACK  = 0x333333;
const C_WHITE  = 0xffffff;
const C_GRAY   = 0x666666;
const C_RED    = 0x993333;
const C_ORANGE = 0x996633;
const C_YELLOW = 0x999933;
const C_GREEN  = 0x339933;
const C_AQUA   = 0x336699;
const C_BLUE   = 0x333399;
const C_PURPLE = 0x663399;
const RAINBOW  = [C_RED, C_ORANGE, C_YELLOW, C_GREEN, C_AQUA, C_BLUE, C_PURPLE];

const B_IMPULSE  = 3;
const B_VELOCITY = 3;

// Data
const models = {data:[
	{dir:"./models/obj/", mtl:"car_1.mtl",   obj:"car_1.obj"},
	{dir:"./models/obj/", mtl:"car_2.mtl",   obj:"car_2.obj"},
	{dir:"./models/obj/", mtl:"car_3.mtl",   obj:"car_3.obj"},
	{dir:"./models/obj/", mtl:"tree_1.mtl",  obj:"tree_1.obj"},
	{dir:"./models/obj/", mtl:"tree_2.mtl",  obj:"tree_2.obj"},
	{dir:"./models/obj/", mtl:"truck_1.mtl", obj:"truck_1.obj"},
	{dir:"./models/obj/", mtl:"truck_2.mtl", obj:"truck_2.obj"}
]};

const sounds = {data:[
	{dir:"./sounds/", mp3:"step_ng.mp3"},
	{dir:"./sounds/", mp3:"step_ok.mp3"}
]};

let cm = null;
let objLoader   = null;
let soundLoader = null;

// GamepadHelper
let gpHelper = new GamepadHelper();

window.onload = function(){
	console.log("OnLoad");

	// ThreeManager
	//  Camera position(PC): pcX, pcY, pcZ
	cm = new CannonManager(0, 60, 90);

	// ObjLoader
	objLoader = new ObjLoader();
	objLoader.loadModels(models, onReadyModels, onError);

	// SoundLoader
	soundLoader = new SoundLoader(cm.getCamera());
	soundLoader.loadSounds(sounds, onReadySounds, onError);

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");
		initStage();
	}

	function onReadySounds(){
		console.log("You are ready to use sounds!!");
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}
}

function initStage(){
	console.log("initStage");

	let ground = cm.createPlane("myGround", C_BLACK);

	// Goal
	let goal = cm.createBox("myGoal", 0, 2, -10, 1, 1, 1, 5, C_RED);
	goal.body.type = CANNON.Body.KINEMATIC;
	goal.body.addEventListener("collide", (e)=>{
		let nameA = e.contact.bi.material.name;
		let nameB = e.contact.bj.material.name;
		console.log("Goal!!:" + nameA);
		soundLoader.findAndPlay("step_ok.mp3");
	});

	// Camera, Controls
	let camera = cm.getCamera();
	camera.position.set(8, 12, 8);

	// let tbl1 = cm.createCylinder("myTable", 0, 1, 0, 2, 2, 2, 20, 5, C_BLACK);
	// tbl1.body.type = CANNON.Body.KINEMATIC;

	// Tower
	// let cyls = createTower(0, 0.5, -13);

	// Car
	// let car1 = cm.createBoxWithModel("", 8, 0.75, -3, objLoader.findModels("car_1.obj"));
	// car1.body.type = CANNON.Body.KINEMATIC;
	// car1.body.velocity.set(-2, 0, 0);
	// setInterval(()=>{
	// 	car1.body.wakeUp();
	// 	car1.body.position.x = 8;
	// }, 1000*8);

	// cm.createContact(ground.mat, ground.mat);
	// cm.createContact(ground.mat, box1.mat, 0.01, 0);
	// cm.createContact(box1.mat, cyl1.mat, 0.01, 0);
	// cm.createContact(cyl1.mat, cyl2.mat, 0.01, 0);
	// cm.createContact(cyl2.mat, cyl3.mat, 0.01, 0);
	// cm.createContact(cyl3.mat, cyl4.mat, 0.01, 0);
	// cm.createContact(cyl4.mat, cyl5.mat, 0.01, 0);

	// Car1
	// let car1   = cm.createBoxWithModel("", 0, 2, 2, objLoader.findModels("car_1.obj"));
	// let car2   = cm.createBoxWithModel("", +0, 2, 4, objLoader.findModels("car_2.obj"));
	// let car3   = cm.createBoxWithModel("", +4, 2, 4, objLoader.findModels("car_3.obj"));
	// let tree1  = cm.createBoxWithModel("", -4, 2, 2, objLoader.findModels("tree_1.obj"));
	// let tree2  = cm.createBoxWithModel("", -3, 2, 2, objLoader.findModels("tree_1.obj"));
	// let tree3  = cm.createBoxWithModel("", -2, 2, 2, objLoader.findModels("tree_1.obj"));
	// let truck1 = cm.createBoxWithModel("", +2, 2, 2, objLoader.findModels("truck_1.obj"));
	// let truck2 = cm.createBoxWithModel("", +2, 4, 2, objLoader.findModels("truck_2.obj"));

	//==========
	// RaycastVehicle

	var mass = 150;
	var groundMaterial = new CANNON.Material("groundMaterial");
	var wheelMaterial = new CANNON.Material("wheelMaterial");
	var wheelGroundContactMaterial = window.wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
		friction: 0.3,
		restitution: 0.5,
		contactEquationStiffness: 1000
	});

	cm._world.addContactMaterial(wheelGroundContactMaterial);

	var chassisShape = new CANNON.Box(new CANNON.Vec3(2, 1, 0.5));
	var centerOfMassAdjust = new CANNON.Vec3(0, 0, -1);
	var chassisBody = new CANNON.Body({ mass: 1 });
	chassisBody.addShape(chassisShape, centerOfMassAdjust);
	chassisBody.position.set(0, 8, 0);

	var chassisShape;
	chassisShape = new CANNON.Box(new CANNON.Vec3(2, 1,0.5));
	var chassisBody = new CANNON.Body({ mass: mass });
	chassisBody.addShape(chassisShape);
	chassisBody.position.set(0, 4, 0);
	chassisBody.quaternion.set(-1, 0, 0, 1);
	chassisBody.angularVelocity.set(0, 0, 0.5);

	chassisBody.allowSleep = false;// Sleep
	chassisBody.addEventListener("sleep", (e)=>{
		console.log("sleep: car!!");
	});

	var options = {
		radius: 0.5,
		directionLocal: new CANNON.Vec3(0, 0, -1),
		suspensionStiffness: 30,
		suspensionRestLength: 0.3,
		frictionSlip: 5,
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

	var wheelBodies = [];
	for(var i=0; i<vehicle.wheelInfos.length; i++){
		var wheel = vehicle.wheelInfos[i];
		var cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
		var wheelBody = new CANNON.Body({
			mass: 0
		});
		wheelBody.type = CANNON.Body.KINEMATIC;
		wheelBody.collisionFilterGroup = 0; // turn off collisions
		var q = new CANNON.Quaternion();
		q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
		wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
		wheelBodies.push(wheelBody);
		cm._world.addBody(wheelBody);
	}

	// Update wheels
	cm._world.addEventListener('postStep', function(){
		for (var i = 0; i < vehicle.wheelInfos.length; i++) {
			vehicle.updateWheelTransform(i);
			var t = vehicle.wheelInfos[i].worldTransform;
			var wheelBody = wheelBodies[i];
			wheelBody.position.copy(t.position);
			wheelBody.quaternion.copy(t.quaternion);
		}
	});

	document.onkeydown = handler;
	document.onkeyup = handler;
	var maxSteerVal = 0.5;
	var maxForce = 1000;
	var brakeForce = 1000000;
	function handler(event){
		var up = (event.type == 'keyup');
		if(!up && event.type !== 'keydown'){
			return;
		}
		vehicle.setBrake(0, 0);
		vehicle.setBrake(0, 1);
		vehicle.setBrake(0, 2);
		vehicle.setBrake(0, 3);
		switch(event.keyCode){
		case 38: // forward
			vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
			vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
			break;
		case 40: // backward
			vehicle.applyEngineForce(up ? 0 : maxForce, 2);
			vehicle.applyEngineForce(up ? 0 : maxForce, 3);
			break;
		case 66: // b
			vehicle.setBrake(brakeForce, 0);
			vehicle.setBrake(brakeForce, 1);
			vehicle.setBrake(brakeForce, 2);
			vehicle.setBrake(brakeForce, 3);
			break;
		case 39: // right
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
			break;
		case 37: // left
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
			vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
			break;
		}
	}

	//==========
	// GamepadHelper

	// Connect, Disconnect
	gpHelper.setConnectedListener((gamepad)=>{
		console.log("Connected:" + gamepad.index + ", " + gamepad.id);
		createPlayer(gamepad);// Create new player!!
	});
	gpHelper.setDisconnectedListener((gamepad)=>{
		console.log("Disconnected:" + gamepad.index + ", " + gamepad.id);
	});
	// Controller
	gpHelper.setAxesXListener((index, num)=>{
		console.log("X[" + index + "]:" + num);
		if(num == 0) return;
		//controlImpulseXYZ(index, num, 0, 0);
		turnLR(index, num, 1.5);// Turn LR
	});
	gpHelper.setAxesYListener((index, num)=>{
		console.log("Y[" + index + "]:" + num);
		if(num == 0) return;
		//controlImpulseXYZ(index, 0, 0, num);
		stepFB(index, num, 1.5);
	});
	gpHelper.setButtonsListener((index, i, flg)=>{
		console.log("Button[" + index + "]:" + i + "_" + flg);
		if(flg == false) return;
		if(i == 0 && flg) controlJump(index, 1);// Jump
		if(i == 1 && flg) controlVelocityXYZ(index, 0, 0, 0);// Stop
	});

	// Players
	let players = {};
	function createPlayer(gamepad){
		let name = "player" + gamepad.index;
		let player = cm.createBoxWithModel(name, 0, 3, 0,
			objLoader.findModels("car_1.obj"));
		cm.createContact(ground.mat, player.mat, 0.005, 0);
		players[gamepad.index] = player;
	}

	function controlImpulseXYZ(index, x, y, z){
		let body = players[index].body;
		if(body == null) return;
		body.wakeUp();
		if(x != 0 || z != 0){
			body.velocity.x = 0;
			body.velocity.z = 0;
		}
		let impulse = new CANNON.Vec3(x*B_IMPULSE, y*B_IMPULSE, z*B_IMPULSE);
		body.applyImpulse(impulse, body.position);// Global position
	}

	function controlVelocityXYZ(index, x, y, z){
		let body = players[index].body;
		if(body == null) return;
		body.wakeUp();
		body.velocity.set(x*B_VELOCITY, y*B_VELOCITY, z*B_VELOCITY);
	}

	function controlJump(index, y){
		let body = players[index].body;
		if(body == null) return;
		body.wakeUp();
		body.quaternion.x = 0;
		body.quaternion.z = 0;
		body.velocity.set(0, y*B_VELOCITY, 0);
		body.angularVelocity.set(0, 0, 0);
	}

	function stepFB(index, x, j){
		let body = players[index].body;
		if(body == null) return;
		body.wakeUp();
		body.quaternion.x = 0;
		body.quaternion.z = 0;
		body.angularVelocity.set(0, 0, 0);
		let impulse = new CANNON.Vec3(x*B_IMPULSE, j*B_IMPULSE, 0);
		body.applyLocalImpulse(impulse, new CANNON.Vec3);// Local position
	}

	function turnLR(index, y, j){
		let body = players[index].body;
		if(body == null) return;
		body.wakeUp();
		body.quaternion.x = 0;
		body.quaternion.z = 0;
		body.angularVelocity.set(0, y*-B_VELOCITY, 0);
		let impulse = new CANNON.Vec3(0, j*B_IMPULSE, 0);
		body.applyLocalImpulse(impulse, new CANNON.Vec3);// Local position
	}

	// Animate
	animate();
	function animate(){
		cm.update();// Manager
		requestAnimationFrame(animate);
		adjustCamera();
	};

	function adjustCamera(){
		let length = Object.keys(players).length;
		if(length <= 0) return;
		let x = 0;
		let z = 0;
		for(let key in players){
			let player = players[key];
			x += player.body.position.x;
			z += player.body.position.z;
		}
		x /= length;
		z /= length;
		let controls = cm.getControls();
		controls.target.set(x, 0, z);
	}
}

function createTower(x, y, z){
	let cyl1 = cm.createCylinder("myCyl1", x, y+0, z, 1, 1, 1, 10, 5, C_PURPLE);
	let cyl2 = cm.createCylinder("myCyl2", x, y+1, z, 1, 1, 1, 10, 5, C_BLUE);
	let cyl3 = cm.createCylinder("myCyl3", x, y+2, z, 1, 1, 1, 10, 5, C_AQUA);
	let cyl4 = cm.createCylinder("myCyl4", x, y+3, z, 1, 1, 1, 10, 5, C_GREEN);
	let cyl5 = cm.createCylinder("myCyl5", x, y+4, z, 1, 1, 1, 10, 5, C_YELLOW);
	let cyl6 = cm.createCylinder("myCyl6", x, y+5, z, 1, 1, 1, 10, 5, C_ORANGE);
	let cyl7 = cm.createCylinder("myCyl7", x, y+6, z, 1, 1, 1, 10, 5, C_RED);
	let arr = [cyl1, cyl2, cyl3, cyl4, cyl5, cyl6];
	return arr;
}