console.log("Hello Box2dWeb!!");

const DEG_TO_RAD = Math.PI / 180;

const PTM_RATIO  = 30.0;

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

// Manager
b2dManager = null;

// Main
window.onload = function(){
	
	// World
	let world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	b2dManager = new Box2dManager(world);

	let cX = C_WIDTH / 2;
	let cY = C_HEIGHT / 2;

	let bHead = b2dManager.createBody(cX,    cY-20,    60, 70, b2Body.b2_dynamicBody, "assets/t_chano.png");
	let bBody = b2dManager.createBody(cX,    cY+45, 20, 50, b2Body.b2_dynamicBody);
	let bArmL = b2dManager.createBody(cX-20, cY+45, 10, 50, b2Body.b2_dynamicBody);
	let bArmR = b2dManager.createBody(cX+20, cY+45, 10, 50, b2Body.b2_dynamicBody);
	let bLegL = b2dManager.createBody(cX-8,  cY+98, 10, 45, b2Body.b2_dynamicBody);
	let bLegR = b2dManager.createBody(cX+8,  cY+98, 10, 45, b2Body.b2_dynamicBody);

	// WeldJoint
	let weldJoint = b2dManager.createWeldJoint(bHead, bBody, cX, cY);
	//world.DestroyJoint(weldJoint);

	// RevolteJoint
	let rjArmL = b2dManager.createRevoluteJoint(bBody, bArmL, cX-20, cY+20, 0, 120);
	let rjArmR = b2dManager.createRevoluteJoint(bBody, bArmR, cX+20, cY+20, -120, 0);
	let rjLegL = b2dManager.createRevoluteJoint(bBody, bLegL, cX-8,  cY+80, 0, 120);
	let rjLegR = b2dManager.createRevoluteJoint(bBody, bLegR, cX+8,  cY+80, -120, 0);

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

//==========
// Box2dManager

class Box2dManager{

	constructor(world){
		this._world = world;

		this._fixDef = new b2FixtureDef;
		this._fixDef.density     = 1.0;
		this._fixDef.friction    = 0.5;
		this._fixDef.restitution = 0.2;
		 
		this._bodyDef  = new b2BodyDef;

		this.init();
	}

	init(){
		// Create ground
		this._bodyDef.type = b2Body.b2_staticBody;
		this._fixDef.shape = new b2PolygonShape;

		// Bottom, Top
		this._fixDef.shape.SetAsBox(C_WIDTH / PTM_RATIO / 2, 0.2);
		this._bodyDef.position.Set(C_WIDTH / PTM_RATIO / 2, 0);
		this._world.CreateBody(this._bodyDef).CreateFixture(this._fixDef);
		this._bodyDef.position.Set(C_WIDTH / PTM_RATIO / 2, C_HEIGHT / PTM_RATIO);
		this._world.CreateBody(this._bodyDef).CreateFixture(this._fixDef);

		// Left, Right
		this._fixDef.shape.SetAsBox(0.2, C_HEIGHT / PTM_RATIO / 2);
		this._bodyDef.position.Set(0, C_HEIGHT / PTM_RATIO / 2);
		this._world.CreateBody(this._bodyDef).CreateFixture(this._fixDef);
		this._bodyDef.position.Set(C_WIDTH / PTM_RATIO, C_HEIGHT / PTM_RATIO / 2);
		this._world.CreateBody(this._bodyDef).CreateFixture(this._fixDef);

		// DebugDraw
		let debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById(C_NAME).getContext("2d"));
		debugDraw.SetDrawScale(PTM_RATIO);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this._world.SetDebugDraw(debugDraw);
	}

	createBody(x, y, w, h, type, src=null){

		// Box
		this._bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
		this._bodyDef.type = type;
		this._bodyDef.userData = null;

		// Image
		if(src){
			let img = new Image();
			img.src = src;
			w = img.width;
			h = img.height;
			this._bodyDef.userData = {shape_type: "box", img: img, width: w, height: h};
		}

		// Shape
		this._fixDef.shape = new b2PolygonShape;
		this._fixDef.shape.SetAsBox(w / PTM_RATIO / 2, h / PTM_RATIO / 2);
		let body = this._world.CreateBody(this._bodyDef);
		body.CreateFixture(this._fixDef);
		return body;
	}

	createWeldJoint(bodyA, bodyB, aX, aY){
		let weldJointDef = new b2WeldJointDef();
		let anchor = new b2Vec2(aX/PTM_RATIO, aY/PTM_RATIO);
		weldJointDef.Initialize(bodyA, bodyB, anchor);
		let weldJoint = this._world.CreateJoint(weldJointDef);
		//world.DestroyJoint(weldJoint);
		return weldJoint;
	}

	createRevoluteJoint(bodyA, bodyB, aX, aY, lowerAngle, upperAngle){
		let revJointDef = new b2RevoluteJointDef();
		let anchor = new b2Vec2(aX/PTM_RATIO, aY/PTM_RATIO);
		revJointDef.Initialize(bodyA, bodyB, anchor);
		//revJointDef.maxMotorTorque = 1100.0;// トルク力
		//revJointDef.motorSpeed = 3.0; // 回転速度
		//revJointDef.enableMotor = true; // モーターを有効化
		revJointDef.lowerAngle  = lowerAngle * DEG_TO_RAD; // 可動範囲の最小値
		revJointDef.upperAngle  = upperAngle * DEG_TO_RAD; // 可動範囲の最大値
		revJointDef.enableLimit = true; // 可動範囲を可動有効化
		let revoluteJoint = this._world.CreateJoint(revJointDef);
		return revoluteJoint;
	}

	update(){
		// Step
		this._world.Step(1 / 30, 10, 10);
		this._world.DrawDebugData();
		this._world.ClearForces();

		// Images
		let context = document.getElementById(C_NAME).getContext("2d");
		for(let bodyItem = this._world.GetBodyList(); bodyItem; bodyItem = bodyItem.GetNext()){
			if(bodyItem.GetType() == b2Body.b2_dynamicBody){
				let position = bodyItem.GetPosition();
				let userData = bodyItem.GetUserData();
				context.save();
				if(userData && userData.img && userData.img.complete){
					if(userData.shape_type && userData.shape_type == "circle"){
						let slideX = position.x * PTM_RATIO;
						let slideY = position.y * PTM_RATIO;
						context.translate(slideX, slideY);
						context.rotate(bodyItem.GetAngle());
						context.drawImage(userData.img, -userData.radius, -userData.radius);
					}
					if(userData.shape_type && userData.shape_type == "box"){
						let slideX = position.x * PTM_RATIO;
						let slideY = position.y * PTM_RATIO;
						context.translate(slideX, slideY);
						context.rotate(bodyItem.GetAngle());
						context.drawImage(userData.img, -userData.width / 2.0, -userData.height / 2.0);
					}
				}
				context.restore();
			}
		}
	}
}