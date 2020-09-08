console.log("Hello p5.js!!");

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	noStroke();// No stroke
	fill(0, 200, 0);// Fill green
}

function draw(){
	console.log("draw");

	// 全体を黒にする
	background(0);

	// 繰り返し処理
	for(var i=0; i<5; i++){
		// Rect
		rect(0, 30 * i, 100, 20);
	}
}