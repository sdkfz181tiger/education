console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	noLoop();
	background(0, 0, 0);
	fill(255, 255, 255);

	// Ellipse
	noStroke();
	fill(255, 255, 255);
	ellipse(40, 40, 20, 20);
}

function draw(){
	//console.log("draw");
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
