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

	//==========
	// 変数を使う
	var num1 = 100;
	var num2 = 200;
	var num3 = 300;

	fill(200, 0, 0);// Fill green

	// Rect
	rect(0, 0,  num1, 20);
	rect(0, 30, num2, 20);
	rect(0, 60, num3, 20);

	//==========
	// 配列を使う
	var nums = [100, 200, 300];

	fill(0, 0, 200);// Fill green

	// Rect
	rect(0, 90,  nums[0], 20);
	rect(0, 120, nums[1], 20);
	rect(0, 150, nums[2], 20);
}