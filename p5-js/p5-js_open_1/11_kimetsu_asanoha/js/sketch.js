"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);

	stroke(150, 30, 30);
	strokeWeight(3);
	noFill();
}

function draw(){
	background(255, 120, 120);

	let s = 60;
	let pX = cos(30) * s * 2;
	let pY = sin(30) * s + s;
	let rows = floor(height / pY) + 2;
	let cols = floor(width / pX) + 2;
	let sX = width / 2 - cols * pX / 2;
	let sY = height / 2 - rows * pY / 2;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = sX + pX * c;
			let y = sY + pY * r;
			if(r%2!=0) x += pX / 2;
			drawSymbol(x, y, s);
		}
	}
}

function drawSymbol(cX, cY, s){
	// Pentagon
	beginShape();
	let a = 360 / 6;
	for(let i=0; i<6; i++){
		let x = cX + cos(i*a+30) * s;
		let y = cY + sin(i*a+30) * s;
		vertex(x, y);
	}
	endShape(CLOSE);

	// Triangle
	beginShape();
	let b = 360 / 3;
	for(let i=0; i<3; i++){
		let x = cX + cos(i*b-90) * s;
		let y = cY + sin(i*b-90) * s;
		vertex(x, y);
	}
	endShape(CLOSE);

	// Line
	for(let i=0; i<3; i++){
		let x = cX + cos(i*b-90) * s;
		let y = cY + sin(i*b-90) * s;
		line(cX, cY, x, y);
	}
}