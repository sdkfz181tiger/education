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

	let padding = 20;
	let cols = width / padding;
	let rows = height / padding;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let inv = new Invader(c*padding, r*padding);
			inv.draw(200, 200, 200);
		}
	}
}

// 連続処理
function draw(){
	console.log("draw");
}

class Invader{

	constructor(x, y){
		this.x = x;
		this.y = y;
		let seed  = "111111111111111";
		let max   = parseInt(seed, 2);
		this.num  = Math.floor(Math.random() * max);
		this.str  = this.num.toString(2);
		this.size = 4;
	}

	draw(r, g, b){
		fill(
			Math.floor(Math.random() * r) + 255 - r,
			Math.floor(Math.random() * g) + 255 - g,
			Math.floor(Math.random() * b) + 255 - b);
		for(let i=0; i<this.str.length; i++){
			if(this.str[i] === "1"){
				let odd = i % 3;
				let posX = this.x + this.size * odd;
				let posY = this.y + this.size * Math.floor(i / 3);
				rect(posX, posY, this.size, this.size);
				if(odd === 0) rect(posX+this.size*4, posY, this.size, this.size);
				if(odd === 1) rect(posX+this.size*2, posY, this.size, this.size);
			}
		}
	}
}