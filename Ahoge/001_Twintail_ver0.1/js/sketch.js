console.log("Hello Box2dWeb!!");

// Global
let canvasPosition = null;
let world = null;
let b2dManager = null;

let assets = {
	cake:    {src: "assets/f_cake.png",    img: null},
	daifuku: {src: "assets/f_daifuku.png", img: null},
	goki:    {src: "assets/f_goki.png",    img: null},
	ice:     {src: "assets/f_ice.png",     img: null},
	pafe:    {src: "assets/f_pafe.png",    img: null},
	pudding: {src: "assets/f_pudding.png", img: null},
	tapi:    {src: "assets/f_tapi.png",    img: null},
	chain:   {src: "assets/w_chain.png",   img: null},
	eye:     {src: "assets/w_eye.png",     img: null},
	face:    {src: "assets/w_face.png",    img: null},
	fusa:    {src: "assets/w_fusa.png",    img: null},
	mouth:   {src: "assets/w_mouth.png",   img: null}
}

let vFood, vGoki;
let foods = [];

// Main
window.onload = function(){
	loadImages(init);// Images
}

function init(){
	console.log("init");

	// Effect
	vFood = new Audio("assets/v_eat.mp3");
	vGoki = new Audio("assets/v_goki.mp3");

	// Foods
	foods.push(assets.goki);
	foods.push(assets.cake);
	foods.push(assets.daifuku);
	foods.push(assets.pafe);
	foods.push(assets.pudding);

	// CanvasPosition
	canvasPosition = getElementPosition(document.getElementById(C_NAME));
	
	// World
	world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	b2dManager = new Box2dManager(world);

	createDeco(C_WIDTH*0.5, C_HEIGHT-160, assets.face.img);
	createDeco(C_WIDTH*0.5, C_HEIGHT-160, assets.eye.img);
	createMouth(C_WIDTH*0.5, C_HEIGHT-60, assets.mouth.img);
	createTail(C_WIDTH*0.5-100, C_HEIGHT-260);
	createTail(C_WIDTH*0.5+100, C_HEIGHT-260);
	createGround(C_WIDTH*0.5, C_HEIGHT-10);

	// Contact
	let listener = new b2ContactListener;
	listener.BeginContact = function(contact){
		let userDataA = contact.GetFixtureA().GetBody().GetUserData();
		let userDataB = contact.GetFixtureB().GetBody().GetUserData();

		if(userDataA && userDataA.tag == "tail") return;
		if(userDataB && userDataB.tag == "mouth"){

			if(userDataA.tag == "food"){
				vFood.currentTime = 0;
				vFood.play();
			}
			if(userDataA.tag == "goki"){
				vGoki.currentTime = 0;
				vGoki.play();
			}

			b2dManager.pushDestroys(contact.GetFixtureA().GetBody());
		}
		if(userDataB && userDataB.tag == "ground"){
			b2dManager.pushDestroys(contact.GetFixtureA().GetBody());
		}
	}
	world.SetContactListener(listener);

	function createDeco(cX, cY, img){
		console.log("createDeco");
		let tSta = b2Body.b2_staticBody;
		let bMain = b2dManager.createBodyImage(tSta, cX, cY, img, 0, "noname", 0x0000);
	}

	function createMouth(cX, cY, img){
		console.log("createMouth");
		let tSta = b2Body.b2_staticBody;
		let bMain = b2dManager.createBodyImage(tSta, cX, cY, img, 0, "mouth");
	}

	function createTail(cX, cY){
		console.log("createTail");
		let tSta = b2Body.b2_staticBody;
		let tDyn = b2Body.b2_dynamicBody;
		let bMain = b2dManager.createBody(tSta, cX, cY, 8, 8);
		let bCha1 = b2dManager.createBodyImage(tDyn, cX, cY+30, assets.chain.img, 0, "tail");
		let bCha2 = b2dManager.createBodyImage(tDyn, cX, cY+90, assets.chain.img, 0, "tail");
		let bCha3 = b2dManager.createBodyImage(tDyn, cX, cY+150, assets.chain.img, 0, "tail");
		let bFusa = b2dManager.createBodyImage(tDyn, cX, cY+200, assets.fusa.img, 0, "tail");

		b2dManager.createRevoluteJoint(bMain, bCha1, cX, cY, -960, +960);
		b2dManager.createRevoluteJoint(bCha1, bCha2, cX, cY+60, -960, +960);
		b2dManager.createRevoluteJoint(bCha2, bCha3, cX, cY+120, -960, +960);
		b2dManager.createRevoluteJoint(bCha3, bFusa, cX, cY+180, -30, +30);
	}

	function createGround(cX, cY, img){
		console.log("createMouth");
		let tSta = b2Body.b2_staticBody;
		let bMain = b2dManager.createBody(tSta, cX, cY, 640, 16, 0, "ground");
	}

	// Update
	window.setInterval(update, 1000 / 50);
	function update(){
		// Box2dManager
		b2dManager.update();
	};

	// Random
	window.setInterval(()=>{
		// Create
		let rdm = Math.floor(Math.random()*foods.length);
		let food = foods[rdm];
		let type = b2Body.b2_dynamicBody;
		let x = C_WIDTH * 0.8 * Math.random() - C_WIDTH * 0.1;
		let vX = Math.random() * 100 - 50;
		let tag = (rdm==0) ? "goki":"food";
		let body = b2dManager.createBodyImage(type, x, 20, food.img, 0, tag);
		let vec = new b2Vec2(vX, 0.0);
		let pos = new b2Vec2(body.GetPosition().x, body.GetPosition().y);
		body.ApplyImpulse(vec, pos);
	}, 1000 * 1);
};

function loadImages(callback){

	for(let key in assets){
		let img = new Image();
		img.src = assets[key].src;
		img.onload = (e)=>{assets[key].img = img;}
	}
	checkAssets();

	function checkAssets(){
		let loaded = true;
		for(let key in assets){
			if(assets[key].img == null) loaded = false;
		}
		if(loaded == true){
			callback();
			return;
		}
		setTimeout(checkAssets, 100);// Recursive
	}
}