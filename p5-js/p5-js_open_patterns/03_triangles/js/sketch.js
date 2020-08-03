"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	
	let colors = [];
	colors.push(color(22, 105, 122));
	colors.push(color(72, 159, 181));
	colors.push(color(130, 192, 204));
	colors.push(color(237, 231, 227));
	colors.push(color(255, 166, 43));

	background(33);
	angleMode(DEGREES);
	rectMode(CENTER);

	let d = 64;
	let rows = height / d;
	let cols = width / d;
	let sX = width / 2 - (cols * d) / 2;
	let sY = height / 2 - (rows * d) / 2;

	noStroke();

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let pX = sX + c * d;
			let pY = sY + r * d;
			let index = floor(random(colors.length));
			fill(colors[index]);
			push();
			translate(pX, pY);
			let rdm = floor(random(4));
			rotate(rdm * 90);
			triangle(-d/2, -d/2, d-d/2, -d/2, -d/2, d-d/2);
			pop();
		}
	}
}
