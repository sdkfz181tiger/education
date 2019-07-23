console.log("Hello p5.js!!");

const FILE_PREFIX = "rainbow";
const FILE_FROM   = 1;
const FILE_LAST   = 1;
const FILE_SCALE  = 2;// FirefoxのZoomを50%にする事

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

let imgObj  = new Object();
let keys    = [];
let counter = 0;

function preload(){
	console.log("preload");

	// Files
	for(let i=FILE_FROM; i<=FILE_LAST; i++){
		let file = FILE_PREFIX;
		if(i < 10) file += "0";
		file +=  i + ".png";
		imgObj[file] = loadImage("assets/" + file);
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
	//let array = fileName.split(".");
	//save(cvs, array[0] + "_x" + size + "." + array[1]);
	// Save(同じファイル名)
	save(cvs, fileName);
}
