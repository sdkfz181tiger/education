"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let walkers = [];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(8);

	background(33);
	noFill();
	stroke(255);
	strokeWeight(1);

	for(let i=0; i<5; i++){
		let walker = new Walker(width/2, height/2, 40);
		walkers.push(walker);
	}
}

function draw(){
	
	noStroke();
	fill(33, 33, 33, 11)
	rect(width/2, height/2, width, height);

	for(let i=walkers.length-1; 0<=i; i--){
		let walker = walkers[i];
		walker.draw();
		if(walker.isOutside()){
			splice(walkers.splice(i, 1));
		}
	}
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

class Walker{

	constructor(x, y, s){
		this._x = x;
		this._y = y;
		this._s = s;
		this._spd = 1;
		this._deg = random(360);
		this._rot = random(360);
		this._color = getColor();
	}

	draw(){
		noFill();
		stroke(this._color);
		strokeWeight(1);
		square(this._x, this._y, this._s);
		this._x += this._spd * cos(this._deg);
		this._y += this._spd * sin(this._deg);
		this._spd += random(-2, 2);
		this._deg += random(-10, 10);
		this._rot += 1;
	}

	isOutside(){
		if(this._x < 0) return true;
		if(width < this._x) return true;
		if(this._y < 0) return true;
		if(height < this._y) return true;
		return false;
	}
}
