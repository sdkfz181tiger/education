
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

	// Speed
	doku = createSprite(width/2, height/2);
	doku.addAnimation("dance", anDoku);
	doku.setSpeed(5, 0);
}

function draw(){
	background(33);
	drawSprites();

	if(width < doku.position.x){
		doku.position.x = 0;
	}

	if(doku.position.x < 0){
		doku.position.x = width;
	}

	if(height < doku.position.y){
		doku.position.y = 0;
	}

	if(doku.position.y < 0){
		doku.position.y = height;
	}
}