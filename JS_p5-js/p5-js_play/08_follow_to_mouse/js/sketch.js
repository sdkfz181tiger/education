
const DIR = "./assets/";

let ssDoku, anDoku;
let doku;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(16);
	background(33);

	doku = createSprite(width/2, height/2);
	doku.addAnimation("ukiuki", anDoku);
}

function draw(){
	background(33);
	drawSprites();

	doku.attractionPoint(5, mouseX, mouseY);
	doku.maxSpeed = 10;

	if(mouseX < doku.position.x){
		doku.mirrorY(-1);
	}
}