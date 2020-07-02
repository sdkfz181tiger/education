"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);
}

function draw(){
	background(200);

	smile();
	// pacman(200, 200);
	// enemy(400, 200, 255, 55, 55);
	// enemy(620, 200, 55, 155, 255);
	// enemy(840, 200, 255, 155, 55);
	// enemy(1060, 200, 255, 55, 220);
}

function smile(){
	fill(255, 255, 5);
	noStroke();

	let cX = windowWidth / 2;
	let cY = windowHeight / 2;
	circle(cX, cY, 300, 300);

	fill(0, 0, 0);
	circle(cX - 50, cY - 40, 40, 40);
	circle(cX + 50, cY - 40, 40, 40);

	noFill();
	stroke(0, 0, 0);
	strokeWeight(20);
	arc(cX, cY + 20, 200, 100, 20, 160);
}

function pacman(x, y){

	fill(255, 255, 5);
	noStroke();
	arc(x, y, 200, 200, 30, 330);
}

function enemy(x, y, r, g, b){

	fill(r, g, b);
	noStroke();
	arc(x, y, 200, 200, 180, 360);
	rect(x-100, y, 200, 60);

	let fY = y + 60;
	triangle(x-100, fY, x-100, fY+40, x-50, fY);
	triangle(x-50,  fY, x,     fY+40, x+50, fY);
	triangle(x+100, fY, x+100, fY+40, x+50, fY);

	fill(255);
	ellipse(x-50, y-30, 60, 70);

	fill(0);
	circle(x-65, y-30, 30);

	fill(255);
	ellipse(x+35, y-30, 60, 70);

	fill(0);
	circle(x+20, y-30, 30);
}

