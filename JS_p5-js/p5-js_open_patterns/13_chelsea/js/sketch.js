"use strict";

const palette = [
	["#CCCC00", "#FFFF99", "#009933"],
	["#99CC99", "#339966", "#009933"],
	["#009933", "#669933", "#009933"],
	["#009966", "#99FFCC", "#009933"]
];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	noLoop();

	background(33);
	noStroke();
	noFill();
}

function draw(){
	background(33);

	for(let i=0; i<10; i++){
		const cX = random(width);
		const cY = random(height);
		const leafs = 7;
		const size = random(20, 80);
		drawFlower(cX, cY, leafs, size);
	}
}

function drawFlower(cX, cY, leafs, size){

	const palette = getPalette();
	const colorA = palette[0];
	const colorB = palette[1];
	const colorC = palette[2];

	let o = 360 / leafs;
	fill(colorA);
	for(let i=0; i<leafs; i++){
		drawLeaf(cX, cY, 2, 90, i*o, size);
	}
	fill(colorB);
	for(let i=0; i<leafs; i++){
		drawLeaf(cX, cY, 4, 45, i*o, size * 0.8);
	}
	fill(colorC);
	circle(cX, cY, size * 0.4);
}

function drawLeaf(cX, cY, num, limit, dir, size){

	push();
	translate(cX, cY);
	rotate(dir - limit/2);
	beginShape();
	for(let i=0; i<limit; i+=2){
		const o = i * num;
		const x = sin(o) * cos(i) * size;
		const y = sin(o) * sin(i) * size;
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}

function getPalette(){
	let c = floor(random(palette.length));
	return palette[c];
}