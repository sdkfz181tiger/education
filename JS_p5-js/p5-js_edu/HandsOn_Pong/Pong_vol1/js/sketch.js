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

let ball;

let wallT;
let wallB;
let wallL;
let wallR;

let padL;
let padR;

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	ball = createSprite(240, 160, 16, 16);
	ball.setSpeed(2, 0);

	wallT = createSprite(240, 0, 480, 8);
	wallT.immovable = true;

	wallB = createSprite(240, 320, 480, 8);
	wallB.immovable = true;

	wallL = createSprite(0, 160, 8, 320);
	wallL.immovable = true;

	wallR = createSprite(480, 160, 8, 320);
	wallR.immovable = true;

	padL = createSprite(80, 160, 16, 80);
	padL.immovable = true;

	padR = createSprite(400, 160, 16, 80);
	padR.immovable = true;
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	ball.bounce(wallT);
	ball.bounce(wallB);
	ball.bounce(wallL);
	ball.bounce(wallR);

	ball.bounce(padL);
	ball.bounce(padR);

	drawSprites();
}