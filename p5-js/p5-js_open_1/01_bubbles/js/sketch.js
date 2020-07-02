"use strict";
//==========
// p5.js

const DISP_W = 480;
const DISP_H = 320;
const SPRING = 0.1;

let bubbles;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	colorMode(HSB, 100);

	bubbles = [];
	for(let i=0; i<30; i++){
		let x = random(0, height);
		let y = random(0, width);
		let r = random(10, 60);
		let c = color(random(0, 100), 99, 99);
		let vX = 3 - random(0, 6);
		let vY = 3 - random(0, 6);
		let bubble = new Bubble(x, y, r, c);
		bubble.setMove(vX, vY);
		bubbles.push(bubble);
	}
}

function draw(){
	background(66, 66, 33);

	for(let a=0; a<bubbles.length-1; a++){
		let bubbleA = bubbles[a];
		bubbleA.draw();
		for(let b=0; b<bubbles.length; b++){
			let bubbleB = bubbles[b];
			let dX = bubbleA.x - bubbleB.x;
			let dY = bubbleA.y - bubbleB.y;
			let min = bubbleA.r + bubbleB.r;
			let dist = Math.sqrt(dX*dX + dY*dY);
			if(dist < min){
				let angle = Math.atan2(dY, dX);
				let tX = bubbleB._x + Math.cos(angle) * min;
				let tY = bubbleB._y + Math.sin(angle) * min;
				let aX = (tX - bubbleA.x) * SPRING;
				let aY = (tY - bubbleA.y) * SPRING;
				bubbleA.vX += aX;
				bubbleA.vY += aY;
				bubbleB.vX -= aX;
				bubbleB.vY -= aY;
			}
		}
	}
}

class Bubble{

	constructor(x, y, r, c){
		this._x = x;
		this._y = y;
		this._r = r;
		this._c = c;
		this._vX = 0;
		this._vY = 0;
	}

	get x(){return this._x;}
	get y(){return this._y;}
	get r(){return this._r;}
	get c(){return this._c;}
	get vX(){return this._vX;}
	get vY(){return this._vY;}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	set r(n){this._r = n;}
	set c(n){this._c = n;}
	set vX(n){this._vX = n;}
	set vY(n){this._vY = n;}
	
	setMove(vX, vY){
		this._vX = vX;
		this._vY = vY;
	}

	draw(){
		if(this.x < 0) this.x = width;
		if(this.y < 0) this.y = height;
		if(width < this.x) this.x = 0;
		if(height < this.y) this.y = 0;
		let speed = Math.sqrt(this._vX*this._vX+this._vY*this._vY);
		if(10 < speed){
			this._vX *= 0.5;
			this._vY *= 0.5;
		}
		this._x += this._vX;
		this._y += this._vY;
		noStroke(); fill(this._c);
		circle(this._x, this._y, this._r*2);
	}
}