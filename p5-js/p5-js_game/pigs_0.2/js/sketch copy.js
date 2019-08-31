console.log("Hello p5.js!!");

//==========
// Firebase
const TABLE_NAME = "controls";

//==========
// p5.js

const TARGET_NONE    = 0;
const TARGET_HIDEYO  = 1;
const TARGET_YUKICHI = 2;
const TARGET_ICHIYO  = 3;
const SPEECH_NAME    = "Kyoko";

const RESULT_HAPPY   = 1;
const RESULT_NORMAL  = 2;
const RESULT_BAD     = 3;

let sManager;

let target;

let data = [
	{name: "名無太郎"},
	{name: "野口英世", file: "i_hideyo.png", scenarios:[
		{greet: "私の名前は野口英世です。得意な科目は理科です。\n3年間よろしくお願いします。", result: 0,
		selections: [
			{text:"デスヨネーランドに\n行きませんか?", point:-3, next:1}, 
			{text:"ナカジマスーパーランドに\n行きませんか?", point:+1, next:2}, 
			{text:"造幣局に\n行きませんか?", point:+3, next:3}]},
		{greet: "君にはガッカリしたよ。\n絶交させていただこう!!", result: RESULT_BAD, selections: []},
		{greet: "イマイチですね。。。\n君のセンスを疑うよ!!", result: RESULT_NORMAL, selections: []},
		{greet: "貴女は最高です!!\n実験道具を持って今すぐ向かいませう!!", result: RESULT_HAPPY, selections: []}
	]},
	{name: "福沢諭吉", file: "i_yukichi.png", scenarios:[
		{greet: "俺の名前は福沢諭吉だ。得意な科目は国語だぜ!!\n3年間よろしくな!!",
		selections: [
			{text:"デスヨネーランドに\n行きませんか?", point:-3, next:1}, 
			{text:"ナカジマスーパーランドに\n行きませんか?", point:+1, next:2}, 
			{text:"造幣局に\n行きませんか?", point:+3, next:3}]},
		{greet: "お前にはガッカリしたぜ!!\n俺の前から消えろ!!", result: RESULT_BAD, selections: []},
		{greet: "イマイチだ!!\nドン・キホーテの方が楽しいぜ!!", result: RESULT_NORMAL, selections: []},
		{greet: "お前は最高だな!!\n俺の単車の後ろに乗れよ!!", result: RESULT_HAPPY, selections: []}
	]},
	{name: "樋口一葉", file: "i_ichiyo.png", scenarios:[
		{greet: "私の名前は樋口一葉よ。得意な科目は英語なの。\n3年間仲良くしてね。",
		selections: [
			{text:"デスヨネーランドに\n行きませんか?", point:-3, next:1}, 
			{text:"ナカジマスーパーランドに\n行きませんか?", point:+1, next:2}, 
			{text:"造幣局に\n行きませんか?", point:+3, next:3}]},
		{greet: "貴方最低ね。。。\n二度と顔を見たくないわ!!", result: RESULT_BAD, selections: []},
		{greet: "イマイチね。。。\nつまらなさそうだわ。。。", result: RESULT_NORMAL, selections: []},
		{greet: "貴方は最高よ!!\n私を今すぐ連れてって!!", result: RESULT_HAPPY, selections: []}
	]}
];

let files = [
	"back_title.png", "back_select.png", "back_game.png", 
	"back_result_dead.png", "back_result_normal.png", "back_result_island.png", 
	"btn_select.png", "player.png", 
	"i_yukichi.png", "i_ichiyo.png", "i_hideyo.png", "logo.png",
	"sc_01.png", "sc_02.png"
];

let imgObj = new Object();

let sUtterance = null;

function preload(){

	// Font
	//let font = loadFont("assets/misaki_gothic.ttf");
	//textFont(font); textSize(32); fill(255);

	// Images
	for(file of files){
		imgObj[file] = loadImage("assets/" + file);
	}

	// SpeechSynthesis
	initSpeechSynthesis();
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
		back.onMouseReleased = function(){
			sManager.showScene(SceneSelect);
		}

		let logo = createSprite(240, 120, 30, 30);
		logo.addImage(imgObj["logo.png"]);
		logo.scale = 0.5;

		let girl = createSprite(240, 250, 30, 30);
		girl.addImage(imgObj["sc_02.png"]);
		girl.scale = 0.5;
	}

	this.draw = function(){
		background(150, 100, 100);
		drawSprites();
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
		startSpeech("恋愛対象を選んでください!!");
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER); textSize(16); fill(255);
		text(this._str, 240, 30);
		textAlign(LEFT); textSize(18); fill(33);
		text(this._word, 15, 260);
	}

	this.typeWord = function(word){
		if(this._word.length < word.length){
			this._word = word.slice(0, this._word.length + 1);
			setTimeout(()=>{this.typeWord(word);}, 150);
		}
	}
}

