"use strict";
//==========
// p5.js

const DISP_W = 480;
const DISP_H = 320;

let cBubble;
let bubbles;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	colorMode(HSB, 100);

	let cColor = color(100, 100, 100);
	cBubble = new Bubble(width/2, height/2, 60, cColor);

	bubbles = [];
	for(let i=0; i<30; i++){
		let x = random(0, height);
		let y = random(0, width);
		let r = random(10, 20);
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

	cBubble.draw();

	for(let i=0; i<bubbles.length; i++){

		let bubble = bubbles[i];
		bubble.draw();

		if(bubble._x < 0) bubble._x = width;
		if(bubble._y < 0) bubble._y = height;
		if(width < bubble._x) bubble._x = 0;
		if(height < bubble._y) bubble._y = 0;
		
		let dX = bubble._x - cBubble._x;
		let dY = bubble._y - cBubble._y;
		let min = bubble._r + cBubble._r;
		let dist = Math.sqrt(dX*dX + dY*dY);
		if(dist < min){
			let angle = Math.atan2(dY, dX);
			let tX = cBubble._x + Math.cos(angle) * min;
			let tY = cBubble._y + Math.sin(angle) * min;
			bubble._vX += (tX - bubble._x) * 0.1;
			bubble._vY += (tY - bubble._y) * 0.1;
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

	setMove(vX, vY){
		this._vX = vX;
		this._vY = vY;
	}

	draw(){
		this._x += this._vX;
		this._y += this._vY;
		noStroke(); fill(this._c);
		circle(this._x, this._y, this._r*2);
	}
}