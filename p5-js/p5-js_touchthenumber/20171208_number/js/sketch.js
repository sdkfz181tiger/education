console.log("Hello p5.js!!");

const pWidth  = 50;
const pHeight = 60;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(64);
	textFont(font);
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	angleMode(DEGREES);
	rectMode(CENTER);

}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);

	// Draw
	drawSprites();
}