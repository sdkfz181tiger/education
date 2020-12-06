"use strict";
//==========
// JavaScript

const PTM = 32;

let cvs, ctx;
let B2D, world;

// Window
window.onload = (e)=>{
	console.log("onload");
	// Canvas, Context
	cvs = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	// Box2D
	Box2D().then(init);
}

function init(b2d){
	console.log("init");
	B2D = b2d;// Box2D
	let gravity = new B2D.b2Vec2(0.0, -10.0);
	world = new B2D.b2World(gravity);

	let debugDraw = new B2D.JSDraw();
	debugDraw.DrawSegment = function(vert1Ptr, vert2Ptr, colorPtr){
		setColorFromDebugDrawCallback(colorPtr);
		drawSegment(vert1Ptr, vert2Ptr);
	}
	// Empty implementations for unused methods.
	debugDraw.DrawPolygon = function() {};
	debugDraw.DrawSolidPolygon = function() {};
	debugDraw.DrawCircle = function() {};
	debugDraw.DrawSolidCircle = function() {};
	debugDraw.DrawTransform = function() {};
	world.SetDebugDraw( debugDraw );

	// Ground
	// let bd_ground = new B2D.b2BodyDef();
	// let ground = world.CreateBody(bd_ground);
	// let shape  = new B2D.b2EdgeShape();
	// shape.Set(new B2D.b2Vec2(-40.0, -6.0), new B2D.b2Vec2(40.0, -6.0));
	// ground.CreateFixture(shape, 0.0);

	var bodyDef = new B2D.b2BodyDef();
	bodyDef.set_type( B2D.b2_dynamicBody );
	var dynamicBody = world.CreateBody( bodyDef );

	var circleShape = new B2D.b2CircleShape();
	circleShape.set_m_radius( 0.5 );
	dynamicBody.CreateFixture( circleShape, 1.0 );

	update();
}

function update(){

	world.Step(1/60, 3, 2);// Step

	// Background
	ctx.fillStyle = "rgb(33,33,33)";
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	ctx.save();            
	ctx.translate(cvs.width/2, cvs.height/2);
	ctx.scale(1, -1);
	ctx.scale(PTM, PTM);
	ctx.lineWidth /= PTM;
		
	drawAxes(ctx);
		
	ctx.fillStyle = "rgb(255,255,0)";
	world.DrawDebugData();
	ctx.restore();

	// Node
	let node = world.GetBodyList();
	let pos = node.GetPosition();
}