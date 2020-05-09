"use strict";
//==========
// p5.js

let seed = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(32);
	colorMode(RGB);
	angleMode(DEGREES);

	noStroke();
}

function draw(){
	background(33);
	let size = (width>height)?width:height;
	let weight = 5;
	let cX = width / 2;
	let cY = height / 2;
	for(let i=0; i<(size-20)/weight; i++){
		drawGumi(cX, cY, size-(weight*i), i);
	}
	seed += 0.01;
}

function drawGumi(cX, cY, size, n){

	let color = (n%2==0)? 0:255;
	fill(color);

	let step = 360 / 10;
	let points = [];
	for(let p=0; p<360; p+=step) points.push(p);
	beginShape();
	for(let i=0; i<points.length+3; i++){
		let index = (i<points.length)?i:i-points.length;
		let d = points[index];
		let r = size + noise(d, seed) * size * 0.8;
		let x = cX + r * cos(d);
		let y = cY + r * sin(d);
		curveVertex(x, y);
	}
	endShape();
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