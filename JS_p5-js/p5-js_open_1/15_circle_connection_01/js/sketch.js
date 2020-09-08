"use strict";
//==========
// p5.js

let cent, tgt;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	colorMode(RGB);

	noFill();
	stroke(255);
	strokeWeight(1);

	// fill(100, 255, 100);
	// noStroke();

	cent = new Circle(width/2, width/2, 100);
	tgt = new Circle(0, 0, 100);
	cent.setTarget(tgt);
}

function draw(){
	background(33);
	cent.draw();
	tgt.draw();
}

function mouseMoved(){
	if(cent == null) return;
	if(tgt == null) return;
	tgt.x = mouseX;
	tgt.y = mouseY;
	cent.connect(tgt);
}

class Circle{

	constructor(x, y, d){
		this._x = x;
		this._y = y;
		this._d = d;
		this._r = d / 2;
		this._tgt = null;
	}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	get x(){return this._x;}
	get y(){return this._y;}
	get d(){return this._d;}
	get r(){return this._r;}

	setTarget(tgt){
		this._tgt = tgt;
	}

	connect(){
		if(this._tgt == null) return;

		let cX = (this._tgt.x + this._x) / 2;
		let cY = (this._tgt.y + this._y) / 2;
		//circle(cX, cY, 4);

		let rad = atan2(this._tgt.y-this._y, this._tgt.x-this._x);
		let pad = Math.PI / 3;

		let radR = rad + pad;
		let rX = this._x + this._r * cos(radR);
		let rY = this._y + this._r * sin(radR);
		//circle(rX, rY, 4);

		let radL = rad - pad;
		let lX = this._x + this._r * cos(radL);
		let lY = this._y + this._r * sin(radL);
		//circle(lX, lY, 4);

		let radT = atan2(this._y-this._tgt.y, this._x-this._tgt.x);

		let radRT = radT + pad;
		let rXT = this._tgt.x + this._tgt.r * cos(radRT);
		let rYT = this._tgt.y + this._tgt.r * sin(radRT);
		//circle(rXT, rYT, 4);

		let radLT = radT - pad;
		let lXT = this._tgt.x + this._tgt.r * cos(radLT);
		let lYT = this._tgt.y + this._tgt.r * sin(radLT);
		//circle(lXT, lYT, 4);

		beginShape();
		vertex(lX, lY);
		bezierVertex(lX, lY, cX, cY, rXT, rYT);
		vertex(lXT, lYT);
		bezierVertex(lXT, lYT, cX, cY, rX, rY);
		endShape();
	}

	draw(){
		this.connect();
		circle(this._x, this._y, this._d);
	}
}