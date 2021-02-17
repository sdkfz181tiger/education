//==========
// p5.js

const palette = ["#A7C957", "#F2E8CF", "#386641", "#6A994E", "#BC4749"];

let shapes = [];

let counter = 0;
let max = 10;
let radius = 50;

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
	let shape = createShape(cX, cY, radius);
	if(isCollideOther(shape)) return;
	// Draw
	circle(shape.x, shape.y, shape.r*2);
	// Push
	shapes.push(shape);
	// Counter
	if(max < counter++){
		counter = 0;
		max *= 2;
		radius *= 0.5;
		changeColor();
	}
	// Stop
	if(1000 < shapes.length){
		console.log("Finish!!");
		noLoop();
	}
}

function isCollideOther(target){

	for(let shape of shapes){
		let dX = target.x - shape.x;
		let dY = target.y - shape.y;
		let dist = Math.sqrt(dX*dX + dY*dY);
		if(dist < target.r + shape.r){
			return true;
		}
	}
	return false;
}

function createShape(cX, cY, r){
	let shape = {x: cX, y: cY, r: r};
	return shape;
}

function changeColor(){
	let c = floor(random(palette.length));
	stroke(palette[c]);
	strokeWeight(4);
	noFill();
}
