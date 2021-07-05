console.log("Hello LiquidFun!!");

const WINDOW_WIDTH  = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

// Three-js
let tRenderer;
let tCamera;
let tScene;

// LiquidFun
let world;

const TIME_STEP = 1.0 / 60.0;
const ITE_VELOCITY = 8;
const ITE_POSITION = 3;

// Renderer
let renderer;

window.onload = function(){

	//==========
	// Three-js

	// Renderer
	tRenderer = new THREE.WebGLRenderer();
	tRenderer.setClearColor(0xcccccc);
	tRenderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

	// Camera
	tCamera = new THREE.PerspectiveCamera(70, WINDOW_WIDTH/WINDOW_HEIGHT, 1, 300);
	tCamera.position.x = 0.0;
	tCamera.position.y = 1.0;
	tCamera.position.z = 2.5;

	// Scene
	tScene = new THREE.Scene();
	//tCamera.lookAt(tScene.position);

	document.body.appendChild(tRenderer.domElement);

	//==========
	// LiquidFun

	// World
	let gravity = new b2Vec2(0, -10.0);
	world = new b2World(gravity);

	let bodyDef = new b2BodyDef();
	let ground = world.CreateBody(bodyDef);

	bodyDef.type = b2_staticBody;
	bodyDef.allowSleep = false;
	bodyDef.position.Set(0, 1);
	let body = world.CreateBody(bodyDef);

	let b1 = new b2PolygonShape();
	b1.SetAsBoxXYCenterAngle(0.05, 1, new b2Vec2(2, 0), 0);
	body.CreateFixtureFromShape(b1, 5);

	let b2 = new b2PolygonShape();
	b2.SetAsBoxXYCenterAngle(0.05, 1, new b2Vec2(-2, 0), 0);
	body.CreateFixtureFromShape(b2, 5);

	let b3 = new b2PolygonShape();
	b3.SetAsBoxXYCenterAngle(2, 0.05, new b2Vec2(0, 1), 0);
	body.CreateFixtureFromShape(b3, 5);

	let b4 = new b2PolygonShape();
	b4.SetAsBoxXYCenterAngle(2, 0.05, new b2Vec2(0, -1), 0);
	body.CreateFixtureFromShape(b4, 5);

	let jd = new b2RevoluteJointDef();
	jd.motorSpeed = 0.05 * Math.PI;
	jd.maxMotorTorque = 1e7;
	jd.enableMotor = true;
	let joint = jd.InitializeAndCreate(ground, body, new b2Vec2(0, 1));

	// Particles
	var psd = new b2ParticleSystemDef();
	psd.radius = 0.025;
	psd.dampingStrength = 0.2;

	var particleSystem = world.CreateParticleSystem(psd);
	var box = new b2PolygonShape();
	box.SetAsBoxXYCenterAngle(0.9, 0.9, new b2Vec2(0, 1.0), 0);

	var particleGroupDef = new b2ParticleGroupDef();
	particleGroupDef.shape = box;
	var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);

	// Renderer
	renderer = new Renderer();

	// Rendering
	rendering();
}

function rendering(){

	// World
	world.Step(TIME_STEP, ITE_VELOCITY, ITE_POSITION);

	for(let i=0; i<world.bodies.length; i++){
		let body = world.bodies[i];
		let maxFixtures = body.fixtures.length;
		let transform = body.GetTransform();
		for(let j=0; j<maxFixtures; j++){
			let fixture = body.fixtures[j];
			fixture.shape.draw(transform);
		}
	}

	// Renderer
	renderer.draw();
	renderer.currentVertex = 0;

	// Render
	tRenderer.render(tScene, tCamera);
	requestAnimationFrame(rendering);
}