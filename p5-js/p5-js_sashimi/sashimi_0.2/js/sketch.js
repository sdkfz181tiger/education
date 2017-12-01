console.log("Hello p5.js!!");

let sManager;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(32);
	textFont(font);
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

		// ゲームへ
		let btnGame = createSprite(240, 280, 20, 20);
		btnGame.shapeColor = color(255, 255, 255);
		btnGame.onMousePressed = ()=>{
			sManager.showScene(SceneGame);
		}
	}

	this.draw = function(){
		background(200, 100, 100);
		textAlign(CENTER);
		text("Title!!", width*0.5, height*0.5);
		drawSprites();
	}
}

//==========
// ゲーム
function SceneGame(){

	this.enter = function(){
		console.log("Game:enter");
		removeAllSprites();
	}

	this.draw = function(){
		background(100, 200, 100);
		textAlign(CENTER);
		text("Game!!", width*0.5, height*0.5);
		drawSprites();
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

		// タイトルへ
		let btnTitle = createSprite(200, 280, 20, 20);
		btnTitle.shapeColor = color(255, 200, 255);
		btnTitle.onMousePressed = ()=>{
			sManager.showScene(SceneTitle);
		}

		// ゲームへ
		let btnGame = createSprite(280, 280, 20, 20);
		btnGame.shapeColor = color(255, 33, 255);
		btnGame.onMousePressed = ()=>{
			sManager.showScene(SceneTitle);
		}

		let sample1 = createSprite(10, 10, 10, 10);
		let sample2 = createSprite(20, 10, 10, 10);
		let sample3 = createSprite(30, 10, 10, 10);
		let sample4 = createSprite(40, 10, 10, 10);
		let sample5 = createSprite(50, 10, 10, 10);
	}

	this.draw = function(){
		background(100, 100, 200);
		textAlign(CENTER);
		text("Result!!", width*0.5, height*0.5);
		drawSprites();
	}
}

//==========
// Utility
function removeAllSprites(){
	for(let i=allSprites.length-1; 0<=i; i--){
		allSprites[i].remove();
	}
}