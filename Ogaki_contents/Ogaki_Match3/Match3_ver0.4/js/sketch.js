"use strict"
//==========
// p5.js

// "早消しマッチゲーム"
// 	2つ以上隣り合った同じアイテムを消すことが出来るよ!!
// 	30秒以内に何個消せるかな!?

// 作業の流れ

console.log("Hello p5.js!!");

const DEBUG   = false;

const DISP_W  = 480;
const DISP_H  = 320;
const F_RATE  = 32;
const R_MAX   = 8;
const C_MAX   = 13;
const B_SIZE  = 32;
const B_TOTAL = R_MAX * C_MAX;
const B_PADD  = B_SIZE + 3;
const START_X = DISP_W * 0.5 - (C_MAX-1) * B_PADD * 0.5;
const START_Y = DISP_H - R_MAX * B_PADD + 10;

let assets    = {};
let numTimer  = 20;// プレイ時間
let numScore  = 0; // 初期スコア
let msg       = "";
let activeFlg = false;
let matrix    = null;

const images = [
	"images/donut01.png", "images/donut02.png",
	"images/donut03.png", "images/donut04.png",
];

const sounds = [
	"sounds/bgmam.mp3", "sounds/bgmpm.mp3", "sounds/gameclear.mp3",
	"sounds/gameover.mp3", "sounds/confuse.mp3", "sounds/power1.mp3",
	"sounds/power2.mp3", "sounds/power3.mp3",
];

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(F_RATE);

	// Background
	let bkg = createSprite(0, 0, DISP_W, DISP_H - 18);
	bkg.shapeColor = color(255, 210, 180);
	bkg.position.x = DISP_W * 0.5;
	bkg.position.y = DISP_H * 0.5 + 18;

	// Tiles
	for(let i=0; i<B_TOTAL; i++){
		let x = START_X + B_PADD * floor(i % C_MAX);
		let y = START_Y + B_PADD * floor(i / C_MAX);
		if(i % 2 == 0){
			createTile(x, y, 240, 185, 90);
		}
	}

	// Balls
	createBalls();

	// Frame
	let frame = createSprite(0, 0, DISP_W, DISP_H - 18);
	frame.addImage(loadImage("images/frame.png"));
	frame.position.x = DISP_W * 0.5;
	frame.position.y = DISP_H * 0.5 + 12;

	// CountDown
	startCountDown();

	// BGM
	//playSound("sounds/bgmpm.mp3");
}

function startCountDown(){
	//console.log("startCountDown");
	// CountDown
	numTimer--;
	if(numTimer <= 0){
		//gameOver();
		return;
	}
	// Timeout
	setTimeout(startCountDown, 1000);
}

function judgeMatrix(deleted, ball){
	let num = deleted.length;

	if(5 < num){
 		playSound("sounds/power3.mp3");
 		posiEf(deleted, "images/cant.png");
	}else if(4 < num){
 		playSound("sounds/power2.mp3");
 		posiEf(deleted, "images/cant.png");
 	}else if(2 < num){
 		playSound("sounds/power1.mp3");
 		posiEf(deleted, "images/cant.png");
 	}else{
 		playSound("sounds/confuse.mp3");
 		negaEf(ball, "images/cant.png");
 		return false;
 	}

 	// Score
 	numScore += num;
 	return true;
}

function posiEf(deleted, path){
	for(let del of deleted){
		let x = matrix[del.r][del.c].position.x;
		let y = matrix[del.r][del.c].position.y;
		createStar(x, y, path);
	}
}

function negaEf(ball, path){
	let x = ball.position.x;
	let y = ball.position.y;
	createCant(x, y, path);
}

function gameOver(){
	msg = "GAME OVER!!";
	stopSound("sounds/bgmpm.mp3");
	playSound("sounds/gameclear.mp3");
	noLoop();
}

//==========
// Utility

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

function draw(){
	background(33, 33, 33);
	drawSprites();
	drawStatuses();
}

function createBalls(){
	activeFlg = true;
	matrix = createMatrix();
	for(let r=0; r<R_MAX; r++){
		for(let c=0; c<C_MAX; c++){
			let x = START_X + c * B_PADD;
			let y = START_Y + r * B_PADD;
			matrix[r][c] = createBall(x, y, r, c, getIndex(images));
		}
	}
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

function createStar(x, y, path){
	let star = createSprite(x, y, 32, 32);
	let anim = loadAnimation(
		"images/star01.png", "images/star02.png", "images/star03.png");
	star.addAnimation("cant", anim);
	setTimeout(()=>{star.remove();}, 1000*1);
}

function createCant(x, y, path){
	let cant = createSprite(x, y, 32, 32);
	cant.addImage(loadImage(path));
	setTimeout(()=>{cant.remove();}, 1000*2);
}

function createTile(x, y, r, g, b){
	let tile = createSprite(x, y, 32, 32);
	tile.shapeColor = color(r, g, b);
}

function getIndex(arr){
	return floor(random(0, arr.length));
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

function playSound(path){
	stopSound(path);
	assets[path].play();
}

function stopSound(path){
	if(assets[path].isPlaying()) assets[path].stop();
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
	let deleted = searchMatrix(mtxBef, ball);
 	if(judgeMatrix(deleted, ball) == false) return mtxBef;

	// Remove
	for(let i=deleted.length-1; 0<=i; i--){
		let r = deleted[i].r;
		let c = deleted[i].c;
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
			let x = START_X + c * B_PADD;
			let y = START_Y + r * B_PADD;
			if(mtxAft[r][c] == null){
				let x = START_X + c * B_PADD;
				let y = START_Y + r * B_PADD;
				let index = getIndex(images);
				let ball = createBall(x, y-B_PADD, r, c, index);
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
	let deleted = [];
	checkHV(ball);// Target

	function checkHV(target){
		deleted.push({"r": target.r, "c": target.c, "index": target.index});
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
		for(let i=0; i<deleted.length; i++){
			if(target == null) return true;
			if(target.r == deleted[i].r && target.c == deleted[i].c){
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

	return deleted.sort(compare);
}