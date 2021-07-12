
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
}

function draw(){
	background(33);
	drawSprites();
}