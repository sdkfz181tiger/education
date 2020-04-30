"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	colorMode(RGB);
	angleMode(DEGREES);
}

function draw(){
	background(33);

	let size = 100;

	let colors = [
		color(68, 100, 173),
		color(164, 176, 245),
		color(245, 143, 41),
		color(125, 70, 0),
		color(70, 105, 149)
	];

	let cols = windowWidth / size;
	let rows = windowHeight / size;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = size * c;
			let y = size * r;
			if(r % 2 == 0) x += size / 2;
			stroke(33, 33, 33);
			strokeWeight(1);
			noFill();
			circle(x, y, size);
			drawPattern(x, y, size, r);
		}
	}
}

function drawPattern(cX, cY, size, r){
	noStroke();
	fill(random(255), 66, 66);
	arc(cX-size/2, cY, size, size, 0, 90);
	fill(random(255), 66, 66);
	arc(cX+size/2, cY, size, size, 90, 180);
	fill(random(255), 66, 66);
	arc(cX, cY, size, size, 180, 270);
	fill(random(255), 66, 66);
	arc(cX, cY, size, size, 270, 360);
}