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

	// Enemy
	enemies = [];
	for(let i=0; i<3; i++){
		let x = random(0, 480);
		let y = random(0, 320);
		let sprEnemy = createSprite(x, y, 32, 32);
		let speed = random(1, 2);
		let deg   = random(0, 360);
		sprEnemy.setSpeed(speed, deg);
		enemies.push(sprEnemy);
	}

	setInterval(()=>{
		for(let i=0; i<enemies.length; i++){
			let speed = random(0, 1);
			let deg   = random(0, 360);
			enemies[i].setSpeed(speed, deg);
		}
	}, 1000 * 1);
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

	for(let i=0; i<enemies.length; i++){
		if(enemies[i].position.x < 0){
			enemies[i].position.x = width;
		}
		if(width < enemies[i].position.x){
			enemies[i].position.x = 0;
		}
		if(enemies[i].position.y < 0){
			enemies[i].position.y = height;
		}
		if(height < enemies[i].position.y){
			enemies[i].position.y = 0;
		}
	}

	drawSprites();
}

function mousePressed(){
	console.log("mousePressed");

	for(let i=enemies.length-1; 0<=i; i--){
		if(enemies[i].overlapPoint(mouseX, mouseY)){
			enemies[i].remove();
			enemies.splice(i, 1);
			gameScore += 10;
			break;
		}
	}

	if(enemies.length <= 0){
		if(gameFlg == true){
			gameMsg = "GAME CLEAR!!";
			gameFlg = false;
			noLoop();
		}
	}
}