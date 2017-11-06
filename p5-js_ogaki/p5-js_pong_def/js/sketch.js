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
var sHit;

// 5-1, 画像用の変数を用意しよう
var blocks;
var backImg, catImgS, catImgL, rabImgS, rabImgL;

//==========
// 1, プリロード
function preload(){
	console.log("preload");

	// Font, Sound
	var font = loadFont("fonts/misaki_gothic.ttf");
	textSize(FONT_SIZE);
	textFont(font);
	sHit = loadSound("sounds/hit.mp3");

	// 5-2, 画像ファイルを読み込もう
	blocks = [];
	backImg = loadImage("images/pong_back.png");
	catImgS = loadImage("images/pong_cat.png");
	catImgL = loadImage("images/pong_cat_long.png");
	rabImgS = loadImage("images/pong_rab.png");
	rabImgL = loadImage("images/pong_rab_long.png");
}

//==========
// 2, セットアップ
function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	noStroke();

	// Back
	var back = createSprite(DISP_W*0.5, DISP_H*0.5, DISP_W, DISP_H);
	back.addImage(backImg);

	// 1, ボールを追加しよう

	// 2, 壁を配置しよう

	// 3-1, 左パドルを用意しよう

	// 3-2, 右パドルを用意しよう

	// 5-3, 障害物を配置しよう

	setupGame();
}

//==========
// 3, ドロー
function draw(){
	console.log("draw");
	background(66, 66, 100);
	if(ball == null) return;

	// 2-1, 上の壁で衝突

	// 2-2, 下の壁で衝突

	// 2-3, 左の壁で衝突
	
	// 2-4, 右の壁で衝突

	// 2-5, 左パドルと衝突

	// 2-6, 右パドルと衝突

	drawGame();
	drawSprites();
}

function keyTyped(e){
	console.log(e.key);

	// 4, ifを使ってパドルを操作できる様にしよう
}

function setupGame(){
	// Score
	scoreLeft  = 0;
	scoreRight = 0;

	// Line
	var total = 20;
	for(var i=0; i<total; i++){
		var padding = DISP_H / total;
		var dot = createSprite(DISP_W*0.5, padding*i, 4, 4);
		dot.shapeColor = color(255, 255, 255);
	}
}

var accel = 0;
function drawGame(){
	
	for(var i=0; i<blocks.length; i++){
		if(ball.bounce(blocks[i])){
			ball.position.x += ball.velocity.x;
			ball.position.y += ball.velocity.y;
		}
	}

	textAlign(CENTER);
	text(scoreLeft,  DISP_W*0.5 - 80, 60);
	text(scoreRight, DISP_W*0.5 + 80, 60);
}

function swing(target){
	var max = 10;
	var rdm = Math.floor(max * Math.random());
	if(max/2 < rdm){
		target.setSpeed(target.getSpeed(), target.getDirection() + 2);
	}else{
		target.setSpeed(target.getSpeed(), target.getDirection() - 2);
	}
}

function createBlock(x, y, img){
	var sprite = createSprite(x, y, 5, 5);
	sprite.shapeColor = color(255, 255, 255);
	sprite.addImage(img);
	sprite.immovable = true;
	return sprite;
}

function playSound(sound){
	if(sound.isPlaying()) sound.stop();
	sound.play();
}