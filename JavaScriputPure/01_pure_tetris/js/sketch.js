"use strict";
//==========
// Pure JavaScript

// Context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "darkblue";
ctx.fillRect(0, 0, 320, 480);

// Tetris Manager
let tMng = new TetrisManager(true);

update();
function update(){
	console.log("update!!");
	let data = tMng.update();
	setTimeout(update, 1000);
}
