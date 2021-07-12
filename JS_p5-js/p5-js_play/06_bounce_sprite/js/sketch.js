
const DIR = "./assets/";

let ssDoku, anDoku;
let ssKino, anKino;

let doku, kino;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
	ssKino = loadSpriteSheet(DIR + "s_kino_x5.png", 60, 60, 5);
	anKino = loadAnimation(ssKino);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(16);
	background(33);

	// Sprites
	doku = createSprite(50, height/2);
	doku.addAnimation("dance", anDoku);
	doku.setSpeed(5, 0);

	kino = createSprite(width-50, height/2);
	kino.addAnimation("dance", anKino);
	kino.immovable = true;
}

function draw(){
	background(33);
	drawSprites();

	// Bounce
	doku.bounce(kino);
}