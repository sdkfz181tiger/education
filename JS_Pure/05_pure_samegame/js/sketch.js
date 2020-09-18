"use strict";
//==========
// JavaScript

const WIDTH  = 320;
const HEIGHT = 320;

const ROWS   = 4;
const COLS   = 4;
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

	// Test
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			// Tile
			let tile = sMng.mtx[r][c];
			if(tile == null) continue;
			ctx.fillStyle = "#666666";
			ctx.fillRect(tile.x, tile.y, T_SIZE-2, T_SIZE-2);
			ctx.fillStyle = "#ffffff";
			ctx.fillText(tile.type, tile.x+T_SIZE*0.5, tile.y+T_SIZE*0.7);
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
		this.checkMtx();
	}

	// compressV(mtxBef){
	// 	let mtxAft = createMatrix();
	// 	for(let c=C_MAX-1; 0<=c; c--){
	// 		for(let r=R_MAX-1; 0<=r; r--){
	// 			if(mtxBef[r][c] == null){
	// 				for(let v=r-1; 0<=v; v--){
	// 					if(mtxBef[v][c] == null) continue;
	// 					mtxAft[r][c]   = mtxBef[v][c];
	// 					mtxAft[r][c].r = r;
	// 					mtxAft[r][c].c = c;
	// 					mtxBef[v][c]   = null;
	// 					break;
	// 				}
	// 			}else{
	// 				mtxAft[r][c] = mtxBef[r][c];
	// 			}
	// 		}
	// 	}
	// 	return mtxAft;
	// }

	createMtx(){
		let mtx = [];
		for(let r=0; r<ROWS; r++){
			let line = [];
			for(let c=0; c<COLS; c++) line.push(null);
			mtx.push(line);
		}
		return mtx;
	}

	checkMtx(){
		let bar = "";
		for(let b=0; b<COLS*2+3; b++) bar += "=";
		bar += "\n";
		let str = bar;
		for(let r=0; r<ROWS; r++){
			let line = "| ";
			for(let c=0; c<COLS; c++){
				line += (this._mtx[r][c]==null) ? "  ":this._mtx[r][c].type+" ";
			}
			str += line + "|\n";
		}
		str += bar;
		console.log(str);
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

	constructor(r, c, x, y, type){
		this._r = r;
		this._c = c;
		this._x = x;
		this._y = y;
		this._type = type;
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

