"use strict";
//==========
// p5.js
// Original code link:
// ***

let lays = [];

function setup(){
	let canvas = createCanvas(windowWidth, windowHeight).canvas;
	frameRate(16);
	angleMode(DEGREES);

	// Initialize
	// canvas, isRecording, firstFrame, lastFrame, frameRate
	initGIF(canvas, true, 32, 48, 16);

	for(let i=0; i<30; i++){
		lays.push(new Lay());
	}
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;

	stroke(200, 33, 33);
	strokeWeight(16);
	noFill();

	push();
	translate(cX, cY);
	let r = 360 / lays.length;
	for(let lay of lays){
		rotate(r);
		lay.draw();
	}
	pop();
	
	recordGIF();// Record!!
}

class Lay{

	constructor(){
		this._lines = [];
		this._offsetX = 0;
		this._offsetNext = random(10, 50);

		let line = new Line(0, 30);
		this._lines.push(line);
	}

	draw(){
		let limit = (width<height)?height:width;
		for(let i=this._lines.length-1; 0<=i; i--){
			if(limit/2 < this._lines[i].offset){
				splice(i, 1);
				continue;
			}
			this._lines[i].draw();
		}
		
		let last = this._lines.length - 1;
		let line = this._lines[last];
		this._offsetX += line.spd;
		if(this._offsetNext < this._offsetX){
			let line = new Line(0, this._offsetNext);
			this._lines.push(line);
			this._offsetX = 0;
			this._offsetNext = random(10, 50);
		}
	}
}

class Line{

	constructor(offset, len){
		this._o = offset;
		this._l = len;
		this._s = 3;
		this._w = 4;
		this._r = random(100, 255);
	}

	draw(){
		this._o += this._s;
		stroke(this._r, 33, 33);
		strokeWeight(this._w);
		line(this._o, 0, this._o+this._l-10, 0);
	}

	get offset(){
		return this._o;
	}

	get len(){
		return this._l;
	}

	get spd(){
		return this._s;
	}
}