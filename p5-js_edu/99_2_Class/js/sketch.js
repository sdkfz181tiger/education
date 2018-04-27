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
	frameRate(8);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Dots
	for(let i=0; i<10; i++){
		let x = random(10, width-10);
		let y = random(10, height-10);
		let size = random(10, 30);
		let dot = new Dot(x, y, size);
		dots.push(dot);
	}
}

function draw(){
	console.log("draw");

	// Dots
	for(let i=0; i<dots.length; i++){
		dots[i].draw();
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

class Dot{

	constructor(x, y, size){
		this._x     = x;
		this._y     = y;
		this._size  = size;
		this._r = random(33, 255);
		this._g = random(33, 255);
		this._b = random(33, 255);
	}

	draw(){
		noStroke();
		fill(this._r, this._g, this._b);
		ellipse(this._x, this._y, this._size, this._size);
	}
}
