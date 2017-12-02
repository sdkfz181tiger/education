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

		let sample1 = createSprite(10, 10, 10, 10);
		let sample2 = createSprite(20, 10, 10, 10);
		let sample3 = createSprite(30, 10, 10, 10);
		let sample4 = createSprite(40, 10, 10, 10);
		let sample5 = createSprite(50, 10, 10, 10);
	}

	this.draw = function(){
		background(150, 100, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text("Title!!", width*0.5, height*0.5);
		textSize(16);
		text("tap to start!!", width*0.5, 190);
	}

	this.mousePressed = function(){
		// ゲームへ
		sManager.showScene(SceneGame);
	}
}

//==========
// ゲーム
function SceneGame(){

	this.enter = function(){
		console.log("Game:enter");
		removeAllSprites();

		let sample1 = createSprite(10, 10, 10, 10);
		let sample2 = createSprite(20, 10, 10, 10);
		let sample3 = createSprite(30, 10, 10, 10);
		let sample4 = createSprite(40, 10, 10, 10);
		let sample5 = createSprite(50, 10, 10, 10);
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text("Game!!", width*0.5, height*0.5);
		textSize(16);
		text("tap to result!!", width*0.5, 190);
	}

	this.mousePressed = function(){
		// リザルトへ
		sManager.showScene(SceneResult);
	}
}

//==========
// リザルト
function SceneResult(){

	this.enter = function(){
		console.log("Result:enter");
		removeAllSprites();

		let sample1 = createSprite(10, 10, 10, 10);
		let sample2 = createSprite(20, 10, 10, 10);
		let sample3 = createSprite(30, 10, 10, 10);
		let sample4 = createSprite(40, 10, 10, 10);
		let sample5 = createSprite(50, 10, 10, 10);

		// タイトルへ
		let btnTitle = createSprite(200, 220, 20, 20);
		btnTitle.onMousePressed = ()=>{
			sManager.showScene(SceneTitle);
		}

		// ゲームへ
		let btnGame = createSprite(280, 220, 20, 20);
		btnGame.onMousePressed = ()=>{
			sManager.showScene(SceneGame);
		}
	}

	this.draw = function(){
		background(100, 100, 150);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text("Result!!", width*0.5, height*0.5);
		textSize(16);
		text("title or retly?", width*0.5, 190);
	}
}