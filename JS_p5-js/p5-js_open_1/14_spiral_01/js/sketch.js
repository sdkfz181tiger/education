"use strict";
//==========
// p5.js

const step = 3.14 * 2 * 0.02;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);

	background(33);
	let num = (width>height)?width:height;
	createGrid(0, 0, num, 3);
}

function rad(t){
	//return t * 5;// アルキメデス螺旋
	return pow(1.1, t);// 対数螺旋
}

function createGrid(pX, pY, d, g){
	let s = d / g;
	for(let x=0; x<d; x+=s){
		for(let y=0; y<d; y+=s){
			let r = parseInt(random(1, 4));
			if(r == 1 || s < 120){
				drawSpiral(pX+x, pY+y, s);
			}else{
				createGrid(pX+x, pY+y, s, r);
			}
		}
	}
}

function drawSpiral(x, y, size){
	// Prizm
	let bg = createGraphics(size, size);
	bg.colorMode(HSB);
	bg.stroke(0, 100, 100);
	bg.strokeWeight(2);
	bg.noFill();
	bg.translate(size/2, size/2);
	let t = 0;
	while(rad(t) < size/2){
		let fromX = rad(t) * cos(t);
		let fromY = rad(t) * sin(t);
		let toX = rad(t+step) * cos(t+step);
		let toY = rad(t+step) * sin(t+step);
		let h = floor(map(rad(t), 0, size/2, 0, 360));
		bg.stroke(h, 100, 100);
		bg.line(fromX, fromY, toX, toY);
		t += step;
	}
	image(bg, x, y);
}
