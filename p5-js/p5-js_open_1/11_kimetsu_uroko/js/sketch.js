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
	background(250, 180, 50);
	
  noStroke();
	fill(255);

	let p = 90;
	let s = 20;
	let cols = windowWidth / p;
	let rows = windowHeight / p;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			drawTriangle(c*p, r*p, s);
		}
	}
}

function drawTriangle(x, y, s){
	let x3 = x + cos(30) * s;
	let y3 = y + sin(30) * s;
	let x2 = x + cos(150) * s;
	let y2 = y + sin(150) * s;
	let x1 = x + cos(270) * s;
	let y1 = y + sin(270) * s;
	triangle(x1, y1, x2, y2, x3, y3);
}