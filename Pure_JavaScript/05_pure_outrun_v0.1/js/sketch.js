"use strict";
//==========
// JavaScript

const WIDTH    = 320;
const HEIGHT   = 320;
const S_DEPTH  = 50; // Screen depth
const R_LENGTH = 30; // Road length
const R_WIDTH  = 320;// Road width

let canvas, ctx;
let pos;

// Window
window.addEventListener("load", (e)=>{
	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;
	// Context
	ctx = canvas.getContext("2d");
	ctx.font = "24px Arial";
	ctx.textAlign = "center";

	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	pos = 0;

	// Tiles
	let tiles = [];
	for(let i=0; i<50; i++){
		let tile = new Tile(0, 200, R_LENGTH*i, R_WIDTH);
		tiles.push(tile);
		//drawBox(tile.X, tile.Y, tile.W, "#33ffff");
	}

	// Update
	update();
	function update(){
		console.log("update:" + pos);
		// Clear
		ctx.fillStyle = "#999933";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		// Draw
		for(let i=0; i<10; i++){
			let tA = tiles[i];
			let tB = tiles[i+1];
			let cGrass = (i%2==0) ? "#33dd33":"#33aa33";
			let cSide  = (i%2==0) ? "#333333":"#ffffff";
			let cRoad  = (i%2==0) ? "#dddddd":"#eeeeee";
			drawTrp(tA.X, tA.Y, WIDTH, tB.X, tB.Y, WIDTH, cGrass);
			drawTrp(tA.X, tA.Y, tA.W*1.2, tB.X, tB.Y, tB.W*1.2, cSide);
			drawTrp(tA.X, tA.Y, tA.W, tB.X, tB.Y, tB.W, cRoad);

			//tA.slideZ(10);
		}

		//setTimeout(update, 500);
	}
});

function drawBox(x, y, w, c){
	ctx.strokeStyle = c;
	ctx.strokeRect(x-w/2, y-w/2, w, w);
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

document.addEventListener("keydown", (e)=>{
	let key = e.key;
	if(key == "ArrowUp")   pos+=5;
	if(key == "ArrowDown") pos-=5;
	if(key == "ArrowLeft"){
		console.log(key);
	}
	if(key == "ArrowRight"){
		console.log(key);
	}
});

class Tile{

	constructor(x, y, z, w){
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
		this.project();
	}

	project(){
		this._s = S_DEPTH / (S_DEPTH + this._z);
		this._X = this._x * this._s + WIDTH/2;
		this._Y = this._y * this._s + HEIGHT/2;
		this._W = this._w * this._s;
	}

	slideZ(n){
		this._z += n;
		this.project();
	}

	set x(n){this._x=n;}
	set y(n){this._y=n;}
	set z(n){this._z=n;}

	get X(){return this._X;}
	get Y(){return this._Y;}
	get W(){return this._W;}
}
