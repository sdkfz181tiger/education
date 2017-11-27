console.log("Hello p5.js!!");

const TEXT_SIZE = 12;
const WORD_W    = 7;
const WORD_H    = TEXT_SIZE + 2;
const WORD_P_H  = 8;
const WORD_P_V  = 5;

let words;
let adjustArea;
let code;

function preload(){

	// Font
	let font = loadFont("assets/FiraCode-Regular.ttf");
	textFont(font);
	textSize(TEXT_SIZE);
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(255, 255, 255);
	frameRate(16);
	noStroke();

	// AdjustArea
	adjustArea = new AdjustArea(20, 20, 440, 50);

	// Words
	words = [];

	// Word
	words.push(new WordBox(random(30, 450), random(180, 290), "let"));
	words.push(new WordBox(random(30, 450), random(180, 290), "spr"));
	words.push(new WordBox(random(30, 450), random(180, 290), "="));
	words.push(new WordBox(random(30, 450), random(180, 290), "."));
	words.push(new WordBox(random(30, 450), random(180, 290), "new"));
	words.push(new WordBox(random(30, 450), random(180, 290), "Sprite(@, @);"));
	words.push(new WordBox(random(30, 450), random(180, 290), "function(@, @){}"));
	words.push(new WordBox(random(30, 450), random(180, 290), "if(@ @ @){}"));
	words.push(new WordBox(random(30, 450), random(180, 290), "for(@; @; @){}"));
	words.push(new WordBox(random(30, 450), random(180, 290), "moveTo(@, @, @);"));
	words.push(new WordBox(random(30, 450), random(180, 290), "moveBy(@, @, @);"));
}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);

	// AdjustArea
	adjustArea.draw();

	// Words
	for(let word of words){
		word.draw();
	}
}

function mousePressed(e){
	//console.log("mousePressed");

	// Words
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
	//console.log("mouseDragged");

	// Words
	for(let word of words){
		if(word.mouseDragged(e)) break;
	}
}

function mouseReleased(e){
	//console.log("mouseReleased");

	// AdjustArea
	adjustArea.sort(words);

	// Words
	for(let word of words){
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
		this._w = this._str.length * WORD_W + WORD_P_H * 2;
		this._h = WORD_H + WORD_P_V * 2;

		this._isCaptured = false;
		this._offsetX = 0;
		this._offsetY = 0;

		this.init();
	}
	init(){
		this._params = [];
		for(let i=0; i<this._str.length; i++){
			if(this._str[i] === "@"){
				this._params.push(i);
			}
		}
	}
	get x(){
		return this._x;
	}
	set x(x){
		this._x = x;
	}
	get y(){
		return this._y;
	}
	set y(y){
		this._y = y;
	}
	get w(){
		return this._w;
	}
	get h(){
		return this._h;
	}
	get centerX(){
		return this._x + this._w * 0.5;
	}
	get centerY(){
		return this._y + this._h * 0.5;
	}
	get str(){
		return this._str;
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
		fill(200, 255, 255);
		rect(this._x, this._y, this._w, this._h);
		fill(33, 33, 33);
		textAlign(LEFT);

		// Test
		let sX = this._x + WORD_P_H;
		let sY = this._y;
		for(let i=0; i<this._str.length; i++){
			if(this._str[i] == "@"){
				fill(200, 200, 200);
				rect(sX + WORD_W * i, sY + WORD_P_V * 1.0, WORD_W, WORD_H);
			}
			fill(33, 33, 33);
			text(this._str[i], sX + WORD_W * i, sY + WORD_P_V * 0.5, WORD_W, WORD_H)
		}
	}
}

class AdjustArea{
	constructor(x, y, w, h){
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
		this._paddingX = 5;
		this._paddingY = 5;

		this._code = "Hello World!!";
	}
	sort(words){

		let array = [];
		for(let word of words){
			if(word.centerY < this._y + this._h){
				array.push({centerX: word.centerX, centerY: word.centerY, word: word});
			}
		}
		array.sort((a, b)=>{
			if(a.centerX < b.centerX) return -1;
			if(a.centerX > b.centerX) return 1;
			return 0;
		});
		this._code = "";
		let totalW = 0;
		for(let obj of array){
			this._code += obj.word.str + " ";
			totalW += obj.word.w + this._paddingX;
		}
		let pointerX = this._x + this._w * 0.5 - totalW * 0.5
		for(let obj of array){
			obj.word.x = pointerX;
			obj.word.y = this._y + this._paddingY;
			pointerX += obj.word.w + this._paddingX;
		}
	}
	draw(){
		fill(66, 66, 66);
		rect(this._x, this._y, this._w, this._h);
		fill(255, 255, 255);
		textAlign(CENTER);
		text(this._code, this._x + this._w * 0.5, this._y + this._h - this._paddingY);
	}
}