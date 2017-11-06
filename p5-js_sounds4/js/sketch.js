console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const NUM_OFFSET = 8;

var pSnd;
var mPigImg;

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
	pSnd = loadSound("assets/bgm.mp3");

	// Image
	bMarkerImg = loadImage("assets/b_marker.png");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(8);
	background(0);

	// Amp
	myAmp = new p5.Amplitude();

	// FFT
	myFft = new p5.FFT();

	// Sound
	if(pSnd.isPlaying()) pSnd.stop();
	pSnd.play();
}

function draw(){
	//console.log("draw");
	background(0);

	// データを少なくする
	var waveform = myFft.waveform();
	var data = new Array();
	for(var i=0; i<waveform.length; i+=NUM_OFFSET){
		data.push(waveform[i]);
	}

	showWaves(data);
	showCircles(data);
}

function showWaves(data){

	stroke(105, 255, 100);
	strokeWeight(1);
	noFill();

	var cX = width / 2;
	var cY = height / 2;

	// 中心から外に向けて線を引いていく
	for(var i=0; i<data.length; i++){
		var radian = i * DEG_TO_RAD;
		var radius = map(data[i], -1, 1, 0, 160);
		var posX = cX + radius * Math.cos(radian);
		var posY = cY + radius * Math.sin(radian);
		line(cX, cY, posX, posY);
	}
}

function showCircles(data){

	stroke(105, 100, 255);
	strokeWeight(1);
	noFill();

	// データの値それぞれに線を引いていく
	beginShape();
	for(var i=0; i<data.length; i++){
		var posX = map(i, 0, data.length-1, 0, width);
		var posY = map(data[i], -1, 1, 0, height);
		vertex(posX, posY);
	}
	endShape();
}