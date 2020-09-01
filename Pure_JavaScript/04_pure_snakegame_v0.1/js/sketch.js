"use strict";
//==========
// Pure JavaScript

const WIDTH  = 320;
const HEIGHT = 320;
const ROWS   = 9;
const COLS   = 9;
const PAD    = 32;
const SIZE   = 30;

let canvas, ctx, oX, oY;
let sgMng;

// On loaded
window.addEventListener("load", (e)=>{
	console.log("Hello");
	// Context
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;

	ctx = canvas.getContext("2d");
	ctx.font = SIZE + "px Arial";
	ctx.textAlign = "center";

	oX = Math.floor(WIDTH / 2 - COLS * PAD / 2);
	oY = Math.floor(HEIGHT / 2 - ROWS * PAD / 2);

	sgMng = new SnakeGame(ROWS, COLS);
	show();
});

function show(){
	// Background
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = "#444444";
	ctx.fillRect(oX, oY, COLS*PAD-1, ROWS*PAD-1);
}

// Keyboard
document.addEventListener("click", (e)=>{
	let r = Math.floor((e.y - oY) / PAD);
	let c = Math.floor((e.x - oX) / PAD);
	
	show();
});