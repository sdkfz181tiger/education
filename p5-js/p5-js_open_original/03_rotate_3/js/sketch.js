"use strict";
//==========
// p5.js

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, radius, offset;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noFill();
	stroke(255);
	strokeWeight(1);

	cX = width / 2;
	cY = height / 2;
	radius = 10;
	offset = 0;
}

function draw(){
	background(33);

	offset += 4;
	if(360 < offset) offset = 0;

	for(let i=0; i<360; i+=60){
		push();
		translate(cX, cY);
		rotate(i);
		for(let j=0; j<360; j+=5){
			let x = j * 0.2;
			let y = radius * cos(j+offset);
			circle(x, y, 1);
		}
		pop();
	}
}