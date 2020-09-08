// You can use this with
// [ p5.js v0.4.21 January 04, 2016 ]

var font;
var sImg;
var pSprite;

function preload(){
	font = loadFont("assets/misaki_gothic.ttf");
	sImg = loadImage("assets/t_boss.png");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(16);

	// Sprite
	pSprite = createSprite(width*0.5, height*0.5, 32, 32);
	pSprite.addImage(sImg);
}

function draw(){
	console.log("draw");

	background(200);

	// Draw
	drawSprites();
}

function mousePressed(){
	console.log("= noLoop =");
	noLoop();
}

function mouseReleased(){
	console.log("= loop =");
	loop();
}