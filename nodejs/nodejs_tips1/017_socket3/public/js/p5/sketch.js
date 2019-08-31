console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	background(0);

	fill(255, 255, 255);
	noStroke();

	rectMode(CENTER);
}

// 連続処理
function draw(){
	console.log("draw");
}