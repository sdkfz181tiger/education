console.log("Hello p5.js!!");

const NUM_OFFSET = 32;

var pSnd;
var mPigImg;

var myAmp;
var myFft;

var offset;
var total;
var markers;

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

	// Total
	total = myFft.waveform().length / NUM_OFFSET;

	// Markers
	markers = new Array();
	for(var i=0; i<total; i++){
		var marker = createSprite(0, 0, 0, 0);
		marker.addImage(bMarkerImg);
		markers.push(marker);
	}

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
	showMarkers(data);
}

function showWaves(data){

	stroke(105, 255, 100);
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

function showMarkers(data){

	// データの値をマーカーの座標に適用させていく
	for(var i=0; i<data.length; i++){
		var posX = map(i, 0, data.length-1, 0, width);
		var posY = map(data[i], -1, 1, 0, height);
		markers[i].position.x = posX;
		markers[i].position.y = posY;
	}

	drawSprites();
}