console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

let myColor;
let myWeight;
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

	// Setup
	myColor  = color(255, 255, 255);
	myWeight = 5;

	// Pallets
	let defX = 20;
	let defY = DISP_H - 30;
	let padX = 30;
	for(let i=0; i<3; i++){
		let posX = defX + padX * i;
		let posY = defY;
		let sprite = createSprite(posX, posY, 20, 20);
		//sprite.shapeColor = color(255, 255, 255);
		sprite.onMousePressed = function(){
			console.log("color:" + sprite.shapeColor);
			myColor = sprite.shapeColor;
		}
	}
}

function draw(){
	// Sprites
	drawSprites();
}

function mousePressed(){
	//console.log("mousePressed");

	// Position
	prevX = mouseX;
	prevY = mouseY;
}

function mouseDragged(){
	//console.log("mouseDragged");

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
	//console.log("mouseRelased");
}
