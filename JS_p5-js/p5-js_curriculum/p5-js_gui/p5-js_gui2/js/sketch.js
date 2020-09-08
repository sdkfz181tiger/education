console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

let gui;

var myColor = "#eeee00";

var myTotal = 100;
var myTotalMin = 0;
var myTotalMax = 300;

var myDeg = 35;
var myDegMin = 0;
var myDegMax = 180;

var myRadius = 1;
var myRadiusMin = 0;
var myRadiusMax = 10;

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
	gui.addGlobals("myColor", "myTotal", "myDeg", "myRadius");

	// No loop
	noLoop();
}

// 連続処理
function draw(){
	console.log("draw");
	background(0, 0, 0);
	fill(myColor);

	let cX = 350;
	let cY = height / 2;

	for(let i=0; i<myTotal; i++){
		let radian = myDeg * i * DEG_TO_RAD;
		let x = i * myRadius * Math.cos(radian) + cX;
		let y = i * myRadius * Math.sin(radian) + cY;
		ellipse(x, y, 5, 5);
	}
}