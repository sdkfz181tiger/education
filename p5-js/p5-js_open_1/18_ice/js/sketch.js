"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);

	background(0);
	noStroke();
	fill(50, 120, 255, 60);
}

function draw(){

	blendMode(ADD);
	for(let i=0; i<3000; i++){
		let x = random(width);
		let y = random(height);
		let s = random(30, 60);

		push();
		translate(x, y);
		rotate(random(360));
		square(0, 0, s);
		pop();
	}

	blendMode(NORMAL);

	let pg = createGraphics(width, height);
	pg.background(0, 0, 33);
	pg.erase();
	pg.noStroke();
	for(let i=0; i<200; i++){
		pg.rect(random(width), random(height), random(40, 180), 3);
		pg.circle(random(width), random(height), random(10, 60));
	}
	pg.noErase();
	image(pg, 0, 0);
}