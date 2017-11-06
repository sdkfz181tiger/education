// You can use this with
// [ p5.js v0.4.21 January 04, 2016 ]

var sImg;

var dSprite, wSprite;

function preload(){
	sImg = loadImage("assets/t_daruma.png");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(16);

	// Daruma
	var x = width * 0.5;
	var y = 180;
	dSprite = createSprite(x, y);
	dSprite.addImage(sImg);
	// Velocity
	dSprite.velocity.x = 0.5;
	dSprite.velocity.y = 1;

	// Wall
	var x = width * 0.5;
	var y = 230;
	wSprite = createSprite(x, y, 230, 30);
	wSprite.shapeColor = color(255, 200, 200);
	wSprite.immovable = true;
}

function draw(){
	console.log("draw");

	background(200);

	// Bounce
	dSprite.bounce(wSprite);

	// Draw
	drawSprites();
}