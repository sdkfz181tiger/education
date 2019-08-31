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

const DEG_TO_RAD = Math.PI / 180;

let array;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(32);
	textFont(font);
	textAlign(CENTER);
	rectMode(CENTER);
	angleMode(DEGREES);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(0);

	// Sprites
	array = [];
	for(let i=0; i<60; i++){
		let x      = random(0, width);
		let y      = random(0, height);
		let sprite = createSprite(x, y, 5, 5);

		let r = random(0, 255);
		let g = random(0, 255);
		let b = random(0, 255);
		sprite.shapeColor = color(r, g, b);

		let speed  = random(1, 3);
		let degree = random(0, 360);
		sprite.setSpeed(speed, degree);
		array.push(sprite);
	}
}

function draw(){
	console.log("draw");
	background(0);

	// Sprites
	for(let i=0; i<array.length; i++){
		let sprite = array[i];
		if(sprite.position.x < 0) sprite.position.x = width;
		if(width < sprite.position.x) sprite.position.x = 0;
		if(sprite.position.y < 0) sprite.position.y = height;
		if(height < sprite.position.y) sprite.position.y = 0;
	}

	// Lines
	for(let a=0; a<array.length; a++){
		for(let b=a+1; b<array.length; b++){
			if(isClose(array[a], array[b])){
				stroke(100, 100, 100);
				strokeWeight(1);
				line(array[a].position.x, array[a].position.y,
					array[b].position.x, array[b].position.y);
			}
		}
	}

	// Draw
	drawSprites();
}

function isClose(a, b){
	let distance = dist(a.position.x, a.position.y, b.position.x, b.position.y);
	return distance <= 80;
}
