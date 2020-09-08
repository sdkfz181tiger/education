"use strict";
//==========
// p5.js

let palette = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, rad, rot;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(16);
	noFill();
	noStroke();

	cX = width / 2;
	cY = height / 2;
	rad = (width<height)?width/3:height/3;
	rot = 0;
}

function draw(){
	background(33);

	let n = 30;
	let p = 360 / n;
	for(let i=0; i<n; i++){
		let pX = cX + rad * cos(rot+p*i);
		let pY = cY + rad * sin(rot+p*i);
		let c = i%palette.length;
		stroke(palette[c]);
		strokeWeight(2);
		circle(pX, pY, 10);
	}

	if(360 < rot) rot -= 360;
	rot += 2;

	if(width/2 < rad && height/2 < rad) rad = 1;
	rad += 2;
}