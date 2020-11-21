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

	createTail(C_WIDTH*0.5-60, C_HEIGHT*0.5);
	createTail(C_WIDTH*0.5+60, C_HEIGHT*0.5);

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

	/*
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
	*/

	// Update
	window.setInterval(update, 1000 / 30);
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