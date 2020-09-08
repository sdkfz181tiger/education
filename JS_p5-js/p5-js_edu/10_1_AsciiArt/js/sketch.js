console.log("Hello p5.js!!");

let img;

const AA_WIDTH  = 100;
const AA_HEIGHT = 100;

let gfx;

let asciiArt;
let asciiArray;
let cyclicTime;

function preload(){
	console.log("preload!!");

	// Image
	img = loadImage("./assets/art1.jpg");
}

function setup(){
	console.log("setup!!");
	createCanvas(img.width, img.height);
	background(33);

	// Image
	//image(img, 0, 0);

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
	textAlign(CENTER, CENTER); 
	textStyle(NORMAL);
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