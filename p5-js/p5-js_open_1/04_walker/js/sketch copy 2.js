"use strict";
//==========
// p5.js

const DEG_TO_RAD = Math.PI / 180;
const AREA_MIN = 5000;
const DISP_W = 480;
const DISP_H = 320;

let leader;
let dots;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	colorMode(RGB);

	leader = new Dot(width/2, height/2, 2);
	let spd = 60 * 0.1;
	let deg = random(0, 360);
	leader.setMove(spd, deg);

	dots = [];

	putDot();
}

function draw(){
	background(33, 33, 33);

	leader.draw();

	for(let i=0; i<dots.length-2; i+=3){
		let d1 = dots[i];
		let d2 = dots[i+1];
		let d3 = dots[i+2];
		let alpha = calcAlpha(d1, d2, d3);
		let str = "rgba(55, 125, 255, " + alpha + ")";
		noStroke(); fill(color(str));
		triangle(d1.x, d1.y, d2.x, d2.y, d3.x, d3.y);
	}

	for(let i=dots.length-1; 0<=i; i--){
		if(0 < dots[i].life){
			dots[i].draw();
		}else{
			dots.splice(i, 1);
		}
	}
}

function calcAlpha(d1, d2, d3){
	let num = (d1.x-d3.x)*(d2.y-d3.y)-(d2.x-d3.x)*(d1.y-d3.y);
	let area = min(AREA_MIN, Math.floor(Math.abs(num) * 0.5));
	let alpha = 1 - map(area, 0, AREA_MIN, 0.0, 1.0);
	return alpha;
}

function putDot(){
	console.log("putDot");

	createDot();
	createDot();
	createDot();

	setTimeout(()=>{putDot();}, 30);
}

function createDot(){
	let x = leader.x;
	let y = leader.y;
	let r = leader.r;
	let spd = random(1, 30) * 0.1;
	let deg = random(0, 360);
	let dot = new Dot(x, y, r);
	dot.setMove(spd, deg);
	dots.push(dot);
}

class Dot{

	constructor(x, y, r){
		this._x = x;
		this._y = y;
		this._r = r;
		this._vX = 0;
		this._vY = 0;
		this._life = 64;
	}

	get x(){return this._x;}
	get y(){return this._y;}
	get r(){return this._r;}
	get vX(){return this._vX;}
	get vY(){return this._vY;}
	get life(){return this._life;}

	set x(n){this._x = n;}
	set y(n){this._y = n;}
	set r(n){this._r = n;}
	set vX(n){this._vX = n;}
	set vY(n){this._vY = n;}
	set life(n){this._life = n;}

	setMove(spd, deg){
		let rad = DEG_TO_RAD * deg;
		this._vX = Math.cos(rad) * spd;
		this._vY = Math.sin(rad) * spd;
	}

	draw(){
		if(this.x < 0) this.vX *= -1;
		if(this.y < 0) this.vY *= -1;
		if(width < this.x)  this.vX *= -1;
		if(height < this.y) this.vY *= -1;
		this._x += this._vX;
		this._y += this._vY;
		this._life--;
		//noStroke(); fill(255, 255, 255);
		//circle(this._x, this._y, this._r*2);
	}
}