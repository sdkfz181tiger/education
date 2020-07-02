/******************
Code by Shimeji Ozaki
Original code link:
https://www.openprocessing.org/
******************/

"use strict";
//==========
// p5.js

let sec = 0;
let cX = 0;
let cY = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(1);// 1秒間に1回だけdrawを実行する
	background(200);
	// 文字サイズ、文字組を中央に
	textSize(32);
	textAlign(CENTER);
	// キャンバスの中央座標を決める
	cX = width / 2;
	cY = height / 2;
}

function draw(){
	background(200);
	
	sec++;
	fill(120);
	text(sec, cX, cY);
}

function mousePressed(){

	fill(30);
	if(sec == 10){
		text("10秒です!!正解!!", cX, cY - 50);
	}else{
		text(sec+"秒です!!残念!!", cX, cY - 50);
	}

	frameRate(0);// 1秒間に0回だけdrawを実行する(止まる)
}