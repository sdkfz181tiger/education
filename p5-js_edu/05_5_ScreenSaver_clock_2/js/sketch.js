console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

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

	let cX = width * 0.5;
	let cY = height * 0.5 - 20;

	let date = new Date();
	let hour = date.getHours();
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
	let radius = 50;
	let span = 360 / 24;
	for(let i=0; i<24; i++){
		let rad = (i * span - 90) * DEG_TO_RAD;
		let x = cX + radius * Math.cos(rad);
		let y = cY + radius * Math.sin(rad);
		if(i == hour){
			fill(255);
			stroke(200);
			strokeWeight(6);
			strokeCap(PROJECT);
			line(cX, cY, x, y);
			noStroke();
		}else{
			fill(100);
		}
		circle(x, y, 5, 5);
	}

	// Minutes
	radius = 80;
	span = 360 / 60;
	for(let i=0; i<60; i++){
		let rad = (i * span - 90) * DEG_TO_RAD;
		let x = cX + radius * Math.cos(rad);
		let y = cY + radius * Math.sin(rad);
		if(i == min){
			fill(255);
			stroke(200);
			strokeWeight(3);
			strokeCap(PROJECT);
			line(cX, cY, x, y);
			noStroke();
		}else{
			fill(100);
		}
		circle(x, y, 5, 5);
	}

	// Seconds
	radius = 100;
	span = 360 / 60;
	for(let i=0; i<60; i++){
		let rad = (i * span - 90) * DEG_TO_RAD;
		let x = cX + radius * Math.cos(rad);
		let y = cY + radius * Math.sin(rad);
		if(i == sec){
			fill(255);
			stroke(200);
			strokeWeight(1);
			strokeCap(PROJECT);
			line(cX, cY, x, y);
			noStroke();
		}else{
			fill(100);
		}
		circle(x, y, 8, 8);
	}
}