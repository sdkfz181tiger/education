console.log("Hello Three.js!!");

const C_BLACK  = 0x333333;
const C_WHITE  = 0xffffff;
const C_GRAY   = 0x999999;
const C_RED    = 0x993333;
const C_ORANGE = 0x996633;
const C_YELLOW = 0x999933;
const C_GREEN  = 0x339933;
const C_AQUA   = 0x336699;
const C_BLUE   = 0x333399;
const C_PURPLE = 0x663399;
const RAINBOW  = [C_RED, C_ORANGE, C_YELLOW, C_GREEN, C_AQUA, C_BLUE, C_PURPLE];

const B_IMPULSE  = 3;
const B_VELOCITY = 5;

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

let cm = null;
let objLoader = null;

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

	// Ready
	function onReadyModels(){
		console.log("You are ready to use models!!");
		initStage();
	}

	// Error
	function onError(){
		console.log("Something went wrong...");
	}
}

function initStage(){
	console.log("initStage");

	let ground = cm.createPlane("myGround", C_BLACK);

	let goal = cm.createBox("myGoal", 0, 2, -10, 1, 1, 1, 5, C_WHITE);
	goal.body.type = CANNON.Body.KINEMATIC;

	let table = cm.createCylinder("myTable", 0, 1, 0, 2, 2, 2, 20, 5, C_BLACK);
	table.body.type = CANNON.Body.KINEMATIC;

	// Tower
	let cyls = createTower(0, 0.5, -13);

	// Car
	let car1 = cm.createBoxWithModel("", 8, 0, -5, objLoader.findModels("car_1.obj"));
	car1.body.type = CANNON.Body.KINEMATIC;
	car1.body.velocity.set(-2, 0, 0);
	setInterval(()=>{
		car1.body.wakeUp();
		car1.body.position.set(8, 0, -5);
	}, 1000*8);

	cm.createContact(ground.mat, ground.mat);
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

	ground.body.addEventListener("collide", (e)=>{
		// console.log(e.contact.bi.material.name);
		// console.log(e.contact.bj.material.name);
	});

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
		controlVelocityXYZ(index, num, 0, 0);
	});
	gpHelper.setAxesYListener((index, num)=>{
		console.log("Y[" + index + "]:" + num);
		if(num == 0) return;
		controlVelocityXYZ(index, 0, 0, num);
	});
	gpHelper.setButtonsListener((index, i, flg)=>{
		console.log("Button[" + index + "]:" + i + "_" + flg);
		if(flg == false) return;
		if(i == 0 && flg) controlVelocityXYZ(index, 0, 1, 0);// Jump
		if(i == 1 && flg) controlVelocityXYZ(index, 0, 0, 0);// Stop
	});

	// Players
	let players = {};
	function createPlayer(gamepad){
		let name = "player" + gamepad.index;
		let player = cm.createSphere(name, 0, 5, 0, 0.5, 1, RAINBOW[gamepad.index]);
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
		body.applyImpulse(impulse, body.position);
	}

	function controlVelocityXYZ(index, x, y, z){
		let body = players[index].body;
		if(body == null) return;
		body.wakeUp();
		body.velocity.set(x*B_VELOCITY, y*B_VELOCITY, z*B_VELOCITY);
	}

	// Animate
	animate();
	function animate(){
		cm.update();// Manager
		requestAnimationFrame(animate);
	};
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