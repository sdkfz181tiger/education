"use strict";
//==========
// p5.js

let d = 10;
let colors = [];
let nums = [];
let spds = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(8);
	noFill();
	stroke(255);
	strokeWeight(4);
	strokeCap(SQUARE);

	colors.push(color(22, 105, 122));
	colors.push(color(72, 159, 181));
	colors.push(color(130, 192, 204));
	colors.push(color(237, 231, 227));
	colors.push(color(255, 166, 43));

	for(let i=0; i<20; i++){
		nums.push(random(0, 360));
		spds.push(random(1, 5));
	}
}

function draw(){

	background(33);

	let cX = width / 2;
	let cY = height / 2;

	for(let r=0; r<nums.length; r++){

		if(r%3==0){
			nums[r] += spds[r];
		}else{
			nums[r] -= spds[r];
		}

		stroke(colors[r%colors.length]);

		push();
		translate(cX, cY);
		rotate(nums[r]);
		arc(0, 0, d*r, d*r, 0, 90);
		pop();
	}
}
