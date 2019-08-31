console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

let x, y;
let radian, radius, size;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(0);

	fill(255, 255, 255);
	noStroke();

	rectMode(CENTER);

	// x, y
	x = width / 2;
	y = height / 2;
	radian = 0.0;
	radius = 5.0;
	size   = 3.0;
}

// 連続処理
function draw(){
	console.log("draw");
	//background(33, 33, 33);

	// Random
	var r = Math.floor(Math.random() * 100) + 155;
	var g = Math.floor(Math.random() * 55) + 200;
	var b = Math.floor(Math.random() * 55) + 100;
	fill(r, g, b);

	// Walk
	let rdm = Math.floor(Math.random() * 180) - 90;
	radian += DEG_TO_RAD * rdm;
	x = x + radius * Math.cos(radian);
	y = y + radius * Math.sin(radian);
	if(x < 0 || width < x || y < 0 || height < y){
		x = width / 2;
		y = height / 2;
	}
	rect(x, y, size, size);
}
