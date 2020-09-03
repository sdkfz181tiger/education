"use strict";
//==========
// JavaScript

const WIDTH  = 320;
const HEIGHT = 320;
const SIZE   = 8;
const WALL   = 8;

let canvas, ctx, sMng;

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
	// SnakeManager
	sMng = new SnakeManager(WIDTH, HEIGHT, SIZE);
	update();
});

// Update
function update(){
	// Background
	ctx.fillStyle = "#993333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "#333333";
	ctx.fillRect(WALL, WALL, WIDTH-WALL*2, HEIGHT-WALL*2);
	// Update
	sMng.update();
	// Body
	let body = sMng.getBody();
	for(let i=body.length-1; 0<=i; i--){
		if(i == 0){
			ctx.fillStyle = "#ff6633";
		}else{
			ctx.fillStyle = "#6699ff";
		}
		ctx.fillRect(body[i].x, body[i].y, SIZE, SIZE);
	}
	// Foods
	let foods = sMng.getFoods();
	for(let food of foods){
		ctx.fillStyle = "#33dd33";
		ctx.fillRect(food.x, food.y, SIZE, SIZE);
	}
	// GameOver
	if(sMng.isGameOver()){
		console.log("GAME OVER!!");
		ctx.fillStyle = "#ffffff";
		ctx.fillText("GAME OVER!!", WIDTH/2, HEIGHT/2+SIZE/2);
	}else{
		setTimeout(update, 200);// Timeout
	}
}

// Keyboard
document.addEventListener("keydown", (e)=>{
	// Key
	let key = e.keyCode;
	// Left
	if(key == 37){
		sMng.goLeft();
	}
	// Right
	if(key == 39){
		sMng.goRight();
	}
	// Down
	if(key == 40){
		sMng.goDown();
	}
	// Up
	if(key == 38){
		sMng.goUp();
	}
});