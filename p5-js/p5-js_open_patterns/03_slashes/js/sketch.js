"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){

	background(33);

	let d = 32;
	let rows = height / d;
	let cols = width / d;
	let sX = width / 2 - (cols * d) / 2;
	let sY = height / 2 - (rows * d) / 2;

	stroke(200);
	strokeWeight(5);

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let pX = sX + c * d;
			let pY = sY + r * d;
			let rdm = floor(random(2));
			if(rdm == 0){
				line(pX, pY, pX+d, pY+d);
			}else{
				line(pX+d, pY, pX, pY+d);
			}
		}
	}
}
