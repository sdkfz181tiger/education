
const DIR = "./assets/";

let iDoku;

function preload(){
	iDoku = loadImage(DIR + "i_doku_x5.png");
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(8);
	background(33);

	let doku = createSprite(width/2, height/2);
	doku.addImage(iDoku);
}

function draw(){
	background(33);
	drawSprites();
}