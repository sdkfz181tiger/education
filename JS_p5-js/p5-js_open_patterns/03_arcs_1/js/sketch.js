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

	background(11);
	angleMode(DEGREES);
	rectMode(CENTER);
	strokeCap(PROJECT);

	let len = colors.length;
	let cX = width / 2;
	let cY = height / 2;

	noStroke();

	for(let k=0; k<100; k++){
		let s = random(1, 3);
		let rX = random(width);
		let rY = random(height);
		fill(255);
		circle(rX, rY, s);
	}

	noFill();

	for(let i=0; i<6; i++){
		let d = i * 60;
		for(let j=45; 0<=j; j--){
			stroke(random(100, 150));
			strokeWeight(1);
			let p = random(10, 15);
			let w = random(10, 45);
			arc(cX, cY, j*p, j*p, d-w/2, d+w/2);
		}
	}

	for(let i=0; i<12; i++){
		let d = i * 30;
		for(let j=15; 0<=j; j--){
			let index = floor(random(len));
			stroke(colors[index]);
			let t = random(1, 2);
			strokeWeight(t);
			let p = random(20, 30);
			let w = random(10, 45);
			arc(cX, cY, j*p, j*p, d-w/2, d+w/2);
		}
	}
}
