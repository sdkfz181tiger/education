
let palette = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];

let cX, cY;
let radius = 0;
let deg = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(32);
	noFill();
	stroke(255);

	cX = width / 2;
	cY = height / 2;
}

function draw(){
	background(33);

	radius += 0.1;
	deg += 0.1;

	for(let i=0; i<360*9; i+=5){
		let x = cX + (i) * sin(i+deg);
		let y = cY + (i) * cos(i+deg);
		circle(x, y, 4);
	}
}