//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

let sprTanu;

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Sprite
	sprTanu = createSprite(240, 160, 32, 32);
	let imgTanu = loadImage("assets/tanuki.png");
	sprTanu.addImage(imgTanu);
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	drawSprites();
}

function keyPressed(){
	console.log("keyPressed:", keyCode);

	if(keyCode == 37){
		sprTanu.setSpeed(1, 180);
	}

	if(keyCode == 39){
		sprTanu.setSpeed(1, 0);
	}

	if(keyCode == 38){
		sprTanu.setSpeed(1, 270);
	}

	if(keyCode == 40){
		sprTanu.setSpeed(1, 90);
	}
}

function keyReleased(){
	console.log("keyReleased");
	sprTanu.setSpeed(0, 0);
}
