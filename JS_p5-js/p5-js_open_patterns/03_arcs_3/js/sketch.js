"use strict";
//==========
// p5.js

let nums = [];
let colors = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(64);
	angleMode(DEGREES);
	rectMode(CENTER);
	strokeCap(SQUARE)

	noFill();
	stroke(255);
	strokeWeight(2);

	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));
	nums.push(random(360));

	colors.push(color(22, 105, 122));
	colors.push(color(72, 159, 181));
	colors.push(color(130, 192, 204));
	colors.push(color(237, 231, 227));
	colors.push(color(255, 166, 43));
}

function draw(){

	let cX = width / 2;
	let cY = height / 2;

	background(33);

	for(let i=0; i<nums.length; i++){
		push();
		let s = 30 * i + 10;
		if(i%2 == 0){
			nums[i] += 4;
		}else{
			nums[i] -= 4;
		}
		translate(cX, cY);
		rotate(nums[i]);
		arc(0, 0, s, s, 0, 90);
		pop();
	}
}
