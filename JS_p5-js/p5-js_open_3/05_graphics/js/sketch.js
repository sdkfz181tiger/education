//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(33);
	stroke(255);
}

function draw(){

	let rows = floor(random(4)) + 2;
	let cols = floor(random(4)) + 2;
	let w = width / cols;
	let h = height / rows;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = w * c;
			let y = h * r;
			drawGraphics(x, y, w, h);
		}
	}
}

function drawGraphics(gX, gY, gW, gH){

	let gpx = createGraphics(gW, gH);
	gpx.background(getColor());

	let rdm = floor(random(7)) + 3;
	for(let i=0; i<rdm; i++){
		let x = random(gpx.width);
		let y = random(gpx.height);
		let w = random(gpx.width);
		gpx.stroke(getColor());
		gpx.strokeWeight(random(7) + 3);
		gpx.fill(getColor());
		gpx.circle(x, y, w);
	}

	image(gpx, gX, gY);
}

function getColor(){
	let i = floor(random(palette.length));
	let c = palette[i];
	return c;
}
