"use strict";
//==========
// p5.js

const size = 8;
let cX, cY, num;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	background(33);
	rectMode(CENTER);
	angleMode(DEGREES);
	colorMode(HSB);
	noStroke();

	cX = width / 2;
	cY = height / 2;
	num = 0;
}

function draw(){

	fill(100, 100, 100);
	const max = 30;

	for(let o=1; o<max; o++){
		let x = cX - size * o;
		let y = cY - size  * o;
		let h = 360 * o / max;
		fill(h, 100, 100);
		for(let i=0; i<4; i++){
			let angle = 90 * i;
			for(let j=0; j<o*2; j++){
				x += size * cos(angle);
				y += size * sin(angle);
				rect(x, y, size*0.9);
			}
		}
	}
}
