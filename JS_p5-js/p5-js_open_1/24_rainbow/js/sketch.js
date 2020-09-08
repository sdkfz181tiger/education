/******************
Code by Shimeji Ozaki
Original code link:
https://www.openprocessing.org/
******************/

"use strict";
//==========
// p5.js

let h = 0;
let posX = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(33);
	colorMode(HSB);
}

function draw(){

	stroke(h, 100, 100);
	strokeWeight(5);
	noFill();

	line(posX, 0, posX, height);

	h += 2;
	posX += 5;
}