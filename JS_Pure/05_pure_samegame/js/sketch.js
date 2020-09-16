"use strict";
//==========
// JavaScript

const WIDTH  = 320;
const HEIGHT = 320;

const ROWS   = 2;
const COLS   = 2;
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
	ctx.font        = "24px Arial";
	ctx.textAlign   = "center";
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth   = 2;

	// SamegameManager
	let sX = WIDTH/2  - COLS*T_SIZE/2;
	let sY = HEIGHT/2 - ROWS*T_SIZE/2;
	sMng = new SamegameManager(sX, sY);
	
	update();// Update
});

// Update
function update(){
	// Clear
	ctx.fillStyle = "#111111";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	// Text
	ctx.fillStyle = "#ffffff";
	ctx.fillText("SameGame!!", WIDTH/2, 32);

	// Test
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			// Tile
			let tile = sMng.mtx[r][c];
			ctx.fillStyle = "#333333";
			ctx.fillRect(tile.x, tile.y, T_SIZE-2, T_SIZE-2);
		}
	}

	//setTimeout(update, 20);
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
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let tile = sMng.mtx[r][c];
			if(tile.isInside(e.x, e.y)){
				console.log("Capture:", r, c);
			}
		}
	}
});

//==========
// Utility

class SamegameManager{

	constructor(sX, sY){
		this._sX = sX;
		this._sY = sY;
		this.initMatrix();
	}

	initMatrix(){
		this._mtx = [];
		for(let r=0; r<ROWS; r++){
			let line = [];
			for(let c=0; c<COLS; c++){
				let x = this._sX + T_SIZE * c;
				let y = this._sY + T_SIZE * r;
				line.push(new Tile(r, c, x, y));
			}
			this._mtx.push(line);
		}
	}

	touchTile(tX, tY){
		for(let r=0; r<ROWS; r++){
			for(let c=0; c<COLS; c++){
				return this._mtx[r][c].isInside(tX, tY);
			}
		}
		return false;
	}

	get mtx(){return this._mtx;}
}

class Tile{

	constructor(r, c, x, y){
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
}

