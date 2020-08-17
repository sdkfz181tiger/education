"use strict";
//==========
// p5.js

const COLORS  = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];
let boxes = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);
	frameRate(24);
	noStroke();

	let size = 32;
	let rows = height / size + 1;
	let cols = width / size + 1;

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c*size;
			let y = r*size;
			let box = new Box(x, y, size);
			boxes.push(box);
		}
	}

	choiseOne(1000);
}

function draw(){
	background(33);

	for(let box of boxes) box.draw();
}

function choiseOne(mil){
	setTimeout(()=>{
		let i = floor(boxes.length * random());
		boxes[i].startRotate();
		choiseOne(random()*1000);
	}, mil);
}

class Box{

	constructor(x, y, s){
		this._x = x;
		this._y = y;
		this._s = s;
		this._crtS = s;
		this._dstS = s;
		this._crtR = 0;
		this._dstR = 0;
		this.changeColor();
	}

	changeColor(){
		this._c = color(COLORS[floor(random()*COLORS.length)]);
	}

	startRotate(){
		this._dstS = this._s * (0.5+random()*0.5);
		this._dstR = 360 - 90 * floor(random(8));
	}

	draw(){
		fill(this._c);
		push();
		translate(this._x, this._y);
		rotate(this._crtR);
		square(0, 0, this._crtS);
		pop();

		let distS = this._dstS - this._crtS;
		if(1 < abs(distS)){
			this._crtS += distS / 5;
		}else{
			this._crtS = this._dstS;
		}

		let distR = this._dstR - this._crtR;
		if(1 < abs(distR)){
			this._crtR += distR / 10;
		}else{
			this._crtR = 0;
			this._dstR = 0;
		}
	}
}