console.log("Hello p5.js!!");

var sImg;
var sSprite;

function preload(){

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(64);
	textFont(font);

	// Images
	sImg = loadImage("assets/sample1.png");
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(255, 255, 255);
	frameRate(1);
	noStroke();// No stroke

	// 元画像
	sSprite = createSprite(240, 160, 50, 50);
	sSprite.addImage(sImg);

	
	var cMax = sImg.width;
	var rMax = sImg.height;
}

// 連続処理
function draw(){
	console.log("draw");
	background(0);

	// Sprites
	drawSprites();

	// Test

}

// マウスが押されたら
function mousePressed(){
	console.log("mousePressed");
}

// ランダム値を生成する
function getRandom(min, max){
	var range = max + 1 - min;
	var result = Math.floor(Math.random() * range + min);
	return result;
}