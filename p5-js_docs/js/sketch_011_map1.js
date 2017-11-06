
function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(0);

	// Rectmode
	rectMode(CENTER);

	// Frame
	frameRate(16);

	// Stroke, Fill
	stroke(255);
	noFill();
}

function draw(){
	console.log("draw");

	var r = map(mouseX, 0, width,  0, 255);
    var g = map(mouseY, 0, height, 0, 255);
    var b = map(mouseX + mouseY, 0, width + height, 255, 0);

	background(r, g, b);
}