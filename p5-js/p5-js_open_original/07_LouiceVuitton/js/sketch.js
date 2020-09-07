//==========
// p5.js

const palette  = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();

	noFill();
	stroke(255)
	strokeWeight(1);
}

function draw(){
	background(33);

	drawFlower(300, 100, 80);
	drawDiamond(100, 100, 50);
	drawStar(100, 100, 50);
}

function drawFlower(cX, cY, size){
	circle(cX, cY, size);
	circle(cX-size/5, cY, size/3);
	circle(cX+size/5, cY, size/3);
	circle(cX, cY-size/5, size/3);
	circle(cX, cY+size/5, size/3);
	circle(cX, cY, size/4);
}

function drawStar(cX, cY, size){
	ellipse(cX+size/4, cY, size/2, size/5);
	ellipse(cX-size/4, cY, size/2, size/5);
	ellipse(cX, cY+size/4, size/5, size/2);
	ellipse(cX, cY-size/4, size/5, size/2);
	fill(33);
	circle(cX, cY, size/8);
}

function drawDiamond(cX, cY, size){
	push();
	translate(cX, cY);
	beginShape();
	for(let i=0; i<360; i+=3){
		let x = size * pow(cos(i), 3);
		let y = size * pow(sin(i), 3);
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}

function drawRose(cX, cY, size, k){
	beginShape();
	for(let i=0; i<360; i+=3){
		let x = cX + size * cos(i) * cos(i*k);
		let y = cY + size * sin(i) * cos(i*k);
		vertex(x, y);
	}
	endShape(CLOSE);
}