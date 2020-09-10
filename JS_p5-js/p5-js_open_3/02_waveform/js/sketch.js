//==========
// p5.js

const palette = ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"];

let cX, cY;

let mySound;
let myAmp;
let myFft;

let sound, amplitude;

function preload(){
  mySound = loadSound('sounds/bgm.mp3');
}
function setup() {
  let cnv = createCanvas(100,100);
  //cnv.mouseClicked(toggleSound);
  myAmp = new p5.Amplitude();
}

/*
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
	noLoop();
	stroke(255);
	strokeWeight(2);
	strokeCap(SQUARE);

	//mySound.loop();

	cX = width / 2;
	cY = height / 2;

	// Amp

// create a new Amplitude analyzer
  myAmp = new p5.Amplitude();

  // Patch the input to an volume analyzer
  myAmp.setInput(mySound);


	// FFT
	//myFft = new p5.FFT();
}
*/

function draw(){
	background(0);

	// Current time
	let cTime = mySound.currentTime();
	textSize(32);
	textAlign(CENTER);
	text(cTime, width/2, 50);

	// Level
	// let level = myAmp.getLevel();
	// let hue   = map(level, 0, 1, 0, 360);
	// let size  = map(level, 0, 1, 0, 300);
	// colorMode(HSB);
	// fill(hue, 100, 100);
	// ellipse(width/2, height/2, size, size);
}

