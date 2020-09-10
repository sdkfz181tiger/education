//==========
// p5.js

const T_SIZE = 24;

let font, stamps, cX, cY;

function preload(){
	font = loadFont("./fonts/misaki_gothic.ttf");
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(8);
	noStroke();

	textSize(T_SIZE);
	textFont(font);

	stamps = [];
	cX = width / 2;
	cY = height / 2;
}

function draw(){
	//background(0);

	noStroke();
	fill(0, 0, 0, 33)
	rect(0, 0, width, height);

	fill(0, 255, 0);
	for(let i=stamps.length-1; 0<=i; i--){
		let stamp = stamps[i];
		stamp.show();
		if(stamp.isOutside()) stamps.splice(i, 1);
	}

	let rX = random(width);
	let rY = 0;
	stamps.push(new Stamp(rX, rY));
}

class Stamp{

	constructor(x, y){
		this._x = x;
		this._y = y;
		this._n = 0;
	}

	show(){
		this._y += T_SIZE;
		this._n = floor(random(10));
		text(this._n, this._x, this._y);
	}

	isOutside(){
		if(height < this._y) return true;
		return false;
	}
}
