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
	createRotater(150, 210, 80, +3);
	createRotater(330, 210, 80, -3);
	createSeesaw(100, 150, 80, -45, +45);
	createSeesaw(240, 200, 80, -45, +45);
	createSeesaw(380, 150, 80, -45, +45);
	createDaruma(240, 190);

	// Functions
	function createFrame(){

		let type = b2Body.b2_staticBody;

		// Remover
		let remover = manager.createBody(type, 240, 305, 120, 5);
		remover.SetUserData({tag: TAG_REMOVER});

		manager.createBody(type, 100, 240, 220, 5, +15);
		manager.createBody(type, 30,  200, 70,  5, +45);
		manager.createBody(type, 380, 240, 220, 5, -15);
		manager.createBody(type, 450, 200, 70,  5, -45);
	}

	function createDoll(cX, cY){

		let type = b2Body.b2_dynamicBody;

		let bHead = manager.createBody(type, cX,    cY,    32, 32);
		let bBody = manager.createBody(type, cX,    cY+45, 20, 50);
		let bArmL = manager.createBody(type, cX-20, cY+45, 10, 50);
		let bArmR = manager.createBody(type, cX+20, cY+45, 10, 50);
		let bLegL = manager.createBody(type, cX-8,  cY+98, 10, 45);
		let bLegR = manager.createBody(type, cX+8,  cY+98, 10, 45);

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
				manager.createBodyImage(type, cX, cY-paddingY*i, e.target);
			}
		}
	}

	function createRotater(cX, cY, w, speed){

		let cBody = manager.createBody(b2Body.b2_staticBody, cX, cY, 5, 5);
		let rBody = manager.createBody(b2Body.b2_dynamicBody, cX, cY, w, 5);
		let rjRot = manager.createTorqueJoint(cBody, rBody, cX, cY, 1100, speed);
	}

	function createSeesaw(cX, cY, w, lowerAngle, upperAngle){

		let cBody = manager.createBody(b2Body.b2_staticBody, cX, cY, 5, 5);
		let rBody = manager.createBody(b2Body.b2_dynamicBody, cX, cY, w, 5);
		let rjRot = manager.createRevoluteJoint(cBody, rBody, cX, cY, lowerAngle, upperAngle);
	}

	function createPiston(cX, cY, offsetX, offsetY, lowerAngle, upperAngle){

		let lBody1 = manager.createBody(b2Body.b2_staticBody, cX, cY, 5, 5);
		let lBody2 = manager.createBody(b2Body.b2_dynamicBody, cX, cY, 10, 10);
		let pjPris = manager.createPrismaticJoint(lBody1, lBody2, cX, cY, -10.0, +10.0);

		let rBody1 = manager.createBody(b2Body.b2_staticBody, cX+offsetX, cY+offsetY, 5, 5);
		let rBody2 = manager.createBody(b2Body.b2_dynamicBody, cX+offsetX, cY+offsetY, 60, 5);
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
			let vec = new b2Vec2(0.0, -30.0);
			bBody.ApplyImpulse(vec, bBody.GetPosition());
		}
		if(e.key === "ArrowDown"){
			let vec = new b2Vec2(0.0, +30.0);
			bBody.ApplyImpulse(vec, bBody.GetPosition());
		}
		if(e.key === "ArrowLeft"){
			let vec = new b2Vec2(-20.0, 0.0);
			bBody.ApplyImpulse(vec, bBody.GetPosition());
		}
		if(e.key === "ArrowRight"){
			let vec = new b2Vec2(+20.0, 0.0);
			bBody.ApplyImpulse(vec, bBody.GetPosition());
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
		let body = manager.createBody(type, x, 20, 8, 8);
	}, 1000 * 1);
};