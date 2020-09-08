"use strict";
//==========
// p5.js

// Rose
// Coding Challenge
// 	https://www.youtube.com/watch?v=f5QBExMNB1I
// Wiki
// 	https://en.wikipedia.org/wiki/Rose_(mathematics)

const PALETTE = ["#F2545B", "#A93F55", "#19323C", "#F3F7F0", "#8C5E58"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
}

function draw(){
	background(33);
	noFill();
	noStroke();

	let pad  = 64;
	let rows = height / pad + 1;
	let cols = width / pad + 1;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			changeColor();
			drawRose(c*pad, r*pad, 24, 4);
		}
	}
}

function drawRose(cX, cY, size, k){
	beginShape();
	for(let i=0; i<360; i+=3){
		let x = cX + size * cos(i) * cos(i*k);
		let y = cY + size * sin(i) * cos(i*k);
		vertex(x, y);
	}
	endShape(CLOSE);
}

function changeColor(){
	let i = floor(random(PALETTE.length));
	fill(PALETTE[i]);
}