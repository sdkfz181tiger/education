"use strict";
//==========
// p5.js
// Original code link:
// ***

let msg = "= High and Low =";
let num = 5;
let rdm = 5;

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	angleMode(DEGREES);
	rectMode(CENTER);
	background(33);
}

function draw(){
	background(33);

	let cX = width / 2;
	let cY = height / 2;

	fill(255);
	textSize(64);
	textAlign(CENTER);
	text(msg, cX, cY+120);

	fill(33, 255, 33);
	square(cX, cY, 150);

	fill(33);
	textSize(64);
	textAlign(CENTER);
	text(rdm, cX, cY+24);

	fill(255);
	textSize(64);
	textAlign(CENTER);
	text("You-> " + num, cX, cY-180);

	num = rdm;
}

function keyPressed(){

	rdm = floor(random(0, 10));

	if(keyCode == UP_ARROW){
		if(rdm == num){
			msg = "Draw!!";
		}else if(rdm < num){
			msg = "You win!!";
		}else{
			msg = "You loose!!";
		}
	}

	if(keyCode == DOWN_ARROW){
		if(rdm == num){
			msg = "Draw!!";
		}else if(num < rdm){
			msg = "You win!!";
		}else{
			msg = "You loose!!";
		}
	}
	
	draw();
}