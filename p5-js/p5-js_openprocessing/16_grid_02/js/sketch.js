"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	colorMode(RGB);
	noFill();
	stroke(200);
	strokeWeight(1);
	strokeCap(PROJECT);
}

function draw(){
	background(50);

	let pad = 60;
	let rows = floor(height / pad) + 5;
	let cols = floor(width / pad) + 5;
	let sX = width  / 2 - cols * pad / 2;
	let sY = height / 2 - rows * pad / 2;
	let size = max(10, map(mouseY, 0, height, 0, pad));
	let shake = parseInt(map(mouseX, 0, width, -10, 10));
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let rX = parseInt(shake/2 - random(0, shake));
			let rY = parseInt(shake/2 - random(0, shake));
			let x = sX + c * pad + rX;
			let y = sY + r * pad + rY;
			circle(x, y, size);
		}
	}
}