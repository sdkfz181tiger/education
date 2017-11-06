
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function setup(){
	console.log("setup");

	// Canvas
	createCanvas(480, 320);

	// Background
	background(0);

	// Set the frame rate to 1 draw() call per second
	frameRate(16);

	// No stroke
	stroke(255);
}

// Degree
var deg    = 0;
var radius = 100;

var toggle = false;
var speed  = 1;

function draw(){
	console.log("draw");

	background(0);

	// Center
	var centerX = width / 2;
	var centerY = height / 2;

	// DEG_TO_RAD
	deg += speed;
	if(360 <= deg) deg = 0;
	var radian = deg * DEG_TO_RAD;

	// Clock
	var x = radius * Math.cos(radian);
	var y = radius * Math.sin(radian);
	line(centerX, centerY, centerX + x, centerY + y);
}

// MouseEvent
function mousePressed(){
	console.log("mousePressed");
	speed = -1;
}

function mouseReleased(){
	console.log("mouseReleased");
	speed = 1;
}

function mouseClicked(){
	console.log("mouseClicked");
}

function mouseDragged(){
	console.log("mouseDragged");
	if(speed == 0){
		// Do nothing
	}else if(speed < 0){
		speed -= 0.5;
	}else if(0 < speed){
		speed += 0.5;
	}
}