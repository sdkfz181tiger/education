console.log("Hello p5.js!!");

const DISP_W     = 480;
const DISP_H     = 320;
const BALL_W     = 10;
const BALL_H     = 10;
const BALL_SPEED = 3;
const PADDLE_W   = 10;
const PADDLE_H   = 50;
const FONT_SIZE  = 64;

var ball;
var pLeft, pRight;
var wTop, wBottom, wLeft, wRight;

var scoreLeft, scoreRight;

var sScore;

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
	ball.setSpeed(BALL_SPEED, 180);

	// Line
	var total = 20;
	for(var i=0; i<total; i++){
		var padding = DISP_H / total;
		var dot = createSprite(DISP_W*0.5, padding*i, 4, 4);
		dot.shapeColor = color(200, 200, 200);
	}

	// Paddle(Left)
	pLeft = createSprite(30, DISP_H*0.5, PADDLE_W, PADDLE_H);
	pLeft.shapeColor = color(255, 255, 255);
	pLeft.immovable = true;

	// Paddle(Right)
	pRight = createSprite(450, DISP_H*0.5, PADDLE_W, PADDLE_H);
	pRight.shapeColor = color(255, 255, 255);
	pRight.immovable = true;

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
	scoreLeft  = 0;
	scoreRight = 0;
}

function draw(){
	console.log("draw");
	background(0);

	if(ball.bounce(pLeft)){
		var swing = (ball.position.y - pLeft.position.y) / 3;
		ball.setSpeed(BALL_SPEED, ball.getDirection() + swing);
	}

	if(ball.bounce(pRight)){
		var swing = (ball.position.y - pLeft.position.y) / 3;
		ball.setSpeed(BALL_SPEED, ball.getDirection() - swing);
	}

	if(0 < mouseY && mouseY < DISP_H){
		pLeft.position.y  = mouseY;
		pRight.position.y = mouseY;
	}

	ball.bounce(wTop);
	ball.bounce(wBottom);


	if(ball.bounce(wLeft)){
		scoreRight++;
		playSound(sScore);
	}
	
	if(ball.bounce(wRight)){
		scoreLeft++;
		playSound(sScore);
	}

	textAlign(CENTER);
	text(scoreLeft,  DISP_W*0.5 - 80, 60)
	text(scoreRight, DISP_W*0.5 + 80, 60);

	drawSprites();
}

function playSound(sound){
	if(sound.isPlaying()){
		sound.stop();
	}else{
		sound.play();
	}
}