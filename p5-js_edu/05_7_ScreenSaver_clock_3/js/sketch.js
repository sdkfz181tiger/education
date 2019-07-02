console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const CENTER_X = 240;
const CENTER_Y = 140;

let font = null;

function preload(){
	console.log("preload!!");
	font = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	frameRate(16);
}

function draw(){
	console.log("draw!!");
	background(33, 33, 33);

	fill(100);
	noStroke();

	let date = new Date();
	let hour = date.getHours() % 12;
	let min  = date.getMinutes();
	let sec  = date.getSeconds();

	let strHour = (hour < 10) ? "0"+hour:hour;
	let strMin  = (min  < 10) ? "0"+min:min;
	let strSec  = (sec  < 10) ? "0"+sec:sec;
	let str = strHour + ":" + strMin + ":" + strSec;
	fill(200);
	textSize(32);
	textAlign(CENTER);
	textFont(font);
	text(str, 240, 280);

	// Hours
	drawLine(hour, 50, 12, 6);

	// Minutes
	drawLine(min, 75, 60, 3);

	// Seconds
	drawLine(sec, 100, 60, 1);
}

function drawLine(num, radius, max, weight){
	let interval = 360 / max;
	for(let i=0; i<max; i++){
		let rad = (i * interval - 90) * DEG_TO_RAD;
		let x = CENTER_X + radius * Math.cos(rad);
		let y = CENTER_Y + radius * Math.sin(rad);
		if(i == num){
			fill(255);
			stroke(200);
			strokeWeight(weight);
			strokeCap(PROJECT);
			line(CENTER_X, CENTER_Y, x, y);
		}else{
			fill(100);
		}
		noStroke();
		circle(x, y, 5, 5);
	}
}