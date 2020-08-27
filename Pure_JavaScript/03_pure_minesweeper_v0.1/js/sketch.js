"use strict";
//==========
// Pure JavaScript

const WIDTH  = 320;
const HEIGHT = 240;
const ROWS   = 9;
const COLS   = 10;
const PAD    = 24;
const SIZE   = 22;

// Context
const canvas  = document.getElementById("canvas");
canvas.width  = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");
ctx.font = SIZE + "px Arial";
ctx.textAlign = "center";

const oX = Math.floor(WIDTH / 2 - COLS * PAD / 2);
const oY = Math.floor(HEIGHT / 2 - ROWS * PAD / 2);

let msMng = new MineSweeper(ROWS, COLS, 5);
show();

function show(){
	// Background
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = "#666666";
	ctx.fillRect(oX, oY, COLS*PAD-1, ROWS*PAD-1);

	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let x = oX + c * PAD;
			let y = oY + r * PAD;

			let cell = msMng.getCell(r, c);
			if(cell == -1){
				ctx.fillStyle = "#999999";
				ctx.fillRect(x, y, SIZE, SIZE);
				continue;
			}
			if(cell == 0){
				ctx.fillStyle = "#339944";
				ctx.fillRect(x, y, SIZE, SIZE);
				continue;
			}
			if(0 < cell && cell < 9){
				ctx.fillStyle = "#338888";
				ctx.fillRect(x, y, SIZE, SIZE);
				ctx.fillStyle = "#ffffff";
				ctx.fillText(cell, x+SIZE/2, y+SIZE*0.9, SIZE);
				continue;
			}
			if(cell == 9){
				ctx.fillStyle = "#993333";
				ctx.fillRect(x, y, SIZE, SIZE);
				ctx.fillStyle = "#ffffff";
				ctx.fillText("X", x+SIZE/2, y+SIZE*0.9, SIZE);
				continue;
			}
		}
	}
	//msMng.consoleAll();
}

// Keyboard
document.addEventListener("click", (e)=>{
	let r = Math.floor((e.y - oY) / PAD);
	let c = Math.floor((e.x - oX) / PAD);
	if(msMng.search(r, c)){
		console.log("GAME OVER");
	}
	show();
});