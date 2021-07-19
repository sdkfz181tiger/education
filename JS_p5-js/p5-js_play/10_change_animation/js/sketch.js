
const DIR = "./assets/";

let ssDoku, anDoku;
let dokus;
let target = null;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(50);
	background(33);

	dokus = new Group();

	for(let i=0; i<6; i++){

		let x = random(width);
		let y = random(height);
		let doku = createSprite(x, y);
		doku.addAnimation("ukiuki", anDoku);
		doku.animation.stop();
		dokus.push(doku);

		doku.onMouseOver = (e)=>{
			e.animation.play();
		}

		doku.onMouseOut = (e)=>{
			e.animation.stop();
			e.animation.goToFrame(0);
		}
	}
}

function draw(){
	background(33);
	drawSprites();
}