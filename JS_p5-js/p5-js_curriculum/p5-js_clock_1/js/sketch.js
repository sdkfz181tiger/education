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

	// Format
	var str     = getTimeStr(hours, minutes, seconds);

	fill(255, 255, 255);
	noStroke();
	textAlign(CENTER);
	text(str, 240, 170);

	var rad90   = -90 * DEG_TO_RAD;
	var degSec  = seconds * 360 / 60;
	var degMin  = minutes * 360 / 60;
	var degHour = hours * 360 / 24;

	noFill();
	stroke(255, 255, 255);
	strokeWeight(12);
	strokeCap(SQUARE);

	// Seconds
	arc(240, 160, 250, 250, rad90, rad90 + degSec * DEG_TO_RAD);
	// Minutes
	arc(240, 160, 200, 200, rad90, rad90 + degMin * DEG_TO_RAD);
	// Hours
	arc(240, 160, 150, 150, rad90, rad90 + degHour * DEG_TO_RAD);
}

function getTimeStr(hours, minutes, seconds){
	if(hours < 10)   hours   = "0" + hours;
	if(minutes < 10) minutes = "0" + minutes;
	if(seconds < 10) seconds = "0" + seconds;
	var str = hours + ":" + minutes + ":" + seconds;
	return str;
}

// 関数とは!?

function drawClockTime(h, m, s){

}

function drawClockArc(h, m, s){

}