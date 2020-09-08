"use strict";
//==========
// p5.js

const size = 16;
let dir = 0;
let posX = 0;
let posY = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	colorMode(HSB);
	angleMode(DEGREES);
	//blendMode(ADD);

	background(180);
	noStroke();
	fill(33);

	dir = floor(random(0, 4)) * 90;
	posX = width / 2;
	posY = height / 2;
}

function draw(){

	fill(random(360), 50, 100);
	square(posX, posY, size);

	dir += floor(random(-1, 2)) * 90;
	posX += size * cos(dir);
	posY += size * sin(dir);
	if(posX < 0 || width < posX) posX = width / 2;
	if(posY < 0 || height < posY) posY = height / 2;
}