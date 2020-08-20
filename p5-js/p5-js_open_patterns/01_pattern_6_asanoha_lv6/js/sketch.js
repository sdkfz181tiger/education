"use strict";
//==========
// p5.js

const PALETTE = ["#25CED1", "#FFFFFF", "#FCEADE", "#FF8A5B", "#EA526F"];
const RAD = 32;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
}

function draw(){
	background(33);
	fill(255);
	noStroke();

	let padX = RAD+RAD*cos(60);
	let padY = RAD*sin(60);
	let oddX = RAD-RAD*cos(60);
	// let rows = height / padY + 1;
	// let cols = width / padX + 1;

	for(let r=0; r<4; r++){
		for(let c=0; c<4; c++){
			if((r+c)%2==0){
				drawTriangle(c*padX, r*padY, 0);
			}else{
				drawTriangle(c*padX+oddX, r*padY, 180);
			}
		}
	}

}

function drawTriangle(x, y, r){

	let aX = x + RAD*cos(r);
	let aY = y + RAD*sin(r);
	let bX = x + RAD*cos(r+120);
	let bY = y + RAD*sin(r+120);
	let cX = x + RAD*cos(r+240);
	let cY = y + RAD*sin(r+240);

	fill(66);
	triangle(aX, aY, bX, bY, cX, cY);
	changeColor();
	triangle(x, y, aX, aY, bX, bY);
	changeColor();
	triangle(x, y, bX, bY, cX, cY);
	changeColor();
	triangle(x, y, cX, cY, aX, aY);
}

function changeColor(){
	let i = floor(random(PALETTE.length));
	noFill();
	stroke(PALETTE[i]);
}