//==========
// p5.js

const palette = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];

let polys = [];

let counter = 0;
let max = 10;
let size = 50;

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(32);
	angleMode(DEGREES);
	background(33);

	changeColor();
}

function draw(){

	let cX = random(width);
	let cY = random(height);
	let d = random(360);
	let poly = createPoly(cX, cY, d);
	if(isCollideOther(poly)) return;
	// Push
	polys.push(poly);
	// Draw
	beginShape();
	for(let {x, y} of poly) vertex(x, y);
	endShape(CLOSE);
	// Counter
	if(max < counter++){
		counter = 0;
		max *= 2;
		size *= 0.5;
		changeColor();
	}
	// Stop
	if(1000 < polys.length){
		console.log("Finish!!");
		noLoop();
	}
}

function isCollideOther(target){

	for(let poly of polys){
		if(collidePolyPoly(target, poly, true)){
			return true;
		}
	}
	return false;
}

function createPoly(cX, cY, d){
	let poly = [];
	let p = 3;
	let o = floor(360 / p);
	for(let i=0; i<p; i++){
		let deg = d+o*i;
		let x = cX + size * cos(deg);
		let y = cY + size * sin(deg);
		let v = createVector(x, y);
		poly.push(v);
	}
	return poly;
}

function changeColor(){
	let c = floor(random(palette.length));
	stroke(palette[c]);
	strokeWeight(2);
	noFill();
}
