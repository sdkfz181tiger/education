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
	fill(255);
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;
	let a = width * 0.4;
	let b = height * 0.3;
	let pad = height * 0.15;

	push();
	translate(cX, cY);
	rotate(-20);

	for(let i=0; i<360; i+=4){
		let x = a * cos(i) + random(pad) - pad/2;
		let y = b * sin(i) + random(pad) - pad/2;
		let leafs = 7;
		let size = random(10, 40);
		drawFlower(x, y, leafs, size);
	}

	pop();
}

function drawFlower(cX, cY, leafs, size){

	let palette = getPalette();
	let colorA = palette[0];
	let colorB = palette[1];
	let colorC = palette[2];

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
		let o = i * num;
		let x = sin(o) * cos(i) * size;
		let y = sin(o) * sin(i) * size;
		vertex(x, y);
	}
	endShape(CLOSE);
	pop();
}

function getPalette(){
	let c = floor(random(palette.length));
	return palette[c];
}