console.log("Hello p5.js!!");

let invaders;
let counter;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);

	fill(255, 255, 255);
	noStroke();

	// Invader
	invaders = [];
	let startX = width * 0.5  - INV_PAD * INV_COLS * 0.5;
	let startY = height * 0.5 - INV_PAD * INV_ROWS * 0.5;
	for(let r=0; r<INV_ROWS; r++){
		for(let c=0; c<INV_COLS; c++){
			let x = startX + c * INV_PAD;
			let y = startY + r * INV_PAD;
			let num = Math.floor(Math.random() * MAX);
			let invader = new Invader(x, y, num);
			invaders.push(invader);
		}
	}

	counter = 0;
}

function draw(){
	console.log("draw");
	background(0, 0, 0);

	for(invader of invaders){
		invader.draw();
	}
}

function mousePressed(){
	console.log("mousePressed");
}