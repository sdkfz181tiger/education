console.log("Hello p5.js!!");

var font;

function preload() {
  font = loadFont("assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	noLoop();
	noStroke();
	fill(255);

	// 円グラフを描く
	var start = 0 * Math.PI / 180;
	var end   = 270 * Math.PI / 180;
	fill(0, 200, 0);// Fill green
	arc(50, 50, 80, 80, start, end, PIE);

	// テキストを表示
	textSize(20);
	textFont(font);
	text("75%", 55, 45);
}

function draw(){
	console.log("draw");
}