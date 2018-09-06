console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

var myGui;
var myColor     = "#ee3300";
var myWeight    = 5;
var myWeightMin = 1;
var myWeightMax = 10;

let prevX = 0;
let prevY = 0;

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	background(0, 0, 0);
	fill(255, 255, 255);

	// GUI
	myGui = createGui("p5.gui");
	myGui.addGlobals("myColor", "myWeight");
	myGui.dragFlg = false;
}

function draw(){
	//console.log("draw");
}

function mousePressed(){
	console.log("mousePressed");

	// GUI
	if(containsGui()) myGui.dragFlg = true;

	// Position
	prevX = mouseX;
	prevY = mouseY;
}

function mouseDragged(){
	console.log("mouseDragged");

	// GUI
	if(myGui.dragFlg == true) return;

	// Stroke
	stroke(myColor);
	strokeWeight(myWeight);
	// Line
	line(prevX, prevY, mouseX, mouseY);
	// Position
	prevX = mouseX;
	prevY = mouseY;
}

function mouseReleased(){
	console.log("mouseRelased");

	// GUI
	myGui.dragFlg = false;
}
