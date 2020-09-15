//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const rad = 20;
let cX, cY, total, t;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(33);
	noFill();
	stroke(255);

	cX = width / 2;
	cY = height / 2;
	total = width / rad;
	t = 0;
}

function draw(){
	background(33);

	// noStroke();
	// fill(33, 33, 33, 66);
	// rect(0, 0, width, height);

	stroke(255);
	strokeWeight(0.5);
	noFill();

	drawPtn(cX, cY);
}

function drawPtn(pX, pY){

	push();
	translate(pX, pY);
	for(let i=0; i<total; i++){
		let x = i * rad;
		circle(x, 0, 4);
	}
	pop();
}