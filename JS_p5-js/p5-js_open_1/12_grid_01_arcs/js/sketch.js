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
	background(30);
	noStroke();
	
	let num = (width>height)?width:height;
	createGrid(0, 0, num, 3);
}

function createGrid(pX, pY, d, g){
	let s = d / g;
	for(let x=0; x<d; x+=s){
		for(let y=0; y<d; y+=s){
			let r = parseInt(random(1, 4));
			if(r == 1 || s < 120){
				fill(random(60, 255));
				rect(pX+x, pY+y, s, s);
				drawShape(pX+x, pY+y, s);
			}else{
				createGrid(pX+x, pY+y, s, r);
			}
		}
	}
}

function drawShape(x, y, s){
	noStroke();
	fill(random(255));
	let rdm = floor(random(4));
	for(let i=0; i<rdm; i++){
		x += cos(90*i) * s;
		y += sin(90*i) * s;
	}
	let r = s * 2;
	let d = rdm*90;
	arc(x, y, r, r, d, d+90);
}