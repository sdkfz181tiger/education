"use strict";
//==========
// p5.js
// Original code link:
// ***

let cX, cY, dia;
let dots = [];
let deg = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	angleMode(DEGREES);
	background(33);

	noFill();
	stroke(33, 255, 33);
	strokeWeight(1);

	cX = width / 2;
	cY = height / 2;
	dia = (width<height)?width*0.8:height*0.8;

	for(let i=0; i<30; i++){
		let rdm = random(2, 4);
		dots.push(new Dot(30*i, rdm, rdm, dia/2));
	}
}

function draw(){
	background(33);


	
	for(let dot of dots) dot.draw();
	noFill();
	circle(cX, cY, dia);
}

class Dot{

	constructor(r, vR, gra, gro){
		this._y   = 0;
		this._vY  = 0;
		this._r   = r;
		this._vR  = vR;
		this._gra = gra;
		this._gro = gro;
	}

	draw(){
		this._y += this._vY;
		this._vY += this._gra;
		if(this._gro < this._y){
			this._y = this._gro;
			this._vY *= -0.8;
		}
		this._r += this._vR;
		if(360 < this._r) this._r -= 360;
		fill(33, 255, 33);
		push();
		translate(cX, cY);
		rotate(this._r);
		circle(0, this._y, 10);
		pop();
	}
}
