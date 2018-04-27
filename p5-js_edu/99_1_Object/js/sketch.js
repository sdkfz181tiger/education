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

let dots = [];

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(1);
	noLoop();
	background(0, 0, 0);
	fill(255, 255, 255);

	// Dots
	for(let i=0; i<10; i++){
		let dot = {
			"x":    random(10, width-10),
			"y":    random(10, height-10),
			"size": random(10, 30),
			"r":    random(33, 255),
			"g":    random(33, 255),
			"b":    random(33, 255)
		};
		dots.push(dot);
	}
}

function draw(){
	console.log("draw");

	background(0, 0, 0);

	// Dots
	for(let i=0; i<dots.length; i++){
		noStroke();
		fill(dots[i].r, dots[i].g, dots[i].b);
		ellipse(dots[i].x, dots[i].y, dots[i].size, dots[i].size);
	}
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
