"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	//rectMode(CENTER);
	noLoop();
}

function draw(){

	background(255);

	let size = 40;
	let rows = width / size;
	let cols = height / size;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size;
			//circle(x, y, 5);
			let rdm = random(10);
			if(rdm < 5){
				drawPtnA(x, y, size/4);
			}else{
				drawPtnB(x, y, size/4);
			}
		}
	}
}

function drawPtnA(x, y, l){

	noFill();
	stroke(getColor());
	strokeWeight(5);

	circle(x, y, l*2);
}

function drawPtnB(x, y, l){

	noFill();
	stroke(getColor());
	strokeWeight(5);

	line(x - l, y - l, x + l, y + l);
	line(x + l, y - l, x - l, y + l);
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

