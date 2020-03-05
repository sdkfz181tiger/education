console.log("Hello p5.js!!");

let font;
let num;
let dice;
let dImg1;
let dImg2;
let dImg3;
let dImg4;
let dImg5;
let dImg6;

let array;

function preload(){

	// Font
	font = loadFont("assets/misaki_gothic.ttf");

	// Images
	dImg1 = loadImage("assets/dice_1.png");
	dImg2 = loadImage("assets/dice_2.png");
	dImg3 = loadImage("assets/dice_3.png");
	dImg4 = loadImage("assets/dice_4.png");
	dImg5 = loadImage("assets/dice_5.png");
	dImg6 = loadImage("assets/dice_6.png");

	// Array
	array = [dImg1, dImg2, dImg3, dImg4, dImg5, dImg6];
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	fill(255, 255, 255);
	frameRate(8);
	noStroke();// No stroke

	// Font
	textSize(64);
	textFont(font);

	// Number
	num = 1;

	// Dice
	dice = createSprite(240, 160, 50, 50);
	dice.scale = 0.4;
	dice.addImage(dImg1);
}

function draw(){
	console.log("draw");
	background(0);

	// Text
	textAlign(CENTER);
	text(num,  240, 60);

	// Sprites
	drawSprites();
}

function mousePressed(){
	console.log("mousePressed");

	// Random
	num = getRandom(1, 6);
	dice.addImage(array[num-1]);
}

function getRandom(min, max){
	let range = max - min + 1;
	let result = Math.floor(Math.random() * range + min);
	return result;
}