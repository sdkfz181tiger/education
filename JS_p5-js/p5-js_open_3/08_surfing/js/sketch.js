//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const rad = 20;
let cX, cY, rows, cols, t;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	background(33);
	noFill();
	stroke(255);

	cX = width / 2;
	cY = height / 2;
	rows = height / rad;
	cols = width / rad;
	t = 0;
}

function draw(){
	background(33);

	// noStroke();
	// fill(33, 33, 33, 66);
	// rect(0, 0, width, height);

	t += 3;

	stroke(255);
	strokeWeight(0.5);
	noFill();

	push();
	translate(cX, cY);
	rotate(t/80);
	for(let i=0; i<rows; i++){
		let x = cols * rad/-2;
		let y = rows * rad/-2 + i*rad;
		drawWave(x, y);
	}
	pop();
}

function drawWave(wX, wY){

	for(let i=0; i<cols; i++){
		let r = i * rad;
		let x = wX + r;
		let y = wY + sin(r+t) * rad;
		//circle(x, y, 4);
		square(x, y, 4);
	}
}