"use strict";

const S_DIST  = 50; // Distance to screen
const R_DEPTH = 10; // Road depth
const R_WIDTH = 480;// Road width

let posX, posY, posZ, lines;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noStroke();

	posX = 0;
	posY = 400;
	posZ = 0;

	// Lines
	lines = [];
	for(let i=0; i<400; i++){
		let line = new Line();

		if(100 < i && i < 150) line.curve = 0.8;
		if(150 < i && i < 200) line.curve = -0.8;
		if(250 < i && i < 300) line.curve = 0.8;
		if(300 < i && i < 350) line.curve = -0.8;

		if(100 < i && i < 130) line.bank = 0.4;
		if(130 < i && i < 260) line.bank = -0.8;
		if(190 < i && i < 210) line.bank = 0.4;
		if(240 < i && i < 270) line.bank = -0.8;

		line.project(0, 200, R_DEPTH*i);
		lines.push(line);
	}
}

function draw(){
	background(33);
	// Position
	posZ += 5;
	// Lines
	const start = Math.floor(posZ/R_DEPTH)+1;

	let oX = 0;
	let dX = 0;

	let oY = 0;
	let dY = 0;

	for(let i=start; i<start+50; i++){
		let iA = i % lines.length;
		let iB = (0<iA)?iA-1:lines.length-1;
		let lA = lines[iA];
		let lB = lines[iB];

		oX += dX;
		dX += lA.curve;

		oY += dY;
		dY += lA.bank;
		
		lA.project(posX-oX, posY-oY, R_DEPTH*i-posZ);

		if(lB.Y < lA.Y) continue;// Important
		let cGrass = (i%2==0) ? "#33dd33":"#33aa33";
		let cSide  = (i%2==0) ? "#333333":"#ffffff";
		let cRoad  = (i%2==0) ? "#bbbbbb":"#eeeeee";
		drawShape(lA.X, lA.Y, width*4, lB.X, lB.Y, width*4, cGrass);
		drawShape(lA.X, lA.Y, lA.W*1.2, lB.X, lB.Y, lB.W*1.2, cSide);
		drawShape(lA.X, lA.Y, lA.W, lB.X, lB.Y, lB.W, cRoad);
		//drawLine(lA.X, lA.Y, lA.W, "#ff3333");
	}
}

function drawLine(x, y, w, c){
	stroke(c);
	line(x-w/2, y, x+w/2);
}

function drawShape(x1, y1, w1, x2, y2, w2, c){
	fill(c);
	beginShape();
	vertex(x1+w1, y1);
	vertex(x1-w1, y1);
	vertex(x2-w2, y2);
	vertex(x2+w2, y2);
	endShape(CLOSE);
}

class Line{

	constructor(){
		this._X = 0;
		this._Y = 0;
		this._W = 0;
		this._C = 0;
		this._B = 0;
	}

	project(x, y, z){
		const s = S_DIST / (S_DIST + z);
		this._X = x * s + width/2;
		this._Y = y * s + height/2;
		this._W = R_WIDTH * s;
	}

	set curve(n){this._C=n;}
	get curve(){return this._C;}

	set bank(n){this._B=n;}
	get bank(){return this._B;}

	get X(){return this._X;}
	get Y(){return this._Y;}
	get W(){return this._W;}
}