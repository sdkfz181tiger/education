"use strict";
//==========
// p5.js

let gpx;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	
	gpx = new MyGraphics(33, 255, 40);
}

function draw(){

	gpx.draw();
}

class MyGraphics{

	constructor(bgColor, stColor, pad){
		this._g = createGraphics(width, height);
		this._g.rectMode(CENTER);
		this._g.background(bgColor);
		this._g.stroke(stColor);
		this._g.noFill();
		this._pad = pad;
		this.init();
	}

	init(){

		let tH = floor(width / this._pad);
		let tV = floor(height / this._pad);
		let max = tH * tV;
		for(let i=0; i<500; i++){
			let p = floor(random(0, max));
			let x = (p % tH) * this._pad + this._pad/2; 
			let y = floor(p / tH) * this._pad + this._pad/2;
			let s = int(random(4)+1) * 5;
			let a = int(random(2)) * Math.PI/4;
			this._g.push();
			this._g.translate(x, y);
			this._g.rotate(a);
			this._g.rect(0, 0, s, s);
			this._g.pop();
		}
	}

	draw(){
		image(this._g, 0, 0);
	}
}