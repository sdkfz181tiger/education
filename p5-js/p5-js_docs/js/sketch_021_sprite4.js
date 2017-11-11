// You can use this with
// [ p5.js v0.4.21 January 04, 2016 ]

var font;
var sImg;

function preload(){
	font = loadFont("assets/misaki_gothic.ttf");
	sImg = loadImage("assets/t_daruma.png");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(16);

	for(var i=0; i<10; i++){
		// Sprite
		var x = random(width);
		var y = random(height);
		var pSprite = createSprite(x, y);
		pSprite.addImage(sImg);
		// Velocity
		pSprite.velocity.y = 1;
	}
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