console.log("Hello p5.js!!");

let stgIndex = 0;
let stgLevel = [
	//{cols: 2, rows: 2, size: 128, corner: 10},
	{cols: 4, rows: 4, tileSize: 64, corner: 8}
];

let index  = 0;
let startX = 0;
let startY = 0;

let font   = null;
let sndOK  = null;
let score  = 0;

function preload(){
	// Font, Sound
	font  = loadFont("./assets/misaki_gothic.ttf");
	sndOK = loadSound("./assets/se_ok.mp3");
}

function setup(){
	console.log("setup!!");

	createCanvas(480, 320);

	score = 0;

	tiles();
}

function tiles(){
	colorMode(HSB);
	background(0, 0, 0);
	noStroke();

	rows     = stgLevel[stgIndex].rows;
	cols     = stgLevel[stgIndex].cols;
	tileSize = stgLevel[stgIndex].tileSize;
	corner   = stgLevel[stgIndex].corner;

	let erat = new Eratosthenes(2, rows*cols);
	console.log(erat.isPrime(5));

	index = floor(random(0, cols * rows));
	startX = width * 0.5  - (tileSize*cols) * 0.5;
	startY = height * 0.5 - (tileSize*rows) * 0.5;

	let rdm     = floor(random(0, 360));

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let i = r*cols + c;
			let tile = new Tile(startX+tileSize*c, startY+tileSize*r, tileSize-2, corner, rdm);
			tile.init(99);
		}
	}

	colorMode(RGB);
	fill(255, 255, 255);
	textFont(font);
	textSize(64);
	textAlign(RIGHT);
	text(score, width-5, 60);
}

function mousePressed(){

	let x = size * (index%cols) + size*0.5;
	let y = size * floor(index/cols) + size*0.5;
	let colorIndex   = get(startX+x, startY+y);
	let colorPressed = get(mouseX, mouseY);

	let flg = true;
	for(let i=0; i<colorIndex.length; i++){
		if(colorIndex[i] != colorPressed[i]){
			flg = false;
			break;
		}
	}
	
	if(flg == true){
		score++;
		if(score % 3 == 0) stgIndex++;
		if(stgLevel.length-1 < stgIndex) stgIndex = 0;
		sndOK.play();
		tiles();
	}
}

class Tile{

	constructor(x, y, size, corner, sat){
		console.log("Tile");
		this._x = x;
		this._y = y;
		this._size = size;
		// Color
		colorMode(HSB);
		fill(sat, 80, 80);
		square(this._x, this._y, size, corner);
		this._color = get(this._x + size*0.5, this._y + size*0.5);
	}

	init(num){
		this._num = num;
		colorMode(RGB);
		fill(255, 255, 255);
		textFont(font);
		textSize(this._size*0.8);
		textAlign(CENTER);
		text(num, this._x + this._size*0.55, this._y + this._size*0.85);
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
		console.log(this._results);
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
}