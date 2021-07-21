const DIR = "./assets/";
const F_RATE = 32;

let fDigital;
let seDanger, seGameOver, seScore, seTempo;
let deadFlg = false;
let score = 0;

function preload(){
	// Font
	fDigital   = loadFont(DIR + "PixelLcd7.ttf");
	// Sound
	seDanger   = loadSound(DIR + "se_danger.mp3");
	seGameOver = loadSound(DIR + "se_gameover.mp3");
	seScore    = loadSound(DIR + "se_score.mp3");
	seTempo    = loadSound(DIR + "se_tempo.mp3");
}

function setup(){
	createCanvas(480, 360);
	angleMode(DEGREES);
	frameRate(F_RATE);
	noSmooth();
	textFont(fDigital, 14);
	textAlign(LEFT, TOP);
}

function draw(){
	background(128, 220, 128);
	drawSprites();
	showScore();

	if(frameCount%F_RATE==0){
		//seTempo.play();
	}
}

function showScore(){
	// How to play
	textAlign(CENTER, BOTTOM);
	textFont(fDigital, 24);
	fill(0, 66, 0);
	text("<- Left key | Right key ->", width/2, height - 5);
	// Score
	let digits = "";
	let length = score.toString().length;
	for(let i=0; i<length; i++) digits += "8";
	textAlign(LEFT, TOP);
	textFont(fDigital, 50);
	fill(120, 180, 120);
	text(digits, width/2, 10);
	fill(0, 66, 0);
	text(score, width/2, 10);
	// GameOver
	if(deadFlg){
		textAlign(CENTER, BOTTOM);
		textFont(fDigital, 36);
		fill(0, 66, 0);
		text("GAME OVER", width/2, height/2);
	}
}
