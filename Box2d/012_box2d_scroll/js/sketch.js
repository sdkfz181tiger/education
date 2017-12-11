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

	let type = b2Body.b2_dynamicBody;
	let cX = 240;
	let cY = 280;

	let cBody = manager.createBox(type, cX, cY, 80, 20);
	let lTire = manager.createCircle(type, cX-25, cY+10, 10);
	let rTire = manager.createCircle(type, cX+25, cY+10, 10);
	let lJoint = manager.createRotateJoint(cBody, lTire, cX-25, cY+10);
	let rJoint = manager.createRotateJoint(cBody, rTire, cX+25, cY+10);
	manager.setCamera(cBody);

	createStage(240, 310);
	createDaruma(240-200, 250);
	createDaruma(240+200, 250);

	// Functions

	function createStage(cX, cY){

		let type = b2Body.b2_dynamicBody;
		let points = [
			{x:0, y:0}, {x: 30, y: 15}, {x: 15, y: 30}
		];
		manager.createPolygon(type, cX, cY, points);

		type = b2Body.b2_staticBody;
		let vecA = new b2Vec2()
		let posA = {x:-640, y: 0};
		let posB = {x:+640, y: 0};
		manager.createEdge(type, cX, cY, posA, posB);
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
		if(e.key === "ArrowUp"){
			let vec = new b2Vec2(0.0, -10.0);
			lTire.ApplyImpulse(vec, lTire.GetPosition());
		}
		if(e.key === "ArrowDown"){

		}
		if(e.key === "ArrowLeft"){
			cBody.SetAwake(true);
			lTire.SetAngularVelocity(-30);
			rTire.SetAngularVelocity(-30);
		}
		if(e.key === "ArrowRight"){
			cBody.SetAwake(true);
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
	}, 1000 * 5);
};