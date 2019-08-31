// You can use this with
// [ p5.js v0.4.21 January 04, 2016 ]

var font;
var ssUp;
var pSprite;

function preload(){
	font = loadFont("assets/misaki_gothic.ttf");
	var ssUp = loadSpriteSheet("assets/pig_gun.png", [
		{"name":"up", "frame":{"x":0,  "y": 0, "width": 32, "height": 32}},
		{"name":"up", "frame":{"x":32, "y": 0, "width": 32, "height": 32}},
		{"name":"up", "frame":{"x":64, "y": 0, "width": 32, "height": 32}},
		{"name":"up", "frame":{"x":96, "y": 0, "width": 32, "height": 32}}]);
	saUp = loadAnimation(ssUp);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(16);

	// Sprite
	pSprite = createSprite(width*0.5, height*0.5, 32, 32);
	pSprite.addAnimation("up", saUp);
}

function draw(){
	console.log("draw");

	background(200);

	// Changing animation
	pSprite.changeAnimation("up");

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