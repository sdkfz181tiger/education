"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);
	//blendMode(ADD);

	background(180);
	noStroke();
	fill(33);
}

function draw(){

	stroke(200, 100, 50);
	strokeWeight(1);
	noFill();

	for(let x=0; x<width; x+=0.2){
		let y = height / 2 + randomGaussian() * 60;
		line(x, height/2, x, y)
	}
}