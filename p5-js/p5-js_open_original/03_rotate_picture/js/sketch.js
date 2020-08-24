"use strict";
//==========
// p5.js

let palette = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, size;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
	noStroke();

	cX = width / 2;
	cY = height / 2;
	size = 25;
}

function draw(){
	background(33);

	let rows = height / size;
	let cols = width / size;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			if(r%2==0){
				drawDiamond(c*size*2, r*size, 0);
			}else{
				drawDiamond(c*size*2+size, r*size, 0);
			}
		}
	}
}

function drawDiamond(x, y, rot){

	let aX = x + size * cos(rot+0);
	let aY = y + size * sin(rot+0);
	let bX = x + size * cos(rot+90);
	let bY = y + size * sin(rot+90);
	let cX = x + size * cos(rot+180);
	let cY = y + size * sin(rot+180);
	let dX = x + size * cos(rot+270);
	let dY = y + size * sin(rot+270);

	let a = floor(random(palette.length));
	fill(palette[a]);
	triangle(x, y, aX, aY, bX, bY);

	let b = floor(random(palette.length));
	fill(palette[b]);
	triangle(x, y, bX, bY, cX, cY);

	let c = floor(random(palette.length));
	fill(palette[c]);
	triangle(x, y, cX, cY, dX, dY);

	let d = floor(random(palette.length));
	fill(palette[d]);
	triangle(x, y, dX, dY, aX, aY);
}