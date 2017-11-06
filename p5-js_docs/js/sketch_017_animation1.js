var font;
var counter;

function preload() {
  font = loadFont("assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(200);
	frameRate(16);
	counter = 0;
}

function draw(){
	console.log("draw");

	background(200);

	textSize(24);
	textFont(font);
	fill(33, 33, 33);
	text("Counter:" + counter, 5, 25);
	counter++;
}

function mousePressed(){
	console.log("= noLoop =");
	noLoop();
}

function mouseReleased(){
	console.log("= loop =");
	loop();
}