//==========
// p5.js

const palette = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];

let cX, cY;
let deg = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(32);
	noFill();

	cX = width / 2;
	cY = height / 2;
}

function draw(){
	background(0);

	//noStroke();
	//fill(11, 22, 66, 33)
	//rect(0, 0, width, height);

	//let i = floor(random(palette.length));
	stroke(255);
	strokeWeight(1);
	strokeCap(SQUARE);

	deg += 6;
	
	let m = 15;
	let p = 360 / m;
	let r = 40;
	let s = 10;
	drawCircle(m, p, r,     s*0.5, deg);
	drawCircle(m, p, r*1.5, s*1.0, deg);
	drawCircle(m, p, r*2.0, s*1.5, deg);
	drawCircle(m, p, r*2.5, s*2.0, deg);
}

function drawCircle(m, p, r, s, d){
	for(let i=0; i<m; i++){
		let x = cX + cos(i*p) * (r+cos(i)*r);
		let y = cY + sin(i*p) * (r+sin(i)*r);
		drawSquare(x, y, (sin(i*p+d)+1)*s);
	}
}

function drawSquare(x, y, r){
	push();
	translate(x, y);
	rotate(r-45);
	square(0, 0, r);
	pop();
}

