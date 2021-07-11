"use strict";
//==========
// JavaScript

// LeftArrow  -> move L
// RightArrow -> move R
// DownArrow  -> speed up
// UpArrow    -> rotate mino

const MINO_I = [
	[0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0],
	[0, 0, 0, 0,
	 1, 1, 1, 1,
	 0, 0, 0, 0,
	 0, 0, 0, 0]
];

const MINO_L = [
	[0, 2, 0, 0,
	 0, 2, 0, 0,
	 0, 2, 2, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 2, 2, 2,
	 0, 2, 0, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 2, 2, 0,
	 0, 0, 2, 0,
	 0, 0, 2, 0],
	[0, 0, 0, 0,
	 0, 0, 2, 0,
	 2, 2, 2, 0,
	 0, 0, 0, 0]
];

const MINO_J = [
	[0, 0, 3, 0,
	 0, 0, 3, 0,
	 0, 3, 3, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 3, 0, 0,
	 0, 3, 3, 3,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 3, 3, 0,
	 0, 3, 0, 0,
	 0, 3, 0, 0],
	[0, 0, 0, 0,
	 3, 3, 3, 0,
	 0, 0, 3, 0,
	 0, 0, 0, 0]
];

const MINO_O = [
	[0, 0, 0, 0,
	 0, 4, 4, 0,
	 0, 4, 4, 0,
	 0, 0, 0, 0]
];

const MINO_Z = [
	[0, 0, 0, 0,
	 0, 5, 5, 0,
	 0, 0, 5, 5,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 0, 5, 0,
	 0, 5, 5, 0,
	 0, 5, 0, 0]
];

const MINO_S = [
	[0, 0, 0, 0,
	 0, 6, 6, 0,
	 6, 6, 0, 0,
	 0, 0, 0, 0],
	[0, 6, 0, 0,
	 0, 6, 6, 0,
	 0, 0, 6, 0,
	 0, 0, 0, 0]
];

const MINO_T = [
	[0, 0, 0, 0,
	 0, 7, 0, 0,
	 7, 7, 7, 0,
	 0, 0, 0, 0],
	[0, 7, 0, 0,
	 0, 7, 7, 0,
	 0, 7, 0, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 7, 7, 7,
	 0, 0, 7, 0,
	 0, 0, 0, 0],
	[0, 0, 7, 0,
	 0, 7, 7, 0,
	 0, 0, 7, 0,
	 0, 0, 0, 0]
];

const MINOS = [MINO_I, MINO_L, MINO_J, MINO_O, MINO_S, MINO_Z, MINO_T];

const COLORS = ["#E60012", "#F39800", "#FFF100", "#009944", "#0068B7", "#1D2088", "#920783"];

const WIDTH  = 240;
const HEIGHT = 320;
const ROWS   = 18;
const COLS   = 10;
const SIZE   = 16;

let canvas, ctx, oX, oY, tMng;

window.addEventListener("load", (e)=>{
	// Canvas
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;
	// Context
	ctx = canvas.getContext("2d");
	// Offset
	oX = Math.floor(WIDTH / 2 - COLS * SIZE / 2);
	oY = Math.floor(HEIGHT / 2 - ROWS * SIZE / 2);
	// TetrisManager
	tMng = new TetrisManager(ROWS, COLS, MINOS, true);
	step();  // Step
	update();// Update
});

// Step
function step(){
	if(tMng.isGameOver()){
		console.log("GAME OVER");
		return;
	}
	let dels = tMng.stepTetris();// Step
	if(0 < dels){
		console.log("You deleted:" + dels + " lines!!");
	}
	setTimeout(step, 1000);
}

// Update
function update(){

	// Background
	ctx.fillStyle = "#666666";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = "#999999";
	ctx.fillRect(oX, oY, COLS*SIZE, ROWS*SIZE);

	let data = tMng.getData();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let i = r*COLS + c;
			let x = oX + c*SIZE;
			let y = oY + r*SIZE;
			if(data[i] == 0) continue;
			ctx.fillStyle = COLORS[data[i]-1];
			ctx.fillRect(x, y, SIZE-1, SIZE-1);
		}
	}
	setTimeout(update, 100);
}

// Keyboard
document.addEventListener("keydown", (e)=>{
	if(tMng.isGameOver()) return;
	let key = e.keyCode;
	// Left
	if(key == 37){
		tMng.actionLeft();
	}
	// Right
	if(key == 39){
		tMng.actionRight();
	}
	// Down
	if(key == 40){
		tMng.actionDown();
	}
	// Up
	if(key == 38){
		tMng.actionRotateL();
		//tMng.actionRotateR();
	}
});


