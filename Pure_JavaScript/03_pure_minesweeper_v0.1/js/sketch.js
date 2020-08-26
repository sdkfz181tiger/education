"use strict";
//==========
// Pure JavaScript

const WIDTH  = 320;
const HEIGHT = 240;
const ROWS   = 15;
const COLS   = 10;
const SIZE   = 16;

// Context
const canvas  = document.getElementById("canvas");
canvas.width  = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");

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

	setTimeout(update, 1000);
}

// Keyboard
document.addEventListener("keydown", (e)=>{
	
});


