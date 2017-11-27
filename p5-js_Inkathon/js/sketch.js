console.log("Hello p5.js!!");

const TEXT_SIZE = 12;
const WORD_W    = 8;
const WORD_H    = TEXT_SIZE;
const WORD_P    = 4;

let words;

function preload(){

	// Font
	let font = loadFont("assets/DroidSansMono.ttf");
	textFont(font);
	textSize(TEXT_SIZE);
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(255, 255, 255);
	frameRate(8);
	noStroke();

	// Words
	words = [];

	// Word
	words.push(new WordBox(random(30, 450), random(160, 290), "let"));
	words.push(new WordBox(random(30, 450), random(160, 290), "spr"));
	words.push(new WordBox(random(30, 450), random(160, 290), "="));
	words.push(new WordBox(random(30, 450), random(160, 290), "new"));
	words.push(new WordBox(random(30, 450), random(160, 290), "Sprite(32, 32);"));
	words.push(new WordBox(random(30, 450), random(160, 290), "32"));
	words.push(new WordBox(random(30, 450), random(160, 290), "32"));
}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);

	for(word of words){
		word.draw();
	}
}

function mousePressed(e){
	console.log("mousePressed");

	for(let i=words.length-1; 0<=i; i--){
		if(words[i].mousePressed(e)){
			let word = words[i];
			words.splice(i, 1);
			words.push(word);
			break;
		};
	}
}

function mouseDragged(e){
	console.log("mouseDragged");

	for(word of words){
		if(word.mouseDragged(e)) break;
	}
}

function mouseReleased(e){
	//console.log("mouseReleased");

	for(word of words){
		word.mouseReleased(e);
	}
}

// ランダム値を生成する
function getRandom(min, max){
	var range = max + 1 - min;
	var result = Math.floor(Math.random() * range + min);
	return result;
}

// WordBox
class WordBox{
	constructor(x, y, str){
		this._x   = x;
		this._y   = y;
		this._str = str;
		this._isCaptured = false;
		this._w = this._str.length * WORD_W + WORD_P * 2;
		this._h = WORD_H + WORD_P * 2;

		this._offsetX = 0;
		this._offsetY = 0;
	}
	mousePressed(e){
		let cX = e.clientX;
		let cY = e.clientY;
		if(this._x < cX && cX < this._x + this._w && 
			this._y < cY && cY < this._y + this._h){
			this._offsetX = this._x - e.clientX;
			this._offsetY = this._y - e.clientY;
			this._isCaptured = true;
			return true;
		}
		this._isCaptured = false;
		return false;
	}
	mouseDragged(e){
		if(this._isCaptured == false) return false;
		this._x = e.clientX + this._offsetX;
		this._y = e.clientY + this._offsetY;
		return true;
	}
	mouseReleased(e){
		this._isCaptured = false;
	}
	get isCaptured(){
		return this._isCaptured;
	}
	draw(){
		fill(255, 200, 255);
		rect(this._x, this._y, this._w, this._h);
		fill(33, 33, 33);
		textAlign(CENTER);
		text(this._str, this._x + this._w * 0.5, this._y + WORD_H + WORD_P * 0.5);
	}
}