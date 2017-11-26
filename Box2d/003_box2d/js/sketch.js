console.log("Hello Box2dWeb!!");

const DEG_TO_RAD = Math.PI / 180;

const A_RATIO  = 30.0;

const C_WIDTH  = 480;
const C_HEIGHT = 320;

const C_NAME   = "canvas";

let b2Vec2          = Box2D.Common.Math.b2Vec2;
let b2AABB          = Box2D.Collision.b2AABB;
let b2BodyDef       = Box2D.Dynamics.b2BodyDef;
let b2Body          = Box2D.Dynamics.b2Body;
let b2FixtureDef    = Box2D.Dynamics.b2FixtureDef;
let b2Fixture       = Box2D.Dynamics.b2Fixture;
let b2World         = Box2D.Dynamics.b2World;
let b2MassData      = Box2D.Collision.Shapes.b2MassData;
let b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape;
let b2CircleShape   = Box2D.Collision.Shapes.b2CircleShape;
let b2DebugDraw     = Box2D.Dynamics.b2DebugDraw;

// Joint
let b2MouseJointDef    = Box2D.Dynamics.Joints.b2MouseJointDef;
let b2WeldJointDef     = Box2D.Dynamics.Joints.b2WeldJointDef;
let b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

// Main
window.onload = function(){
	
	// World
	let world = new b2World(new b2Vec2(0, 10), true);
	 
	let fixDef = new b2FixtureDef;
	fixDef.density     = 1.0;
	fixDef.friction    = 0.5;
	fixDef.restitution = 0.2;
	 
	// Create ground
	let bodyDef  = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.shape = new b2PolygonShape;

	// Bottom, Top
	fixDef.shape.SetAsBox(C_WIDTH / A_RATIO / 2, 0.2);
	bodyDef.position.Set(C_WIDTH / A_RATIO / 2, 0);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(C_WIDTH / A_RATIO / 2, C_HEIGHT / A_RATIO);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	// Left, Right
	fixDef.shape.SetAsBox(0.2, C_HEIGHT / A_RATIO / 2);
	bodyDef.position.Set(0, C_HEIGHT / A_RATIO / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	bodyDef.position.Set(C_WIDTH / A_RATIO, C_HEIGHT / A_RATIO / 2);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	// DebugDraw
	let debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById(C_NAME).getContext("2d"));
	debugDraw.SetDrawScale(A_RATIO);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	/*
	// Create some Objects
	bodyDef.type = b2Body.b2_dynamicBody;
	 for(let i=0; i<10; ++i){
		if(Math.random() > 0.5){
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox(
				Math.random() + 0.1, Math.random() + 0.1);
		}else{
			fixDef.shape = new b2CircleShape(Math.random() + 0.1);
		}
		bodyDef.position.x = C_WIDTH / A_RATIO * Math.random();
		bodyDef.position.y = C_HEIGHT / A_RATIO * Math.random();
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	}
	*/

	let centerX = C_WIDTH / A_RATIO / 2;
	let centerY = C_HEIGHT / A_RATIO / 2;

	//==========
	// Rug doll

	// Head
	bodyDef.position.Set(centerX, centerY-0.2);
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.3, 0.3);
	let dHead = world.CreateBody(bodyDef);
	dHead.CreateFixture(fixDef);

	// Body
	bodyDef.position.Set(centerX, centerY+1.0);
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.2, 0.6);
	let dBody = world.CreateBody(bodyDef);
	dBody.CreateFixture(fixDef);

	// WeldJoint
	let weldJointDef = new b2WeldJointDef();
	weldJointDef.Initialize(dHead, dBody, new b2Vec2(centerX, centerY));
	let weldJoint = world.CreateJoint(weldJointDef);
	//world.DestroyJoint(weldJoint);

	// Left arm
	bodyDef.position.Set(centerX-0.5, centerY+1.0);
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.1, 0.6);
	let dArmL = world.CreateBody(bodyDef);
	dArmL.CreateFixture(fixDef);

	// RevoluteJoint
	var revJointDef = new b2RevoluteJointDef();
	revJointDef.Initialize(dBody, dArmL, new b2Vec2(centerX-0.3, centerY+0.5));
	//revJointDef.maxMotorTorque = 1100.0;// トルク力
	//revJointDef.motorSpeed = 3.0; // 回転速度
	//revJointDef.enableMotor = true; // モーターを有効化
	revJointDef.lowerAngle  = 0 * DEG_TO_RAD; // 可動範囲の最小値
	revJointDef.upperAngle  = 120 * DEG_TO_RAD; // 可動範囲の最大値
	revJointDef.enableLimit = true; // 可動範囲を可動有効化
	var revoluteJointArmL = world.CreateJoint(revJointDef);

	// Right arm
	bodyDef.position.Set(centerX+0.5, centerY+1.0);
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.1, 0.6);
	let dArmR = world.CreateBody(bodyDef);
	dArmR.CreateFixture(fixDef);

	// RevoluteJoint
	var revJointDef = new b2RevoluteJointDef();
	revJointDef.Initialize(dBody, dArmR, new b2Vec2(centerX+0.3, centerY+0.5));
	//revJointDef.maxMotorTorque = 1100.0;// トルク力
	//revJointDef.motorSpeed = 3.0; // 回転速度
	//revJointDef.enableMotor = true; // モーターを有効化
	revJointDef.lowerAngle  = -120 * DEG_TO_RAD; // 可動範囲の最小値
	revJointDef.upperAngle  = 0 * DEG_TO_RAD; // 可動範囲の最大値
	revJointDef.enableLimit = true; // 可動範囲を可動有効化
	var revoluteJointArmR = world.CreateJoint(revJointDef);

	// Left leg
	bodyDef.position.Set(centerX-0.15, centerY+2.3);
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.1, 0.6);
	let dLegL = world.CreateBody(bodyDef);
	dLegL.CreateFixture(fixDef);

	// RevoluteJoint
	var revJointDef = new b2RevoluteJointDef();
	revJointDef.Initialize(dBody, dLegL, new b2Vec2(centerX-0.1, centerY+1.7));
	//revJointDef.maxMotorTorque = 1100.0;// トルク力
	//revJointDef.motorSpeed = 3.0; // 回転速度
	//revJointDef.enableMotor = true; // モーターを有効化
	revJointDef.lowerAngle  = -30 * DEG_TO_RAD; // 可動範囲の最小値
	revJointDef.upperAngle  = 120 * DEG_TO_RAD; // 可動範囲の最大値
	revJointDef.enableLimit = true; // 可動範囲を可動有効化
	var revoluteJointLegL = world.CreateJoint(revJointDef);

	// Right leg
	bodyDef.position.Set(centerX+0.15, centerY+2.3);
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(0.1, 0.6);
	let dLegR = world.CreateBody(bodyDef);
	dLegR.CreateFixture(fixDef);

	// RevoluteJoint
	var revJointDef = new b2RevoluteJointDef();
	revJointDef.Initialize(dBody, dLegR, new b2Vec2(centerX+0.1, centerY+1.7));
	//revJointDef.maxMotorTorque = 1100.0;// トルク力
	//revJointDef.motorSpeed = 3.0; // 回転速度
	//revJointDef.enableMotor = true; // モーターを有効化
	revJointDef.lowerAngle  = -120 * DEG_TO_RAD; // 可動範囲の最小値
	revJointDef.upperAngle  = 30 * DEG_TO_RAD; // 可動範囲の最大値
	revJointDef.enableLimit = true; // 可動範囲を可動有効化
	var revoluteJointLegR = world.CreateJoint(revJointDef);

	// Update
	window.setInterval(update, 1000 / 60);
	function update(){

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

		// Step
		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();
	};

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
		mouseX = (clientX - canvasPosition.x) / A_RATIO;
		mouseY = (clientY - canvasPosition.y) / A_RATIO;
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

	//==========
	// Utility
	function getElementPosition(element){
		let elem = element;
		let tagName = "", x = 0, y = 0;
		while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")){
			y += elem.offsetTop; x += elem.offsetLeft;
			tagName = elem.tagName.toUpperCase();
			if(tagName == "BODY") elem=0;
			if(typeof(elem) == "object"){
				if(typeof(elem.offsetParent) == "object") elem = elem.offsetParent;
			}
		}
		return {x: x, y: y};
	 }
};