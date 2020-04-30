"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(8);
	colorMode(RGB);
	angleMode(DEGREES);
}

function draw(){
	background(33);

	let pad = 110;
	let rows = windowHeight / pad;
	let cols = windowWidth / pad;
	for(let r=0; r<=rows; r++){
		for(let c=0; c<=cols; c++){
			let x = c * pad + (pad / 2);
			let y = r * pad + (pad / 2);
			let rdm = floor(random(5));
			if(rdm == 1){
				enemy(x, y, 255, 55, 55);
			}else if(rdm == 2){
				enemy(x, y, 55, 155, 255);
			}else if(rdm == 3){
				enemy(x, y, 255, 155, 55);
			}else if(rdm == 4){
				enemy(x, y, 255, 55, 220);
			}else{
				pacman(x, y);
			}
		}
	}
}

function smile(){
	fill(255, 255, 5);
	noStroke();

	let cX = windowWidth / 2;
	let cY = windowHeight / 2;
	circle(cX, cY, 300, 300);

	fill(0, 0, 0);
	circle(cX - 50, cY - 40, 40, 40);
	circle(cX + 50, cY - 40, 40, 40);

	noFill();
	stroke(0, 0, 0);
	strokeWeight(20);
	arc(cX, cY + 20, 200, 100, 20, 160);
}

function pacman(x, y){

	fill(255, 255, 5);
	noStroke();
	arc(x, y, 100, 100, 30, 330);
}

function enemy(x, y, r, g, b){

	fill(r, g, b);
	noStroke();
	arc(x, y, 100, 100, 180, 360);
	rect(x-50, y, 100, 25);

	let fY = y + 25;
	triangle(x-50, fY, x-50, fY+20, x-20, fY);
	triangle(x+50, fY, x+50, fY+20, x+20, fY);
	triangle(x-20, fY, x+20, fY,    x, fY+20);

	fill(255);
	ellipse(x-25, y-15, 30, 35);

	fill(0);
	circle(x-30, y-15, 15);

	fill(255);
	ellipse(x+15, y-15, 30, 35);

	fill(0);
	circle(x+10, y-15, 15);
}

