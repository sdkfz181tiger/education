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
var nums = [ 0,  0,  0,   0];
var maxs = [30, 60, 90, 120];

function draw(){
	console.log("draw");

	// 全体を黒にする
	background(0);

	// 繰り返し処理
	for(var i=0; i<nums.length; i++){

		// numsとmaxsの値を比較する
		if(nums[i] < maxs[i]){
			// 配列それぞれのデータに加算する
			nums[i]++;
		}

		// Rect
		rect(0, 30 * i, nums[i], 20);
	}
}