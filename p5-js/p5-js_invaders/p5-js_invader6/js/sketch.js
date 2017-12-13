console.log("Hello p5.js!!");

let invaders;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	clear();
	background(33, 33, 33);
	fill(255, 255, 255);
	noStroke();

	// Invaders
	invaders = [];
	let rows = 4;
	let cols = 10;
	let padding = 30;
	let startX = width * 0.5 - cols * padding * 0.5;
	let startY = 20;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * padding + startX;
			let y = r * padding + startY;
			let invader = new Invader(x, y);
			let speed = random(1, 3);
			let degree = random(0, 360);
			invader.setSpeed(speed, degree);
			invaders.push(invader);
		}
	}
}

function draw(){
	console.log("draw");
	background(33, 33, 33);

	// Draw
	for(invader of invaders) invader.draw();
}

function mousePressed(){
	console.log("mousePressed");
}