console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

let boids;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);

	fill(200, 200, 200);
	stroke(255, 255, 255);
	strokeWeight(1.0);

	rectMode(CENTER);

	boids = new Array();
	for(let i=0; i<30; i++){
		let x = random(0, width);
		let y = random(0, height);
		let dot = new Dot(x, y);
		dot.vX = random(-3, 3);
		dot.vY = random(-3, 3);
		boids.push(dot);
	}
}

function draw(){
	console.log("draw");
	background(0);

	for(let i=0; i<boids.length; i++){
		calcPositions(i);
		calcPaddings(i);
		calcVectors(i);

		if(boids[i].x < 0){
			boids[i].x = 5;
			boids[i].vX *= -0.5;
		}
		if(width < boids[i].x){
			boids[i].x = width-5;
			boids[i].vX *= -0.5;
		}
		if(boids[i].y < 0){
			boids[i].y = 5;
			boids[i].vY *= -0.5;
		}
		if(height < boids[i].y){
			boids[i].y = height-5;
			boids[i].vY *= -0.5;
		}
		boids[i].draw();
	}
}

// Dot
class Dot{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.vX = 0;
		this.vY = 0;
	}
	draw(){
		this.x += this.vX;
		this.y += this.vY;
		fill(255, 255, 255);
		rect(this.x, this.y, 5, 5);
	}
}

// Utility
function calcPositions(index){
	let p = {x: 0, y: 0};
	for(let i=0; i<boids.length; i++){
		if(index != i){
			p.x += boids[i].x;
			p.y += boids[i].y;
		}
	}
	p.x /= boids.length - 1;
	p.y /= boids.length - 1;
	boids[index].vX += (p.x - boids[index].x) / 100;
	boids[index].vY += (p.y - boids[index].y) / 100;
}

function calcPaddings(index){
	for(let i=0; i<boids.length; i++){
		if(index != i){
			let distance = getDistance(boids[index], boids[i]);
			if(distance < 5){
				boids[index].vX -= (boids[i].x - boids[index].x) / 2;
				boids[index].vY -= (boids[i].y - boids[index].y) / 2;
			}
		}
	}
}

function calcVectors(index){
	let v = {x: 0, y: 0};
	for(let i=0; i<boids.length; i++){
		if(index != i){
			v.x += boids[i].vX;
			v.y += boids[i].vY;
		}
	}
	v.x /= boids.length - 1;
	v.y /= boids.length - 1;
	boids[index].vX += (v.x - boids[index].vX) / 8;
	boids[index].vY += (v.y - boids[index].vY) / 8;
}

function getDistance(dotA, dotB){
	let num = Math.pow(dotA.x - dotB.x, 2) + Math.pow(dotA.y - dotB.y, 2);
	return Math.sqrt(num);
}
