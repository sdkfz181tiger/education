console.log("Hello p5.js!!");

const DISP_W = 64;
const DISP_H = 64;
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

let index = 0;
let total = 100;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font); textSize(32); fill(255);

	// Images
	for(file of files){
		imgObj[file] = loadImage("assets/" + file);
	}
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	noLoop();
	clear();
	background("rgba(0, 0, 0, 0)");

	fill(255, 255, 255);
	noStroke();

	createInvader();
}

function draw(){
	console.log("draw");
}

function mousePressed(){
	console.log("mousePressed");
}

function createInvader(){
	console.log("createInvader:" + index);
	setTimeout(()=>{
		saveInvader();
		index++;
		if(index < total) createInvader();
	}, 100);
}

function saveInvader(){
	// Seed
	let seed = "";
	for(let i=0; i<40; i++){
		seed += "1";
	}
	let max = parseInt(seed, 2);

	// Canvas
	let rows = 8;
	let cols = 10;
	let size = 5;
	let cvs = createCanvas(cols*size, rows*size);
	clear();
	background("rgba(0, 0, 0, 0)");

	// Invader
	let num = Math.floor(Math.random() * max);
	let invader = new Invader(0, 0, size);
	invader.draw(num);

	// Filename
	let prefix = "inv_";
	if(index < 10) prefix += "0";
	let fileName = prefix + index + ".png";
	console.log(fileName);

	save(cvs, fileName);
}

class Invader{

	constructor(x, y, size){
		this._x = x;
		this._y = y;
		this._size = size;
	}

	draw(num){

		// Pattern
		this._str = num.toString(2);
		if(this._str.length < 40){
			let total = 40 - this._str.length;
			let prefix = "";
			for(let i=0; i<total; i++){
				prefix += "0";
			}
			this._str = prefix + this._str;
		}

		let c = num % colors.length;
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
