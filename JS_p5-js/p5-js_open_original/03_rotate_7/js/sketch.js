"use strict";
//==========
// p5.js

let palette = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, rad, rot;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(4);
	noStroke();

	cX = width / 2;
	cY = height / 2;
	rad = (width<height)?height/3:width/3;
}

function draw(){
	background(33);

	for(let i=0; i<palette.length; i++){
		let p = rad / palette.length;
		let r = p * (palette.length - i);
		fill(palette[i]);
		arc(cX, cY, r, r, 0, 90);
	}
}