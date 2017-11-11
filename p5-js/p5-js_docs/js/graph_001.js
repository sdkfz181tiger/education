console.log("Hello p5.js!!");

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	noLoop();
	noStroke();// No stroke
	fill(0, 200, 0);// Fill green
}

function draw(){
	console.log("draw");

	// 全体を黒にする
	background(0);

	// Rect
	rect(0, 0,  100, 20);
	rect(0, 30, 200, 20);
	rect(0, 60, 300, 20);
}