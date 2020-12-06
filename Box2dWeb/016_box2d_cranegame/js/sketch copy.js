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

	// Camera
	let cBody = manager.createCamera(b2Body.b2_staticBody, 240, 160, 2, 2);
	manager.setCamera(cBody);

	// Tank
	let type = b2Body.b2_dynamicBody;
	let cX = 240;
	let cY = 240;
	let tBody = manager.createBox(type, cX, cY, 60, 20);
	let lTire = manager.createCircle(type, cX-25, cY+10, 16);
	let rTire = manager.createCircle(type, cX+25, cY+10, 16);
	let lJoint = manager.createRotateJoint(tBody, lTire, cX-25, cY+10);
	let rJoint = manager.createRotateJoint(tBody, rTire, cX+25, cY+10);

	// Pig
	let pBody = null;
	let img = new Image();
	img.src = "assets/do_pig.png";
	img.onload = (e)=>{
		let type = b2Body.b2_dynamicBody;
		pBody = manager.createBoxImage(type, cX, cY-40, e.target);
	}

	createStage(240, 310);
	// createDaruma(240-200, 250);
	// createDaruma(240+200, 250);

	// Functions

	function createStage(cX, cY){

		let type = b2Body.b2_staticBody;
		let vecA = new b2Vec2()
		let posA = {x:-200, y: 0};
		let posB = {x:+200, y: 0};
		manager.createEdge(type, cX, cY, posA, posB);

		// Remover
		let wLeft = manager.createBox(type, 240-200, 260, 10, 100);
		wLeft.SetUserData({tag: TAG_REMOVER});
		let wRight = manager.createBox(type, 240+200, 260, 10, 100);
		wRight.SetUserData({tag: TAG_REMOVER});
	}

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

	function createCrane(cX, cY){
		
		let type = b2Body.b2_staticBody;
		let vecA = new b2Vec2()
		let posA = {x:-200, y: 0};
		let posB = {x:+200, y: 0};
		manager.createEdge(type, cX, cY, posA, posB);

		// Remover
		let wLeft = manager.createBox(type, 240-200, 260, 10, 100);
		wLeft.SetUserData({tag: TAG_REMOVER});
		let wRight = manager.createBox(type, 240+200, 260, 10, 100);
		wRight.SetUserData({tag: TAG_REMOVER});
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
				manager.createBoxImage(type, cX, cY-paddingY*i, e.target);
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
			let type = b2Body.b2_dynamicBody;
			let x = pBody.GetPosition().x * PTM_RATIO;
			let y = pBody.GetPosition().y * PTM_RATIO - 10;
			let bullet = manager.createBox(type, x, y, 8, 8);
			bullet.ApplyImpulse(
				new b2Vec2(0.0, -0.8), bullet.GetPosition());
		}
		if(e.key === "ArrowDown"){

		}
		if(e.key === "ArrowLeft"){
			tBody.SetAwake(true);
			lTire.SetAngularVelocity(-30);
			rTire.SetAngularVelocity(-30);
		}
		if(e.key === "ArrowRight"){
			tBody.SetAwake(true);
			lTire.SetAngularVelocity(+30);
			rTire.SetAngularVelocity(+30);
		}
		if(e.key === "z" || e.key === "x"){
			let type = b2Body.b2_dynamicBody;
			let x = pBody.GetPosition().x * PTM_RATIO;
			let y = pBody.GetPosition().y * PTM_RATIO - 10;
			let bullet = manager.createBox(type, x, y, 8, 8);

			if(e.key === "z"){
				bullet.ApplyImpulse(
					new b2Vec2(-0.6, -0.3), bullet.GetPosition());
				pBody.ApplyImpulse(
					new b2Vec2(+0.6, 0), cBody.GetPosition());
			}
			if(e.key === "x"){
				bullet.ApplyImpulse(
					new b2Vec2(+0.6, -0.3), bullet.GetPosition());
				pBody.ApplyImpulse(
					new b2Vec2(-0.6, 0), cBody.GetPosition());
			}
		}
	}

	// Update
	window.setInterval(update, 1000 / 30);
	function update(){

		// Following camera
		let posTank = tBody.GetPosition();
		let posCam  = cBody.GetPosition();
		let targetY = C_HEIGHT / PTM_RATIO;
		for(let body = world.GetBodyList(); body; body = body.GetNext()){
			if(body.GetType() == b2Body.b2_dynamicBody){
				let posBody = body.GetPosition();
				if(posBody.y < targetY){
					targetY = posBody.y;
				}
			}
		}
		cBody.SetPosition(new b2Vec2(posTank.x, targetY));

		// Box2dManager
		manager.update();
	};

	// Random
	//fallBomb();
	function fallBomb(){
		window.setTimeout(()=>{
			// Create
			let type = b2Body.b2_dynamicBody;
			let x    = tBody.GetPosition().x * PTM_RATIO;
			let body = manager.createBox(type, x, 10, 8, 8);
			fallBomb();
		}, 1000 * 3);
	}
};