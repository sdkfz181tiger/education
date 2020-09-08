"use strict";
//==========
// p5.js

const BOX_W = 96;
const BOX_SPD = 12;
let boxX = 0;
let img = null;
let player = null;
let nums = [300, 290, 280, 270, 260, 250, 240, 230, 220, 210,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			200, 210, 220, 100, 100, 250, 260, 270, 280, 290,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			200, 210, 220, 100, 100, 250, 260, 270, 280, 290,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			200, 210, 220, 100, 100, 250, 260, 270, 280, 290,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			200, 210, 220, 100, 100, 250, 260, 270, 280, 290,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			200, 210, 220, 100, 100, 250, 260, 270, 280, 290,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			300, 290, 280, 270, 100, 250, 240, 230, 220, 210,
			200, 210, 220, 100, 100, 250, 260, 270, 280, 290];
let boxes = [];
let msg = "Love HONDA!!";

function preload(){
	img = loadImage("images/honda_x1.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(16);
	noStroke();
	textAlign(CENTER);
	textSize(48);

	// Player
	player = new Player(135, height-300, 64, 64);

	// Boxes
	for(let i=0; i<nums.length; i++){
		let x = i * BOX_W;
		let y = height - nums[i];
		let box = new Box(x, y, BOX_W, nums[i]);
		boxes.push(box);
	}
}

function draw(){

	let indexL = floor((player.x+player.w/2-boxX)/BOX_W);
	let indexR = floor((player.x+player.w-boxX)/BOX_W);
	if(boxes.length <= indexR) return;// Stop

	background(180);
	fill(255);
	text(msg, width*0.5, 64);

	// Player
	player.checkL(boxes[indexL]);// Check
	if(player.checkR(boxes[indexR])) noLoop();// Stop
	player.draw();

	for(let i=0; i<boxes.length; i++){
		fill(33);
		if(i==indexL) fill(66);
		if(i==indexR) fill(99);
		boxes[i].draw();
	}
	boxX -= BOX_SPD;// Move all boxes...
}

function mousePressed(){
	if(player) player.jump();
}

class Player{

	constructor(x, y, w, h){
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
		this._vY = 0;     // Velocity
		this._gY = 4;     // Gravity
    	this._aY = -24;   // Accel
		this._jumpCnt = -1;// Counter
	}

	get x(){return this._x;}
	set x(n){this._x = n;}
	get y(){return this._y;}
	set y(n){this._y = n;}
	get w(){return this._w;}
	get h(){return this._h;}

	jump(){
		if(2 < this._jumpCnt) return;
		if(this._jumpCnt < 0) this._jumpCnt = 0;
		this._vY = this._aY;
		this._jumpCnt++;
	}

	checkL(box){
		if(box.y < this._y+this._h){
			this._y = box.y - this._h;
			this._vY = 0;
			this._jumpCnt = 0;
		}
		if(player._jumpCnt <= 0){
			if(this._y+this._h+2 < box.y){
				this._jumpCnt = -1;
			}
		}
	}

	checkR(box){
		if(box.y < this._y) return true;
		return false;
	}

	draw(){
		fill(255);
		rect(this._x, this._y, this._w, this._h);
		image(img, this._x-10, this._y-10);
		if(this._jumpCnt != 0){
			this._vY += this._gY;
			this._y += this._vY;
		}
	}
}

class Box{

	constructor(x, y, w, h){
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
		if(width < boxX+this._x) return;
		rect(this._x+boxX, this._y, this._w, this._h);
	}
}
