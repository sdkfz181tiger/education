"use strict";
//==========
// p5.js

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let dLines = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(32);
	noFill();
	stroke(255);
	strokeWeight(0.5);

	let x = width / 2;
	let y = height / 2;

	for(let i=0; i<360; i+=10){
		let dLine = new DotLine(x, y, i, width/10, 5);
		dLines.push(dLine);
	}
}

function draw(){
	background(33);

	for(let dLine of dLines) dLine.draw();
}

class DotLine{

	constructor(x, y, r, s, len){
		this._x = x;
		this._y = y;
		this._r = r;
		this._s = s;
		this._len = len;
		this._rot = 0;
		this._arr = [];
		for(let i=0; i<len; i++){
			this._arr.push(s);
		}
	}

	draw(){

		this._rot += 4;
		if(360 < this._rot) this._rot -= 360;
		push();
		translate(this._x, this._y);
		rotate(this._r);
		let pX = this._s;
		let pR = 360 / this._len;
		for(let i=0; i<this._len; i++){
			stroke(colors[i%colors.length]);
			let size = this._arr[i] * sin(this._rot+pR*i); 
			square(pX*i, 0, size);
		}
		pop();
	}
}