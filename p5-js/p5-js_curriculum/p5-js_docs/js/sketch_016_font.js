var font;

function preload(){
  font = loadFont("assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	noLoop();

	textSize(32);
	textFont(font);
	text("Hello World!!", 10, 30);
	fill(0, 102, 153);
	text("Hello World!!", 10, 60);
	fill(0, 102, 153, 51);
	text("Hello World!!", 10, 90);
}

function draw(){
	console.log("draw");
}