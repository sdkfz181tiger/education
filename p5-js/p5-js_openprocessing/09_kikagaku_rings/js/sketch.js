"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	colorMode(RGB);
}

function draw(){
	background(33);

	let size = 100;

	let colors = [
		color(68, 100, 173),
		color(164, 176, 245),
		color(245, 143, 41),
		color(125, 70, 0),
		color(70, 105, 149)
	];

	noStroke();
	noFill();

	let cols = windowWidth / size;
	let rows = windowHeight / size;
	for(let r=0; r<rows*2; r++){
		for(let c=0; c<cols; c++){
			let x = size * c;
			let y = (size * r) / 2;
			if(r % 2 == 0) x += size / 2;
			let i = floor(random(colors.length));
			strokeWeight(3);
			stroke(colors[i]);
			//fill(colors[i]);
			circle(x, y, size);
		}
	}
}