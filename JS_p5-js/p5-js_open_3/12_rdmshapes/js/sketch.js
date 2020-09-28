//==========
// p5.js

const palette = ["#0081A7", "#00AFB9", "#FDFCDC", "#FED9B7", "#F07167"];

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	noLoop();
	background(33);
}

function draw(){
	background(33);

	// noStroke();
	// fill(33, 33, 33, 66);
	// rect(0, 0, width, height);

	let size = 80;
	let rows = height / size + 1;
	let cols = width / size + 1;
	for(let r=0; r<rows*3; r++){
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size;
			drawGrid(x, y, size);
			drawSomething(x, y, size);
		}
	}
}

function drawGrid(x, y, s){

	stroke(99);
	strokeWeight(1);
	noFill(33);
	square(x, y, s);
}

function drawSomething(x, y, s){

	let i = floor(random(palette.length));
	stroke(color(palette[i]));
	strokeWeight(4);
	noFill();

	if(random(10) < 5){
		circle(x, y, s*0.8);
	}else{
		rect(x, y, s*0.8);
	}

	stroke(color(palette[i]));
	if(random(10) < 5){
		circle(x, y, s*random());
	}else{
		rect(x, y, s*random());
	}

	stroke(color(palette[i]));
	if(random(10) < 5){
		circle(x, y, s*random());
	}else{
		rect(x, y, s*random());
	}
}

function drawMaru(x, y, s){
	circle(x, y, s);
	circle(x, y, s*0.6);
	circle(x, y, s*0.2);
}

function getColor(){
	let i = floor(random(palette.length));
	return color(palette[i]);
}

function drawWindmill(x, y, s, d){
	push();
	translate(x, y);
	rotate(d);
	rect(0, 0, s, s/3);
	rect(0, 0, s/3, s);
	pop();
}

function drawHeart(x, y, r, d){
	push();
	translate(x, y);
	rotate(d);
	beginShape();
	for(let i=0; i<360; i+=5){
		let x = r*16*pow(sin(i), 3);
		let y = -r*(13*cos(i)-5*cos(i*2)-2*cos(i*3)-cos(i*4));
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}