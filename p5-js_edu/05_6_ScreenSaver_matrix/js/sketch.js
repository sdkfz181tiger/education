console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

const OFFSET_Y  = 16;

let font  = null;
let lines = [];

function preload(){
	console.log("preload!!");
	font = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(DISP_W, DISP_H);
	background(33);
	frameRate(12);

	noStroke();
	textFont(font);
	textSize(16);

	pushLine();
}

function pushLine(){
	// Push new line
	if(lines.length < 100){
		for(let i=0; i<8; i++){
			let x = random(0, width);
			let y = random(0, 100);
			let sLine = new StrLine(x, y);
			lines.push(sLine);
		}
	}
	setTimeout(()=>{pushLine();}, 300);
}

function draw(){
	console.log("draw!!");
	background(33);

	// Draw all lines or delete
	for(let i=lines.length-1; 0<=i; i--){
		if(lines[i].isDead()){
			lines.splice(i, 1);
		}else{
			lines[i].draw();
		}
	}
}

class StrLine{

	constructor(x, y){
		this._x = x;
		this._y = y;
		let cObj = new CharObj(0, x, y);
		this._arr = [];
		this._arr.push(cObj);
	}

	draw(){
		if(this.isDead()) return;
		// Push new character
		let length = this._arr.length;
		let x = this._x;
		let y = this._arr[length-1].getY() + OFFSET_Y;
		if(y < DISP_H){
			let cObj = new CharObj("A", x, y);
			this._arr.push(cObj);
		}
		// Draw all characters or delete
		for(let i=this._arr.length-1; 0<=i; i--){
			if(this._arr[i].isDead()){
				this._arr.splice(i, 1);
			}else{
				this._arr[i].draw();
			}
		}
	}

	isDead(){
		if(0 < this._arr.length) return false;
		return true;
	}
}

class CharObj{

	constructor(c, x, y){
		this._c = c;
		this._x = x;
		this._y = y;
		this._r = 50;
		this._g = 255;
		this._b = 100;
		this._a = floor(random(100, 255));
	}

	draw(){
		this._c = floor(random(0, 2));
		this._a -= 10;
		fill(this._r, this._g, this._b, this._a);
		text(this._c, this._x, this._y);
	}

	getX(){return this._x;}
	getY(){return this._y;}

	isDead(){
		if(0 < this._a) return false;
		return true;
	}
}