//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;
const F_RATE = 32;
const DEBUG  = false;

const TIME_LIMIT    = 60;
const TIME_INTERVAL = 1000 * 1;
const SCORE_MIN     = 0;

const R_MAX  = 8;
const C_MAX  = 13;
const B_SIZE = 32;
const B_PADD = 4;

const START_X = DISP_W * 0.5 - (C_MAX-1) * (B_SIZE+B_PADD) * 0.5;
const START_Y = DISP_H - R_MAX * (B_SIZE+B_PADD) + 16;

const CHAINS = 1;

let assets = {};

let numTimer  = TIME_LIMIT;
let numScore  = SCORE_MIN;
let msg       = "";

let activeFlg = false;
let matrix    = null;

const images = [
	"images/apple.png",
	"images/banana.png",
	"images/berry.png",
	"images/cherry.png",
	"images/kiwi.png",
	"images/orange.png",
	"images/peach.png",
	"images/pear.png",
	"images/pine.png",
	"images/strawberry.png",
	"images/watermelon.png",
];

const sounds = [
	"sounds/damage.mp3",
	"sounds/gameclear.mp3",
	"sounds/gameover.mp3",
	"sounds/hit.mp3",
	"sounds/pong.mp3",
	"sounds/shot.mp3",
];

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("fonts/misaki_gothic.ttf");
	textFont(font);

	// Images
	for(let i=0; i<images.length; i++){
		assets[images[i]] = loadImage(images[i]);
	}
	// Sounds
	for(let i=0; i<sounds.length; i++){
		assets[sounds[i]] = loadSound(sounds[i]);
	}
}

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(F_RATE);

	activeFlg = true;
	matrix = createMatrix();
	for(let r=0; r<R_MAX; r++){
		for(let c=0; c<C_MAX; c++){
			let x = START_X + c * (B_SIZE+B_PADD);
			let y = START_Y + r * (B_SIZE+B_PADD);
			let index = getIndex(images);
			let ball = createBall(x, y, r, c, index);
			matrix[r][c] = ball;
		}
	}

	// CountDown
	startCountDown();
}

function draw(){
	background(33, 33, 33);

	// Sprites
	drawSprites();

	// Status
	drawStatuses();
}

//==========
// Utility

function getIndex(arr){
	return floor(random(0, arr.length));
}

function createBall(x, y, r, c, index){
	let ball = createSprite(x, y, 32, 32);
	ball.addImage(assets[images[index]]);
	ball.r = r; ball.c = c;
	ball.index = index; ball.debug = DEBUG;
	ball.onMouseReleased = (e)=>{
		if(activeFlg == false) return;
		activeFlg = false;
		setTimeout(()=>{activeFlg = true}, 800);
		matrix = checkMatrix(matrix, ball);
	}
	return ball;
}

//==========
// Sprite
const SPRITE_CLS = p5.prototype.Sprite;

SPRITE_CLS.prototype.vanish = function(){
	this.scale = 0.8;
	setTimeout(()=>{this.remove();}, 100);
}

SPRITE_CLS.prototype.moveTo = function(x, y){
	let time = 1000 * 0.2;
	let distance = Math.sqrt(
		Math.pow(x-this.position.x,2) + 
		Math.pow(y-this.position.y,2));
	let speed = distance / time * F_RATE;
	let rad = Math.atan2(y-this.position.y, x-this.position.x);
	let deg = rad * 180 / Math.PI;
	this.setSpeed(speed, deg);

	setTimeout(()=>{
		this.position.x = x;
		this.position.y = y;
		this.setSpeed(0, 0);
	}, time * 1.05);// Delayed...
}

function startCountDown(){
	//console.log("startCountDown");
	if(isFinished()) return;// Finished?

	// CountDown
	numTimer--;
	if(numTimer <= 0){
		gameOver();
	}
	// Timeout
	setTimeout(startCountDown, TIME_INTERVAL);
}

function playSound(path){
	if(assets[path].isPlaying()){
		assets[path].stop();
	}
	assets[path].play();
}

