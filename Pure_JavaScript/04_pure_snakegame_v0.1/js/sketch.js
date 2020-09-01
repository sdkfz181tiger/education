"use strict";
//==========
// Pure JavaScript

const WIDTH  = 320;
const HEIGHT = 320;
const WALL   = 8;
const SIZE   = 24;

let canvas, ctx, sMng;

// Window
window.addEventListener("load", (e)=>{
	
	// Canvas and Context
	canvas  = document.getElementById("canvas");
	canvas.width  = WIDTH;
	canvas.height = HEIGHT;

	ctx = canvas.getContext("2d");
	ctx.font = "24px Arial";
	ctx.textAlign = "center";

	// Manager
	sMng = new SnakeGame(WIDTH, HEIGHT, SIZE);
	update();
});

function update(){
	// Background
	ctx.fillStyle = "#993333";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "#333333";
	ctx.fillRect(WALL, WALL, WIDTH-WALL*2, HEIGHT-WALL*2);
	// Update
	sMng.update();
	// Body(Tail)
	let body = sMng.getBody();
	for(let b=1; b<body.length; b++){
		ctx.fillStyle = "#6699ff";
		ctx.fillRect(body[b].x, body[b].y, SIZE, SIZE);
	}
	// Body(Head)
	ctx.fillStyle = "#ff6633";
	ctx.fillRect(body[0].x, body[0].y, SIZE, SIZE);
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