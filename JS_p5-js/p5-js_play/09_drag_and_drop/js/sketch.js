
const DIR = "./assets/";

let ssDoku, anDoku;
let doku;
let target = null;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(32);
	background(33);

	doku = createSprite(width/2, height/2);
	doku.addAnimation("ukiuki", anDoku);

	doku.onMousePressed = (e)=>{
		target = e;
	}

	doku.onMouseReleased = (e)=>{
		target = null;
	}
}

function draw(){
	background(33);

	if(target != null){
		target.position.x = mouseX;
		target.position.y = mouseY;
	}

	drawSprites();
}