"use strict";
//==========
// p5.js

let img, rate, offX, offY; 
let cX, cY, degree, radius, offset;

function preload(){
	img = loadImage("images/dali_414x512.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(64);
	noStroke();

	background(230);

	rate = height / img.height;
	offX = width/2 - img.width*rate/2;
	//image(img, offX, 0, img.width*rate, img.height*rate);

	cX = width / 2;
	cY = height / 2;
	degree = 0;
	radius = 0;
	offset = 2;
}

function draw(){

	for(let d=0; d<360; d+=30){
		drawLine(degree+d);
	}

	degree += offset;
	if(30 < degree) degree -= 30;

	radius += 0.1;
	let max = (height < width)?width:height;
	if(max/2 < radius) radius -= max/2;
}

function drawLine(deg){

	let fX = cX+radius*cos(deg);
	let fY = cY+radius*sin(deg);
	let tX = cX+radius*cos(deg+offset);
	let tY = cY+radius*sin(deg+offset);

	let pX = (fX-offX)/rate;
	let pY = fY/rate;
	let c = img.get(pX, pY);
	let avg = (c[0] + c[1] + c[2]) / 3;
	if(90 < avg || avg <= 0) return;

	stroke(c);
	strokeWeight(1);
	line(fX, fY, tX, tY);
}
