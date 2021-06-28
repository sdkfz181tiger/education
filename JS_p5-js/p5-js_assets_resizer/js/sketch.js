console.log("Hello p5.js!!");

const files = [
	"d_left_open.png",
	"d_right_open.png",
	"d_right_close.png",
	"n_back.png",
	"n_dead.png",
	"n_gameover.png",
	"n_guide.png",
	"n_item_1.png",
	"n_item_2.png",
	"n_item_3.png",
	"n_item_4.png",
	"n_item_5.png",
	"n_item_6.png",
	"n_ninja.png",
	"n_player_1.png",
	"n_player_2.png",
	"n_player_3.png",
	"n_player_4.png",
	"n_player_5.png",
	"n_player_6.png",
	"n_player_7.png"
];

const FILE_FROM   = 1;// From...
const FILE_LAST   = 3;// To...
const FILE_SCALE  = 3;// FirefoxのZoomを50%にする事

const DISP_W = 64;
const DISP_H = 64;
const DEG_TO_RAD  = Math.PI / 180;

let imgObj  = new Object();
let keys    = [];
let counter = 0;

function preload(){
	console.log("preload");

	// Files
	for(let file of files){
		imgObj[file] = loadImage("./assets/" + file);
	}

	// Keys
	keys = Object.keys(imgObj);
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
}

function draw(){
	console.log("draw");
}

function mousePressed(){
	console.log("mousePressed");
}

function createPng(){

	setTimeout(()=>{
		console.log("createPng:" + keys[counter]);
		savePng(keys[counter], FILE_SCALE);// FirefoxのZoomを50%にする事
		counter++;
		if(keys.length <= counter) return;
		createPng();
	}, 100);
}

function savePng(fileName, size){
	console.log("savePng:" + fileName);

	// Image
	let img    = imgObj[fileName];
	let width  = img.width;
	let height = img.height;

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

 	// Save(***_x4.png)
	let array = fileName.split(".");
	save(cvs, array[0] + "_x" + size + "." + array[1]);
	// Save(同じファイル名)
	//save(cvs, fileName);
}
