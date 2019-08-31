console.log("Hello p5.js!!");

var num;
var dice;
var dImg0;
var dImg1;
var dImg2;
var dImg3;

var array;

function preload(){

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(64);
	textFont(font);

	// Images
	dImg0 = loadImage("assets/dice_0.png");
	dImg1 = loadImage("assets/dice_1.png");
	dImg2 = loadImage("assets/dice_2.png");
	dImg3 = loadImage("assets/dice_3.png");

	// 配列を用意する
	array = [dImg0, dImg1, dImg2, dImg3];
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(255, 255, 255);
	frameRate(8);
	noStroke();// No stroke

	// 数値
	num = 0;

	// サイコロ
	dice = createSprite(240, 160, 50, 50);
	dice.scale = 0.4;
	dice.addImage(dImg0);
}

// 連続処理
function draw(){
	console.log("draw");
	background(0);

	// Text
	textAlign(CENTER);
	text(num,  240, 60);

	// Sprites
	drawSprites();
}

// マウスが押されたら
function mousePressed(){
	console.log("mousePressed");

	// 乱数を決定する
	num = getRandom(1, 3);
	dice.addImage(array[num]);
}

// ランダム値を生成する
function getRandom(min, max){
	var range = max + 1 - min;
	var result = Math.floor(Math.random() * range + min);
	return result;
}