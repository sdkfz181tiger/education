
const LENGTH = 5;
let hanages;

function preload(){
	iNose = loadImage("assets/b_nose.png");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(200);

	sNose = createSprite(width/2, height-300, 32, 32);
	sNose.addImage(iNose);
	sNose.scale = 0.5;

	// Hanages
	hanages = [];
	for(let i=0; i<5; i++){
		let x = width/2-35 + random(-5, 5);
		let y = height-230;
		let hanage = new Hanage(x, y, LENGTH, 90, 1);
		hanages.push(hanage);
	}
}

function draw(){
	background(200);

	let score = 0;
	let finished = false;
	for(let hanage of hanages){
		hanage.draw();
		score += hanage.score;
		if(hanage.isFinished()) finished = true;
	}
	showScore(score);
	drawSprites();

	if(finished){
		showResult();
		noLoop();
	}
}

function showScore(score){
	fill(33);
	noStroke();
	rect(0, 0, width, 24);

	fill(255);
	noStroke();
	textSize(20);

	textAlign(LEFT);
	text("鼻毛シミュレータ", 4, 20);

	textAlign(RIGHT);
	let str = score + "ミリ";
	text(str, width-4, 20);
}

function showResult(score){
	fill(255, 33, 33);
	noStroke();
	rect(0, height-24, width, 24);

	fill(255);
	noStroke();
	textSize(20);

	textAlign(CENTER);
	text("鼻毛警報発令!!", width/2, height-4);
}

class Hanage{

	constructor(x, y, len, deg, weight){
		let p = new Point(x, y, len, deg, weight);
		this._points = [p];
		this._score = 0;
	}

	get score(){return this._score;}

	isFinished(){
		let total = this._points.length;
		let prev = this._points[total-1];
		if(prev.x < 0 || width < prev.x) return true;
		if(prev.y < 0 || height < prev.y) return true;
		return false;
	}

	draw(){
		let total = this._points.length;
		let prev = this._points[total-1];
		let x = prev.x + prev.len * cos(prev.deg);
		let y = prev.y + prev.len * sin(prev.deg);
		let len = LENGTH * random(0.5, 1.5);
		let deg = prev.deg + random(-30, 30);
		let weight = random(1, 2);
		let next = new Point(x, y, len, deg, weight);
		this._points.push(next);
		this._score += floor(len);

		noFill();
		stroke(33);
		for(let i=0; i<total; i++){
			let pX = this._points[i].x;
			let pY = this._points[i].y;
			let nX = this._points[i+1].x;
			let nY = this._points[i+1].y;
			let weight = this._points[i].weight;
			strokeWeight(weight);
			line(pX, pY, nX, nY);
		}
	}
}

class Point{

	constructor(x, y, len, deg, weight){
		this._x = x;
		this._y = y;
		this._len = len;
		this._deg = deg;
		this._weight = weight;
	}

	get x(){return this._x;}
	get y(){return this._y;}
	get len(){return this._len;}
	get deg(){return this._deg;}
	get weight(){return this._weight;}
}