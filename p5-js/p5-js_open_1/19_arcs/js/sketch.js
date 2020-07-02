"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);
	//blendMode(ADD);

	background(200);
	stroke(33);
	strokeWeight(3);
	noFill();
}

function draw(){

	let s = 60;
	let rows = height / s + 2;
	let cols = width / s + 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = s * c;
			let y = s * r;
			let d = 90 * floor(random(4));
			arc(x, y, s, s, d, d+270);
		}
	}
}