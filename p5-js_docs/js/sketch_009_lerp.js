
function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(0);

	// Rectmode
	rectMode(CENTER);

	// Frame
	noLoop();
}

function draw(){
	console.log("draw");

	// Lerp
	var a = width / 2 - 100;
	var b = width / 2 + 100;
	var c = lerp(a, b, .2);// Left
	var d = lerp(a, b, .5);// Center
	var e = lerp(a, b, .8);// Right

	var y = height / 2

	strokeWeight(5);
	stroke(200);
	point(a, y);
	point(b, y);

	stroke(100);
	point(c, y);
	point(d, y);
	point(e, y);
}