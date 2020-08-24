"use strict";
//==========
// p5.js

let palette = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let rot = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	fill(255);
	noStroke();
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;

	let num = 16;
	let pad = 360 / num;
	rot += (360<rot)?-360:1;
	for(let i=0; i<num; i++){
		drawPattern(cX, cY, rot+i*pad, 16);
	}
}

function drawPattern(x, y, rot, size){
	push();
	translate(x, y);
	rotate(rot);
	let num = 10;
	let pad = 360 / num;
	for(let i=0; i<num; i++){
		fill(palette[floor(i%palette.length)]);
		rect(i*size, 20*sin(i*pad-rot*4), size*0.6);
	}
	pop();
}