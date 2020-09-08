"use strict";
//==========
// p5.js

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	noLoop();
	noStroke();
}

function draw(){
	background(33);
	let num = (width>height)?width:height;
	createGrid(0, 0, num, 3);
}

function createGrid(x, y, d, g){
	let s = d / g;
	for(let r=0; r<g; r++){
		for(let c=0; c<g; c++){
			let rdm = floor(random(4));
			if(rdm<2 || s<90){
				drawSomething(x+s*c, y+s*r, s);
			}else{
				createGrid(x+s*c, y+s*r, s, rdm);
			}
		}
	}
}

function drawSomething(x, y, s){
	let rdm = floor(random(3));
	if(rdm == 0) drawShapeA(x, y, s);
	if(rdm == 1) drawShapeB(x, y, s);
	if(rdm == 2) drawShapeC(x, y, s);
}

function drawShapeA(x, y, s){
	changeColor();
	square(x, y, s);
}

function drawShapeB(x, y, s){
	changeColor();
	push();
	translate(x+s/2, y+s/2);
	rotate(floor(random(4))*90);
	arc(-s/2, -s/2, s*2, s*2, 0, 90);
	pop();
}

function drawShapeC(x, y, s){
	changeColor();
	push();
	translate(x+s/2, y+s/2);
	rotate(floor(random(4))*90);
	triangle(-s/2, -s/2, -s/2, s/2, s/2, s/2);
	pop();
}

function changeColor(){
	let i = floor(random(colors.length));
	fill(color(colors[i]));
}