"use strict";
//==========
// p5.js

const DEG_TO_RAD = Math.PI / 180;

const DISP_W = 480;
const DISP_H = 320;

const HUES = [0, 30, 60, 90, 120, 150, 180, 220];

function setup(){
	createCanvas(DISP_W, DISP_H);
	//frameRate(32);
	colorMode(HSB);
	background(0, 33, 33);

	let numA = width;
	let numB = 125;

	let size = numB;

	let posX = 0;
	let posY = 0;

	noStroke();
	fill(100, 33, 33);
	rect(posX, posY, numA, numB);

	let i = 0;
	let cnt = 0;
	while(size > 0){
		cnt++;
		if(cnt%2 != 0){
			while(posX + size <= numA){
				drawRect(posX, posY, size, size, i);
				posX += size;
				i++;
			}
			size = numA - posX;
		}else{
			while(posY + size <= numB){
				drawRect(posX, posY, size, size, i);
				posY += size;
				i++;
			}
			size = numB - posY;
		}
	}
}

function drawRect(x, y, w, h, i){
	let hue = HUES[i % HUES.length];
	fill(hue, 66, 99);
	rect(x, y, w, h);
}