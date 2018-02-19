console.log("Hello p5.js!!");

//==========
// Firebase
const TABLE_NAME = "controls";

/*
// Initialize Firebase
const config = {
	apiKey: "AIzaSyABhCdxbrh1WLmq8tQ3QQNla9dvxr6Z2zI",
	authDomain: "api-project-589264122064.firebaseapp.com",
	databaseURL: "https://api-project-589264122064.firebaseio.com",
	projectId: "api-project-589264122064",
	storageBucket: "api-project-589264122064.appspot.com",
	messagingSenderId: "589264122064"
};
firebase.initializeApp(config);

// Database
const db = firebase.database();
const ref = db.ref().child(TABLE_NAME);
*/

//==========
// p5.js

const TARGET_NONE    = 0;
const TARGET_HIDEYO  = 1;
const TARGET_YUKICHI = 2;
const TARGET_ICHIYO  = 3;

let sManager;

let target;

let data = [
	{name: "名無太郎"},
	{name: "野口英世", file: "i_hideyo.png",  
		greet: "私の名前は野口英世です。得意な科目は理科です。\n3年間よろしくお願いします。",
		questions: ["映画に行きませんか?", "ゲーセンに行きませんか?", "千円札は好きですか?"]},
	{name: "福沢諭吉", file: "i_yukichi.png", 
		greet: "俺の名前は福沢諭吉だ。得意な科目は国語だぜ!!\n3年間よろしくな!!",
		questions: ["遊園地に行きませんか?", "ライブに行きませんか?", "一万円札は好きですか?"]},
	{name: "樋口一葉", file: "i_ichiyo.png",  
		greet: "私の名前は樋口一葉よ。得意な科目は英語なの。\n3年間仲良くしてね。",
		questions: ["水族館に行きませんか?", "イオンタウンに行きませんか?", "五千円札は好きですか?"]}
];

let files = [
	"back_title.png", "back_select.png", "back_game.png", "back_result.png",
	"player.png", "i_yukichi.png", "i_ichiyo.png", "i_hideyo.png", "logo.png",
	"sc_01.png", "sc_02.png"
];

let imgObj = new Object();

function preload(){

	// Font
	//let font = loadFont("assets/misaki_gothic.ttf");
	//textFont(font); textSize(32); fill(255);

	// Images
	for(file of files){
		imgObj[file] = loadImage("assets/" + file);
	}
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
		removeAllSprites();

		let back = createSprite(240, 160, 30, 30);
		back.addImage(imgObj["back_title.png"]);
		back.scale = 0.6;

		let logo = createSprite(240, 120, 30, 30);
		logo.addImage(imgObj["logo.png"]);
		logo.scale = 0.5;

		let girl = createSprite(240, 250, 30, 30);
		girl.addImage(imgObj["sc_02.png"]);
		girl.scale = 0.5;

		/*
		let btnUp = createSprite(240, 150, 20, 20);
		btnUp.onMousePressed = function(){
			ref.child("up").set(true);
		}

		btnUp.onMouseReleased = function(){
			ref.child("up").set(false);
		}

		let btnDown = createSprite(240, 210, 20, 20);
		btnDown.onMousePressed = function(){
			ref.child("down").set(true);
		}

		btnDown.onMouseReleased = function(){
			ref.child("down").set(false);
		}

		let btnLeft = createSprite(210, 180, 20, 20);
		btnLeft.onMousePressed = function(){
			ref.child("left").set(true);
		}

		btnLeft.onMouseReleased = function(){
			ref.child("left").set(false);
		}

		let btnRight = createSprite(270, 180, 20, 20);
		btnRight.onMousePressed = function(){
			ref.child("right").set(true);
		}

		btnRight.onMouseReleased = function(){
			ref.child("right").set(false);
		}
		*/

		// Player
		// sprPlayer = createSprite(240, 160, 20, 20);
		// sprPlayer.addImage(imgPlayer);

		// Ref
		// ref.on("value", (snap)=>{
		// 	let controls = snap.val();
		// 	if(controls.up == true){
		// 		sprPlayer.setSpeed(1, 90);
		// 	}else{
		// 		sprPlayer.setSpeed(0);
		// 	}
		// 	if(controls.down  == true) console.log("down!!");
		// 	if(controls.left  == true) console.log("left!!");
		// 	if(controls.right == true) console.log("right!!");
		// });
	}

	this.draw = function(){
		background(150, 100, 100);
		drawSprites();
	}

	this.mousePressed = function(){
		sManager.showScene(SceneSelect);
	}
}

