"use strict";
//==========
// p5.js

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, radius;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	noLoop();
	noFill();
	stroke(255);
	strokeWeight(0.5);

	cX = width / 2;
	cY = height / 2;
	radius = 10;
}

function draw(){
	background(33);

	let size = 5;
	for(let i=0; i<360; i+=30){
		push();
		translate(cX, cY);
		console.log(i);
		rotate(i);
		for(let j=0; j<10; j++){
			let x = size * j;
			let y = 0;
			let s = random(2, 5);
			square(x, y, s);
		}
		pop();
	}
}