/******************
Code by Shimeji Ozaki
Original code link:
https://www.openprocessing.org/
******************/

"use strict";
//==========
// p5.js

let size = 24;
let nScale = 0.12;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	background(33);

	noFill();
	strokeWeight(1);
	stroke(150);
}

function draw(){
	background(33);

	let rows = height / size;
	let cols = width / size;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let cX = c * size;
			let cY = r * size;
			let n = noise(c*nScale, r*nScale);
			circle(cX, cY, size*(1.0+n));
		}
	}
}
