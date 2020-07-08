"use strict";
//==========
// p5.js
// Original code link:
// ***

let r = 0;
let s = 50;
let a = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(2);
	angleMode(DEGREES);
	rectMode(CENTER);
	background(33);
}

function draw(){
	//background(33);

	let cX = width / 2 + a;
	let cY = height / 2 + a;

	noFill();
	stroke(33, 255, 33);
	strokeWeight(2);

	//push();
	translate(cX, cY);
	rotate(r);
	square(0, 0, s);
	//pop();

	r += 5;
	s += 5;
	a += 2;
}
