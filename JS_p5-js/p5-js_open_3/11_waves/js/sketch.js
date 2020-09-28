//==========
// p5.js

const palette = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];

let t=d=0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(16);
	background(33);
	stroke(255);
	strokeWeight(7);
	fill(33);
}

function draw(){
	background(33);

	// noStroke();
	// fill(33, 33, 33, 66);
	// rect(0, 0, width, height);

	t += 10;
	d -= sin(t) * 0.4;

	let size = 80;
	let rows = height / size + 1;
	let cols = width / size + 1;
	for(let r=0; r<rows*3; r++){
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size * 0.3;
			let i = floor((r+c) % palette.length);
			stroke(color(palette[i]));
			if(r%2 == 0){
				drawMaru(x+size*0.5, y+d, size);
			}else{
				drawMaru(x, y-d, size);
			}
		}
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