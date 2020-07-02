/******************
Code by Shimeji Ozaki
Original code link:
https://www.openprocessing.org/
******************/

"use strict";
//==========
// p5.js

const w = 180;
let r = 0;
let size = 300;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	angleMode(DEGREES);
	blendMode(SCREEN);
	rectMode(CENTER);
	background(0);
	noFill();
	strokeWeight(0.5);
}

function draw(){
	blendMode(BLEND);
	background(0);
	blendMode(SCREEN);

	let cX = width / 2;
	let cY = height / 2;

	//push();
	translate(cX, cY);
	for(let i=0; i<90; i++){
		stroke(w-(i*2),w-(i*3),w-(i*3),w-(i*3));
		rect(0, 0, size);
		rotate(0.5);
		//r += 0.02;
	}
	//pop();
}

