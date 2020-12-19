"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let SIZE = 50;
let GRIDS = 8;
let deg = 0;

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	//rectMode(CENTER);
	noLoop();
}

function draw(){

	background(33);

	fill(200);
	noStroke();

	drawGraphics();
}

function drawGraphics(){

	push();
	translate(width/2, height/2);
	rotate(30);

	for(let r=0; r<GRIDS; r++){
		for(let c=0; c<GRIDS; c++){
			let pX = c * SIZE - SIZE*GRIDS/2;
			let pY = r * SIZE - SIZE*GRIDS/2;
			drawDots(pX, pY);
		}
	}

	pop();
}

function drawDots(x, y){

	let gri = 3;
	let dia = SIZE / gri * random();
	let pad = SIZE / gri;
	fill(getColor());
	noStroke();
	for(let r=0; r<gri; r++){
		for(let c=0; c<gri; c++){
			let pX = x + c * pad + pad/2;
			let pY = y + r * pad + pad/2;
			circle(pX, pY, dia);
		}
	}
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

