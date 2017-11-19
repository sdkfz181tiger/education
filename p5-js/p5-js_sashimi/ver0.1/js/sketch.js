console.log("Hello p5.js!!");

let sSpr;
let score;
let total;

function preload(){

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
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
	fill(255, 255, 255);
	noStroke();

	// Sashimi
	sSpr = createSprite(0, height/2, 30, 30);
	sSpr.shapeColor = color(255, 255, 255);

	score = 0;
	total = 0;

	// Show
	startSashimi();
}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);

	// Score
	let distance = sSpr.position.x - width / 2;
	score = 100 - floor(abs(distance));
	if(score < 0) score = 0;

	textSize(48);
	textAlign(LEFT);
	text(score, 10, 50);
	textAlign(RIGHT);
	text(total, width - 10, 50);

	if(width < sSpr.position.x){
		stopSashimi();
	}

	// Sprites
	drawSprites();
}

// マウスが押されたら
function mousePressed(){
	console.log("mousePressed");

	// Judge
	judgeSashimi();
}

function startSashimi(){
	console.log("start!!");

	sSpr.position.x = 0;
	sSpr.position.y = height / 2;

	let speed = random(5, 10);
	let delay = random(1, 2);
	setTimeout(()=>{
		sSpr.setSpeed(speed, 0);
	}, delay * 1000);
}

function stopSashimi(){
	console.log("stop!!");

	sSpr.position.x = 0;
	sSpr.position.y = height / 2;

	sSpr.setSpeed(0);
	setTimeout(()=>{
		startSashimi();
	}, 2000);
}

function judgeSashimi(){
	console.log("judge!!");

	total += score;

	sSpr.setSpeed(0);
	setTimeout(()=>{
		startSashimi();
	}, 2000);
}