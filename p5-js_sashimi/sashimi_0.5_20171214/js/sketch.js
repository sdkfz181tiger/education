console.log("Hello p5.js!!");

let sManager;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font);
	textSize(32);
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
}

//==========
// タイトル
function SceneTitle(){

	this.enter = function(){
		console.log("Title:enter");
		removeAllSprites();
	}

	this.draw = function(){
		background(150, 100, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(16);
		text("tap to start!!", width*0.5, 210);
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

		// 1枚目
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text(this._str, width*0.5, 80);
		// スコア表示
	}

	this.mousePressed = function(){
		// ポイントを計算
		
		this.nextStage();
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

		// 文章
		this._str = "結果!!";

		// タイトルへ
		let btnTitle = createSprite(200, 230, 60, 30);
		btnTitle.onMousePressed = function(){
			// スコア初期化

			sManager.showScene(SceneTitle);
		}

		// ゲームへ
		let btnGame = createSprite(280, 230, 60, 30);
		btnGame.onMousePressed = function(){
			// スコア初期化

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
	}
}

//==========
// スコアを判定する
function judgeHanko(card){
	// スコア判定
	return 0;
}