console.log("Hello p5.js!!");

let sManager;
let score, time;
let intervals, sashimis;
let counterNow, counterMax;
let captureFlg;

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
		textSize(32);
		text("Title!!", width*0.5, height*0.5);
		textSize(16);
		text("tap to start!!", width*0.5, 190);
	}

	this.mousePressed = function(){

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
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text("Game!!", width*0.5, height*0.5);
	}

	this.mousePressed = function(){

	}
}

//==========
// リザルト
function SceneResult(){

	this.enter = function(){
		console.log("Result:enter");
		removeAllSprites();
	}

	this.draw = function(){
		background(100, 100, 150);
		drawSprites();
		textAlign(CENTER);
		textSize(32);
		text("Result!!", width*0.5, height*0.5);
	}
}