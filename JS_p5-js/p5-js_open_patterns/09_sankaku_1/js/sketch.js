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
	noStroke();

	let size = 100;
	let rows = height / size;
	let cols = width / size;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * size;
			let y = r * size;
			if(r%2 == 0){
				drawDiamond(x, y, size);
			}else{
				drawDiamond(x+size/2, y, size);
			}
		}
	}
}

function drawDiamond(x, y, s){

	fill(getColor());
	triangle(x, y, x+s, y, x+s/2, y-s);
	fill(getColor());
	triangle(x, y, x+s, y, x+s/2, y+s);
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

