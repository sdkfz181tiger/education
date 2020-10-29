//==========
// p5.js

const p = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

let d = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(16);
	background(33);
	noStroke();
	fill(255);
}

function draw(){
	background(33);

	d += 0.5;
	let s = 30;
	for(let r=0; r<height/s; r++){
		for(let c=0; c<width/s; c++){
			fill(color(p[(r+c)%p.length]));
			drawWindmill(c*s,r*s,s*sin(d*c),d);
		}
	}
}

function drawWindmill(x, y, s, d){
	push();
	translate(x, y);
	rotate(d);
	rect(0, 0, s, s/3);
	rect(0, 0, s/3, s);
	pop();
}