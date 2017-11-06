console.log("Hello p5.js!!");

let myFft;
let myNotes;

const myMidis = [60, 62, 64, 65, 67, 69, 71, 72];

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

	// Notes
	myNotes = new Array();
	let size = 50;
	for(let i=0; i<myMidis.length; i++){
		let posX = i * size;
		let posY = 0;
		let myNote = new MyNote(posX, posY, size, myMidis[i]);
		myNotes.push(myNote);
	}
}

function draw(){
	//console.log("draw");
	background(0);

	drawMatrix();
	showWaves();
}

function mousePressed(e){

	for(myNote of myNotes){
		myNote.mousePressed(e);
		myNote.play();
	}
}

function drawMatrix(){

	for(myNote of myNotes){
		myNote.draw();
	}
}

function showWaves(){

	// データを少なくする
	let waveform = myFft.waveform();
	let data = new Array();
	for(let i=0; i<waveform.length; i+=32){
		data.push(waveform[i]);
	}

	stroke(100, 255, 100);
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

class MyNote{

	constructor(x, y, size, midi){
		this.x = x;
		this.y = y;
		this.size = size;
		this.myOsc = new p5.SinOsc();
		this.myOsc.freq(midiToFreq(midi));
		this.myEnv = new p5.Env();
		this.myEnv.setADSR(0.001, 0.5, 0.1, 0.5);
		this.myEnv.setRange(1, 0);
		this.activeFlg = false;
	}

	get active(){
		return this.activeFlg;
	}

	set active(flg){
		this.activeFlg = flg;
	}

	mousePressed(e){
		if(e.clientX < this.x) return;
		if(this.x + this.size < e.clientX) return;
		if(e.clientY < this.y) return;
		if(this.y + this.size < e.clientY) return;
		this.activeFlg ? this.activeFlg = false : this.activeFlg = true;
	}

	play(){
		if(this.activeFlg == false) return;
		this.myOsc.start();
		this.myEnv.play(this.myOsc, 0, 0.1);
	}

	draw(){
		if(this.activeFlg == true){
			fill(255, 255, 255);
		}else{
			fill(100, 100, 100);
		}
		rect(this.x, this.y, this.size, this.size);
	}
}