"use strict";
//==========
// p5.js

const BOX_W = 32;
const BOX_SPD = 2;
let boxX = 0;
let player = null;
let nums = [140, 130, 120, 110, 100, 90, 80, 70, 60, 50,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			140, 130, 120, 110, 100, 90, 80, 70, 60, 50,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			140, 130, 120, 110, 100, 90, 80, 70, 60, 50,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			140, 130, 120, 110, 100, 90, 80, 70, 60, 50,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			140, 130, 120, 110, 100, 90, 80, 70, 60, 50,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140,
			50, 60, 70, 80, 90, 100, 20, 120, 130, 140];
let boxes = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	noStroke();

	// Player
	player = new Player(64, height/2, 16, 16);

	// Boxes
	for(let i=0; i<nums.length; i++){
		let x = i * BOX_W;
		let y = height - nums[i];
		let box = new Box(x, y, BOX_W, nums[i]);
		boxes.push(box);
	}
}

function draw(){
	background(0);

	// Player
	player.draw();

	// Boxes
	let indexL = floor((player.x+player.w/2-boxX)/BOX_W);
	let indexR = floor((player.x+player.w-boxX)/BOX_W);
	player.checkL(boxes[indexL]);// Check
	player.checkR(boxes[indexR]);

	if(boxes.length <= indexR) return;// Stop
	for(let i=0; i<boxes.length; i++){
		fill(33);
		if(i==indexL) fill(66);
		if(i==indexR) fill(99);
		boxes[i].draw();
	}

	boxX -= BOX_SPD;
}

class Player{

	constructor(x, y, w, h){
		console.log("Player");
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
		this._vY = 0;     // Velocity
		this._gY = 2;     // Gravity
    	this._aY = -12;   // Accel
		this._jumpCnt = 1;// Counter
	}

	get x(){return this._x;}
	set x(n){this._x = n;}
	get y(){return this._y;}
	set y(n){this._y = n;}
	get w(){return this._w;}
	get h(){return this._h;}

	checkL(box){
		if(box.y < this._y+this._h){
			this._y = box.y - this._h;
			this._vY = 0;
			this._jumpCnt = 0;
		}
	}

	checkR(box){
		if(player._jumpCnt <= 0){
			if(this._y+this._h+2 < box.y){
				this._jumpCnt = -1;
			}
		}
	}

	draw(){
		if(this._jumpCnt != 0){
			this._vY += this._gY;
			this._y += this._vY;
		}
		fill(255);
		rect(this._x, this._y, this._w, this._h);
	}
}

class Box{

	constructor(x, y, w, h){
		console.log("Box");
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
	}

	get x(){return this._x;}
	set x(n){this._x = n;}
	get y(){return this._y;}
	set y(n){this._y = n;}
	get w(){return this._w;}
	get h(){return this._h;}

	draw(){
		if(boxX+this._x+this._w < 0) return;
		rect(this._x+boxX, this._y, this._w, this._h);
	}
}
