//==========
// p5.js

const palette = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

let d = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(16);
	background(33);
	noStroke();
	fill(255);
}

function draw(){
	background(33);

	// noStroke();
	// fill(33, 33, 33, 66);
	// rect(0, 0, width, height);

	d += 0.5;

	let size = 60;
	let rows = height / size + 1;
	let cols = width / size + 1;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size;
			let i = floor((r+c) % palette.length);
			fill(color(palette[i]));
			drawWindmill(x, y, size*sin(d*c), d);
			//drawHeart(x, y, 2, d);
		}
	}
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

function getColor(){
	let i = floor(random(palette.length));
	return color(palette[i]);
}