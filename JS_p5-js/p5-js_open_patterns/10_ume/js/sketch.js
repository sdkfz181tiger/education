"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	//blendMode(MULTIPLY);
	noLoop();
}

function draw(){

	background("#FDE2E4");

	for(let i=0; i<20; i++){
		let pX = random(0.2, 0.8) * width;
		let pY = random(0.2, 0.8) * height;
		let pS = random(10, 30);
		drawUme(pX, pY, pS);
	}
}

function drawUme(x, y, s){

	noStroke();
	strokeWeight();
	fill(getColor());
	circle(x, y, s*1.5);

	let pD = 360 / 5;
	for(let i=0; i<5; i++){

		let deg = pD*i;
		let uX = x + cos(deg) * s;
		let uY = y + sin(deg) * s;

		noStroke();
		strokeWeight();
		circle(uX, uY, s*1.5);

		stroke(255);
		strokeWeight(s*0.1);
		line(x, y, uX, uY);
	}

	noStroke();
	strokeWeight();
	circle(x, y, s*0.5);
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

