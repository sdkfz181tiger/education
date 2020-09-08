"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	
	let colors = [];
	colors.push(color(22, 105, 122));
	colors.push(color(72, 159, 181));
	colors.push(color(130, 192, 204));
	colors.push(color(237, 231, 227));
	colors.push(color(255, 166, 43));

	background(33);
	noStroke();

	angleMode(DEGREES);
	rectMode(CENTER);

	let l = colors.length;
	let cX = width / 2;
	let cY = height / 2;

	for(let i=50; 0<=i; i--){
		let index = floor(random(l));
		fill(colors[index]);
		push();
		translate(cX, cY);
		rotate(i * 5);
		square(0, 0, i*5);
		pop();
	}
}