//==========
// セレクト

function SceneSelect(){

	this.enter = function(){
		removeAllSprites();
		this._str = "選択画面";

		let back = createSprite(240, 160, 30, 30);
		back.addImage(imgObj["back_select.png"]);
		back.scale = 0.6;

		let btnTitle = createSprite(20, 20, 20, 20);
		btnTitle.onMouseReleased = function(){
			sManager.showScene(SceneTitle);
		}

		let btn1 = createSprite(100, 170, 60, 60);
		btn1.addImage(imgObj["i_hideyo.png"]);
		btn1.scale = 0.4;
		btn1.onMouseReleased = function(){
			target = TARGET_HIDEYO;
			sManager.showScene(SceneGame);
		}

		let btn2 = createSprite(240, 170, 60, 60);
		btn2.addImage(imgObj["i_yukichi.png"]);
		btn2.scale = 0.4;
		btn2.onMouseReleased = function(){
			target = TARGET_YUKICHI;
			sManager.showScene(SceneGame);
		}

		let btn3 = createSprite(380, 170, 60, 60);
		btn3.addImage(imgObj["i_ichiyo.png"]);
		btn3.scale = 0.4;
		btn3.onMouseReleased = function(){
			target = TARGET_ICHIYO;
			sManager.showScene(SceneGame);
		}

		let word = createSprite(240, 275, 470, 80);
		word.shapeColor = color(255, 255, 255);
		this._word = "";
		this.typeWord("恋愛対象を選んでください!!\n[ 野口さん, 福沢さん, 樋口さん ]");
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER); textSize(32); fill(255);
		text(this._str, 240, 60);
		textAlign(LEFT); textSize(18); fill(33);
		text(this._word, 15, 260);
	}

	this.typeWord = function(word){
		if(this._word.length < word.length){
			this._word = word.slice(0, this._word.length + 1);
			setTimeout(()=>{this.typeWord(word);}, 100);
		}
	}
}

//==========
// ゲーム

function SceneGame(){

	this.enter = function(){
		removeAllSprites();
		this._str = "ゲーム画面";

		let back = createSprite(240, 160, 30, 30);
		back.addImage(imgObj["back_game.png"]);
		back.scale = 0.6;

		let btnTitle = createSprite(20, 20, 20, 20);
		btnTitle.onMouseReleased = function(){
			sManager.showScene(SceneTitle);
		}

		let sprTarget = createSprite(240, 160, 60, 60);
		sprTarget.scale = 0.4;
		sprTarget.addImage(imgObj[data[target].file]);

		let word = createSprite(240, 275, 470, 80);
		word.shapeColor = color(255, 255, 255);
		this._word = "";
		this.typeWord(data[target].greet, ()=>{
			this.makeQuestions(data[target].questions);
		});
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER); textSize(32); fill(255);
		text(this._str, 240, 60);
		textAlign(LEFT); textSize(18); fill(33);
		text(this._word, 15, 260);
	}

	this.typeWord = function(word, callback){
		if(this._word.length < word.length){
			this._word = word.slice(0, this._word.length + 1);
			setTimeout(()=>{this.typeWord(word, callback);}, 100);
		}else{
			if(callback != null) callback();
		}
	}

	this.makeQuestions = function(questions){

		console.log(questions);

		// for(let i=0; i<questions.length; i++){
		// 	let btnQuestion = createSprite(240, 80*i, 120, 40);
		// 	btnQuestion.shapeColor = color(230, 230, 230);
		// }
	}
}

//==========
// Utility
