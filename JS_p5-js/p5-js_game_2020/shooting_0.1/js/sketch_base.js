console.log("Hello p5.js!!");

const DISP_W     = 480;
const DISP_H     = 320;
const BALL_W     = 10;
const BALL_H     = 10;
const BALL_SPEED = 10;
const PADDLE_W   = 50;
const PADDLE_H   = 10;
const BLOCK_W    = 30;
const BLOCK_H    = 10;

const FONT_SIZE  = 16;

var ball, pCenter
var wTop, wBottom, wLeft, wRight;
var blocks;
var score;
var sScore;

var img;

function preload(){
	console.log("preload");

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(FONT_SIZE);
	textFont(font);

	// Sound
	sScore = loadSound("assets/s_score.mp3");
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	background(0);
	fill(255, 255, 255);
	noStroke();

	// Ball
	ball = createSprite(DISP_W*0.5, DISP_H*0.5, BALL_W, BALL_H);
	ball.shapeColor = color(255, 255, 255);
	ball.setSpeed(BALL_SPEED, 90);

	// Paddle(Center)
	pCenter = createSprite(DISP_W*0.5, DISP_H-30, PADDLE_W, PADDLE_H);
	pCenter.shapeColor = color(255, 255, 255);
	pCenter.immovable = true;

	// Wall
	wTop = createSprite(DISP_W*0.5, 0, DISP_W, 5);
	wTop.shapeColor = color(200, 200, 200);
	wTop.immovable = true;

	wBottom = createSprite(DISP_W*0.5, DISP_H, DISP_W, 5);
	wBottom.shapeColor = color(200, 200, 200);
	wBottom.immovable = true;

	wLeft = createSprite(0, DISP_H*0.5, 5, DISP_W);
	wLeft.shapeColor = color(200, 200, 200);
	wLeft.immovable = true;

	wRight = createSprite(DISP_W, DISP_H*0.5, 5, DISP_H);
	wRight.shapeColor = color(200, 200, 200);
	wRight.immovable = true;

	// Score
	score = 0;

	// Blocks
	blocks = new Array();
	var rMax = 5;
	var cMax = 11;
	var bX = DISP_W*0.5 - BLOCK_W*(cMax-1)*0.5;
	var bY = 50;
	for(var r=0; r<rMax; r++){
		for(var c=0; c<cMax; c++){
			var block = createSprite(
				BLOCK_W*c + bX, BLOCK_H*r + bY, BLOCK_W, BLOCK_H);
			block.shapeColor = color(255, 255, 255);
			block.immovable = true;
			blocks.push(block);
		}
	}
}

function draw(){
	console.log("draw");
	background(0);

	// Paddle
	if(ball.bounce(pCenter)){
		var swing = (ball.position.x - pCenter.position.x) / 2;
		ball.setSpeed(BALL_SPEED, ball.getDirection() + swing);
	}

	if(0 < mouseX && mouseX < DISP_W){
		pCenter.position.x  = mouseX;
		pCenter.position.x = mouseX;
	}

	// Wall
	ball.bounce(wTop);
	ball.bounce(wBottom);
	ball.bounce(wLeft);
	ball.bounce(wRight);

	// Blocks
	for(var i=0; i<blocks.length; i++){
		if(ball.bounce(blocks[i])){
			blocks[i].position.x = -100;
			blocks[i].position.y = -100;
			score++;
			playSound(sScore);
		}
	}

	// Text
	textAlign(LEFT);
	text("SCORE:"+score, 5, 20);

	drawSprites();
}

function playSound(sound){
	if(sound.isPlaying()) sound.stop();
	sound.play();
}