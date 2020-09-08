"use strict";
//==========
// p5.js

function setup(){
	createCanvas(windowWidth, windowHeight);
	noLoop();
	colorMode(RGB);
	angleMode(DEGREES);

	background(33);

	const size = 30;
	const grid = 10;
	const sX = width / 2 - (size*grid) / 2;
	const sY = height / 2 - (size*grid) / 2;

	// Prizm
	let bg = createGraphics(size, size);
	bg.noStroke();
	bg.fill(100);
	bg.square(0, 0, bg.width, bg.height);
	bg.strokeWeight(2);
	setGradiation(bg, size, 0, 135);
	setGradiation(bg, size, 180, 315);
	for(let r=0; r<grid; r++){
		for(let c=0; c<grid; c++){
			image(bg, sX+size*c, sY+size*r);
		}
	}
	
	// Overlay
	colorMode(HSB);
	blendMode(OVERLAY);
	for(let r=0; r<grid; r++){
		for(let c=0; c<grid; c++){
			noStroke();
			fill((r+c)*360/20, 100, 100, 50);
			rect(sX+c*size, sY+r*size, size, size);
		}
	}
}

function setGradiation(gra, size, from, to){

	const c1 = color(50);
	const c2 = color(255);
	for(let i=from; i<=to; i+=2){
		let inter = map(i, from, to, 0, 1);
		let c = lerpColor(c1, c2, inter);
		gra.stroke(c);
		let x = size/2 + cos(i) * size;
		let y = size/2 + sin(i) * size;
		gra.line(size/2, size/2, x, y);
	}
}

function draw(){
	//background(33);
}

function drawGumi(cX, cY, size, n){

	let color = (n%2==0)? 0:255;
	fill(color);

	let step = 360 / 10;
	let points = [];
	for(let p=0; p<360; p+=step) points.push(p);
	beginShape();
	for(let i=0; i<points.length+3; i++){
		let index = (i<points.length)?i:i-points.length;
		let d = points[index];
		let r = size + noise(d, seed) * size * 0.8;
		let x = cX + r * cos(d);
		let y = cY + r * sin(d);
		curveVertex(x, y);
	}
	endShape();
}

function createGrid(pX, pY, d, g){
	let s = d / g;
	for(let x=0; x<d; x+=s){
		for(let y=0; y<d; y+=s){
			let r = parseInt(random(1, 4));
			if(r == 1 || s < 120){
				fill(random(60, 255));
				rect(pX+x, pY+y, s, s);
				drawShape(pX+x, pY+y, s);
			}else{
				createGrid(pX+x, pY+y, s, r);
			}
		}
	}
}

function drawShape(x, y, s){
	noStroke();
	fill(random(255));
	let rdm = floor(random(4));
	for(let i=0; i<rdm; i++){
		x += cos(90*i) * s;
		y += sin(90*i) * s;
	}
	let r = s * 2;
	let d = rdm*90;
	arc(x, y, r, r, d, d+90);
}