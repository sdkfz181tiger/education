console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

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

let invaders;
let max;
let counter;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	clear();
	//background("rgba(0, 0, 0, 0)");

	fill(255, 255, 255);
	noStroke();

	// Invader
	invaders = [];
	let padding = 32;
	let cols = width / padding;
	let rows = height / padding;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let invader = new Invader(c*padding, r*padding);
			invaders.push(invader);
		}
	}

	// Max
	let seed = "";
	for(let i=0; i<32; i++){
		seed += "1";
	}
	max = parseInt(seed, 2);
	counter = 0;

	startGenerate();
}

function draw(){
	console.log("draw");
	clear();
	//background("rgba(0, 0, 0, 0)");
}

function mousePressed(){
	console.log("mousePressed");
}

function startGenerate(){
	window.setTimeout(()=>{
		clear();
		//background("rgba(0, 0, 0, 0)");
		for(invader of invaders){
			let num = Math.floor(Math.random() * max);
			invader.draw(num);
		}
		startGenerate();
		// Save
		counter++;
		let prefix = "invaders_";
		if(counter < 10) prefix += "0";
		let fileName = prefix + counter + ".png";
		//saveCanvas(fileName);
	}, 5000);
}

class Invader{

	constructor(x, y){
		this._x = x;
		this._y = y;
		this._size = 2;
	}

	draw(num){

		// Pattern
		this._str = num.toString(2);
		if(this._str.length < 32){
			let total = 32 - this._str.length;
			let prefix = "";
			for(let i=0; i<total; i++){
				prefix += "0";
			}
			this._str = prefix + this._str;
		}
		//console.log("init:" + num);

		let c = num % colors.length;
		let color = colors[c];
		fill(color[0], color[1], color[2]);

		// Body
		for(let i=0; i<this._str.length; i++){
			if(this._str[i] === "1"){
				let odd = i % 4;
				let lX = this._x + this._size * odd;
				let lY = this._y + this._size * Math.floor(i / 4);
				rect(lX, lY, this._size, this._size);
				let rX = this._x - this._size * (odd-7);
				let rY = lY
				rect(rX, rY, this._size, this._size);
			}
		}
	}
}