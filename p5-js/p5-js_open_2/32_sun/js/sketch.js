"use strict";
//==========
// p5.js

let lays = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(64);
	noStroke();
	fill(200);
	angleMode(DEGREES);
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;

	stroke(200, 33, 33);
	strokeWeight(8);
	noFill();

	let deg = random(360);
	let len = random(30, 80);
	let spd = random(3, 5);
	let lay = new Lay(cX, cY, deg, len, spd);
	lays.push(lay);

	for(let i=lays.length-1; 0<=i; i--){
		if(lays[i].isDead()){
			lays.splice(i, 1);
			continue;
		}
		lays[i].draw();
	}

	noStroke();
	fill(66, 120, 33);
	circle(cX, cY, 120);
}

class Lay{

	constructor(x, y, deg, len, spd){
		this._fromX = x;
		this._fromY = y;
		this._toX = x + len * cos(deg);
		this._toY = y + len * sin(deg);
		this._vX = spd * cos(deg);
		this._vY = spd * sin(deg);
		this._g = random(120, 255);
		this._w = random(8, 16);
	}

	draw(){
		this._fromX += this._vX;
		this._fromY += this._vY;
		this._toX += this._vX;
		this._toY += this._vY;
		stroke(33, this._g, 33);
		strokeWeight(this._w);
		line(this._fromX, this._fromY, this._toX, this._toY);
	}

	isDead(){
		if(this._fromX < 0) return true;
		if(width < this._fromX) return true;
		if(this._fromY < 0) return true;
		if(height < this._fromY) return true;
		return false;
	}
}