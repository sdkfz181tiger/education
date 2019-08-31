console.log("Hello p5.js!!");

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	noStroke();// No stroke
	fill(0, 200, 0);// Fill green
}

// カウンタ, 最大値
var numCnt = 0;
var numMax = 100;

function draw(){
	console.log("draw");

	// 全体を黒にする
	background(0);

	// 数字に1を足す
	numCnt++;

	// 最大値を判定する
	if(numMax <= numCnt){
		noLoop();// ループの停止
	}

	// Rect
	rect(0, 0, numCnt, 20);
}