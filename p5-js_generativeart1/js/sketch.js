console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

var degree = 0;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(0);

	noFill();
	stroke(255, 255, 255);
	strokeWeight(1);

	rectMode(CENTER);
	translate(240, 160);

	// R, G, B
	colorMode(HSB, 255, 255, 255);
}

// 連続処理
function draw(){
	console.log("draw");
	background(33, 33, 33);

	if(360 <= degree) degree = 0;
	degree += 5;

	let sin = Math.sin(degree * DEG_TO_RAD);
	let width = map(sin, -1, 1, 170, 200);
	let c = map(sin, -1, 1, 0, 50);
	stroke(c, 255, 255);

	for(let i=0; i<9; i++){
		rotate(10 * DEG_TO_RAD);
		rect(0, 0, width, width);
	}
}