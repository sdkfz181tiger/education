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
let sprWalls = [];

let strLabel = "";

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Sprite
	sprTanu = createSprite(40, 40, 32, 32);
	let imgTanu = loadImage("assets/tanuki.png");
	sprTanu.addImage(imgTanu);

	sprTanu.onMousePressed = function(){
		sprTanu.dragFlg = true;
	}

	sprTanu.onMouseReleased = function(){
		sprTanu.dragFlg = false;
	}

	// Walls
	let padding = width / 5;
	sprWalls.push(createWall(padding*1, 100, 20, 200));
	sprWalls.push(createWall(padding*2, height-100, 20, 200));
	sprWalls.push(createWall(padding*3, 100, 20, 200));
	sprWalls.push(createWall(padding*4, height-100, 20, 200));
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	// Sprites
	drawSprites();

	// Drag
	if(sprTanu.dragFlg){
		sprTanu.position.x = mouseX;
		sprTanu.position.y = mouseY;
	}

	// Tanuki x Walls
	for(let i=0; i<sprWalls.length; i++){
		let sprWall = sprWalls[i];
		if(sprTanu.bounce(sprWall)){
			gameOver();
		}
	}
	
	// テキスト
	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(strLabel, 240, 160);
}

function createWall(x, y, w, h){
	let spr = createSprite(x, y, w, h);
	spr.shapeColor = color(200, 200, 200);
	return spr;
}

function gameOver(){
	
	// テキスト
	strLabel = "GAME OVER!!";

	// 停止
	noLoop();
}