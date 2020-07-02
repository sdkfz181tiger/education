"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(4);
	colorMode(HSB);

	fill(60, 60, 60);
	noStroke();
}

function draw(){
	background(90);

	let circles = [];
	let size = 40;
	let pad = 50;
	let rows = floor(height / pad);
	let cols = floor(width / pad);
	let sX = width / 2 - (cols-1) * pad / 2;
	let sY = height / 2 - (rows-1) * pad / 2;
	for(let r=0; r<rows; r++){
		let line = [];
		circles.push(line);
		for(let c=0; c<cols; c++){
			let x = sX + pad * c;
			let y = sY + pad * r;
			let h = parseInt(floor(random(4))*90);
			let cent = new Circle(x, y, size, h);
			cent.draw();
			line.push(cent);
		}
	}

	// Connection
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			checkConnection(circles[r][c], r, c+1);
			checkConnection(circles[r][c], r+1, c);
			//checkConnection(circles[r][c], r+1, c+1);
			//checkConnection(circles[r][c], r-1, c-1);
		}
	}

	function checkConnection(cent, r, c){
		if(r < 0) return;
		if(c < 0) return;
		if(rows <= r) return;
		if(cols <= c) return;
		let tgt = circles[r][c];
		if(cent.isSameColor(tgt)){
			cent.setTarget(tgt);
			cent.connect();
		}
	}
}

class Circle{

	constructor(x, y, d, h){
		this._x = x;
		this._y = y;
		this._d = d;
		this._r = d / 2;
		this._h = h;
		this._tgt = null;
	}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	get x(){return this._x;}
	get y(){return this._y;}
	get d(){return this._d;}
	get r(){return this._r;}
	get h(){return this._h;}

	setTarget(tgt){
		this._tgt = tgt;
	}

	isSameColor(tgt){
		return (this._h == tgt.h);
	}

	connect(){
		if(this._tgt == null) return;

		let cX = (this._tgt.x + this._x) / 2;
		let cY = (this._tgt.y + this._y) / 2;

		let rad = atan2(this._tgt.y-this._y, this._tgt.x-this._x);
		let pad = Math.PI / 3;

		let radR = rad + pad;
		let rX = this._x + this._r * cos(radR);
		let rY = this._y + this._r * sin(radR);

		let radL = rad - pad;
		let lX = this._x + this._r * cos(radL);
		let lY = this._y + this._r * sin(radL);

		let radT = atan2(this._y-this._tgt.y, this._x-this._tgt.x);

		let radRT = radT + pad;
		let rXT = this._tgt.x + this._tgt.r * cos(radRT);
		let rYT = this._tgt.y + this._tgt.r * sin(radRT);

		let radLT = radT - pad;
		let lXT = this._tgt.x + this._tgt.r * cos(radLT);
		let lYT = this._tgt.y + this._tgt.r * sin(radLT);

		fill(this._h, 80, 80);
		beginShape();
		vertex(lX, lY);
		bezierVertex(lX, lY, cX, cY, rXT, rYT);
		vertex(lXT, lYT);
		bezierVertex(lXT, lYT, cX, cY, rX, rY);
		endShape();
	}

	draw(){
		fill(this._h, 80, 80);
		circle(this._x, this._y, this._d);
		this.connect();
	}
}