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

const MINOS = [MINO_I, MINO_S];

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
let tMng = new TetrisManager(ROWS, COLS, MINOS, true);

// Step
step();
function step(){
	let dels = tMng.step();// Step
	let data = tMng.getData();
	setTimeout(step, 500);
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
});


