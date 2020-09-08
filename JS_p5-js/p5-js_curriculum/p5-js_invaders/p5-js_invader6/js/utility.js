console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

let seed = "";
for(let i=0; i<40; i++){
	seed += "1";
}
let max = parseInt(seed, 2);

const colors = [
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

	constructor(x, y){
		this._x = x;
		this._y = y;
		this._size = 2;
		this._num = Math.floor(Math.random() * max);
		this._speed  = 0.0;
		this._radian = 0.0;
		this._vX     = 0.0;
		this._vY     = 0.0;
	}

	setSpeed(speed, degree){
		this._speed = speed;
		this._degree = degree;
		this._radian = DEG_TO_RAD * degree;
		this._vX = this._speed * Math.cos(this._radian);
		this._vY = this._speed * Math.sin(this._radian);
	}

	draw(){
		// Move
		this._x += this._vX;
		this._y += this._vY;

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

		let c = this._num % colors.length;
		let color = colors[c];
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
}