/******************
Code by Shimeji Ozaki
Original code link:
https://www.openprocessing.org/
******************/

"use strict";
//==========
// p5.js

let num = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(1);// 1秒間に1回だけdrawを実行する
	background(200);
	
	textSize(32);
	textAlign(CENTER);
}

function draw(){
	background(200);

	let cX = width / 2;
	let cY = height / 2;
	
	fill(33);
	text(num, cX, cY-50);

	if(num == 0){
		text("大吉!!", cX, cY);
	}else if(num == 1){
		text("中吉!!", cX, cY);
	}else if(num == 2){
		text("小吉!!", cX, cY);
	}else if(num == 3){
		text("吉!!", cX, cY);
	}else if(num == 4){
		text("末吉!!", cX, cY);
	}else if(num == 5){
		text("凶!!", cX, cY);
	}else{
		text("大凶!!", cX, cY);
	}

	num++;
	if(num > 6){
		num = 0;
	}
}

function mousePressed(){
	noLoop();
}