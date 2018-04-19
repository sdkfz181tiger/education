console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(16);
	background(0, 0, 0);
	fill(255, 255, 255);
}

function draw(){
	console.log("draw");
}

function mousePressed(){
	//console.log("mousePressed");
}

function mouseReleased(){
	//console.log("mouseRelased");
}
