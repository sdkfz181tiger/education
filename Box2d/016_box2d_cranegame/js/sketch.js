console.log("Hello Box2dWeb!!");

const TAG_REMOVER = "remover";

// Global
let world = null;
let manager = null;

let craneC = null;
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

	// Crane
	createCrane(240, 160, 4, 50);

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

	function createCrane(cX, cY, offsetH, offsetV){

		// Test
		craneC = manager.createBox(b2Body.b2_staticBody, cX, cY, 10, 10);

		craneH = manager.createBox(b2Body.b2_dynamicBody, cX, cY+15, 10, 10);
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

		const def  = craneC.GetPosition();
		const disX = 5;
		const disY = 5;

		craneH.SetAwake(true);
		craneV.SetAwake(true);

		if(e.key === "ArrowUp"){
			let position = new b2Vec2(def.x, def.y - disY / PTM_RATIO);
			craneC.SetPosition(position);
		}
		if(e.key === "ArrowDown"){
			let position = new b2Vec2(def.x, def.y + disY / PTM_RATIO);
			craneC.SetPosition(position);
		}
		if(e.key === "ArrowLeft"){
			let position = new b2Vec2(def.x - disX / PTM_RATIO, def.y);
			craneC.SetPosition(position);
		}
		if(e.key === "ArrowRight"){
			let position = new b2Vec2(def.x + disX / PTM_RATIO, def.y);
			craneC.SetPosition(position);
		}
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