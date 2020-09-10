//==========
// p5.js

let cX, cY;

let mySound;
let myAmp;
let myFft;

function preload(){
	console.log("preload!!");
	// Load
	soundFormats("mp3");
	mySound = loadSound("./sounds/bgm.mp3");
}

function setup(){
	console.log("setup!!");
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(8);
	stroke(255);
	strokeWeight(2);
	strokeCap(SQUARE);

	cX = width / 2;
	cY = height / 2;
	
	// Amplitude analyzer
	// Firefox, Chromeでの下記クラスエラー発生の為、保留!!
	myAmp = new p5.Amplitude();
	myAmp.setInput(mySound);
	// FFT
	myFft = new p5.FFT();
}

function draw(){
	background(0);

	// Current time
	let cTime = mySound.currentTime();
	textSize(32);
	textAlign(CENTER);
	text(cTime, width/2, 50);

	console.log(cTime);

	// Level
	// let level = myAmp.getLevel();
	// let hue   = map(level, 0, 1, 0, 360);
	// let size  = map(level, 0, 1, 0, 300);
	// colorMode(HSB);
	// fill(hue, 100, 100);
	// ellipse(width/2, height/2, size, size);
}

function mousePressed(){
	mySound.loop();
}
