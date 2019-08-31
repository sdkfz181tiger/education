
function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(200);

	// FrameRate
	frameRate(1);

	// NoStroke
	noStroke();
}

function draw(){
	console.log("draw");

	background(200);

	var rows = 6;
	var cols = 6;
	var size = Math.floor(random(10, 30));
	var padding = 2;
	for(var r=0; r<rows; r++){
		for(var c=0; c<cols; c++){
			var x = c * (size + padding);
			var y = r * (size + padding);
			rect(x, y, size, size);
		}
	}
}