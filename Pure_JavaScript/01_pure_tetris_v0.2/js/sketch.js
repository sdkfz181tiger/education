"use strict";
//==========
// Pure JavaScript

let MINO_I = [
	[0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0],
	[0, 0, 0, 0,
	 1, 1, 1, 1,
	 0, 0, 0, 0,
	 0, 0, 0, 0]
];

let MINO_L = [
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

let MINO_J = [
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

let MINO_O = [
	[0, 0, 0, 0,
	 0, 4, 4, 0,
	 0, 4, 4, 0,
	 0, 0, 0, 0]
];

let MINO_Z = [
	[0, 0, 0, 0,
	 0, 5, 5, 0,
	 0, 0, 5, 5,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 0, 5, 0,
	 0, 5, 5, 0,
	 0, 5, 0, 0]
];

let MINO_S = [
	[0, 0, 0, 0,
	 0, 6, 6, 0,
	 6, 6, 0, 0,
	 0, 0, 0, 0],
	[0, 6, 0, 0,
	 0, 6, 6, 0,
	 0, 0, 6, 0,
	 0, 0, 0, 0]
];

let MINO_T = [
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
const ROWS   = 15;
const COLS   = 10;
const SIZE   = 16;

// Context
const canvas  = document.getElementById("canvas");
canvas.width  = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");

// Tetris Manager
let tMng = new TetrisManager(ROWS, COLS, MINOS, false);

// Step
step();
function step(){
	let dels = tMng.step();// Step
	console.log("You deleted:" + dels + " lines!!");
	setTimeout(step, 1000);
}

// Update
update();
function update(){

	let sX = Math.floor(WIDTH / 2 - COLS * SIZE / 2);
	let sY = Math.floor(HEIGHT / 2 - ROWS * SIZE / 2);

	// Background
	ctx.fillStyle = "#666666";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = "#999999";
	ctx.fillRect(sX, sY, COLS*SIZE, ROWS*SIZE);

	let data = tMng.getData();
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let i = r*COLS + c;
			let x = sX + c*SIZE;
			let y = sY + r*SIZE;
			if(data[i] == 0) continue;
			ctx.fillStyle = COLORS[data[i]-1];
			ctx.fillRect(x, y, SIZE-1, SIZE-1);
		}
	}

	setTimeout(update, 100);
}

// Keyboard
document.addEventListener("keydown", (e)=>{

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


