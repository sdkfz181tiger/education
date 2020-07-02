/******************
Code by Shimeji Ozaki
Original code link:
https://www.openprocessing.org/sketch/880839
******************/

"use strict";
//==========
// p5.js

const VELOCITY = Math.PI / 30;
const INCREASE = 0.1;

let thre = Math.PI * 4;
let cX, cY, radius, angle, dir;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(32);
	background(33);

	stroke(255);
	strokeWeight(1);
	noFill();

	cX = 50;
	cY = height / 2;
	radius = 2;
	angle = 0;
	dir = 1;
}

function draw(){
	let a = angle * dir;
	let pX = cX + radius * cos(a);
	let pY = cY + radius * sin(a);
	
	angle += VELOCITY;
	if(thre < angle){
		thre += Math.PI * 2;
		cX += radius * 2;
		angle = -Math.PI;
		dir *= -1;
	}

	radius += INCREASE;
	a = angle * dir;
	let nX = cX + radius * cos(a);
	let nY = cY + radius * sin(a);
	line(pX, pY, nX, nY);

}