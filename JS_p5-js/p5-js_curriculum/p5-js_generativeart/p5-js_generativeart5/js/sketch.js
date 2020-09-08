console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

let deg;
let r, g, b;

let xoff;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(200);

	deg = 0;
	r = 100;
	g = 100;
	b = 100;

	xoff = 0.0;

	noFill();
	stroke(r, g, b);
	strokeWeight(0.5);
}

// 連続処理
function draw(){
	console.log("draw");

	// Degree 0 -> 360
	deg++;
	if(360 < deg) deg = 0;

	xoff += 0.005;
	let cX = noise(xoff) * width;
	let cY = height / 2;

	let radius = 150;
	let radian1 = deg * DEG_TO_RAD;
	let p1X = cX + radius * Math.cos(radian1);
	let p1Y = cY + radius * Math.sin(radian1);
	line(cX, cY, p1X, p1Y);
}