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

//==========
// HandsOn資料
// -> http://ozateck.sakura.ne.jp/wordpress

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

let pad;
let ball;

let walls  = [];
let blocks = [];

let soundArkanoid;

let msg;

function preload(){
	console.log("preload");

	// Sound
	soundArkanoid = loadSound("assets/s_pong.mp3");

	// Font
	var font = loadFont("assets/misaki_gothic.ttf");
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Pad
	pad = createSprite(240, 290, 60, 8);
	pad.shapeColor = color(200, 200, 200);
	pad.immovable = true;

	// Ball
	ball = createSprite(240, 160, 8, 8);
	ball.shapeColor = color(200, 200, 200);
	ball.setSpeed(3, 45);

	// Walls
	let wallT = createSprite(240, 0, 480, 8);
	wallT.immovable = true;
	walls.push(wallT);

	let wallB = createSprite(240, 320, 480, 8);
	wallB.immovable = true;
	walls.push(wallB);

	let wallL = createSprite(0, 160, 8, 320);
	wallL.immovable = true;
	walls.push(wallL);

	let wallR = createSprite(480, 160, 8, 320);
	wallR.immovable = true;
	walls.push(wallR);

	// Blocks
	let rows     = 2;
	let cols     = 3;
	let blockW   = 30;
	let blockH   = 8;
	let paddingX = 31;
	let paddingY = 9;
	let startX   = width * 0.5 - paddingX * (cols-1) * 0.5;
	let startY   = height * 0.5 - paddingY * (rows-1) - 80;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = startX + paddingX * c;
			let y = startY + paddingY * r;
			let block = createSprite(x, y, 30, 8);
			block.immovable = true;
			blocks.push(block);
		}
	}

	// Message
	msg = "GAME START!!";
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	// Ball x Pad
	ball.bounce(pad);

	// Ball x Wall
	for(let i=0; i<walls.length; i++){
		ball.bounce(walls[i]);
	}

	// Ball x Block
	for(let i=blocks.length-1; 0<=i; i--){
		if(ball.bounce(blocks[i])){
			blocks[i].remove();
			blocks.splice(i, 1);
			// Sound
			soundArkanoid.play();
		}
	}

	// GameOver
	if(blocks.length <= 0){
		msg = "GAME OVER!!";
		noLoop();
	}

	// Message
	textSize(32);
	textAlign(CENTER);
	text(msg, 240, 160);

	drawSprites();
}

function keyPressed(){
	console.log("keyPressed:", keyCode);

	// 左キー
	if(keyCode == 37){
		pad.setSpeed(3, 180);
	}

	// 右キー
	if(keyCode == 39){
		pad.setSpeed(3, 0);
	}
}

function keyReleased(){
	pad.setSpeed(0, 0);
}