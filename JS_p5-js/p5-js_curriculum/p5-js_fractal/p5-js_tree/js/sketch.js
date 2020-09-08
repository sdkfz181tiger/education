console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const ANGLE = 30 * DEG_TO_RAD;

function preload(){
	console.log("preload");

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(24);
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(8);
	background(0);
}

function draw(){
	console.log("draw");
	background(0);

	var length = 100;
	stroke(255);
	translate(240, 320);
	branch(length);
}

function branch(len){
	line(0, 0, 0, -len);
	translate(0, -len);

	if(len > 4){
		push();
		rotate(ANGLE);
		branch(len * 0.67);
		pop();
		push();
		rotate(ANGLE * -1);
		branch(len * 0.67);
		pop();
	}
}
