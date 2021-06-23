"use strict";

const DIST = 40;
const balls = [];

//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(16);

	background(33);
	stroke(255);
	strokeWeight(0.5);
	noFill();

	for(let i=0; i<30; i++){
		let x = random(width);
		let y = random(height);
		let ball = new Ball(x, y);
		balls.push(ball);
	}
}

function draw(){
	background(33);

	for(let a=0; a<balls.length; a++){
		let bA = balls[a];
		bA.update();
		for(let b=a+1; b<balls.length; b++){
			let bB = balls[b];
			let distAB = calcDistance(bA, bB);
			if(DIST < distAB) continue;
			line(bA.x, bA.y, bB.x, bB.y);

			for(let c=b; c<balls.length; c++){
				let bC = balls[c];
				let distBC = calcDistance(bB, bC);
				if(DIST < distBC) continue;

				let distABC = (distAB + distBC) / 2;
				let alpha = (DIST - distABC) / DIST;
				drawTriangle(bA, bB, bC, alpha);
			}
		}
		bA.draw();
	}
}

function calcDistance(ballA, ballB){
	let dX = ballA.x - ballB.x;
	let dY = ballA.y - ballB.y;
	return Math.sqrt(dX*dX + dY*dY);
}

function drawTriangle(bA, bB, bC, alpha){
	fill("rgba(255, 255, 255, " + alpha + ")");
	triangle(bA.x, bA.y, bB.x, bB.y, bC.x, bC.y);
	noFill();
}

class Ball{

	constructor(x, y){
		console.log("Ball");
		this._x = x;
		this._y = y;
		this._vX = random(4) - 2;
		this._vY = random(4) - 2;
	}

	get x(){return this._x;}

	get y(){return this._y;}

	update(){
		this._x += this._vX;
		this._y += this._vY;
		if(this._x < 0) this._x = width;
		if(width < this._x) this._x = 0;
		if(this._y < 0) this._y = height;
		if(height < this._y) this._y = 0;
	}

	draw(){
		circle(this._x, this._y, 2);
	}
}