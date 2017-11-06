console.log("Hello MokumokuEditor!!");

const DISP_W     = 480;
const DISP_H     = 320;
const BALL_W     = 8;
const BALL_H     = 8;
const BALL_SPEED = 6;
const PADDLE_W   = 50;
const PADDLE_H   = 5;
const BLOCK_W    = 8;
const BLOCK_H    = 8;
const BLOCK_PAD  = 2;

const FONT_SIZE  = 16;

var ball, pCenter;
var wTop, wBottom, wLeft, wRight;
var score;
var sHit;

// 5-1, 画像用の変数を用意しよう
var blocks;
var backImg, catImg, rabImg;

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
	blocks  = [];
	backImg = loadImage("images/pong_back.png");
	catImgS  = loadImage("images/pong_cat.png");
	rabImgS  = loadImage("images/pong_rab.png");
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
	ball = createSprite(DISP_W*0.5, DISP_H-80, BALL_W, BALL_H);
	ball.shapeColor = color(255, 255, 255);
	ball.setSpeed(BALL_SPEED, 90);

	// 2, 壁を配置しよう
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

	// 3-1, パドルを用意しよう
	pCenter = createSprite(DISP_W*0.5, DISP_H-30, PADDLE_W, PADDLE_H);
	pCenter.shapeColor = color(255, 255, 255);
	pCenter.immovable = true;

	// 5-3, 障害物を配置しよう
	var cat1 = createBlock(DISP_W*0.1, DISP_H*0.5, catImgS);
	blocks.push(cat1);

	var cat2 = createBlock(DISP_W*0.2, DISP_H*0.5, catImgS);
	blocks.push(cat2);

	var cat3 = createBlock(DISP_W*0.3, DISP_H*0.5, catImgS);
	blocks.push(cat3);

	var rab1 = createBlock(DISP_W*0.7, DISP_H*0.5, rabImgS);
	blocks.push(rab1);

	var rab2 = createBlock(DISP_W*0.8, DISP_H*0.5, rabImgS);
	blocks.push(rab2);

	var rab3 = createBlock(DISP_W*0.9, DISP_H*0.5, rabImgS);
	blocks.push(rab3);

	// 5-4, アルカノイドを配置しよう
	createBlocks(DISP_W*0.5, DISP_H*0.4, catImgS);

	setupGame();
}

//==========
// 3, ドロー
function draw(){
	console.log("draw");
	background(66, 66, 120);
	if(ball == null) return;

	// 2-1, 上の壁で衝突
	ball.bounce(wTop);

	// 2-2, 下の壁で衝突
	ball.bounce(wBottom);

	// 2-3, 左の壁で衝突
	ball.bounce(wLeft);

	// 2-4, 右の壁で衝突
	ball.bounce(wRight);

	// 2-5, パドルと衝突
	if(ball.bounce(pCenter)){
		swing(ball);
	}

	drawGame();
	drawSprites();
}

function keyTyped(e){
	console.log(e.key);

	// 4, ifを使ってパドルを操作できる様にしよう
	if(e.key == "z") pCenter.position.x -= 10;
	if(e.key == "x") pCenter.position.x += 10;
}

function setupGame(){
	// Score
	score = 0;
}

function drawGame(){

	// Blocks
	for(var i=0; i<blocks.length; i++){
		if(ball.bounce(blocks[i])){
			blocks[i].position.x = -100;
			blocks[i].position.y = -100;
			score++;
			playSound(sHit);
			break;
		}
	}

	// Text
	textAlign(LEFT);
	text("SCORE:"+score, 5, 20);
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

function createBlocks(bX, bY, img){

	var cMax = img.width;
	var rMax = img.height;

	// Image
	var colors = [];
	for(var y=0; y<rMax; y++){
		var lines = [];
		for(var x=0; x<cMax; x++){
			lines.push(img.get(x, y));
		}
		colors.push(lines);
	}

	// Blocks
	bX -= (BLOCK_W+BLOCK_PAD)*(cMax-1)*0.5;
	bY -= (BLOCK_H+BLOCK_PAD)*(rMax-1)*0.5;
	for(var r=0; r<rMax; r++){
		for(var c=0; c<cMax; c++){
			if(colors[r][c][3] != 0){
				var block = createSprite(
					(BLOCK_W+BLOCK_PAD)*c + bX, (BLOCK_H+BLOCK_PAD)*r + bY, BLOCK_W, BLOCK_H);
				block.shapeColor = colors[r][c];
				block.immovable = true;
				blocks.push(block);
			}
		}
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