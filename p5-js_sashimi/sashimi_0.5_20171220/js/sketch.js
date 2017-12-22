console.log("Hello p5.js!!");

let sManager;
let score, high;
let intervals, sashimis;
let counterNow, counterMax;
let captureFlg;

let imgTitleBack;
let imgTitleLogo;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font);
	textSize(32);

	imgTitleBack = loadImage("assets/title_back.png");
	imgTitleLogo = loadImage("assets/title_logo.png");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	angleMode(DEGREES);
	rectMode(CENTER);
	fill(255, 255, 255);
	noStroke();

	// SceneManager
	sManager = new SceneManager();
	sManager.wire();
	sManager.showScene(SceneTitle);

	// スコアの初期化
	score = 0;
	high  = 0;
}

//==========
// タイトル
function SceneTitle(){

	this.enter = function(){
		console.log("Title:enter");
		removeAllSprites();

		// Back
		let sprBack = createSprite(240, 160, 10, 10);
		sprBack.addImage(imgTitleBack);

		// Logo
		let sprLogo = createSprite(240, 130, 10, 10);
		sprLogo.addImage(imgTitleLogo);
	}

	this.draw = function(){
		background(150, 100, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(16);
		text("tap to start!!", width*0.5, 210);
		// スコア表示
		drawScores();
	}

	this.mousePressed = function(){
		sManager.showScene(SceneGame1);
	}
}

//==========
// ゲーム1
function SceneGame1(){

	this.enter = function(){
		console.log("SceneGame1:enter");
		removeAllSprites();

		// 文章
		this._str = "1枚目にハンコを押せ!!";
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text(this._str, width*0.5, 80);
		// スコア表示
		drawScores();

		// ハンコを押せなかった時

	}

	this.mousePressed = function(){
		// ポイントを計算

		this.nextStage();
	}

	this.nextStage = function(){
		setTimeout(()=>{
			sManager.showScene(SceneResult);// 結果画面へ
		}, 1500);
	}
}

//==========
// リザルト
function SceneResult(){

	this.enter = function(){
		console.log("Result:enter");
		removeAllSprites();

		// 文章
		this._str = "結果画面です!!";

		// ゲームレベル判定

		// ハイスコア判定

		// タイトルへ
		let btnTitle = createSprite(200, 230, 60, 30);
		btnTitle.onMousePressed = function(){
			score = 0;// スコア初期化
			sManager.showScene(SceneTitle);
		}

		// ゲームへ
		let btnGame = createSprite(280, 230, 60, 30);
		btnGame.onMousePressed = function(){
			score = 0;// スコア初期化
			sManager.showScene(SceneGame1);
		}
	}

	this.draw = function(){
		background(100, 100, 150);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text(this._str, width*0.5, 80);
		// スコア表示
		drawScores();
	}
}

//==========
// スコアを判定する
function judgeHanko(card){
	let x = card.position.x;
	if(220 < x && x < 260){
		return 100;
	}else if(200 < x && x < 280){
		return 80;
	}
	return -40;
}

//==========
// スコアを表示する
function drawScores(){
	textAlign(LEFT);
	textSize(24);
	text("SCORE:" + score, 5, 30);
	textAlign(RIGHT);
	textSize(24);
	text("HIGH:" + high, width-5, 30);
}