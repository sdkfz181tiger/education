"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	blendMode(MULTIPLY);
	noLoop();
}

function draw(){

	background(255);

	for(let i=0; i<10; i++){
		let pX = random(0.3, 0.7) * width;
		let pY = random(0.3, 0.7) * height;
		let pS = random(0.2, 0.4) * height;
		drawDiamond(pX, pY, pS);
	}
}

function drawDiamond(x, y, s){

	fill(33);
	noStroke();
	strokeWeight();
	circle(x, y, 4);

	let rdmA = random(10);

	if(rdmA < 6){
		fill(getColor());
		noStroke();
		strokeWeight(0);
	}else{
		noFill();
		stroke(getColor());
		strokeWeight(4);
	}

	let rdmB = random(10);

	if(rdmB < 4){
		triangle(x-s/2, y, x+s/2, y, x, y-s);
	}else if(rdmB < 7){
		triangle(x-s/2, y, x+s/2, y, x, y+s);
	}else{
		triangle(x-s/2, y, x+s/2, y, x, y-s);
		triangle(x-s/2, y, x+s/2, y, x, y+s);
	}
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

