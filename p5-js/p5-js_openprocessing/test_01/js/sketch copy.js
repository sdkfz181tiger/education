"use strict";
//==========
// p5.js

const DISP_W = 520;
const DISP_H = 380;

const MS_ROWS = 10;
const MS_COLS = 14;
const MS_MINES = 20;

const TILE_SIZE = 32;
const TILE_PAD  = 34;
const TILE_CNR  = 5;

const FONT_SIZE = 24;

let ms;
let tiles;

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(8);
	colorMode(HSB, 100);

	// MineSweeper
	ms = new MineSweeper(MS_ROWS, MS_COLS, MS_MINES);
	//ms.consoleAll();

	// Tiles
	tiles = [];
	let mine = ms.getMine();
	let sensor = ms.getSensor();
	let total = MS_ROWS * MS_COLS;
	for(let t=0; t<total; t++){
		let r = Math.floor(t / MS_COLS);
		let c = Math.floor(t % MS_COLS);
		let m = mine[r][c];
		let s = sensor[r][c];
		let tile = new Tile(r, c, m, s);
		tiles.push(tile);
	}
}

function draw(){
	background(33, 33, 33);
	for(let tile of tiles) tile.draw();
}

function mousePressed(){
	for(let tile of tiles){
		if(tile.mousePressed(mouseX, mouseY)){
			mineSweep(tile.getR(), tile.getC());
			break;
		}
	}
}

function mineSweep(r, c){
	// Minesweeper
	if(!ms.sweep(r, c)){
		console.log("CONTINUE!!");
		for(let t=0; t<tiles.length; t++){
			let r = Math.floor(t / MS_COLS);
			let c = Math.floor(t % MS_COLS);
			let search = ms.getSearch();
			if(search[r][c] == 1){
				tiles[t].open();
			}
		}
	}else{
		console.log("GAME OVER!!");
		let t = r * MS_COLS + c;
		tiles[t].open();
	}
}

class Tile{

	constructor(r, c, m, s){
		this._r = r;
		this._c = c;
		this._m = m;
		this._s = s;
		this._x = c * TILE_PAD + DISP_W / 2 - TILE_PAD * MS_COLS / 2;
		this._y = r * TILE_PAD + DISP_H / 2 - TILE_PAD * MS_ROWS / 2;
		this._opened = false;
	}

	getR(){return this._r;}

	getC(){return this._c;}

	open(){this._opened = true;}

	close(){this._opened = false;}

	draw(){
		if(!this._opened){
			this.drawClosed();
		}else{
			this.drawOpened();
		}
	}

	mousePressed(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + TILE_SIZE < x) return false;
		if(this._y + TILE_SIZE < y) return false;
		return true;
	}

	drawClosed(){
		// Background
		fill(33, 66, 77); noStroke();
		square(this._x, this._y, TILE_SIZE, TILE_SIZE, TILE_CNR);
	}

	drawOpened(){
		// Background
		let tColor = (this._m == 1) ? color(0, 66, 99) : color(33, 66, 99);
		fill(tColor); noStroke();
		square(this._x, this._y, TILE_SIZE, TILE_SIZE, TILE_CNR);
		// Font
		let str = "";
		if(this._m == 1) str = "X";
		if(this._s != 0) str = this._s;
		fill(33, 33, 33); textSize(FONT_SIZE); textAlign(CENTER);
		text(str, this._x+TILE_SIZE/2, this._y+FONT_SIZE);
	}
}