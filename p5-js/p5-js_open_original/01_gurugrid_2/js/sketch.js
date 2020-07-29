"use strict";
//==========
// p5.js

const w = 5;
const size = 8;

let x, y = 0;
let angle = 0;
let n = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	background(33);
	rectMode(CENTER);
	angleMode(DEGREES);
	colorMode(HSB);
	noStroke();

	x = width / 2;
	y = height / 2;
}

function draw(){
	//background(33);

	fill(100, 100, 100);

	for(let o=1; o<30; o++){
		for(let i=0; i<2; i++){
			angle += 90;
			for(let j=0; j<o; j++){
				x += size * cos(angle);
				y += size * sin(angle);
				square(x, y, size*0.8);
			}
		}
	}
}
