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

	let padding = 32;
	let cols = width / padding;
	let rows = height / padding;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let inv = new Invader(c*padding, r*padding, 200, 200, 200);
			inv.draw();
		}
	}
}

// 連続処理
function draw(){
	console.log("draw");
}

class Invader{

	constructor(x, y, r, g, b){
		this._x = x;
		this._y = y;
		this._r = Math.floor(Math.random() * r) + 255 - r;
		this._g = Math.floor(Math.random() * g) + 255 - g;
		this._b = Math.floor(Math.random() * b) + 255 - b;
		this._size = 2;
	}

	draw(){
		fill(this._r, this._g, this._b);

		for(let r=0; r<16; r++){

			let seed = "11111111";
			let max  = parseInt(seed, 2);
			let num  = Math.floor(Math.random() * max);
			let str  = num.toString(2);

			if(str.length < 8){
				let total = 8 - str.length;
				let prefix = "";
				for(let i=0; i<total; i++){
					prefix += "0";
				}
				str = prefix + str;
			}

			let strL = str;
			let strR = strL.split("").reverse().join("");

			// Left
			for(let c=0; c<strL.length; c++){
				if(strL[c] === "1"){
					let posX = this._x + this._size * c;
					let posY = this._y + this._size * r;
					rect(posX, posY, this._size, this._size);
				}
			}

			// Right
			for(let c=0; c<strR.length; c++){
				if(strR[c] === "1"){
					let posX = this._x + this._size * c + seed.length * this._size;
					let posY = this._y + this._size * r;
					rect(posX, posY, this._size, this._size);
				}
			}
		}
	}
}