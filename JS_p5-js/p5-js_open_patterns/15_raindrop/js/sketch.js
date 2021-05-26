"use strict";

const palette = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	noLoop();

	background(33);
	noStroke();
	strokeWeight(5);
	noFill();
}

function draw(){
	background(33);

	for(let i=0; i<10; i++){
		stroke(getColor());
		let x = random(width);
		let y = random(height);
		let d = random(50, 100);
		circle(x, y, d);
	}
}

function getColor(){
	return random(palette);
}