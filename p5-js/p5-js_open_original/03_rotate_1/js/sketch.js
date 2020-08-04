"use strict";
//==========
// p5.js

const d = 16;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){

	background(0);
	angleMode(DEGREES);

	let cX = width / 2;
	let cY = height / 2;
	fill(255);

	let rows = 5;
	let cols = 5;

	push();
	translate(cX, cY);
	rotate(30);
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = -d * cols/2 + c*d;
			let y = -d * rows/2 + r*d;
			arc(x, y, d, d, 0, 90);
		}
	}
	pop();
}
