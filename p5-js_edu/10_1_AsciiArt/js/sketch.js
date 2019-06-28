console.log("Hello p5.js!!");

const title = "Pegeon Simulator_ver1.0.0";

let img;

const AA_WIDTH  = 100;
const AA_HEIGHT = 40;

let gfx;

let asciiArt;
let asciiArray;
let cyclicTime;

function preload(){
	console.log("preload!!");

	// Image
	img = loadImage("./assets/person_480x320.png");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(33);

	// Graphics
	gfx = createGraphics(AA_WIDTH, AA_HEIGHT);
	gfx.pixelDensity(8);
	gfx.image(img, 0, 0, gfx.width, gfx.height);

	// AsciiArt
	asciiArt = new AsciiArt();
	asciiArt.printWeightTable();

	// Array
	asciiArr = asciiArt.convert(gfx);

	// Text
	textFont("monospace", 8);
	textAlign(CENTER, CENTER); textStyle(NORMAL);
	fill(255); noStroke();

	typeArr2d(asciiArr, this);
}

function typeArr2d(arr2d, dst, x, y, w, h){
	switch(arguments.length){
		case 2: x = 0; y = 0; w = width; h = height; break;
		case 4: w = width; h = height; break;
		case 6: /* Do nothing */ break;
		default: console.log("Error: " + arguments.length);
		return;
	}
	let context = dst.canvas.getContext("2d");
	let dstHor = w / arr2d.length;
	let dstVer = h / arr2d[0].length;
	let offsetX = x + dstHor * 0.5;
	let offsetY = y + dstVer * 0.5;
	for(let tmpY = 0; tmpY < arr2d[0].length; tmpY++){
		for(let tmpX = 0; tmpX < arr2d.length; tmpX++){
			context.fillText(
				arr2d[tmpX][tmpY],
				offsetX + tmpX * dstHor,
				offsetY + tmpY * dstVer);
		}
	}
}