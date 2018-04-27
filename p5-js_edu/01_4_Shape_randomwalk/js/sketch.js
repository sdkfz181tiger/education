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

let x = 240;
let y = 160;

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(8);
	background(0, 0, 0);
	fill(255, 255, 255);
}

function draw(){
	//console.log("draw");

	background(0, 0, 0);

	// Random
	x += random(-5, 5);
	y += random(-5, 5);

	// Ellipse
	noStroke();
	fill(255, 255, 255);
	ellipse(x, y, 20, 20);
}

function mousePressed(){
	//console.log("mousePressed");
}

function mouseMoved(){
	//console.log("mouseMoved");
}

function mouseReleased(){
	//console.log("mouseRelased");
}
