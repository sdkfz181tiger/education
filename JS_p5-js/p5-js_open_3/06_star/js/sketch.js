//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(8);
	background(33);
	stroke(255);
	noFill();
}

function draw(){

	noStroke();
	fill(33, 33, 33, 33);
	rect(0, 0, width, height);

	let x = random(width);
	let y = random(height);
	let r = random(30, 90);
	let n = floor(random(5))*2+4;
	stroke(getColor());
	drawStar(x, y, r, n);
}

function drawStar(cX, cY, r, n){

	beginShape();
	let deg = 360 / n;
	for(let i=0; i<n; i++){
		let rad = r;
		if(i%2 == 0) rad = r * 0.5;
		let x = cX + cos(i*deg) * rad;
		let y = cY + sin(i*deg) * rad;
		vertex(x, y);
		line(cX, cY, x, y);
	}
	endShape(CLOSE);
}

function getColor(){
	let i = floor(random(palette.length));
	let c = palette[i];
	return c;
}
