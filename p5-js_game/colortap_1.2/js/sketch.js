console.log("Hello p5.js!!");

const W_NAV = 480;
const H_NAV = 33;

let stgIndex = 0;
let stgLevel = [
	{cols: 3, rows: 3, size: 82, corner: 8},
	{cols: 8, rows: 4, size: 64, corner: 8}
];

let index  = 0;
let startX = 0;
let startY = 0;

let font   = null;
let sndOK  = null;
let score  = 0;

let erat   = null;
let tiles  = [];

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
	sndOK = loadSound("./assets/se_ok.mp3");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);

	score = 0;

	setTiles();
}

function setTiles(){
	colorMode(HSB);
	background(0, 0, 0);
	noStroke();

	let rows   = stgLevel[stgIndex].rows;
	let cols   = stgLevel[stgIndex].cols;
	let size   = stgLevel[stgIndex].size;
	let corner = stgLevel[stgIndex].corner;

	// Eratosthenes
	erat = new Eratosthenes(2, rows*cols);
	console.log(erat.isPrime(5));

	tiles  = [];
	index  = floor(random(0, cols * rows));
	startX = width * 0.5  - (size*cols) * 0.5;
	startY = (height-H_NAV) * 0.5 - (size*rows) * 0.5 + H_NAV;

	let rdm = floor(random(0, 360));

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = startX+size*c;
			let y = startY+size*r;
			let i = r*cols + c;
			let tile = new Tile(x, y, size-2, corner);
			tile.init(i, erat.isPrime(i), rdm);
			tiles.push(tile);
		}
	}
	updateNavi();
}

function mousePressed(){

	for(let i=0; i<tiles.length; i++){
		if(tiles[i].contains(mouseX, mouseY)){
			if(erat.isPrime(tiles[i].getNum())){
				console.log("tile:" + tiles[i].getNum());
				tiles[i].die();
				tiles.splice(i, 1);
				score++;
				erat.countDown();
				sndOK.play();
			}
		}
	}
	updateNavi();
}

function updateNavi(){
	// Score
	colorMode(RGB);
	fill(33, 33, 33);
	rect(0, 0, W_NAV, H_NAV);
	fill(255, 255, 255);
	textFont(font);
	textSize(32);
	textAlign(RIGHT);
	text(score, width-5, 32);
	// Counter
	textFont(font);
	textSize(32);
	textAlign(LEFT);
	text(erat.getCounter(), 5, 32);
}

class Tile{

	constructor(x, y, size, corner){
		console.log("Tile");
		this._x = x;
		this._y = y;
		this._size   = size;
		this._corner = corner;
	}

	init(num, primeFlg, hue, sat=80, bri=80){
		this._num      = num;
		this._primeFlg = primeFlg;
		this._hue      = hue;
		this._sat      = sat;
		this._bri      = bri;
		this.drawSquare(hue, sat, bri);
	}

	getNum(){
		return this._num;
	}

	contains(x, y){
		if(x < this._x) return false;
		if(y < this._y) return false;
		if(this._x + this._size < x) return false;
		if(this._y + this._size < y) return false;
		return true;
	}

	die(){
		this.drawSquare(this._hue, 33, 33);
	}

	drawSquare(hue, sat, bri){
		// Color
		colorMode(HSB);
		fill(hue, sat, bri);
		square(this._x, this._y, this._size, this._corner);
		this._color = get(this._x + this._size*0.5, this._y + this._size*0.5);
		// Text
		colorMode(RGB);
		fill(255);
		textFont(font);
		textSize(this._size*0.8);
		textAlign(CENTER);
		text(this._num, this._x + this._size*0.55, this._y + this._size*0.85);
	}
}

class Eratosthenes{

	constructor(min, max){
		this._min = 2;
		this._max = 30;
		this._sqrt = Math.sqrt(max);
		this._results = [];
		this._nums = [];
		for(let i=min; i<max; i++){
			this._nums.push(i);
		}
		while(this._nums[0] < this._sqrt){
			this._results.push(this._nums[0]);
			this._nums = this.clean(this._nums[0], this._nums);
		}
		this._results = this._results.concat(this._nums);
		this._counter = this._results.length;
	}

	clean(num, arr){
		for(let i=arr.length-1; 0<=i; i--){
			if(arr[i] % num == 0) arr.splice(i, 1);
		}
		return arr;
	}

	isPrime(num){
		for(let i=0; i<this._results.length; i++){
			if(this._results[i] == num) return true;
		}
		return false;
	}

	getCounter(){
		return this._counter;
	}

	countDown(){
		this._counter--;
		if(this._counter <= 0) return true;
		return false;
	}
}