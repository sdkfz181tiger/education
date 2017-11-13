console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

let deg;

let xoff;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);

	deg = 0;

	xoff = 0.0;

	noFill();
	stroke(0, 0, 0);
	strokeWeight(1.0);
}

// 連続処理
function draw(){
	console.log("draw");

	// Color
	xoff += 0.05;
	let c = 55 + floor(noise(xoff) * 200);
	stroke(c, c, c);

	// Degree 0 -> 360
	deg++;
	if(360 < deg) deg = 0;

	let cX = deg;
	let cY = deg;

	let radius = deg;
	let radian1 = deg * DEG_TO_RAD;
	let p1X = cX + radius * Math.cos(radian1);
	let p1Y = cY + radius * Math.sin(radian1);
	line(cX, cY, p1X, p1Y);
}