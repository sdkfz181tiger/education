"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(1);
	colorMode(RGB);
	noFill();
	stroke(200);
	strokeWeight(20);
	strokeCap(PROJECT);
}

function draw(){
	background(50);

	let size = 30;
	let rows = floor(height / size) + 5;
	let cols = floor(width / size) + 5;
	let sX = width  / 2 - cols * size / 2;
	let sY = height / 2 - rows * size / 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = sX + c * size;
			let y = sY + r * size;
			let h = map(r*cols+c, 0, rows*cols, 255, 50);
			stroke(h);
			if(parseInt(random(0, 2)) == 0){
				line(x, y, x+size, y+size);
			}else{
				line(x+size, y, x, y+size);
			}
		}
	}
}