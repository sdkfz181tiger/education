console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

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

	var dObj    = new Date();
	var hours   = dObj.getHours();
	var minutes = dObj.getMinutes();
	var seconds = dObj.getSeconds();
	var millis  = dObj.getMilliseconds();

	drawClockSec1(seconds);
	drawClockSec2(seconds);
	drawClockArc(hours, minutes, seconds);
	drawClockTime(hours, minutes, seconds);
	drawClockDots();
}

function drawClockTime(h, m, s){

	if(h < 10) h = "0" + h;
	if(m < 10) m = "0" + m;
	if(s < 10) s = "0" + s;
	var str = h + ":" + m + ":" + s;

	fill(255, 255, 255);
	noStroke();
	textAlign(CENTER);
	text(str, 240, 170);
}

function drawClockArc(h, m, s){

	var degStart = -90;
	var degSec   = s * 360 / 60;
	var degMin   = m * 360 / 60;
	var degHour  = h * 360 / 24;

	noFill();
	stroke(255, 255, 255);
	strokeWeight(12);
	strokeCap(SQUARE);

	// Seconds
	arc(240, 160, 250, 250, degStart * DEG_TO_RAD, (degStart + degSec) * DEG_TO_RAD);
	// Minutes
	arc(240, 160, 200, 200, degStart * DEG_TO_RAD, (degStart + degMin) * DEG_TO_RAD);
	// Hours
	arc(240, 160, 150, 150, degStart * DEG_TO_RAD, (degStart + degHour) * DEG_TO_RAD);
}

function drawClockDots(){

	for(var i=1; i<=12; i++){

		var posX = 240 + 140 * Math.cos((i * 30) * DEG_TO_RAD);
		var posY = 160 + 140 * Math.sin((i * 30) * DEG_TO_RAD);

		fill(255, 255, 255);
		noStroke();
		rectMode(CENTER);
		rect(posX, posY, 5, 5);
	}
}

function drawClockSec1(s){

	var paddingX = 480 / 60;

	for(var i=0; i<s; i++){
		fill(100, 33, 100);
		noStroke();
		rect(paddingX * i, 0, 5, 320);
	}
}

function drawClockSec2(s){
	
	var degStart = -90;
	var degSec   = s * 360 / 60;

	var posX = 240 + 125 * Math.cos((degStart + degSec) * DEG_TO_RAD);
	var posY = 160 + 125 * Math.sin((degStart + degSec) * DEG_TO_RAD);

	push();
	translate(posX, posY);
	rotate((degStart + degSec + 180) * DEG_TO_RAD);
	fill(255, 255, 255);
	noStroke();
	textAlign(CENTER);
	text(s, 0, 0);
	pop();
}