console.log("Hello p5.js!!");

let gui;

var myColor = "#eeee00";

var myDeg = 30;
var myDegMin = 0;
var myDegMax = 180;

function preload(){

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textSize(64);
	textFont(font);

	// Images
	sImg = loadImage("assets/sample1.png");
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	noStroke();
	noFill();
	angleMode(DEGREES);

	// Create the GUI
	gui = createGui("p5.gui");
	gui.addGlobals("myColor", "myDeg");

	// No loop
	noLoop();
}

// 連続処理
function draw(){
	console.log("draw");
	background(0, 0, 0);
	fill(myColor);
	arc(width/2, height/2, 100, 100, myDeg/2, 360 - myDeg/2, PIE);
}

// マウスが押されたら
function mousePressed(){
	console.log("mousePressed");
}