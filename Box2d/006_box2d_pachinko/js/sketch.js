console.log("Hello Box2dWeb!!");

const DEG_TO_RAD = Math.PI / 180;

const PTM_RATIO  = 30.0;

const C_WIDTH  = 480;
const C_HEIGHT = 320;

const C_NAME   = "canvas";

// Manager
let b2dManager = null;

// Main
window.onload = function(){
	
	// World
	let world = new b2World(new b2Vec2(0, 10), true);

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
		let size     = 5;

		let rows = rMax;
		for(let r=0; r<rows; r++){
			let cols = cMax;
			if(r%2 == 0) cols -= 1;
			for(let c=0; c<cols; c++){
				let sX = cX - (cols-1) * padX / 2;
				let sY = cY;
				let x = sX + c * padX;
				let y = sY + r * padY;
				b2dManager.createBody(type, x, y, size, size);
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

		// Mouse
		if(isMouseDown && (!mouseJoint)){
			let body = getBodyAtMouse();
			if(body){
				let md = new b2MouseJointDef();
				md.bodyA = world.GetGroundBody();
				md.bodyB = body;
				md.target.Set(mouseX, mouseY);
				md.collideConnected = true;
				md.maxForce = 300.0 * body.GetMass();
				mouseJoint = world.CreateJoint(md);
				body.SetAwake(true);
		   }
		}
		
		if(mouseJoint){
			if(isMouseDown){
				mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
			}else{
				world.DestroyJoint(mouseJoint);
				mouseJoint = null;
			}
		}

		// Box2dManager
		b2dManager.update();
	};

	// Random
	window.setInterval(()=>{
		// Create
		let type = b2Body.b2_dynamicBody;
		let x    = Math.random() * C_WIDTH;
		let body = b2dManager.createBody(type, x, 5, 8, 8);
	}, 1000 * 1);

	//==========
	// Mouse
	let mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
	let canvasPosition = getElementPosition(document.getElementById(C_NAME));

	function handleMouseDown(e){
		isMouseDown = true;
		handleMouseMove(e);
		document.addEventListener("mousemove", handleMouseMove, true);
		document.addEventListener("touchmove", handleMouseMove, true);
	}
	document.addEventListener("mousedown", handleMouseDown, true);
	document.addEventListener("touchstart", handleMouseDown, true);
	
	function handleMouseUp(){
		document.removeEventListener("mousemove", handleMouseMove, true);
		document.removeEventListener("touchmove", handleMouseMove, true);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;
	}
	document.addEventListener("mouseup", handleMouseUp, true);
	document.addEventListener("touchend", handleMouseUp, true);

	function handleMouseMove(e){
		let clientX, clientY;
		if(e.clientX){
			clientX = e.clientX; clientY = e.clientY;
		}else if(e.changedTouches && e.changedTouches.length > 0){
			let touch = e.changedTouches[e.changedTouches.length - 1];
			clientX = touch.clientX; clientY = touch.clientY;
		}else{
		   return;
		}
		mouseX = (clientX - canvasPosition.x) / PTM_RATIO;
		mouseY = (clientY - canvasPosition.y) / PTM_RATIO;
		e.preventDefault();
	};

	//==========
	// Get body
	function getBodyAtMouse(){
		mousePVec = new b2Vec2(mouseX, mouseY);
		let aabb = new b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
		
		// Query the world for overlapping shapes.
		selectedBody = null;
		world.QueryAABB(getBodyCB, aabb);
		return selectedBody;
	}

	function getBodyCB(fixture){
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody){
			if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)){
				selectedBody = fixture.GetBody();
				return false;
			}
		}
		return true;
	}
};