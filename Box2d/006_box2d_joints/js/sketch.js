console.log("Hello Box2dWeb!!");

// Global
let canvasPosition = null;
let world = null;
let b2dManager = null;

// Main
window.onload = function(){

	// CanvasPosition
	canvasPosition = getElementPosition(document.getElementById(C_NAME));
	
	// World
	world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	b2dManager = new Box2dManager(world);

	createDoll(200, 200);
	createDoll(280, 200);
	createDaruma(120, 300);
	createDaruma(360, 300);
	createPachinko(240, 40, 3, 3, 50, 30);
	createPachinko(100, 60, 3, 3, 50, 30);
	createPachinko(380, 60, 3, 3, 50, 30);
	createPachinko(240, 140, 2, 3, 50, 30);
	createRotater(170, 130, 75, +3.0);
	createRotater(310, 130, 75, -3.0);
	createPiston(20, 160, +40, +50, -100, +100);
	createPiston(460, 160, -40, +50, -100, +100);

	function createDoll(cX, cY){

		let type = b2Body.b2_dynamicBody;

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
	}

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

	function createPachinko(cX, cY, rMax, cMax, padX, padY){

		let type = b2Body.b2_staticBody;
		let size = 5;

		let rows = rMax;
		for(let r=0; r<rows; r++){
			let cols = cMax;
			if(r%2 == 0) cols -= 1;
			for(let c=0; c<cols; c++){
				let sX = cX - (cols-1) * padX / 2;
				let sY = cY;
				let x = sX + c * padX;
				let y = sY + r * padY;
				b2dManager.createBody(type, x, y, size, size, 45);
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
		let vX   = 0.1;
		let vec = new b2Vec2(-0.1, 0.0);
		let pos = new b2Vec2(body.GetPosition().x, body.GetPosition().y);
		body.ApplyImpulse(vec, pos);
	}, 1000 * 1);
};