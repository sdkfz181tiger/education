console.log("Hello Box2dWeb!!");

// Global
let world = null;
let b2dManager = null;

// Main
window.onload = function(){
	
	// World
	world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	b2dManager = new Box2dManager(world);

	// Doll	
	let type = b2Body.b2_dynamicBody;
	let cX = 240;
	let cY = 200;

	let bHead = b2dManager.createBody(type, cX,    cY,    32, 32);
	let bBody = b2dManager.createBody(type, cX,    cY+45, 20, 50);
	let bArmL = b2dManager.createBody(type, cX-20, cY+45, 10, 50);
	let bArmR = b2dManager.createBody(type, cX+20, cY+45, 10, 50);
	let bLegL = b2dManager.createBody(type, cX-8,  cY+98, 10, 45);
	let bLegR = b2dManager.createBody(type, cX+8,  cY+98, 10, 45);

	// WeldJoint
	let weldJoint = b2dManager.createWeldJoint(bHead, bBody, cX, cY);
	//world.DestroyJoint(weldJoint);

	// RevolteJoint
	let rjArmL = b2dManager.createRevoluteJoint(bBody, bArmL, cX-20, cY+20, 0, 120);
	let rjArmR = b2dManager.createRevoluteJoint(bBody, bArmR, cX+20, cY+20, -120, 0);
	let rjLegL = b2dManager.createRevoluteJoint(bBody, bLegL, cX-8,  cY+80, 0, 120);
	let rjLegR = b2dManager.createRevoluteJoint(bBody, bLegR, cX+8,  cY+80, -120, 0);

	function createDaruma(cX, cY){

		let type = b2Body.b2_dynamicBody;
		let paddingY = 22;

		for(let i=0; i<8; i++){
			let img = new Image();
			img.src = "assets/do_box_" + i + ".png";
			img.onload = (e)=>{
				b2dManager.createBodyImage(type, cX, cY-paddingY*i, e.target);
			}
		}
	}

	function createRotater(cX, cY, w, speed){

		let cBody = b2dManager.createBody(b2Body.b2_staticBody, cX, cY, 5, 5);
		let rBody = b2dManager.createBody(b2Body.b2_dynamicBody, cX, cY, w, 5);
		let rjRot = b2dManager.createTorqueJoint(cBody, rBody, cX, cY, 1100, speed);
	}

	function createPiston(cX, cY, offsetX, offsetY, lowerAngle, upperAngle){

		let lBody1 = b2dManager.createBody(b2Body.b2_staticBody, cX, cY, 5, 5);
		let lBody2 = b2dManager.createBody(b2Body.b2_dynamicBody, cX, cY, 10, 10);
		let pjPris = b2dManager.createPrismaticJoint(lBody1, lBody2, cX, cY, -10.0, +10.0);

		let rBody1 = b2dManager.createBody(b2Body.b2_staticBody, cX+offsetX, cY+offsetY, 5, 5);
		let rBody2 = b2dManager.createBody(b2Body.b2_dynamicBody, cX+offsetX, cY+offsetY, 60, 5);
		let rjRot  = b2dManager.createRevoluteJoint(rBody1, rBody2, cX+offsetX, cY+offsetY, lowerAngle, upperAngle);

		let gjPis  = b2dManager.createGearJoint(lBody2, rBody2, pjPris, rjRot);
	}

	// Update
	window.setInterval(update, 1000 / 30);
	function update(){

		// Box2dManager
		b2dManager.update();
	};

	// Random
	window.setInterval(()=>{
		// Create
		let type = b2Body.b2_dynamicBody;
		let body = b2dManager.createBody(type, 240, 20, 5, 5);
	}, 1000 * 10);

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
			let vec = new b2Vec2(+20.0, +30.0);
			bBody.ApplyImpulse(vec, bBody.GetPosition());
		}
	}
};