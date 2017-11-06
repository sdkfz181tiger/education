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
	stroke(255);
	fill(255);
}

function draw(){
	console.log("draw");

	// 全体を黒にする
	background(0);

	var cX = width * 0.5;
	var cY = height * 0.5;

	for(var i=0; i<360; i+=30){
		var deg = i;
		var length = Math.floor(100 * i / 360);
		drawBar(cX, cY, deg, length);
	}
}

// 関数を用意する
function drawBar(x, y, deg, length){

	var radian = deg * Math.PI / 180;
	var radius = 50;
	var sin    = Math.sin(radian);
	var cos    = Math.cos(radian);

	var sX     = x + sin * radius;
	var sY     = y + cos * radius;
	var dX     = x + Math.sin(radian) * (radius + length);
	var dY     = y + Math.cos(radian) * (radius + length);

	// Line
	strokeWeight(4);
	line(sX, sY, dX, dY);

	// Text
	strokeWeight(0);
	textFont(font);
	textSize(18);
	textAlign(CENTER, TOP);

	// Rotate
	push();
	translate(dX, dY);
	rotate(-radian);
	text(deg, 0, 0);
	pop();
}