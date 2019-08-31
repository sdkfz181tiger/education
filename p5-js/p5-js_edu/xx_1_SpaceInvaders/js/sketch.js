//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

console.log("Hello p5.js!!");

let paddle, cheff, pigs, walls;

let total;

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
	cheff = createCheff(width*0.5, height*0.5);

	// Pigs
	pigs = [];
	let padding = 35;
	let rows = 2;
	let cols = 5;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = width * 0.5 - cols * padding * 0.5 + padding * (c + 0.5);
			let y = 40 + padding * r;
			let pig = createPig(x, y);
			pig.setSpeed(1, 0);
			pigs.push(pig);
		}
	}

	// Total
	total = pigs.length;
}

function draw(){
	console.log("draw");
	background(33);

	// Paddle
	if(0 < mouseX && mouseX < width){
		paddle.position.x = mouseX;
	}

	// Cheff x Wall
	for(let w=0; w<walls.length; w++){
		cheff.bounce(walls[w]);
	}

	// Cheff x Paddle
	if(cheff.bounce(paddle)){
		let swing = (cheff.position.x - paddle.position.x) / 2;
		let speed = cheff.getSpeed();
		cheff.setSpeed(speed, cheff.getDirection() + swing);
	}

	// Pigs x Left and Right
	for(let p=0; p<pigs.length; p++){

		let borderL = 0;
		if(borderL > pigs[p].position.x - pigs[p].width*0.5){
			let disX = pigs[p].position.x - pigs[p].width*0.5 - borderL;
			pigs[p].position.x -= disX * 2.0;
			pigs[p].position.y += pigs[p].height;
			pigs[p].velocity.x *= -1.0;
		}

		let borderR = width;
		if(borderR < pigs[p].position.x + pigs[p].width*0.5){
			let disX = pigs[p].position.x + pigs[p].width*0.5 - borderR;
			pigs[p].position.x -= disX * 2.0;
			pigs[p].position.y += pigs[p].height;
			pigs[p].velocity.x *= -1.0;
		}
	}

	// Cheff x Pigs
	for(let p=0; p<pigs.length; p++){
		if(cheff.bounce(pigs[p])){
			pigs[p].position.x = width;
			pigs[p].position.y = height;
			pigs[p].setSpeed(0, 0);
			// Limit
			cheff.limitSpeed(5);
			// Speedup
			total--;
			if(total < 8){
				speedUp(10);
			}
		}
	}

	drawSprites();
}

// Speedup
function speedUp(speed){
	for(let p=0; p<pigs.length; p++){
		let direction = pigs[p].getDirection();
		pigs[p].setSpeed(speed, direction);
	}
}
