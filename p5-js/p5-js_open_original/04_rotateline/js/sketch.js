"use strict";
//==========
// p5.js

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, radius;
let angles = [0, 90, 180, 270];
let speed = 1;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(16);
	noFill();
	noStroke();

	cX = width / 2;
	cY = height / 2;
	radius = width / 3;
}

function draw(){
	background(33);

	let padY = height / 10;
	for(let i=0; i<angles.length; i++){
		for(let j=0; j<10; j++){
			stroke(colors[j%colors.length]);
			let seq = angles[i] - j*0.5;
			let rad = cos(seq/2) * radius;
			let x = cX+cos(seq*speed*5)*rad;
			let y = cY+sin(seq*speed)*(height/2-padY*2);
			//circle(x, y, 2);
			line(cX, padY, x, y);
			line(cX, height-padY, x, y);
		}
		angles[i] += 1;
		//if(360 < angles[i]) angles[i] -= 360;
	}
}