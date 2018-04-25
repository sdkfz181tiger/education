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
