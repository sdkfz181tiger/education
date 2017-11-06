console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	background(0);

	fill(255, 255, 255);
	noStroke();

	rectMode(CENTER);

	let size = 40.0;
	let cols = width / size;
	let rows = height / size;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let tTop = new Triangle(c*size, r*size, size, 0.0);
			tTop.draw(150, 200, 150);
			let tBtm = new Triangle(c*size+size, r*size+size, size, 180.0);
			tBtm.draw(150, 200, 150);
		}
	}
}

// 連続処理
function draw(){
	console.log("draw");
}

class Triangle{

	constructor(x, y, size, deg){
		this.x = x;
		this.y = y;
		this.radius  = size;
		this.radFrom = deg * DEG_TO_RAD;
		this.radTo   = (deg + 90.0) * DEG_TO_RAD;
	}

	draw(r, g, b){
		fill(
			Math.floor(Math.random() * r) + 255 - r,
			Math.floor(Math.random() * g) + 255 - g,
			Math.floor(Math.random() * b) + 255 - b);
		triangle(
			this.x, this.y,
			this.x + this.radius * Math.cos(this.radFrom),
			this.y + this.radius * Math.sin(this.radFrom),
			this.x + this.radius * Math.cos(this.radTo),
			this.y + this.radius * Math.sin(this.radTo));
	}
}