"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	
	let pallets = [];
	pallets.push(color(22, 105, 122));
	pallets.push(color(72, 159, 181));
	pallets.push(color(130, 192, 204));
	pallets.push(color(237, 231, 227));
	pallets.push(color(255, 166, 43));

	background(150);
	noStroke();

	for(let i=0; i<130; i++){
		let rdm = random(pallets.length);
		let index = floor(rdm);
		fill(pallets[index]);

		let rX = random(width);
		let rY = random(height);
		let rS = random(30, 120);
		circle(rX, rY, rS);
	}
}
