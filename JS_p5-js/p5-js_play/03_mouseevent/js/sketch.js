
const DIR = "./assets/";

let ssDoku, anDoku;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(16);
	background(33);

	let doku = createSprite(width/2, height/2);
	doku.addAnimation("dance", anDoku);

	doku.onMouseOver = (e)=>{
		console.log("MouseOver!!");
		doku.scale = 2.0;
	}

	doku.onMouseOut = (e)=>{
		console.log("MouseOut!!");
		doku.scale = 1.0;
	}

	doku.onMousePressed = (e)=>{
		console.log("MousePressed!!");
		doku.visible = false;
	}

	doku.onMouseReleased = (e)=>{
		console.log("MouseReleased!!");
		doku.visible = true;
	}
}

function draw(){
	background(33);
	drawSprites();
}