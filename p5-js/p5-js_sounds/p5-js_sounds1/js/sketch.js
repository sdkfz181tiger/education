console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

var mySound;
var myAmp;
var myFft;

function preload(){
	console.log("preload");

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(24);
	textFont(font);
	textAlign(CENTER);

	// Sound
	soundFormats("mp3", "ogg");
	mySound = loadSound('assets/bell09.mp3');

	// Amp
	myAmp = new p5.Amplitude();

	// FFT
	myFft = new p5.FFT();
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(64);
	background(0);
}

function draw(){
	//console.log("draw");
	background(0);

	showTime();
	showLevels();
	showBars();
	showWaves();
}

function mousePressed(){
	if(mySound.isPlaying()) mySound.stop();
	mySound.play();
}

function showTime(){

	noStroke();
	fill(255, 100, 100);

	var cTime = mySound.currentTime();
	text(cTime, 240, 50);
}

function showLevels(){

	noStroke();
	fill(100, 100, 100);

	var level = myAmp.getLevel();
	var size = map(level, 0, 1, 0, 500);
	ellipse(width/2, height/2, size, size);
}

function showBars(){

	// データを少なくする
	var spectrum = myFft.analyze();
	var data = new Array();
	for(var i=0; i<spectrum.length; i+=32){
		data.push(spectrum[i]);
	}

	noStroke();
	fill(100, 255, 100);

	// Bar
	for(var i=0; i<data.length; i++){
		var posX = i * barWidth;
		var posY = 0;
		var barWidth = 10;
		var barHeight = map(data[i], 0, 255, 0, 100);
		rect(posX, posY, barWidth, barHeight);
	}
}

function showWaves(){

	// データを少なくする
	var waveform = myFft.waveform();
	var data = new Array();
	for(var i=0; i<waveform.length; i+=32){
		data.push(waveform[i]);
	}

	stroke(255, 0, 0);
	strokeWeight(1);
	noFill();

	beginShape();
	for(var i=0; i<data.length; i++){
		var posX = map(i, 0, data.length, 0, width);
		var posY = map(data[i], -1, 1, 0, height);
		vertex(posX, posY);
	}
	endShape();
}