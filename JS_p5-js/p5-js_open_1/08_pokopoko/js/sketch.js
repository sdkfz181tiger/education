"use strict";
//==========
// p5.js

const PI = Math.PI;

let bubbles = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(32);
	colorMode(HSB);
	
	for(let i=0; i<100; i++){
		let x = random(0, width);
		let y = random(0, height);
		let s = random(2, 4);
		let a = random(3.14);
		let bubble = new Bubble(x, y);
		bubble.setMove(s, a);
		bubbles.push(bubble);
	}
}

function draw(){
	background(33);
	for(let bubble of bubbles) bubble.draw();
}

class Bubble{

	constructor(x, y){
		this._x  = x;
		this._y  = y;
		this._r  = 0;
		this._a  = 0;
		this._c  = color(random(255), 100, 100);
	}

	setMove(r, a){
		this._r = r;
		this._a = a;
	}

	draw(){
		this._a += 0.1;
		if(PI*2 < this._a) this._a = 0;
		this._x += this._r * cos(this._a);
		this._y += abs(this._r * sin(this._a));
		if(this._x < 0) this._x = width;
		if(width < this._x) this._x = 0;
		if(this._y < 0) this._y = width;
		if(height < this._y) this._y = 0;
		noStroke();
		fill(this._c);
		circle(this._x, this._y, 5);
	}
}