"use strict";
//==========
// p5.js

let lasers = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	colorMode(RGB);
	angleMode(DEGREES);

	emmitLaser(width/2, height/2);
}

function draw(){
	background(0, 0, 0);

	for(let i=lasers.length-1; 0<=i; i--){
		if(lasers[i].isOutside()){
			splice(i, 1);
		}else{
			lasers[i].update();
		}
	}
}

function mousePressed(){
	emmitLaser(mouseX, mouseY);
}

function emmitLaser(x, y){
	for(let i=0; i<100; i++){
		let s = random(10, 20);
		let r = random(255);
		let laser = new Laser(x, y, s, r);
		laser.setDirection(0);
		lasers.push(laser);
	}
}

class Laser{

	constructor(x, y, s, r){
		this._x = x;
		this._y = y;
		this._s = s;
		this._r = r;
		this._vX = 0;
		this._vY = 0;
		this._points = [];
		for(let i=0; i<10; i++){
			let point = {x:x, y:y};
			this._points.push(point);
		}
	}

	setDirection(deg){
		if(this._deg == deg) return;
		this._deg = deg;
		this._vX = this._s * cos(deg);
		this._vY = this._s * sin(deg);
	}

	isOutside(){
		if(this._x < 0) return true;
		if(this._y < 0) return true;
		if(width < this._x) return true;
		if(height < this._y) return true;
		return false;
	}

	update(){

		if(random() < 0.1){
			let rdm = parseInt(random(0, 4));
			this.setDirection(rdm * 90);
		}

		this._x += this._vX;
		this._y += this._vY;

		strokeWeight(2);
		this._points.push({x:this._x, y:this._y});
		for(let i=0; i<this._points.length-1; i++){
			let a = map(i, 0, this._points.length, 0, 255);
			stroke(this._r, 255, 255, a);
			line(this._points[i].x, this._points[i].y,
				this._points[i+1].x, this._points[i+1].y);
		}
		this._points.shift();
	}
}