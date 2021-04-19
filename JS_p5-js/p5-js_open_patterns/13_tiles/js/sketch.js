"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let shapes = [];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(24);

	background(33);
	noStroke();

	let size = 64;

	for(let r=0; r<2; r++){
		for(let c=0; c<5; c++){
			let x = width / 2 + size * c;
			let y = height / 2 + size * r;
			let shape = new MyShape(x, y, size);
			shapes.push(shape);
		}
	}
}

function draw(){

	for(let shape of shapes){
		shape.draw();
	}
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

class MyShape{

	constructor(x, y, s){
		this._x = x;
		this._y = y;
		this._s = s;
		this._n = random(this._s);
		this._color = getColor();
	}

	draw(){
		fill(this._color);
		square(this._x, this._y, this._n);

		this._n++;
		if(this._s < this._n) {
			this._n = 0;
			this._color = getColor();
		}
	}
}
