
function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(0);

	// Rectmode
	rectMode(CENTER);

	// Only execute the draw function once
	noLoop();

	// No stroke
	noStroke();
}

function draw(){
	console.log("draw");

	// Stroke(RGBA)
	fill(255, 0, 0);
	rect(150, 150, 100, 100);
	rect(300, 150, 100, 100);
	rect(450, 150, 100, 100);

	// row 2: green
	fill(0, 255, 0);
	rect(150, 300, 100, 100);
	rect(300, 300, 100, 100);
	rect(450, 300, 100, 100);

	// row 3: blue
	fill(0, 0, 255);
	rect(150, 450, 100, 100);
	rect(300, 450, 100, 100);
	rect(450, 450, 100, 100);
}