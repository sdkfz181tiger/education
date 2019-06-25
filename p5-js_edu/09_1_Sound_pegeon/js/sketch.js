console.log("Hello p5.js!!");

const title = "Pegeon Simulator_ver1.0.0";

let sndP1, sndP2, sndP3, sndP4;
let imgA, imgB, imgC, imgD;
let imgPark, imgPegeon;
let sprPegeon;
let myAmp, myFft;

function preload(){
	console.log("preload!!");

	// Load
	soundFormats("mp3", "ogg");
	sndP1 = loadSound("./assets/pegeon_1.mp3");
	sndP2 = loadSound("./assets/pegeon_2.mp3");
	sndP3 = loadSound("./assets/pegeon_3.mp3");
	sndP4 = loadSound("./assets/pegeon_4.mp3");

	// Image
	imgPark = loadImage("./assets/park.png");
	imgA = loadImage("./assets/btn_a.png");
	imgB = loadImage("./assets/btn_b.png");
	imgC = loadImage("./assets/btn_c.png");
	imgD = loadImage("./assets/btn_d.png");
	imgPegeon = loadImage("./assets/pegeon.png");

	// Amp
	myAmp = new p5.Amplitude();
	// FFT
	myFft = new p5.FFT();
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33);

	// Park
	let sprPark = createSprite(240, 130, 32, 32);
	sprPark.addImage(imgPark);
	sprPark.scale = 0.4;

	// Pegeon
	sprPegeon = createSprite(240, 130, 32, 32);
	sprPegeon.addImage(imgPegeon);
	sprPegeon.scale = 0.4;

	// Buttons
	let btn1 = createSprite(120, 250, 60, 60);
	btn1.addImage(imgA);
	btn1.onMousePressed = function(){
		sndP1.play();
	}

	let btn2 = createSprite(200, 250, 60, 60);
	btn2.addImage(imgB);
	btn2.onMousePressed = function(){
		sndP2.play();
	}

	let btn3 = createSprite(280, 250, 60, 60);
	btn3.addImage(imgC);
	btn3.onMousePressed = function(){
		sndP3.play();
	}

	let btn4 = createSprite(360, 250, 60, 60);
	btn4.addImage(imgD);
	btn4.onMousePressed = function(){
		sndP4.play();
	}
}

function draw(){
	console.log("draw!!");
	background(33);
	drawSprites();

	fill(255, 255, 255);
	noStroke();

	// Title
	textSize(12);
	textAlign(RIGHT);
	text(title, 475, 315);

	// Level
	let level = myAmp.getLevel();
	let hue   = map(level, 0, 1, 0, 360);
	let size  = map(level, 0, 1, 0, 300);
	colorMode(HSB);
	fill(hue, 100, 100);
	// ellipse(width/2, height/2, size, size);

	// Pegeon
	sprPegeon.scale = map(level, 0, 1, 0.4, 1.0);

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
	const w = 32;
	for(let i=0; i<data.length; i++){
		let h = map(data[i], 0, 255, 0, 100);
		let posX = i * w;
		let posY = 0;
		let hue  = map(posX, 0, 480, 0, 360);
		fill(hue, 100, 100);
		rect(posX, posY, w, h);
	}

	// Circle
	const cX = 240;
	const cY = 160;
	const d = 360 / data.length;
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