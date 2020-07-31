"use strict";
//==========
// p5.js

const d = 16;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){

	background(0);
	angleMode(DEGREES);

	let pX = width / 2;
	let pY = height / 2;

	push();
	translate(pX, pY);
	drawTriangle(0, 90);
	pop();
}

function drawTriangle(from, to){

	if((from==0&&to==90)||(from==270&&to==180)){
		triangle(-d,-d,d,d,-d,d);
	}
}