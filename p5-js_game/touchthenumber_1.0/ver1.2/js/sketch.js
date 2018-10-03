console.log("Hello p5.js!!");

const R_TOTAL = 5;
const C_TOTAL = 8;
const P_ROWS  = 64;
const P_COLS  = 54;

const C_WIDTH  = 48;
const C_HEIGHT = 58;

let cards = [];
let index = 0;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(42);
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	angleMode(DEGREES);

	noStroke();
	fill(255, 255, 255);

	let nums = [];
	let total = R_TOTAL * C_TOTAL;
	for(let n=0; n<total; n++){
		nums.push(n);
	}

	for(let d=nums.length-1; 0<d; d--){
		let rdm = Math.floor(Math.random() * d);
		let tmp = nums[rdm];
		nums[rdm] = nums[d];
		nums[d]   = tmp;
	}

	let num = 0;

	let centerX = width * 0.5;
	let startX  = (P_COLS - C_WIDTH) * 0.5 - (C_TOTAL * P_COLS * 0.5);
	let centerY = height * 0.5;
	let startY  = (P_ROWS - C_HEIGHT) * 0.5 - (R_TOTAL * P_ROWS * 0.5);

	for(let r=0; r<R_TOTAL; r++){
		for(let c=0; c<C_TOTAL; c++){
			// Card
			let x = P_COLS * c + centerX + startX;
			let y = P_ROWS * r + centerY + startY;
			let card = new Card(
				x, y, C_WIDTH, C_HEIGHT, nums[num++]);
			cards.push(card);
		}
	}

	index = 0;
}

function draw(){
	//console.log("draw");
	background(0);

	// Draw
	for(let i=0; i<cards.length; i++){
		cards[i].draw();
	}
}

function mousePressed(){

	// MousePressed
	for(let i=0; i<cards.length; i++){
		if(cards[i].isInside(mouseX, mouseY)){
			if(judge(cards[i].getNumber())){
				console.log("Hello");
				cards[i].setDisabled();
			}
		}
	}
}

function judge(num){
	if(index == num){
		index++;
		return true;
	}
	return false;
}

class Card{

	constructor(x, y, w, h, num){
		this._x    = x; this._y = y;
		this._w    = w; this._h = h;
		this._num  = num;
		this._bCol = [255, 255, 255];
		this._tCol = [33, 33, 33];
		this._tFlg = false;
	}

	draw(){
		fill(this._bCol[0], this._bCol[1], this._bCol[2]);
		rect(this._x, this._y, this._w, this._h, 5);
		textAlign(CENTER);
		fill(this._tCol[0], this._tCol[1], this._tCol[2]);
		text(this._num, 
			this._x + this._w * 0.5, 
			this._y + this._h * 0.87);
	}

	getNumber(){
		return this._num;
	}

	setEnabled(){
		this._tFlg = true;
		this._bCol = [255, 255, 255];
		this._tCol = [33, 33, 33];
	}

	setDisabled(){
		this._tFlg = false;
		this._bCol = [155, 100, 100];
		this._tCol = [255, 255, 255];
	}

	isInside(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._w < x) return false;
		if(this._y + this._h < y) return false;
		return true;
	}
}