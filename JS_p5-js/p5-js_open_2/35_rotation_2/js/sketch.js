"use strict";
//==========
// p5.js
// Original code link:
// ***

let a = 0;
let b = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	angleMode(DEGREES);
	rectMode(CENTER);
	background(33);
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;

	// 1
	noFill();
	stroke(33, 255, 33);
	strokeWeight(8);

	push();
	translate(cX, cY);
	rotate(a);
	arc(0, 0, 200, 200, 0, 70);
	pop();
	a += 4;

	// 2
	noFill();
	stroke(255, 255, 33);
	strokeWeight(8);

	push();
	translate(cX, cY);
	rotate(b);
	arc(0, 0, 160, 160, 0, 45);
	pop();
	b -= 4;
}
