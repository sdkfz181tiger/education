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

const DISP_W = 480;
const DISP_H = 320;

let sprTanu;
let sprWallA;
let sprWallB;

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Sprite
	sprTanu = createSprite(240, 160, 32, 32);
	let imgTanu = loadImage("assets/tanuki.png");
	sprTanu.addImage(imgTanu);

	sprTanu.onMousePressed = function(){
		sprTanu.dragFlg = true;
	}

	sprTanu.onMouseReleased = function(){
		sprTanu.dragFlg = false;
	}

	// Wall
	sprWallA = createSprite(240, 80, 200, 30);
	sprWallA.shapeColor = color(255, 33, 33);

	// B
	sprWallB = createSprite(240, 260, 200, 30);
	sprWallB.shapeColor = color(33, 255, 33);
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	if(sprTanu.dragFlg){
		sprTanu.position.x = mouseX;
		sprTanu.position.y = mouseY;
	}

	if(sprTanu.collide(sprWallA)){
		noLoop();
	}

	if(sprTanu.collide(sprWallB)){
		noLoop();
	}

	drawSprites();
}