"use strict"
//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W = 240;
const DISP_H = 240;

let ms;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(16);
	colorMode(HSB);

	// MineSweeper
	ms = new MineSweeper(3, 3);
	ms.putBoms(3);
}

function draw(){
	background(33, 33, 33);
}