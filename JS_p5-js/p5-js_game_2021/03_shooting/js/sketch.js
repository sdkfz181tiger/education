"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let bullets = [];

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

	
}

function draw(){

	background("#FFFFFF");

	drawSprites();

	
}

function createRdmSprite(x, y){

	
}

function getColor(){
	let c = floor(random(palette.length));
	return palette[c];
}

