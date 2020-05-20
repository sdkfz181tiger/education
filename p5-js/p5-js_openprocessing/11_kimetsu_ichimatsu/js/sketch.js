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
	background(33);

	fill(0, 210, 210);
	noStroke();

	let size = 60;
	let cols = windowWidth / size;
	let rows = windowHeight / size;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = size * c;
			let y = size * r;
			if(r % 2 == 0){
				if(c % 2 == 0){
					rect(x, y, size, size);
				}
			}else{
				if(c % 2 != 0){
					rect(x, y, size, size);
				}
			}
		}
	}
}