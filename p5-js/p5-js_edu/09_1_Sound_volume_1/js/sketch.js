console.log("Hello p5.js!!");

let mySound;
let myAmp;

function preload(){
	console.log("preload!!");

	// Load
	soundFormats("mp3", "ogg");
	mySound = loadSound("./assets/music_1.mp3");
	// Amp
	myAmp = new p5.Amplitude();
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

	let cTime = mySound.currentTime();
	textSize(32);
	textAlign(CENTER);
	text(cTime, 240, 50);

	let level = myAmp.getLevel();
	let hue   = map(level, 0, 1, 0, 360);
	let size  = map(level, 0, 1, 0, 300);
	colorMode(HSB);
	fill(hue, 100, 100);
	ellipse(width/2, height/2, size, size);
}