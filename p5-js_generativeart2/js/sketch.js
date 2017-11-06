console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

var walkman;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(0);

	fill(255, 255, 255);
	noStroke();

	rectMode(CENTER);

	// Walkman
	walkman = new Walkman(width/2, height/2, 3, 8.0, 0.0);
}

// 連続処理
function draw(){
	console.log("draw");
	//background(33, 33, 33);

	// Random
	var r = Math.floor(Math.random() * 100) + 155;
	var g = Math.floor(Math.random() * 100) + 155;
	var b = Math.floor(Math.random() * 100) + 155;
	fill(r, g, b);

	// Walk
	walkman.walk();
}

class Walkman{

	constructor(x, y, size, radius, radian){
		this.x      = x;
		this.y      = y;
		this.size   = size;
		this.radius = radius;
		this.radian = DEG_TO_RAD * (Math.floor(Math.random() * 360) - 180);
	}

	walk(){
		let rdm = Math.floor(Math.random() * 180) - 90;
		this.radian += DEG_TO_RAD * rdm;
		this.x = this.x + this.radius * Math.cos(this.radian);
		this.y = this.y + this.radius * Math.sin(this.radian);
		if(this.x < 0 || width < this.x || this.y < 0 || height < this.y){
			this.x = width / 2;
			this.y = height / 2;
		}
		rect(this.x, this.y, this.size, this.size);
	}
}
