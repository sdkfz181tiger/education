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

let gameMsg;
let gameScore;
let gameFlg;

let enemies;

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Score, Timer
	gameMsg   = "GAME START!!";
	gameScore = 0;
	gameFlg   = true;

	// Timer
	setTimeout(()=>{
		if(gameFlg == true){
			gameMsg = "GAME OVER!!";
			gameFlg = false;
			noLoop();
		}
	}, 1000 * 10);
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(gameMsg, 240, 40);

	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(gameScore, 240, 300);

	drawSprites();
}

function mousePressed(){
	console.log("mousePressed");
}