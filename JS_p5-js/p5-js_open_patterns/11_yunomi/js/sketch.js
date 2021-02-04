"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

const kanjis = ["鮪", "鮭", "鰹", "鯵", "鯛"];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
}

function draw(){

	background("#FDE2E4");

	noStroke();
	strokeWeight();

	let size = 64;
	let rows = height / size;
	let cols = width / size;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let pX = c * size;
			let pY = r * size;
			drawKanji(pX, pY, size);
		}
	}
}

function drawKanji(x, y, s){

	fill(getColor());

	let k = floor(random(palette.length));
	let kanji = kanjis[k];
	textSize(s);
	text(kanji, x, y);
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

