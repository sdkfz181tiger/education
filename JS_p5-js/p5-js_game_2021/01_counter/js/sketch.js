"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let seTap;
let time = 16 * 10;
let score = 0;

//==========
// p5.js

function preload() {
	// SE
	seTap = loadSound("assets/se.mp3");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(16);
}

function draw(){

	background("#FFFFFF");

	time--;
	if(time <= 0){
		textAlign(CENTER);
		textSize(48);
		text("連打速度:" + score / 10 + "回/秒!!", width/2, height*0.9);
		noLoop();
	}

	textAlign(CENTER);
	textSize(64);
	text(time, width/2, height*0.2);

	textAlign(CENTER);
	textSize(256);
	text(score, width/2, height*0.65);

	drawSprites();
}

function mousePressed(){
	seTap.play();
	score++;
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

