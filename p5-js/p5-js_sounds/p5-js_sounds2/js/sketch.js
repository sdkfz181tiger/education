console.log("Hello p5.js!!");

var pEarthSpr;
var pMoonSpr;
var pMarsSpr;

var pEarthSnd;
var pMoonSnd;
var pMarsSnd;

var pEarthImg;
var pMoonImg;
var pMarsImg;

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
	pEarthSnd = loadSound('assets/bell01.mp3');
	pMoonSnd  = loadSound('assets/bell02.mp3');
	pMarsSnd  = loadSound('assets/bell03.mp3');

	// Image
	pEarthImg = loadImage("assets/planet_01.png");
	pMoonImg  = loadImage("assets/planet_02.png");
	pMarsImg  = loadImage("assets/planet_03.png");

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

	// Earth
	pEarthSpr = createSprite(100, 100, 0, 0);
	pEarthSpr.addImage(pEarthImg);
	pEarthSpr.onMousePressed = function(){
		if(pEarthSnd.isPlaying()) pEarthSnd.stop();
		pEarthSnd.play();
	}

	// Moon	
	pMoonSpr = createSprite(220, 140, 0, 0);
	pMoonSpr.addImage(pMoonImg);
	pMoonSpr.onMousePressed = function(){
		if(pMoonSnd.isPlaying()) pMoonSnd.stop();
		pMoonSnd.play();
	}

	// Mars	
	pMarsSpr = createSprite(340, 180, 0, 0);
	pMarsSpr.addImage(pMarsImg);
	pMarsSpr.onMousePressed = function(){
		if(pMarsSnd.isPlaying()) pMarsSnd.stop();
		pMarsSnd.play();
	}
}

function draw(){
	//console.log("draw");
	background(0);

	showWaves();
	drawSprites();
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