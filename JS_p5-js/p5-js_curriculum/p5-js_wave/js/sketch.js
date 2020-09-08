console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;
let dots;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(24);
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(64);
	background(0);

	dots = [];
	let total   = 10;
	let padding = 30;
	let size    = 30;
	let radius  = 20;
	for(let i=0; i<total; i++){
		let x     = 240 + i * padding - (padding * total)/2;
		let y     = 160;
		let theta = (360 / total * i) * DEG_TO_RAD;
		let dot   = new MyDot(x, y, size, radius, theta);
		dots.push(dot);
	}
}

function draw(){
	console.log("draw");
	background(0);

	for(let i=0; i<dots.length; i++){
		dots[i].draw();
	}
}

class MyDot{

	constructor(x, y, size, radius, theta){
		this.x      = x;
		this.y      = y;
		this.size   = size;
		this.radius = radius;
		this.theta  = theta;
	}
	draw(){
		let cos  = Math.cos(this.theta);
		let sin  = Math.sin(this.theta);
		let posX = this.x
		let posY = this.y + this.radius * cos;
		let size = this.size * sin;
		rectMode(CENTER);
		rect(this.x, posY, size, size);
		this.theta += 0.04;
	}
}