"use strict"
//==========
// p5.js

console.log("Hello p5.js!!");

const DEBUG   = false;

const DISP_W  = 480;
const DISP_H  = 320;

const FONT_SIZE = 32;

const TILE_TOTAL   = 16;
const TILE_SIZE    = 62;
const TILE_PADDING = 64;
const TILE_CORNER  = 5;
const TILE_ROWS    = 4;
const TILE_COLS    = 4;

let tiles;

function preload(){
	console.log("preload");
	tiles = [];
}

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(16);
	colorMode(HSB);

	let sX = DISP_W / 2 - TILE_PADDING * TILE_COLS / 2;
	let sY = DISP_H / 2 - TILE_PADDING * TILE_ROWS / 2;
	let c = color(33, 33, 99);
	for(let i=0; i<TILE_TOTAL; i++){
		let x = sX + floor(i % TILE_COLS) * TILE_PADDING;
		let y = sY + floor(i / TILE_COLS) * TILE_PADDING;
		let tile = new Tile(99, x, y, c);
		tiles.push(tile);
	}
}

function draw(){
	background(33, 33, 33);
	for(let tile of tiles) tile.draw();
}

class Tile{

	constructor(num, x, y, c){
		this._num = num;
		this._x = x;
		this._y = y;
		this._c = c;
	}

	draw(){
		// Background
		noStroke(); fill(this._c);
		square(this._x, this._y, TILE_SIZE, TILE_CORNER);
		// Font
		colorMode(RGB); fill(33, 33, 33);
		textSize(FONT_SIZE); textAlign(CENTER);
		text(this._num, this._x+TILE_SIZE/2, this._y+TILE_SIZE-FONT_SIZE*0.6);
	}
}