//==========
// ゲーム

function SceneGame(){

	this.enter = function(){
		removeAllSprites();
		this._str = "デートに誘え!!";

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

		// SelectionGroup
		this.selectionGroup = new Group();
		this.selectScenario(0);
	}

	this.draw = function(){
		background(100, 150, 100);
		drawSprites();
		textAlign(CENTER); textSize(16); fill(255);
		text(this._str, 240, 30);
		textAlign(LEFT); textSize(18); fill(33);
		text(this._word, 15, 260);
	}

	this.selectScenario = function(index){
		this._word = "";
		let scenario = data[target].scenarios[index];
		this.typeWord(scenario.greet, ()=>{
			setTimeout(()=>{
				if(scenario.result == RESULT_HAPPY){
					sManager.showScene(SceneResultHappy);// Happy
				}else if(scenario.result == RESULT_NORMAL){
					sManager.showScene(SceneResultNormal);// Normal
				}else if(scenario.result == RESULT_BAD){
					sManager.showScene(SceneResultBad);// Bad
				}else{
					this.makeSelections(scenario.selections);// Scenario
				}
			}, 1000);
		});
		startSpeech(scenario.greet);
	}

	this.typeWord = function(word, callback){
		if(this._word.length < word.length){
			this._word = word.slice(0, this._word.length + 1);
			setTimeout(()=>{this.typeWord(word, callback);}, 150);
		}else{
			if(callback != null) callback();
		}
	}

	this.makeSelections = function(selections){
		let paddingY = 60;
		let posX = 240;
		let posY = 160 - paddingY * selections.length * 0.5;
		for(let i=0; i<selections.length; i++){

			let back = createSprite(240, posY + paddingY*i, 30, 30);
			back.addImage(imgObj["btn_select.png"]);
			back.onMouseReleased = ()=>{
				this.selectionGroup.removeSprites();
				this.selectionGroup.clear();
				this.selectScenario(selections[i].next);
			};
			this.selectionGroup.add(back);

			let label = createSprite(240, posY + paddingY*i, 30, 30);
			label.shapeColor = color(33, 33, 200);
			label.draw = function(){
				textAlign(CENTER); textSize(14); fill(33);
				text(selections[i].text, 0, 0);
			}
			this.selectionGroup.add(label);
		}
	}
}

function SceneResultHappy(){

	this.enter = function(){
		removeAllSprites();
		this._str = "ハッピーエンド!!";

		let back = createSprite(240, 160, 30, 30);
		back.addImage(imgObj["back_result_island.png"]);
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
		let text = "二人は幸せに暮らしましたとさ。。。";
		this.typeWord(text);
		startSpeech(text);
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
			setTimeout(()=>{this.typeWord(word);}, 150);
		}
	}
}

function SceneResultNormal(){

	this.enter = function(){
		removeAllSprites();
		this._str = "ノーマルエンド!!";

		let back = createSprite(240, 160, 30, 30);
		back.addImage(imgObj["back_result_normal.png"]);
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
		let text = "その後、結局フラれてしまいましたとさ。。。";
		this.typeWord(text);
		startSpeech(text);
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
			setTimeout(()=>{this.typeWord(word);}, 150);
		}
	}
}

function SceneResultBad(){

	this.enter = function(){
		removeAllSprites();
		this._str = "バッドエンド!!";

		let back = createSprite(240, 160, 30, 30);
		back.addImage(imgObj["back_result_dead.png"]);
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
		let text = "その後の二人を見た者は、誰もいない。。。";
		this.typeWord(text);
		startSpeech(text);
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
			setTimeout(()=>{this.typeWord(word);}, 150);
		}
	}
}

//==========
// Utility

function initSpeechSynthesis(){
	if(!window.speechSynthesis) return;
	sUtterance = new SpeechSynthesisUtterance();
	let repeat = setInterval(()=>{
		if(sUtterance != null){
			let voices = speechSynthesis.getVoices();
			for(let i=0; i<voices.length; i++){
				if(voices[i].name == SPEECH_NAME){
					sUtterance.voice = voices[i];// 音声オブジェクト
					sUtterance.rate  = 1.0;      // 速度(0.1-10.0)
					sUtterance.pitch = 1.0;      // ピッチ(0.0-2.0)
					sUtterance.lang  = "ja-JP";  // 日本語に設定
				}
			}
			clearInterval(repeat);
		}
	}, 1000);
}

function startSpeech(text){
	if(sUtterance == null) return;
	sUtterance.text = text;
	speechSynthesis.cancel();
	speechSynthesis.speak(sUtterance);
	initSpeechSynthesis();
}

function stopSpeech(){
	speechSynthesis.cancel();
}
