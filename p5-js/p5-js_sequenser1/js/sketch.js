console.log("Hello p5.js!!");

let myFft;
let myOsc;
let myEnv;

let scales = [60, 62, 64, 65, 67, 69, 71, 72];

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(24);
	textFont(font);
	textAlign(CENTER);

	// FFT
	myFft = new p5.FFT();
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(64);
	background(0);

	// Osc
	myOsc = new p5.SinOsc();

	// Envelope
	myEnv = new p5.Env();
	// set attackTime, decayTime, sustainRatio, releaseTime
	myEnv.setADSR(0.001, 0.5, 0.1, 0.5);
	// set attackLevel, releaseLevel
	myEnv.setRange(1, 0);
}

function draw(){
	//console.log("draw");
	background(0);

	showWaves();
}

function mousePressed(){
	
	playMidi(scales[0]);
}

function playMidi(midi){
	let freq = midiToFreq(midi);
	myOsc.freq(freq);
	myOsc.start();
	myEnv.play(myOsc, 0, 0.1);
}

function showWaves(){

	// データを少なくする
	let waveform = myFft.waveform();
	let data = new Array();
	for(let i=0; i<waveform.length; i+=32){
		data.push(waveform[i]);
	}

	stroke(255, 0, 0);
	strokeWeight(1);
	noFill();

	beginShape();
	for(let i=0; i<data.length; i++){
		let posX = map(i, 0, data.length-1, 0, width);
		let posY = map(data[i], -1, 1, 0, height);
		vertex(posX, posY);
	}
	endShape();
}