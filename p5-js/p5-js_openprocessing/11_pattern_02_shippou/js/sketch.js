"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);
	blendMode(MULTIPLY);
}

function draw(){
	background(200);

	let size = 120;
	let cols = windowWidth / size;
	let rows = windowHeight / size;
	for(let r=0; r<rows*3; r++){
		for(let c=0; c<cols; c++){
			let x = size * c;
			let y = size * r / 2;
			if(r%2 == 0) x += size / 2;
			stroke(100, 100, 200);
			strokeWeight(5);
			fill(130, 130, 230);
			circle(x, y, size);
		}
	}
}