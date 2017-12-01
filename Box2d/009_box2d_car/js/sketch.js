console.log("Hello Box2dWeb!!");

const TAG_REMOVER = "remover";

// Global
let world = null;
let manager = null;

// Main
window.onload = function(){
	
	// World
	world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	manager = new b2Manager(world);

	createFrame();

	let lTire, rTire;
	createCar(240, 100);
	createRotater(150, 210, 70, +3);
	createRotater(330, 210, 70, -3);
	createSeesaw(100, 150, 80, -45, +45);
	createSeesaw(240, 200, 80, -45, +45);
	createSeesaw(380, 150, 80, -45, +45);
	createDaruma(240, 190);

	// Functions

	function createFrame(){

		let type = b2Body.b2_staticBody;

		// Remover
		let remover = manager.createBox(type, 240, 305, 120, 5);
		remover.SetUserData({tag: TAG_REMOVER});

		manager.createBox(type, 100, 240, 220, 5, +15);
		manager.createBox(type, 30,  200, 70,  5, +45);
		manager.createBox(type, 380, 240, 220, 5, -15);
		manager.createBox(type, 450, 200, 70,  5, -45);
	}

	function createCar(cX, cY){

		let type = b2Body.b2_dynamicBody;

		let cBody = manager.createBox(type, cX, cY, 80, 20);
		lTire = manager.createCircle(type, cX-25, cY+10, 10);
		rTire = manager.createCircle(type, cX+25, cY+10, 10);
		let lJoint = manager.createRotateJoint(cBody, lTire, cX-25, cY+10);
		let rJoint = manager.createRotateJoint(cBody, rTire, cX+25, cY+10);
	}

	function createDoll(cX, cY){

		let type = b2Body.b2_dynamicBody;

		let bHead = manager.createBox(type, cX,    cY,    32, 32);
		let bBody = manager.createBox(type, cX,    cY+45, 20, 50);
		let bArmL = manager.createBox(type, cX-20, cY+45, 10, 50);
		let bArmR = manager.createBox(type, cX+20, cY+45, 10, 50);
		let bLegL = manager.createBox(type, cX-8,  cY+98, 10, 45);
		let bLegR = manager.createBox(type, cX+8,  cY+98, 10, 45);

		// WeldJoint
		let weldJoint = manager.createWeldJoint(bHead, bBody, cX, cY);
		//world.DestroyJoint(weldJoint);

		// RevolteJoint
		let rjArmL = manager.createRevoluteJoint(bBody, bArmL, cX-20, cY+20, 0, 120);
		let rjArmR = manager.createRevoluteJoint(bBody, bArmR, cX+20, cY+20, -120, 0);
		let rjLegL = manager.createRevoluteJoint(bBody, bLegL, cX-8,  cY+80, 0, 120);
		let rjLegR = manager.createRevoluteJoint(bBody, bLegR, cX+8,  cY+80, -120, 0);
	}

	function createDaruma(cX, cY){

		let type = b2Body.b2_dynamicBody;
		let paddingY = 22;

		for(let i=0; i<8; i++){
			let img = new Image();
			img.src = "assets/do_box_" + i + ".png";
			img.onload = (e)=>{
				//manager.createBoxImage(type, cX, cY-paddingY*i, e.target);
				manager.createCircleImage(type, cX, cY-paddingY*i, e.target);
			}
		}
	}

	function createRotater(cX, cY, w, speed){

		let cBody = manager.createBox(b2Body.b2_staticBody, cX, cY, 5, 5);
		let rBody = manager.createBox(b2Body.b2_dynamicBody, cX, cY, w, 5);
		let rjRot = manager.createTorqueJoint(cBody, rBody, cX, cY, 1100, speed);
	}

	function createSeesaw(cX, cY, w, lowerAngle, upperAngle){

		let cBody = manager.createBox(b2Body.b2_staticBody, cX, cY, 5, 5);
		let rBody = manager.createBox(b2Body.b2_dynamicBody, cX, cY, w, 5);
		let rjRot = manager.createRevoluteJoint(cBody, rBody, cX, cY, lowerAngle, upperAngle);
	}

	function createPiston(cX, cY, offsetX, offsetY, lowerAngle, upperAngle){

		let lBody1 = manager.createBox(b2Body.b2_staticBody, cX, cY, 5, 5);
		let lBody2 = manager.createBox(b2Body.b2_dynamicBody, cX, cY, 10, 10);
		let pjPris = manager.createPrismaticJoint(lBody1, lBody2, cX, cY, -10.0, +10.0);

		let rBody1 = manager.createBox(b2Body.b2_staticBody, cX+offsetX, cY+offsetY, 5, 5);
		let rBody2 = manager.createBox(b2Body.b2_dynamicBody, cX+offsetX, cY+offsetY, 60, 5);
		let rjRot  = manager.createRevoluteJoint(rBody1, rBody2, cX+offsetX, cY+offsetY, lowerAngle, upperAngle);

		let gjPis  = manager.createGearJoint(lBody2, rBody2, pjPris, rjRot);
	}

	// Contact
	let listener = new b2ContactListener;
	listener.BeginContact = function(contact){
		let userDataA = contact.GetFixtureA().GetBody().GetUserData();
		let userDataB = contact.GetFixtureB().GetBody().GetUserData();
		if(userDataA && userDataA.tag == TAG_REMOVER){
			manager.pushDestroys(contact.GetFixtureB().GetBody());
		}
		if(userDataB && userDataB.tag == TAG_REMOVER){
			manager.pushDestroys(contact.GetFixtureA().GetBody());
		}
	}
	listener.EndContact = function(contact){
		//console.log(contact.GetFixtureA().GetBody().GetUserData());
	}
	listener.PostSolve = function(contact, impulse){
		// Do nothing
	}
	listener.PreSolve = function(contact, oldManifold){
		// Do nothing
	}
	world.SetContactListener(listener);

	// Keyboard
	window.document.onkeydown = (e)=>{
		console.log(e.key);
		if(e.key === "ArrowUp"){
			let vec = new b2Vec2(0.0, -10.0);
			lTire.ApplyImpulse(vec, lTire.GetPosition());
		}
		if(e.key === "ArrowDown"){

		}
		if(e.key === "ArrowLeft"){
			lTire.SetAngularVelocity(-30);
			rTire.SetAngularVelocity(-30);
		}
		if(e.key === "ArrowRight"){
			lTire.SetAngularVelocity(+30);
			rTire.SetAngularVelocity(+30);
		}
	}

	// Update
	window.setInterval(update, 1000 / 30);
	function update(){

		// Box2dManager
		manager.update();
	};

	// Random
	window.setInterval(()=>{
		// Create
		let type = b2Body.b2_dynamicBody;
		let x = Math.random() * 480;
		let body = manager.createBox(type, x, 20, 8, 8);
	}, 1000 * 1);
};