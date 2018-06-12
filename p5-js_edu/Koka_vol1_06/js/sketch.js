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
let sprGoal;

let strLabel = "";

let timeLimit = 20;
let stopFlg   = false;

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

	// Goal
	sprGoal = createSprite(440, 280, 40, 40);
	sprGoal.shapeColor = color(33, 200, 200);

	// Timeout
	startTimeout(timeLimit);
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

	// Tanuki x Goal
	if(sprTanu.collide(sprGoal)){
		gameClear();
	}

	// Text
	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(strLabel, 240, 160);

	// タイムリミット
	text(timeLimit, 240, 80);
}

function createWall(x, y, w, h){
	let spr = createSprite(x, y, w, h);
	spr.shapeColor = color(200, 200, 200);
	return spr;
}

function gameOver(){
	
	// Text
	strLabel = "GAME OVER!!";

	// タイマー停止
	stopFlg = true;

	// 停止
	noLoop();
}

function gameClear(){

	// Text
	strLabel = "GAME CLEAR!!";

	// タイマー停止
	stopFlg = true;

	// 停止
	noLoop();
}

function startTimeout(){
	console.log("startTimeout:" + timeLimit);
	setTimeout(()=>{
		if(0 < timeLimit && stopFlg == false){
			timeLimit--;
			startTimeout(timeLimit);
		}else{
			gameOver();
		}
	}, 1000);
}