"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let seTap;
let images = [];
let sprites = [];
let time = 16 * 30;
let score = 0;

//==========
// p5.js

function preload() {
	// SE
	seTap = loadSound("assets/se.mp3");
	// Images
	images.push(loadImage("assets/c_mar_x2.png"));
	images.push(loadImage("assets/c_san_x2.png"));
	images.push(loadImage("assets/c_shi_x2.png"));
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(16);

	for(let i=0; i<100; i++){
		let x = random(width);
		let y = random(height);
		createRdmSprite(x, y);
	}
}

function draw(){

	background("#FFFFFF");

	drawSprites();

	time--;
	if(time <= 0){
		textAlign(CENTER);
		textSize(64);
		text("GAME OVER", width/2, height/2);
		noLoop();
	}

	textAlign(LEFT);
	textSize(32);
	text("TIME:" + time, 0, 32);

	textAlign(RIGHT);
	textSize(32);
	text("SCORE:" + score, width, 32);

	for(let spr of sprites){
		if(spr.position.x < 0) spr.position.x = width;
		if(width < spr.position.x) spr.position.x = 0;
		if(spr.position.y < 0) spr.position.y = height;
		if(height < spr.position.y) spr.position.y = 0;
	}
}

function createRdmSprite(x, y){

	let spr = createSprite(x, y, 32, 32);
	let i = floor(random(images.length));
	spr.addImage(images[i]);
	spr.onMousePressed = (e)=>{
		seTap.play();
		spr.position.x = -100;
		spr.position.y = -100;
		score += 10;
	};
	let spd = random(1, 4);
	let deg = random(360);
	spr.setSpeed(spd, deg);
	sprites.push(spr);
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

