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
		sManager.showScene(SceneGame);
	}
}

//==========
// ゲーム
function SceneGame(){

	this.enter = function(){
		console.log("Game:enter");
		removeAllSprites();

		// スコアの初期化
		score = 0;

		// 文章
		this._str = "1枚目にハンコを押せ!!";

		// 1枚目
		let speed = random(5, 15);
		let time  = random(1, 3);
		this._obj = createSprite(0, 160, 70, 90);
		this._obj.shapeColor = color(255, 255, 255);
		setTimeout(()=>{
			this._obj.setSpeed(speed, 0);
		}, time);
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
		let x = this._obj.position.x;
		let speed = this._obj.getSpeed();
		if(width < x && 0 < speed){
			console.log("Missed!!");
			this._str = "ミス!!";
			this._obj.setSpeed(0, 0);
			this.nextStage();
		}
	}

	this.mousePressed = function(){
		let x = this._obj.position.x;
		if(200 < x && x < 280){
			console.log("Success!!");
			this._str = "成功!!";
			this._obj.setSpeed(0, 0);
			score += 100;
			this.nextStage();
		}else{
			console.log("Failed!!");
			this._str = "失敗!!";
			this._obj.setSpeed(0, 0);
			score -= 80;
			this.nextStage();
		}
	}

	this.nextStage = function(){
		setTimeout(()=>{
			sManager.showScene(SceneResult);
		}, 1500);
	}
}

//==========
// リザルト
function SceneResult(){

	this.enter = function(){
		console.log("Result:enter");
		removeAllSprites();

		// ゲームレベル判定
		if(score < 10){
			this._str = "下級レベル!!";
		}else if(score < 50){
			this._str = "中級レベル!!";
		}else if(score < 80){
			this._str =　"上級レベル!!";
		}else{
			this._str = "神様レベル!!";
		}

		// ハイスコア判定
		if(high <= score){
			high = score;
		}

		// タイトルへ
		let btnTitle = createSprite(200, 230, 60, 30);
		btnTitle.onMousePressed = function(){
			sManager.showScene(SceneTitle);
		}

		// ゲームへ
		let btnGame = createSprite(280, 230, 60, 30);
		btnGame.onMousePressed = function(){
			sManager.showScene(SceneGame);
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

// スコアを表示する
function drawScores(){
	textAlign(LEFT);
	textSize(24);
	text("SCORE:" + score, 5, 30);
	textAlign(RIGHT);
	textSize(24);
	text("HIGH:" + high, width-5, 30);
}