"use strict";
//==========
// p5.js

const PALETTE = ["#F2545B", "#A93F55", "#19323C", "#F3F7F0", "#8C5E58"];
const RAD = 32;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
}

function draw(){
	background(33);
	noFill();
	stroke(255);
	strokeWeight(2);

	let padX = RAD*cos(30)*2;
	let padY = RAD*sin(30)*3;
	let rows = height / padY + 1;
	let cols = width / padX + 1;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			if(r%2==0){
				drawKikko(c*padX, r*padY, RAD);
				drawKikko(c*padX, r*padY, RAD*0.8);
			}else{
				drawKikko(c*padX+padX/2, r*padY, RAD);
				drawKikko(c*padX+padX/2, r*padY, RAD*0.8);
			}
		}
	}
}

function drawKikko(x, y, size){
	changeColor();
	beginShape();
	let p = 360 / 6;
	for(let i=0; i<p; i++){
		let pX = x + cos(i*p-90)*size;
		let pY = y + sin(i*p-90)*size;
		vertex(pX, pY);
	}
	endShape();
}

function changeColor(){
	let i = floor(random(PALETTE.length));
	fill(PALETTE[i]);
}