"use strict"
//==========
// p5.js

// "さめがめ"
// 	3つ以上隣り合った同じアイテムを消すことが出来るよ!!
// 	全部消せるかな?

// 作業の流れ
// 1, 背景を出そう
// 2, チェック柄の模様を出そう
// 3, フレームを出そう
// 4, さめがめを出そう
// 5, BGMを鳴らそう
// 6, 消えた数を判定して音を出そう
// 7, タッチできない時のキャラクター

console.log("Hello p5.js!!");

const DEBUG   = false;

const DISP_W  = 480;
const DISP_H  = 320;
const F_RATE  = 32;
const R_MAX   = 4;
const C_MAX   = 5;
const B_SIZE  = 32;
const B_TOTAL = R_MAX * C_MAX;
const B_PADD  = B_SIZE + 3;
const START_X = DISP_W * 0.5 - (C_MAX-1) * B_PADD * 0.5;
const START_Y = DISP_H - R_MAX * B_PADD + 10;

let assets    = {};
let numScore  = 0; // 初期スコア
let msg       = "";
let activeFlg = false;
let matrix    = null;

const images = [
	"images/donut01.png", "images/donut02.png",
];

const sounds = [
	"sounds/bgmam.mp3", "sounds/bgmpm.mp3", "sounds/gameclear.mp3",
	"sounds/gameover.mp3", "sounds/confuse.mp3", "sounds/power1.mp3",
	"sounds/power2.mp3", "sounds/power3.mp3",
];

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(F_RATE);

	// 1, 背景を出そう

	// 2, チェック柄の模様を出そう

	// 3, フレームを出そう

	// 4, さめがめを出そう

	// 5, BGMを鳴らそう
}

function judgeMatrix(deleted, ball){
	let num = deleted.length;
	
	// 6, 消えた数を判定して音を出そう
	return true;
}

function impossible(ball, path){
	let x = ball.position.x;
	let y = ball.position.y;
	// 7, タッチできない時のキャラクター
	let cant = createSprite(x, y, 32, 32);
	cant.addImage(loadImage("images/cant.png"));
	let tl = new TimelineMax({
		repeat: 3, yoyo: false,
		onComplete: ()=>{cant.remove();}});
	tl.to(cant.position, 0.1, {x: "+=4"});
	tl.to(cant.position, 0.2, {x: "-=8"});
	tl.to(cant.position, 0.1, {x: "+=4"});
}

function addScore(bonus){
	numScore += bonus;// Bonus
	msg = "BONUS:" + bonus + "!!";
	setTimeout(()=>{msg = "";}, 1000*3);
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
		setTimeout(()=>{activeFlg = true}, 400);
		matrix = checkMatrix(matrix, ball);
	}
	return ball;
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
	let tl = new TimelineMax({
		onComplete: ()=>{this.remove();}
	});
	tl.to(this, 0.2, {scale: 0.2});
}

SPRITE_CLS.prototype.moveTo = function(x, y){
	let dX = x - this.position.x;
	let dY = y - this.position.y;
	let tl = new TimelineMax();
	tl.to(this.position, 0.4, {y: "+="+dY});
	tl.to(this.position, 0.4, {x: "+="+dX});
}

function playSound(path, loop=false){
	stopSound(path);
	assets[path].setLoop(loop);
	assets[path].play();
}

function stopSound(path){
	if(assets[path].isPlaying()) assets[path].stop();
}

function drawStatuses(){
	fill(255, 255, 255);
	textSize(24);
	let msgScore = "SCORE:" + numScore;
	textAlign(RIGHT);
	text(msgScore , width-10, 25);
	textAlign(LEFT);
	text(msg, 10, 25);
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

	// Compresser
	let cpr = new Compresser(mtxBef);
	let mtxAft = cpr.compressV().compressH().getMatrix();

	// Fill or Reposition
	for(let r=0; r<R_MAX; r++){
		for(let c=0; c<C_MAX; c++){
			let x = START_X + c * B_PADD;
			let y = START_Y + r * B_PADD;
			if(mtxAft[r][c] == null){
				// Do nothing
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

let Compresser = function(mtx){
	this.mtx = mtx;
}

Compresser.prototype = {
	compressV: function(){
		this.mtx = compressV(this.mtx);
		return this;
	},
	compressH: function(){
		this.mtx = compressH(this.mtx);
		return this;
	},
	get: function(){
		return this.mtx;
	},
	getMatrix: function(){
		return this.mtx;
	}
};

function compressV(mtxBef){
	let mtxAft = createMatrix();
	for(let c=C_MAX-1; 0<=c; c--){
		for(let r=R_MAX-1; 0<=r; r--){
			if(mtxBef[r][c] == null){
				for(let v=r-1; 0<=v; v--){
					if(mtxBef[v][c] == null) continue;
					mtxAft[r][c]   = mtxBef[v][c];
					mtxAft[r][c].r = r;
					mtxAft[r][c].c = c;
					mtxBef[v][c]   = null;
					break;
				}
			}else{
				mtxAft[r][c] = mtxBef[r][c];
			}
		}
	}
	return mtxAft;
}

function compressH(mtxBef){
	let mtxAft = createMatrix();
	for(let c=0, h=0; c<C_MAX; c++){
		if(isEmpty(c) == true) continue;
		for(let r=0; r<R_MAX; r++){
			if(mtxBef[r][c] == null) continue;
			mtxAft[r][h]   = mtxBef[r][c];
			mtxAft[r][h].r = r;
			mtxAft[r][h].c = h;
			mtxBef[r][c]   = null;
		}
		h++;
	}
	function isEmpty(c){
		for(let r=0; r<R_MAX; r++){
			if(mtxBef[r][c] != null) return false;
		}
		return true;
	}
	return mtxAft;
}