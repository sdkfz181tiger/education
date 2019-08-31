
const FRAME_RATE  = 16;
const SIZE_CIRCLE = 100;

function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(0);

	// Rectmode
	rectMode(CENTER);

	// Frame
	frameRate(FRAME_RATE);

	// Stroke, Fill
	stroke(255);
	noFill();
}

function draw(){
	console.log("draw");

	background(0);

	// Age, Rate, Size
	var age  = frameCount % Math.floor(FRAME_RATE);
	var rate = age / FRAME_RATE;
	var size = SIZE_CIRCLE * rate;

	// Center
	var centerX = width / 2;
	var centerY = height / 2;

	// Stroke
	stroke(255, 255, 255, lerp(255, 0, rate));

	// Ellipse
	ellipse(centerX, centerY, size, size);
}