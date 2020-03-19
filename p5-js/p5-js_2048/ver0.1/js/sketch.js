"use strict"
//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W       = 480;
const DISP_H       = 320;

const FONT_SIZE    = 32;

const TILE_TOTAL   = 16;
const TILE_SIZE    = 62;
const TILE_PADDING = 64;
const TILE_CORNER  = 5;
const TILE_ROWS    = 4;
const TILE_COLS    = 4;

let my2048;
let tiles;
let sX, sY;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(16);
	colorMode(HSB);

	// 2048
	my2048 = new Smz2048();
	my2048.randomPut();
	my2048.randomPut();
	my2048.randomPut();
	my2048.randomPut();
	my2048.consoleBoard();

	// Tiles
	sX = DISP_W / 2 - TILE_PADDING * TILE_COLS / 2;
	sY = DISP_H / 2 - TILE_PADDING * TILE_ROWS / 2;
	let tC = color(33, 66, 99, 100);
	let board = my2048.getBoard();
	tiles = [];
	for(let r=0; r<TILE_ROWS; r++){
		let line = [];
		for(let c=0; c<TILE_COLS; c++){
			let n = board[r][c];
			let x = sX + TILE_PADDING * c;
			let y = sY + TILE_PADDING * r;
			line.push(new Tile(n, x, y, tC));
		}
		tiles.push(line);
	}
}

function draw(){
	background(33, 33, 33);
	for(let r=0; r<TILE_ROWS; r++){
		for(let c=0; c<TILE_COLS; c++){
			tiles[r][c].draw();
		}
	}
}

function keyPressed(){
	if(key == "ArrowLeft") actionLeft();
	if(key == "ArrowRight") actionRight();
	if(key == "ArrowUp") actionUp();
	if(key == "ArrowDown") actionDown();
}

function actionLeft(){
	if(!my2048.slideLeft()) return;
	my2048.consoleBoard();
	updateBoard();
}

function actionRight(){
	if(!my2048.slideRight()) return;
	my2048.consoleBoard();
	updateBoard();
}

function actionUp(){
	if(!my2048.slideUp()) return;
	my2048.consoleBoard();
	updateBoard();
}

function actionDown(){
	if(!my2048.slideDown()) return;
	my2048.consoleBoard();
	updateBoard();
}

function updateBoard(){
	let board = my2048.getBoard();
	for(let r=0; r<TILE_ROWS; r++){
		for(let c=0; c<TILE_COLS; c++){
			let move = my2048.getMove(r, c);
			if(move != null){
				console.log("to move:", move);
				tiles[r][c].moveTo(move.gR, move.gC);
			}
		}
	}
	// TODO: interval
	// my2048.randomPut();
}

class Tile{

	constructor(n, x, y, c){
		this._n = n;
		this._x = x;
		this._y = y;
		this._c = c;
		this._dX = x;
		this._dY = y;
	}

	setNum(n){
		this._n = n;
	}

	setPosition(x, y, c){
		this._x = x;
		this._y = y;
		this._c = c;
	}

	moveTo(gR, gC){
		this._dX = this._x + gC * TILE_PADDING;
		this._dY = this._y + gR * TILE_PADDING;
	}

	draw(){
		// Move
		if(this.calcDistance() < 4){
			this._x = this._dX;
			this._y = this._dY;
		}else{
			this._x += (this._dX - this._x) / 3;
			this._y += (this._dY - this._y) / 3;
		}
		if(this._n == 0) return;
		// Background
		noStroke(); fill(this._c);
		square(this._x, this._y, TILE_SIZE, TILE_CORNER);
		// Font
		fill(33, 33, 33); textSize(FONT_SIZE); textAlign(CENTER);
		text(this._n, this._x+TILE_SIZE/2, this._y+TILE_SIZE-FONT_SIZE*0.6);
	}

	calcDistance(){
		let x = this._dX - this._x;
		let y = this._dY - this._y;
		return x*x+y*y;
	}
}