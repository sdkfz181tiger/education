console.log("Hello Box2dWeb!!");

// Global
let canvasPosition = null;
let world = null;
let b2dManager = null;

let assets = {
	chain: {src: "assets/w_chain.png", img: null},
	face:  {src: "assets/w_face.png",  img: null},
	fusa:  {src: "assets/w_fusa.png",  img: null}
}

// Main
window.onload = function(){
	loadImages(init);// Images
}

function init(){
	console.log("init");

	// CanvasPosition
	canvasPosition = getElementPosition(document.getElementById(C_NAME));
	
	// World
	world = new b2World(new b2Vec2(0, 10), true);

	// Manager
	b2dManager = new Box2dManager(world);

	createFace(C_WIDTH*0.5, C_HEIGHT*0.5);
	createTail(C_WIDTH*0.5-60, C_HEIGHT*0.5);
	createTail(C_WIDTH*0.5+60, C_HEIGHT*0.5);

	function createFace(cX, cY){
		console.log("createFace");
		let tSta = b2Body.b2_staticBody;
		let bMain = b2dManager.createBodyImage(tSta, cX, cY, assets.face.img, 0, 0x0000);
	}

	function createTail(cX, cY){

		let tSta = b2Body.b2_staticBody;
		let tDyn = b2Body.b2_dynamicBody;
		let bMain = b2dManager.createBody(tSta, cX, cY, 8, 8);
		let bCha1 = b2dManager.createBodyImage(tDyn, cX, cY+30, assets.chain.img);
		let bCha2 = b2dManager.createBodyImage(tDyn, cX, cY+90, assets.chain.img);
		let bCha3 = b2dManager.createBodyImage(tDyn, cX, cY+150, assets.chain.img);
		let bFusa = b2dManager.createBodyImage(tDyn, cX, cY+200, assets.fusa.img);

		b2dManager.createRevoluteJoint(bMain, bCha1, cX, cY, -960, +960);
		b2dManager.createRevoluteJoint(bCha1, bCha2, cX, cY+60, -960, +960);
		b2dManager.createRevoluteJoint(bCha2, bCha3, cX, cY+120, -960, +960);
		b2dManager.createRevoluteJoint(bCha3, bFusa, cX, cY+180, -30, +30);
	}

	// Update
	window.setInterval(update, 1000 / 50);
	function update(){

		// Box2dManager
		b2dManager.update();
	};

	// Random
	// window.setInterval(()=>{
	// 	// Create
	// 	let type = b2Body.b2_dynamicBody;
	// 	let body = b2dManager.createBody(type, 240, 20, 5, 5);
	// 	let vX   = 0.1;
	// 	let vec = new b2Vec2(-0.1, 0.0);
	// 	let pos = new b2Vec2(body.GetPosition().x, body.GetPosition().y);
	// 	body.ApplyImpulse(vec, pos);
	// }, 1000 * 1);
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