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
	for(let l=1; l<max; l++){
		let x = cX - size * l;
		let y = cY - size  * l;
		let h = 360 * l / max;
		fill(h, 100, 100);
		for(let i=0; i<4; i++){
			let angle = 90 * i;
			for(let j=0; j<l*2; j++){
				x += size * cos(angle);
				y += size * sin(angle);
				rect(x, y, size*0.9);
			}
		}
	}
}
