console.log("Hello p5.js!!");

let mySound;
let myAmp;
let myFft;

function preload(){
	console.log("preload!!");

	// Load
	soundFormats("mp3", "ogg");
	mySound = loadSound("./assets/music_1.mp3");
	// Amp
	myAmp = new p5.Amplitude();
	// FFT
	myFft = new p5.FFT();
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33);

	// Play
	let btnPlay = createSprite(150, 260, 64, 64);
	btnPlay.shapeColor = color(100, 100, 255);
	btnPlay.onMousePressed = function(){
		mySound.play();
	}

	// Pause
	let btnPause = createSprite(240, 260, 64, 64);
	btnPause.shapeColor = color(100, 255, 100);
	btnPause.onMousePressed = function(){
		mySound.pause();
	}

	// Stop
	let btnStop = createSprite(330, 260, 64, 64);
	btnStop.shapeColor = color(255, 100, 100);
	btnStop.onMousePressed = function(){
		mySound.stop();
	}
}

function draw(){
	console.log("draw!!");
	background(33);
	drawSprites();

	fill(255, 255, 255);
	noStroke();

	// Current time
	let cTime = mySound.currentTime();
	textSize(32);
	textAlign(CENTER);
	text(cTime, 240, 50);

	// Level
	let level = myAmp.getLevel();
	let hue   = map(level, 0, 1, 0, 360);
	let size  = map(level, 0, 1, 0, 300);
	colorMode(HSB);
	fill(hue, 100, 100);
	ellipse(width/2, height/2, size, size);

	// Spectrum
	let spectrum = myFft.analyze();
 
	noStroke();
	fill(100, 255, 100);

	// Data
	let data = [];
	for(let i=0; i<spectrum.length; i+=32){
		if(0 < spectrum[i]) data.push(spectrum[i]);
	}
 
	// Bar
	for(let i=0; i<data.length; i++){
		let barW = 20;
		let barH = map(data[i], 0, 255, 0, 100);
		let posX = i * barW;
		let posY = 0;
		let hue  = map(posX, 0, 480, 0, 360);
		fill(hue, 100, 100);
		rect(posX, posY, barW, barH);
	}

	// Circle
	let cX = 240;
	let cY = 160;
	let d = 360 / data.length;
	for(let i=0; i<data.length; i++){
		let radius = map(data[i], 0, 255, 0, 150);
		let radian = i * d * Math.PI / 180;
		let dX = cX + radius * Math.cos(radian);
		let dY = cY + radius * Math.sin(radian);
		let hue = map(i, 0, data.length, 0, 360);
		stroke(hue, 100, 100);
		strokeWeight(3);
		line(cX, cY, dX, dY);
	}
}