"use strict";

let chains = [];

function setup(){
	let canvas = createCanvas(windowWidth, windowHeight).canvas;
	frameRate(16);
	colorMode(HSB);
	angleMode(DEGREES);
	background(33);
	fill(255);
	noStroke();
	const cX = width / 2;
	const cY = height / 2;
	const p = 40;
	const total = width / p;
	const size = p / 2;
	const len = (height*2)/(size*cos(45)*2)-1;
	for(let c=0; c<total; c++){
		let x = p * c;
		let y = (c%2==0)?0:p/2;
		let r = random(5, 10) * 0.1;
		let chain =	new Chain(x, y, size*r, len);
		chains.push(chain);
	}
	// Initialize
	// canvas, isRecording, firstFrame, lastFrame, frameRate
	initGIF(canvas, true, 32, 64, 16);
}

function draw(){
	background(200, 100, 33);
	for(let chain of chains) chain.draw();
	recordGIF();// Record!!
}

class Chain{

	constructor(x, y, size, len){
		this._x = x;
		this._y = y;
		this._size = size;
		this._len = len;
		this._o = floor(random(len));
	}

	draw(){
		for(let l=0; l<this._len; l++){
			let b = 100 - 5 * (this._o-l);
			if(this._o < l || b < 33) b = 33;
			let d = this._size * l;
			fill(200, 60, b);
			push();
			translate(this._x, this._y);
			rotate(45);
			square(d, d, this._size);
			pop();
		}
		this._o++;
		if(this._len <= this._o) this._o = 0;
	}
}