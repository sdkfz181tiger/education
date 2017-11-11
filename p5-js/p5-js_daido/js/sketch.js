console.log("Hello p5.js!!");

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(0, 0, 0);
	
	noLoop();
	noStroke();// No stroke
}

// 連続処理
function draw(){
	console.log("draw");
}