function drawStatuses(){
	fill(255, 255, 255);
	textSize(24);
	let msgTimer = "TIME:" + numTimer;
	let msgScore = "SCORE:" + numScore;
	textAlign(LEFT);
	text(msgTimer , 10, 25);
	textAlign(RIGHT);
	text(msgScore , width-10, 25);
	textAlign(CENTER);
	text(msg, width*0.5, 25);
}

function isFinished(){
	if(numTimer <= 0) return true;
	return false;
}

function gameOver(){
	msg = "GAME OVER!!";
	playSound("sounds/gameover.mp3");
	noLoop();
}

//==========
// Matrix

function createMatrix(){
	let matrix = [];
	for(let r=0; r<R_MAX; r++){
		matrix.push([]);
		for(let c=0; c<C_MAX; c++){
			matrix[r].push(null);
		}
	}
	return matrix;
}

function checkMatrix(mtxBef, ball){

	let checked = searchMatrix(mtxBef, ball);
 	if(checked.length < CHAINS) return mtxBef;

 	// Score
 	numScore += checked.length;

	// Remove
	for(let i=checked.length-1; 0<=i; i--){
		let r = checked[i].r;
		let c = checked[i].c;
		mtxBef[r][c].vanish();
		mtxBef[r][c] = null;
	}

	// Matrix(After)
	let mtxAft = createMatrix();
	for(let c=C_MAX-1; 0<=c; c--){
		for(let r=R_MAX-1; 0<=r; r--){
			if(mtxBef[r][c] == null){
				for(let v=r-1; 0<=v; v--){
					if(mtxBef[v][c] == null) continue;
					mtxAft[r][c] = mtxBef[v][c];
					mtxAft[r][c].r = r;
					mtxAft[r][c].c = c;
					mtxBef[v][c] = null;
					break;
				}
			}else{
				mtxAft[r][c] = mtxBef[r][c];
			}
		}
	}

	// Fill or Reposition
	for(let r=0; r<R_MAX; r++){
		for(let c=0; c<C_MAX; c++){
			let x = START_X + c * (B_SIZE+B_PADD);
			let y = START_Y + r * (B_SIZE+B_PADD);
			if(mtxAft[r][c] == null){
				let x = START_X + c * (B_SIZE+B_PADD);
				let y = START_Y + r * (B_SIZE+B_PADD);
				let index = getIndex(images);
				let ball = createBall(x, y-(B_SIZE+B_PADD), r, c, index);
				ball.visible = false;
				setTimeout(()=>{
					ball.visible = true;
					ball.moveTo(x, y);
				}, 500);
				mtxAft[r][c] = ball;
			}else{
				mtxAft[r][c].moveTo(x, y);
			}
		}
	}

	return mtxAft;
}

function searchMatrix(mtxBef, ball){

	let checked = [];
	checkHV(ball);// Target

	function checkHV(target){
		checked.push({"r": target.r, "c": target.c, "index": target.index});
		if(0 < target.c)       checkCell(target, 0, -1);// Left
		if(target.c < C_MAX-1) checkCell(target, 0, 1); // Right
		if(0 < target.r)       checkCell(target, -1, 0);// Top
		if(target.r < R_MAX-1) checkCell(target, 1, 0); // Bottom
	}

	function checkCell(target, offsetR, offsetC){
		let r = target.r + offsetR;
		let c = target.c + offsetC;
		if(isChecked(mtxBef[r][c]) == true) return;
		if(mtxBef[r][c].index == target.index){
			checkHV(mtxBef[r][c]);// Recursive
		}
	}

	function isChecked(target){
		for(let i=0; i<checked.length; i++){
			if(target == null) return true;
			if(target.r == checked[i].r && target.c == checked[i].c){
				return true;
			}
		}
		return false;
	}

	function compare(a, b){
		if(a.r < b.r) return -1;
		if(b.r < a.r) return 1;
		if(a.c < b.c) return -1;
		if(b.c < a.c) return 1;
		return 0;
	}

	return checked.sort(compare);
}