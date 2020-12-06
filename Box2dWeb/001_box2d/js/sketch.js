console.log("Hello Box2dWeb!!");

const A_RATIO  = 30.0;

const C_WIDTH  = 480;
const C_HEIGHT = 320;

const C_NAME   = "canvas";

// Main
window.onload = function(){
	
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
	let b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
	
	// World
	let world = new b2World(new b2Vec2(0, 10), true);
	 
	let fixDef = new b2FixtureDef;
	fixDef.density     = 1.0;
	fixDef.friction    = 0.5;
	fixDef.restitution = 0.2;

	let bodyDef = new b2BodyDef;
	 
	// Create ground
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
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById(C_NAME).getContext("2d"));
	debugDraw.SetDrawScale(A_RATIO);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	// Create some Objects
	bodyDef.type = b2Body.b2_dynamicBody;
	 for(var i=0; i<10; ++i){
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

	// Update
	window.setInterval(update, 1000 / 60);
	function update(){
		world.Step(1 / 60, 10, 10);
		world.DrawDebugData();
		world.ClearForces();
	};
};