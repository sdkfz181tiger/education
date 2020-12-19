"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){

	background(33);
	angleMode(DEGREES);
	rectMode(CENTER);

	noFill();
	stroke(255);
	strokeWeight(1);

	let radius = width * 0.4;
	let cX = width / 2;
	let cY = height / 2;

	circle(cX, cY, radius*2);

	let t = 5;
	let p = 360 / t;
	for(let i=0; i<t; i++){

		let aX = cX + radius * cos(i*p);
		let aY = cX + radius * sin(i*p);

		let bX = cX + radius * cos((i+1)*p);
		let bY = cX + radius * sin((i+1)*p);

		line(aX, aY, bX, bY);
	}
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}
