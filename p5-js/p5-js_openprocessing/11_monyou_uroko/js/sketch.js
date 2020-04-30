"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);
}

function draw(){
	background(30);

	let w = 60;
	let h = w * sin(60);
	let cols = windowWidth / w;
	let rows = windowHeight / h;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x1 = w * c;
			let y1 = h * r;
			let x2 = x1 + w;
			let y2 = y1;
			let x3 = x1 + w / 2;
			let y3 = y1 + h;
			noStroke();
			fill(230, 100, 100);
			triangle(x1, y1, x2, y2, x3, y3);
		}
	}
}