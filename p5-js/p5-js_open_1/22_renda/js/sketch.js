"use strict";
//==========
// p5.js

let myTimer = 100;
let myCounter = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(10);
}

function draw(){

	if(myTimer <= 0){
		noLoop();
	}else{
		myTimer -= 1;
	}

	if(myCounter > 30){
		background(200, 200, 50);
	}else if(myCounter > 15){
		background(50, 200, 50);
	}else{
		background(200);
	}

	stroke(255, 255, 255);
	strokeWeight(5);
	noFill();
	circle(width/2, height/2, myCounter*5);

	noStroke();
	fill(33);
	textAlign(CENTER);
	textSize(64);
	text(myTimer, width/2, height/2 - 64);

	textSize(128);
	text(myCounter, width/2, height/2 + 45);
}

function mousePressed(){

	myCounter += 1;
}