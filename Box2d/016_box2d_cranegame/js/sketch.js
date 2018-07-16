console.log("Hello Box2dWeb!!");

const TAG_REMOVER = "remover";

// Global
let world = null;
let manager = null;

let craneH = null;
let craneV = null;

// Main
window.onload = function(){
	
	// World
	world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	manager = new b2Manager(world);

	// Stage
	createStage(240, 310);

	createPiston(240, 160, 30, 30);

	// Crane
	let type = b2Body.b2_dynamicBody;

	let cX    = 240;
	let cY    = 240;
	let tBody = manager.createBox(type, cX, cY, 60, 20);
	let lTire = manager.createCircle(type, cX-25, cY+10, 16);
	let rTire = manager.createCircle(type, cX+25, cY+10, 16);
	let lJoint = manager.createRotateJoint(tBody, lTire, cX-25, cY+10);
	let rJoint = manager.createRotateJoint(tBody, rTire, cX+25, cY+10);

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

	function createPiston(cX, cY, offsetH, offsetV){

		let craneC = manager.createBox(b2Body.b2_staticBody, cX, cY, 5, 5);
		craneH = manager.createBox(b2Body.b2_dynamicBody, cX, cY, 10, 10);
		let pjPris1 = manager.createPrismaticJoint(craneC, craneH, cX, cY, 1, 0, -offsetH, offsetH);

		craneV = manager.createBox(b2Body.b2_dynamicBody, cX, cY+30, 10, 10);
		let pjPris2 = manager.createPrismaticJoint(craneH, craneV, cX, cY, 0, 1, -offsetV, offsetV);
	}

	// Contact
	let listener = new b2ContactListener;
	listener.BeginContact = function(contact){
		// let userDataA = contact.GetFixtureA().GetBody().GetUserData();
		// let userDataB = contact.GetFixtureB().GetBody().GetUserData();
		// if(userDataA && userDataA.tag == TAG_REMOVER){
		// 	manager.pushDestroys(contact.GetFixtureB().GetBody());
		// }
		// if(userDataB && userDataB.tag == TAG_REMOVER){
		// 	manager.pushDestroys(contact.GetFixtureA().GetBody());
		// }
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

		if(e.key === "ArrowLeft"){
			craneH.SetAwake(true);
			let vec = new b2Vec2(-3.0, 0.0);
			craneH.ApplyImpulse(vec, craneH.GetPosition());
		}
		if(e.key === "ArrowRight"){
			craneH.SetAwake(true);
			let vec = new b2Vec2(+3.0, 0.0);
			craneH.ApplyImpulse(vec, craneH.GetPosition());
		}

		/*
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
		*/
	}

	// Update
	window.setInterval(update, 1000 / 30);
	function update(){
		/*
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
		*/
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