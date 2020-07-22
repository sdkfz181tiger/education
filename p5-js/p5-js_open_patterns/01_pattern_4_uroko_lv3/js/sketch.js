"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw(){
	
	let colors = [];
	colors.push(color(22, 105, 122));
	colors.push(color(72, 159, 181));
	colors.push(color(130, 192, 204));
	colors.push(color(237, 231, 227));
	colors.push(color(255, 166, 43));

	background(200);
	noStroke();

	let l = colors.length;
	let s = 100;

	for(let a=0; a<20; a++){
		for(let b=0; b<20; b++){
			let rdm = random(l);
			let index = floor(rdm);
			let c = colors[index];
			fill(c);
			let x = b * s;
			let y = a * s;
			let odd = a % 2;
			if(odd == 0){
				x += s / 2;
			}
			triangle(x, y, x+s, y, x+s/2, y-s);
		}
	}
}
