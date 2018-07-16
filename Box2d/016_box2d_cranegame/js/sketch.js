console.log("Hello Box2dWeb!!");

const TAG_REMOVER = "remover";

const CRANE_CLOSE = 30  * DEG_TO_RAD;
const CRANE_OPEN  = 1 * DEG_TO_RAD;

// Global
let world   = null;
let manager = null;

let craneC  = null;
let lFlap1,  lFlap2  = null;
let lJoint1, lJoint2 = null;
let rFlap1,  rFlap2  = null;
let rJoint1, rJoint2 = null;

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

	// Bomb
	fallBomb();

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

		// Body
		craneC = manager.createBox(b2Body.b2_staticBody, cX, cY, 10, 10);

		// Arm
		let type = b2Body.b2_dynamicBody;
		//let type = b2Body.b2_staticBody;
		let buffer = 30 * DEG_TO_RAD;

		// Left
		lFlap1  = manager.createBox(type, cX-20, cY+10, 45, 8);
		lFlap1.SetAngle(-30 * DEG_TO_RAD);
		lJoint1 = manager.createRevoluteJoint(craneC, lFlap1, cX, cY, -buffer, buffer);
		lFlap2  = manager.createBox(type, cX-40, cY+40, 40, 8);
		lFlap2.SetAngle(-90 * DEG_TO_RAD);
		lJoint2 = manager.createRevoluteJoint(lFlap1, lFlap2, cX-40, cY+20, -buffer, buffer);
		lFlap3  = manager.createBox(type, cX-25, cY+60, 25, 4);
		lFlap3.SetAngle(0 * DEG_TO_RAD);
		let lJoint3 = manager.createWeldJoint(lFlap2, lFlap3, cX-40, cY+60);

		// Right
		rFlap1 = manager.createBox(type, cX+20, cY+10, 45, 8);
		rFlap1.SetAngle(+30 * DEG_TO_RAD);
		rJoint1 = manager.createRevoluteJoint(craneC, rFlap1, cX, cY, -buffer, buffer);
		rFlap2  = manager.createBox(type, cX+40, cY+40, 40, 8);
		rFlap2.SetAngle(+90 * DEG_TO_RAD);
		rJoint2 = manager.createRevoluteJoint(rFlap1, rFlap2, cX+40, cY+20, -buffer, buffer);
		rFlap3  = manager.createBox(type, cX+25, cY+60, 25, 4);
		rFlap3.SetAngle(0 * DEG_TO_RAD);
		let rJoint3 = manager.createWeldJoint(rFlap2, rFlap3, cX+40, cY+60);
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
		//console.log(e.key);

		const def  = craneC.GetPosition();
		const disX = 5;
		const disY = 5;

		// Awake
		awakeCrane();

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

		if(e.key === "z"){
			lJoint1.m_lowerAngle = -CRANE_CLOSE;
			lJoint1.m_upperAngle = CRANE_CLOSE;
			lJoint2.m_lowerAngle = -CRANE_CLOSE;
			lJoint2.m_upperAngle = CRANE_CLOSE;
			rJoint1.m_lowerAngle = -CRANE_CLOSE;
			rJoint1.m_upperAngle = CRANE_CLOSE;
			rJoint2.m_lowerAngle = -CRANE_CLOSE;
			rJoint2.m_upperAngle = CRANE_CLOSE;
		}
		if(e.key === "x"){
			lJoint1.m_lowerAngle = -CRANE_OPEN;
			lJoint1.m_upperAngle = CRANE_OPEN;
			lJoint2.m_lowerAngle = -CRANE_OPEN;
			lJoint2.m_upperAngle = CRANE_OPEN;
			rJoint1.m_lowerAngle = -CRANE_OPEN;
			rJoint1.m_upperAngle = CRANE_OPEN;
			rJoint2.m_lowerAngle = -CRANE_OPEN;
			rJoint2.m_upperAngle = CRANE_OPEN;
		}
	}

	// Update
	window.setInterval(update, 1000 / 30);
	function update(){
		// Box2dManager
		manager.update();
	};

	let tEvent = null;
	function awakeCrane(){

		if(tEvent != null) clearTimeout(tEvent);

		lFlap1.SetAwake(true);
		lFlap2.SetAwake(true);
		lFlap3.SetAwake(true);
		rFlap1.SetAwake(true);
		rFlap2.SetAwake(true);
		rFlap3.SetAwake(true);

		tEvent = setTimeout(()=>{
			lFlap1.SetAwake(false);
			lFlap2.SetAwake(false);
			lFlap3.SetAwake(false);
			rFlap1.SetAwake(false);
			rFlap2.SetAwake(false);
			rFlap3.SetAwake(false);
		}, 1000 * 5);
	}



	// Random
	//fallBomb();
	function fallBomb(){
		window.setTimeout(()=>{
			// Create
			let type = b2Body.b2_dynamicBody;
			let x    = 240;
			let y    = 10;
			let body = manager.createBox(type, x, y, 8, 8);
			fallBomb();
		}, 1000 * 3);
	}
};