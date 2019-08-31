console.log("Hello p5.js!!");

let paddle, cheff, pigs, walls;

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(0);
	fill(255, 255, 255);
	noStroke();

	// Wall
	walls = [];
	let wTop = createWall(width*0.5, 0, width, 5);
	walls.push(wTop);
	let wBottom = createWall(width*0.5, height, width, 5);
	walls.push(wBottom);
	let wLeft = createWall(0, height*0.5, 5, width);
	walls.push(wLeft);
	let wRight = createWall(width, height*0.5, 5, height);
	walls.push(wRight);

	// Paddle
	paddle = createSprite(width*0.5, height-30, 80, 8);
	paddle.shapeColor = color(255, 255, 255);
	paddle.immovable = true;

	// Cheff
	cheff = createCheff(width*0.5, height-60);

	// Boids
	pigs = [];
	let padding = 25;
	let rows = 4;
	let cols = 11;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			console.log("test");
			let x = width * 0.5 - cols * padding * 0.5 + padding * (c + 0.5);
			let y = 40 + padding * r;
			let pig = createPig(x, y);
			pigs.push(pig);
		}
	}
}

function draw(){
	console.log("draw");
	background(200);

	// Paddle
	if(0 < mouseX && mouseX < width){
		paddle.position.x = mouseX;
	}

	// Cheff x Wall
	for(let i=0; i<walls.length; i++){
		cheff.bounce(walls[i]);
	}

	// Cheff x Paddle
	if(cheff.bounce(paddle)){
		let swing = (cheff.position.x - paddle.position.x) / 2;
		let speed = cheff.getSpeed();
		cheff.setSpeed(speed, cheff.getDirection() + swing);
	}

	// Cheff x Pigs
	for(let i=0; i<pigs.length; i++){
		if(cheff.bounce(pigs[i])){
			pigs[i].position.x = -100;
			pigs[i].position.y = -100;
		}
	}

	drawSprites();
}