console.log("Hello utility.js!!");

//==========
// Utility(main)

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

let seed = "";
for(let i=0; i<40; i++) seed += "1";
const MAX  = parseInt(seed, 2);
const INV_ROWS = 6;
const INV_COLS = 9;
const INV_PAD  = 24;

const COLORS = [
	[124,124,124], [0,0,252], [0,0,188], [68,40,188], [148,0,132],
	[168,0,32], [168,16,0], [136,20,0], [0,120,0],
	[0,120,248], [0,88,248], [104,68,252], [216,0,204], [228,0,88],
	[248,56,0], [228,92,16], [172,124,0], [0,184,0], [0,168,0],
	[0,168,68], [0,136,136], [248,248,248], [60,188,252], [104,136,252],
	[152,120,248], [248,120,248], [248,88,152], [248,120,88], [252,160,68],
	[248,184,0], [184,248,24], [88,216,84], [88,248,152], [0,232,216],
	[120,120,120], [252,252,252], [164,228,252], [184,184,248], [216,184,248],
	[248,184,248], [248,164,192], [240,208,176], [252,224,168], [248,216,120],
	[216,248,120], [184,248,184], [184,248,216], [0,252,252], [248,216,248]
];

class Invader{

	constructor(x, y, num){
		this._x = x; this._y = y;
		this._num = num; this._size = 2;
		this._w = this._size * 10;
		this._h = this._size * 8;
		this._vX = 0; this._vY = 0;
		this._speed = 0;
		this._deg = 0; this._rad = 0;
	}

	draw(){
		// Move
		this._x += this._vX; this._y += this._vY;

		// Pattern
		this._str = this._num.toString(2);
		if(this._str.length < 40){
			let total = 40 - this._str.length;
			let prefix = "";
			for(let i=0; i<total; i++){
				prefix += "0";
			}
			this._str = prefix + this._str;
		}

		let c = this._num % COLORS.length;
		let color = COLORS[c];
		fill(color[0], color[1], color[2]);

		// Body
		for(let i=0; i<this._str.length; i++){
			if(this._str[i] === "1"){
				let odd = i % 5;
				let lX = this._x + this._size * odd;
				let lY = this._y + this._size * Math.floor(i / 5);
				rect(lX, lY, this._size, this._size);
				let rX = this._x - this._size * (odd-9);
				let rY = lY
				rect(rX, rY, this._size, this._size);
			}
		}
	}

	setPosition(x, y){
		this._x = x; this._y = y;
	}

	startMove(speed, deg){
		this._speed = speed;
		this._deg = deg;
		this._rad = DEG_TO_RAD * deg;
		this._vX = speed * Math.cos(this._rad);
		this._vY = speed * Math.sin(this._rad);
	}

	stopMove(){
		this._speed = 0;
		this._vX = 0; this._vY = 0;
	}

	bounceWall(){
		if(this._x < 0){
			this._vX *= -1;
			this._x += -this._x;
			this._y += INV_PAD;
			return;
		}
		if(width < this._x + this._w){
			this._vX *= -1;
			this._x -= this._x + this._w - width;
			this._y += INV_PAD;
			return;
		}
		if(height < this._y + this._h){
			this._y -= height;
			return;
		}
	}
}