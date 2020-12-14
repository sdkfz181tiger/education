"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){

	background(33);
	angleMode(DEGREES);
	rectMode(CENTER);

	let size = 120;
	let rows = height / size;
	let cols = width / size;

	noFill();
	stroke(255);
	strokeWeight(1);

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let pX = c * size;
			let pY = r * size;
			let rot = 45 * floor(random(4));
			drawGraphics(pX, pY, size, rot);
		}
	}
}

function drawGraphics(x, y, s, a){
	let gra = createGraphics(s, s);
	gra.angleMode(DEGREES);
	gra.rectMode(CENTER);

	gra.background(getColor());

	gra.push();
	gra.translate(s/2, s/2);
	gra.rotate(a);
	//gra.circle(0, 0, 10);

	gra.fill(getColor());
	gra.noStroke();
	gra.square(0, s, s*2);

	gra.noFill();
	gra.stroke(getColor());
	gra.strokeWeight(5);
	let p = 10;
	let rows = s / p;
	for(let r=0; r<rows; r++){
		gra.line(-s, r*p, s, r*p);
	}
	gra.pop();

	image(gra, x, y);
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}
