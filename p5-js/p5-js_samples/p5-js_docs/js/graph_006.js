console.log("Hello p5.js!!");

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	noStroke();// No stroke
	fill(0, 200, 0);// Fill green
}

// 配列を用意する
var nums = [100, 200, 300, 400];

function draw(){
	console.log("draw");

	// 全体を黒にする
	background(0);

	// 繰り返し処理
	for(var i=0; i<nums.length; i++){
		// Rect
		rect(0, 30 * i, nums[i], 20);
	}
}