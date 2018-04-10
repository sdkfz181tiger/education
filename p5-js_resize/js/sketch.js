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

let invaders;
let max;
let counter;

let files = [
	// "exp_large_1.png", "exp_large_2.png", "exp_large_3.png",
	// "exp_large_4.png", "exp_large_5.png", "exp_large_6.png",
	"exp_mid_1.png", "exp_mid_2.png", "exp_mid_3.png",
	"exp_small_1.png", "exp_small_2.png", "exp_small_3.png",
	"exp_small_4.png", "exp_small_5.png", "exp_small_6.png",
	"exp_small_7.png", "exp_small_8.png", "exp_small_9.png",
	"exp_small_10.png", "exp_small_11.png", "exp_small_12.png",
	"exp_small_13.png", "exp_small_14.png", "exp_small_15.png"

	// "title_logo_1.png"
	// "u_die_1.png", "u_die_2.png", "u_die_3.png",
	// "u_die_4.png", "u_die_5.png",
	// "u_roll_1.png", "u_roll_2.png", "u_roll_3.png",
	// "u_roll_4.png", "u_roll_5.png"

	// "b_aqua_1.png",  "b_bits_1.png",   "b_blue_1.png",
	// "b_brown_1.png", "b_forest_1.png", "b_gray_1.png",
	// "b_green_1.png", "b_lime_1.png",   "b_orange_1.png",
	// "b_pink_1.png",  "b_purple_1.png", "b_red_1.png",
	// "b_rock_1.png",  "b_white_1.png",  "b_yellow_1.png",
	// "i_break_1.png", "i_break_2.png", "i_break_3.png",
	// "i_break_4.png", "i_break_5.png", "i_break_6.png",
	// "i_break_7.png", "i_break_8.png", "i_break_9.png",
	// "i_catch_1.png", "i_catch_2.png", "i_catch_3.png",
	// "i_catch_4.png", "i_catch_5.png", "i_catch_6.png",
	// "i_catch_7.png", "i_catch_8.png", "i_catch_9.png",
	// "i_disruption_1.png", "i_disruption_2.png", "i_disruption_3.png",
	// "i_disruption_4.png", "i_disruption_5.png", "i_disruption_6.png",
	// "i_disruption_7.png", "i_disruption_8.png", "i_disruption_9.png",
	// "i_expand_1.png", "i_expand_2.png", "i_expand_3.png",
	// "i_expand_4.png", "i_expand_5.png", "i_expand_6.png",
	// "i_expand_7.png", "i_expand_8.png", "i_expand_9.png",
	// "i_lazer_1.png", "i_lazer_2.png", "i_lazer_3.png",
	// "i_lazer_4.png", "i_lazer_5.png", "i_lazer_6.png",
	// "i_lazer_7.png", "i_lazer_8.png", "i_lazer_9.png",
	// "i_player_1.png", "i_player_2.png", "i_player_3.png",
	// "i_player_4.png", "i_player_5.png", "i_player_6.png",
	// "i_player_7.png", "i_player_8.png", "i_player_9.png",
	// "i_speeddown_1.png", "i_speeddown_2.png", "i_speeddown_3.png",
	// "i_speeddown_4.png", "i_speeddown_5.png", "i_speeddown_6.png",
	// "i_speeddown_7.png", "i_speeddown_8.png", "i_speeddown_9.png",
	// "b_vanish_1.png", "b_vanish_2.png", "b_vanish_3.png", "b_vanish_4.png",
	// "b_vanish_5.png", "b_vanish_6.png", "b_vanish_7.png", "b_vanish_8.png",
	// "b_vanish_9.png", "b_vanish_10.png",
	// "w_left.png", "w_right.png", "w_top_left.png", "w_top_right.png"
];

let imgObj = new Object();

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

	// Create
	createPng();

	/*
	// Invader
	invaders = [];
	let paddingX = 128;
	let paddingY = 128;
	let cols = width / paddingX;
	let rows = height / paddingY;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let invader = new Invader(c*paddingX, r*paddingY);
			invaders.push(invader);
		}
	}

	// Max
	let seed = "";
	for(let i=0; i<40; i++){
		seed += "1";
	}
	max = parseInt(seed, 2);
	counter = 0;
	*/
}

function draw(){
	console.log("draw");
}

function mousePressed(){
	console.log("mousePressed");
}

function createPng(index = 0){
	console.log("createPng:" + index);
	setTimeout(()=>{
		if(index < files.length){
			savePng(files[index], 4);// FirefoxのZoomを50%にする事
			savePng(files[index], 5);// FirefoxのZoomを50%にする事
			index++;
			createPng(index);
		}
	}, 100);
}

function savePng(fileName, size){
	console.log("savePng:" + fileName);

	// Image
	let img = imgObj[fileName];
	let width  = img.width;
	let height = img.height;

	console.log("w, h:" + width + ", " + height);

	// Array
	let colors = new Array();
	for(let y=0; y<height; y++){
		let lines = new Array();
		for(let x=0; x<width; x++){
			lines.push(img.get(x, y));
		}
		colors.push(lines);
	}

	// Canvas
	let rMax = colors.length;
	let cMax = colors[0].length;
	let cvs = createCanvas(width*size, height*size);

	console.log("cvs:" + width*size + ", " + height*size);

	// Rect
	for(let r=0; r<rMax; r++){
		for(let c=0; c<cMax; c++){
			if(colors[r][c][3] != 0){
				fill(colors[r][c]);
				rect(size*c, size*r, size, size);
			}
		}
	}

 	// Save
	let array = fileName.split("_");
	save(cvs, array[0] + "_" + array[1] + "_x" + size + "_" + array[2]);
}

function startGenerate(){
	window.setTimeout(()=>{
		generateInvaders();
		startGenerate();
	}, 1000);
}

function generateInvaders(){

	console.log("generateInvaders");

	clear();
	//background("rgba(0, 0, 0, 0)");
	for(invader of invaders){
		let num = Math.floor(Math.random() * max);
		console.log(num);
		invader.draw(num);
	}
	// Save
	counter++;
	let prefix = "invaders_";
	if(counter < 10) prefix += "0";
	let fileName = prefix + counter + ".png";
	//saveCanvas(fileName);
}

class Invader{

	constructor(x, y){
		this._x = x;
		this._y = y;
		this._size = 4;
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
		//console.log("init:" + num);

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
