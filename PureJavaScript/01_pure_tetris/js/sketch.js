"use strict";
//==========
// Pure JavaScript

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
let tMng = new TetrisManager(ROWS, COLS, false);

update();
function update(){
	console.log("update!!");

	// Background
	ctx.fillStyle = "#999999";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	let sX = Math.floor(WIDTH / 2 - COLS * SIZE / 2);
	let sY = Math.floor(HEIGHT / 2 - ROWS * SIZE / 2);

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
		if(tMng.checkWallL()) return;
		tMng.stepLeft();
		if(tMng.checkCollision()) tMng.stepRight();
	}
	// Right
	if(key == 39){
		if(tMng.checkWallR()) return;
		tMng.stepRight();
		if(tMng.checkCollision()) tMng.stepLeft();
	}
	// Down
	if(key == 40){
		tMng.stepDown();
		if(tMng.checkCollision()){
			tMng.stepUp();
			tMng.fixMino();
			tMng.createMino();
		}
	}
	// Up
	if(key == 38){
		tMng.rotateL();
		if(tMng.checkCollision()){
			tMng.rotateR();
		}else{
			tMng.checkRotation();
		}
	}
});


