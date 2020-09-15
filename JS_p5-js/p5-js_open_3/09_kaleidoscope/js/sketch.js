//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

let cX, cY;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	noLoop();
	background(33);
	noFill();
	stroke(255);

	cX = width / 2;
	cY = height / 2;
}

function draw(){
	background(33);

	// noStroke();
	// fill(33, 33, 33, 66);
	// rect(0, 0, width, height);

	stroke(255);
	strokeWeight(1);
	noFill();

	//drawKalScope(12);

	
}

function drawKalScope(n){
	let max = 10;
	let pad = 20;
	let pX = 0;
	let pY = 0;
	for(let i=1; i<max; i++){
		let x = i * pad;
		let y = random(-20, 20);
		let w = random(10, 20);
		let d = 360 / n;
		for(let i=0; i<n; i++){
			push();
			translate(cX, cY);
			rotate(i*d);
			line(pX, pY, x, y);
			stroke(getColor());
			circle(x, y, w);
			//drawHeart(x, y, 4)
			pop();
		}
		pX = x;
		pY = y;
	}
}

function drawHeart(x, y, r){
	push();
	translate(x, y);
	beginShape();
	for(let i=0; i<360; i++){
		let x = r*16*pow(sin(i), 3);
		let y = -r*(13*cos(i)-5*cos(i*2)-2*cos(i*3)-cos(i*4));
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}

function getColor(){
	let i = floor(random(palette.length));
	return color(palette[i]);
}