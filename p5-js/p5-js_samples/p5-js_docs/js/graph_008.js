console.log("Hello p5.js!!");

var font;

function preload() {
  font = loadFont("assets/misaki_gothic.ttf");
}

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

		// 関数を呼ぶ
		drawBar(0, 30 * i, nums[i], 20);
	}
}

// 関数を用意する
function drawBar(x, y, w, h){
	// Rect
	rect(x, y, w, h);

	// Text
	textSize(20);
	textFont(font);
	text(w, w, y+h);
}