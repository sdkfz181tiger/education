
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

	// Stroke
	stroke(255);
}

function draw(){
	console.log("draw");

	var total   = 25;
	var cols    = 5;
	var padding = 50;
	var size    = 10;
	for(var i=0; i<total; i++){
		// Ellipse
		var x = padding * (i % cols);
		var y = padding * Math.floor(i / cols);
		ellipse(x, y, size, size);
	}
}