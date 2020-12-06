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

	createDaruma(240, 220);

	let lTire, rTire;
	createCar(240, 280);

	// Functions

	function createFrame(cX, cY){

		let type = b2Body.b2_staticBody;

		// Remover
		let remover = manager.createBox(type, 240, 305, 180, 5);
		remover.SetUserData({tag: TAG_REMOVER});

		manager.createBox(type, cX-140, cY+90, 180, 5, +15);
		manager.createBox(type, cX-225, cY+60, 40,  5, +45);
		manager.createBox(type, cX-225, cY-140, 40, 5, -45);
		manager.createBox(type, cX+140, cY+90, 180, 5, -15);
		manager.createBox(type, cX+225, cY+60, 40,  5, -45);
		manager.createBox(type, cX+225, cY-140, 40, 5, +45);

		manager.createCircle(type, cX-100, cY-20, 10, null, null, null, 0.8);
		manager.createCircle(type, cX+100, cY-20, 10, null, null, null, 0.8);

		manager.createCircle(type, cX-200, cY+40, 10, null, null, null, 1.5);
		manager.createCircle(type, cX+200, cY+40, 10, null, null, null, 1.5);
	}

	function createCar(cX, cY){

		let type = b2Body.b2_dynamicBody;

		let cBody = manager.createBox(type, cX, cY, 80, 20);
		lTire = manager.createCircle(type, cX-25, cY+10, 10);
		rTire = manager.createCircle(type, cX+25, cY+10, 10);
		let lJoint = manager.createRotateJoint(cBody, lTire, cX-25, cY+10);
		let rJoint = manager.createRotateJoint(cBody, rTire, cX+25, cY+10);
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
		if(e.key === "ArrowLeft"){
			lTire.ApplyTorque(-30);
			rTire.ApplyTorque(-30);
		}
		if(e.key === "ArrowRight"){
			lTire.ApplyTorque(+30);
			rTire.ApplyTorque(+30);
		}
	}

	// Click
	window.document.onclick = (e)=>{
		console.log(e);
		let type = b2Body.b2_dynamicBody;
		if(e.clientX < C_WIDTH / 2){
			let x = 20;
			let y = e.clientY;
			let bullet = manager.createCircle(type, x, y ,4);
			bullet.ApplyImpulse(new b2Vec2(+0.5, -0.5), bullet.GetPosition());
		}else{
			let x = C_WIDTH - 20;
			let y = e.clientY;
			let bullet = manager.createCircle(type, x, y ,4);
			bullet.ApplyImpulse(new b2Vec2(-0.5, -0.5), bullet.GetPosition());
		}
	}

	// Update
	window.setInterval(update, 1000 / 30);
	function update(){

		// Box2dManager
		manager.update();
	};

	/*
	// Random
	window.setInterval(()=>{
		// Create
		let type = b2Body.b2_dynamicBody;
		let x = Math.random() * 400 + 40;
		let body = manager.createCircle(type, x, 20, 4);
	}, 1000 * 1);
	*/
};