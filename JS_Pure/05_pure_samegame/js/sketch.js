"use strict";
//==========
// JavaScript

const palette = ["#233D4D", "#FE7F2D", "#FCCA46", "#A1C181", "#619B8A"];

const WIDTH  = 320;
const HEIGHT = 320;

const ROWS   = 6;
const COLS   = 6;
const T_SIZE = 32;

let canvas, ctx, sMng;

// Window
window.addEventListener("load", (e)=>{
	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;
	// Context
	ctx = canvas.getContext("2d");
	ctx.font        = "18px Arial";
	ctx.textAlign   = "center";
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth   = 2;
	// SamegameManager
	let sX = WIDTH/2  - COLS*T_SIZE/2;
	let sY = HEIGHT/2 - ROWS*T_SIZE/2;
	sMng = new SamegameManager(sX, sY);
	sMng.checkMtx();// Test
	update();// Update
});

// Update
function update(){
	// Clear
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	// Text
	ctx.fillStyle = "#ffffff";
	ctx.fillText("SameGame!!", WIDTH/2, 32);
	// Matrix
	let mtx = sMng.getMtx();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let tile = mtx[r][c];
			if(tile == null) continue;
			ctx.fillStyle = palette[Math.floor(tile.type%palette.length)];
			ctx.fillRect(tile.x, tile.y, T_SIZE-2, T_SIZE-2);
			ctx.fillStyle = "#ffffff";
			ctx.fillText(tile.type, tile.x+T_SIZE*0.5, tile.y+T_SIZE*0.7);
		}
	}
	setTimeout(update, 500);
}

function drawLine(x, y, w, c){
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(x+w/2, y);
	ctx.lineTo(x-w/2, y);
	ctx.stroke();
}

function drawTrp(x1, y1, w1, x2, y2, w2, c){
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.moveTo(x1+w1/2, y1);
	ctx.lineTo(x1-w1/2, y1);
	ctx.lineTo(x2-w2/2, y2);
	ctx.lineTo(x2+w2/2, y2);
	ctx.closePath();
	ctx.fill();
}

document.addEventListener("click", (e)=>{
	sMng.touchTiles(e.x, e.y);
});

//==========
// Utility

class SamegameManager{

	constructor(sX, sY){
		this._sX = sX;
		this._sY = sY;
		this.initMatrix();
		this.compressV();
	}

	initMatrix(){
		this._mtx = this.createMtx();
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				let x = this._sX + T_SIZE * c;
				let y = this._sY + T_SIZE * r;
				let type = Math.floor(Math.random()*5);
				if(type == 0) continue;
				this._mtx[r][c] = new Tile(r, c, x, y, type);
			}
		}
	}

	compressV(){
		for(let c=COLS-1; 0<=c; c--){
			for(let r=ROWS-1; 0<=r; r--){
				if(this._mtx[r][c] == null){
					for(let v=r-1; 0<=v; v--){
						if(this._mtx[v][c] == null) continue;
						this._mtx[r][c] = this._mtx[v][c];// Swap
						this._mtx[v][c] = null;
						let x = this._sX + T_SIZE * c;// Change
						let y = this._sY + T_SIZE * r;
						this._mtx[r][c].setParams(r, c, x, y);
						break;
					}
				}
			}
		}
	}

	createMtx(){
		let mtx = [];
		for(let r=0; r<ROWS; r++){
			let line = [];
			for(let c=0; c<COLS; c++) line.push(null);
			mtx.push(line);
		}
		return mtx;
	}

	getMtx(){
		return this._mtx;
	}

	checkMtx(){
		let bar = "";
		for(let b=0; b<COLS*2+3; b++) bar += "=";
		bar += "\n";
		let str = bar;
		for(let r=0; r<ROWS; r++){
			let line = "| ";
			for(let c=0; c<COLS; c++){
				line += (this._mtx[r][c]==null)?"  ":this._mtx[r][c].type+" ";
			}
			str += line + "|\n";
		}
		str += bar;
		console.log(str);
	}

	touchTiles(tX, tY){
		// Search
		this._chains = [];
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				let tile = this._mtx[r][c];
				if(tile == null) continue;
				if(tile.isInside(tX, tY)){
					this.searchTiles(tile);
				}
			}
		}
		// Remove
		if(this._chains.length < 2) return;
		for(let tile of this._chains){
			this._mtx[tile.r][tile.c] = null;// Remove
		}
		this.compressV();// Compress
		this.checkMtx();// Check
	}

	searchTiles(tile){
		//console.log("searchTiles:", tile.r, tile.c);
		this._chains.push(tile);// Push
		this.traseTile(tile, 0, 1);
		this.traseTile(tile, 0,-1);
		this.traseTile(tile, 1, 0);
		this.traseTile(tile,-1, 0);
	}

	isExists(tile){
		for(let target of this._chains){
			if(tile.r != target.r) continue;
			if(tile.c != target.c) continue;
			return true;
		}
		return false;
	}

	traseTile(tile, oR, oC){
		//console.log("traseTile", oR, oC)
		if(tile.r+oR < 0) return;
		if(tile.c+oC < 0) return;
		if(ROWS-1 < tile.r+oR) return;
		if(COLS-1 < tile.c+oC) return;
		let target = this._mtx[tile.r+oR][tile.c+oC];
		if(target == null) return;
		if(tile.type != target.type) return;
		if(this.isExists(target)) return;
		this.searchTiles(target);
	}
}

class Tile{

	constructor(r, c, x, y, type){
		this.setParams(r, c, x, y);
		this._type = type;
	}

	setParams(r, c, x, y){
		this._r = r;
		this._c = c;
		this._x = x;
		this._y = y;
	}

	isInside(tX, tY){
		if(tX < this._x) return false;
		if(tY < this._y) return false;
		if(this._x+T_SIZE < tX) return false;
		if(this._y+T_SIZE < tY) return false;
		return true;
	}

	get r(){return this._r;}
	get c(){return this._c;}
	get x(){return this._x;}
	get y(){return this._y;}
	get type(){return this._type;}
}

