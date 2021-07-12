
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

	// Sprites
	for(let i=0; i<10; i++){

		let x = random(width);
		let y = random(height);
		let doku = createSprite(x, y);
		doku.addAnimation("dance", anDoku);

		doku.onMousePressed = (e)=>{
			console.log("MousePressed!!");
			e.remove();
		}
	}
}

function draw(){
	background(33);
	drawSprites();
}