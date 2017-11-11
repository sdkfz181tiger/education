console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const NUM_OFFSET = 32;

let pSnd;

let myAmp;
let myFft;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(24);
	textFont(font);
	textAlign(CENTER);
	rectMode(CENTER);

	// Sound
	soundFormats("mp3", "ogg");
	pSnd = loadSound("assets/bgm.mp3");

	// Image
	bMarkerImg = loadImage("assets/b_marker.png");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
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
	let waveform = myFft.waveform();
	let data = new Array();
	for(let i=0; i<waveform.length; i+=NUM_OFFSET){
		data.push(waveform[i]);
	}

	showCircles(data);
}

function showCircles(data){

	let cX = width / 2;
	let cY = height / 2;
	let interval = 360 / data.length;
	let offset = 50;

	// 中心から外に向けて線を引いていく
	for(let i=0; i<data.length; i++){
		let radian = i * interval * DEG_TO_RAD;
		let radius = map(data[i], -1, 1, 0, 100);
		let fromX  = cX + offset * Math.cos(radian);
		let fromY  = cY + offset * Math.sin(radian);
		let toX    = cX + (offset + radius) * Math.cos(radian);
		let toY    = cY + (offset + radius) * Math.sin(radian);
		let g      = map(data[i], -1, 1, 100, 255);
		stroke(200, g, 255);
		strokeWeight(1);
		line(fromX, fromY, toX, toY);
		noStroke();
		fill(200, g, 255);
		rect(toX, toY, 4, 4);
	}
}