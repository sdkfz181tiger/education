"use strict";
//==========
// JavaScript

const WIDTH   = 320;
const HEIGHT  = 320;
const S_DEPTH = 50; // Screen depth
const R_DEPTH = 30; // Road depth
const R_WIDTH = 320;// Road width

let canvas, ctx;
let posZ, tiles;

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
	// Position Z
	posZ = 0;
	// Tiles
	tiles = [];
	for(let i=0; i<10; i++){
		let tile = new Tile(0, 200, R_DEPTH*i);
		tile.project(0, 0, 0);
		tiles.push(tile);
		//drawBox(tile.X, tile.Y, tile.W, "#33ffff");
	}

	// Update
	update();
	function update(){
		// Clear
		ctx.fillStyle = "#333333";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		// Index
		let start = Math.floor(posZ / R_DEPTH) * -1;
		console.log(start);
		// Draw
		for(let i=start; i<start+5; i++){
			let index = i % (tiles.length-1);
			console.log(index, "<->", index+1);
			let tA = tiles[index];
			let tB = tiles[index+1];
			let cGrass = (i%2==0) ? "#33dd33":"#33aa33";
			let cSide  = (i%2==0) ? "#333333":"#ffffff";
			let cRoad  = (i%2==0) ? "#dddddd":"#eeeeee";
			drawTrp(tA.X, tA.Y, WIDTH, tB.X, tB.Y, WIDTH, cGrass);
			drawTrp(tA.X, tA.Y, tA.W*1.2, tB.X, tB.Y, tB.W*1.2, cSide);
			drawTrp(tA.X, tA.Y, tA.W, tB.X, tB.Y, tB.W, cRoad);
		}

		posZ -= 5;
		for(let tile of tiles) tile.project(0, 0, posZ);

		setTimeout(update, 500);
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
	if(key == "ArrowUp"){
		posZ += 5;
		for(let tile of tiles) tile.project(0, 0, posZ);
	}
	if(key == "ArrowDown"){
		posZ -= 5;
		for(let tile of tiles) tile.project(0, 0, posZ);
	}
	// if(key == "ArrowLeft"){
	// 	for(let tile of tiles) tile.offsetX(20);
	// }
	// if(key == "ArrowRight"){
	// 	for(let tile of tiles) tile.offsetX(-20);
	// }
});

class Tile{

	constructor(x, y, z){
		this._x = x;
		this._y = y;
		this._z = z;
	}

	project(oX, oY, oZ){
		let s = S_DEPTH / (S_DEPTH + (this._z+oZ));
		this._X = (this._x+oX) * s + WIDTH/2;
		this._Y = (this._y+oY) * s + HEIGHT/2;
		this._W = R_WIDTH * s;
	}

	get X(){return this._X;}
	get Y(){return this._Y;}
	get W(){return this._W;}
}
