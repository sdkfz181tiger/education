//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;
const F_RATE = 32;
const DEBUG  = false;

const R_MAX   = 9;
const C_MAX   = 14;
const B_SIZE  = 32;

const START_X = DISP_W * 0.5 - (C_MAX-1) * B_SIZE * 0.5;
const START_Y = DISP_H - R_MAX * B_SIZE;

let assets = {};

let numTimer  = 30;
let msg       = "";

const images = [
	"images/bomb.png",
	"images/daruma.png",
	"images/tanuki.png",
	"images/ume.png",
];

const sounds = [
	"sounds/damage.mp3",
	"sounds/gameclear.mp3",
	"sounds/gameover.mp3",
	"sounds/hit.mp3",
	"sounds/pong.mp3",
	"sounds/shot.mp3",
];

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(F_RATE);

	let matrix = createMatrix();
	for(let r=0; r<R_MAX; r++){
		for(let c=0; c<C_MAX; c++){
			let index = floor(random(0, images.length));
			let ball = createBall(r, c, index);
			ball.onMouseReleased = (e)=>{
				matrix = checkMatrix(matrix, ball);
			}
			matrix[r][c] = ball;
		}
	}
}

function draw(){
	background(0, 0, 0);
	
	// Sprites
	drawSprites();
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

//==========
// Sprite
const SPRITE_CLS = p5.prototype.Sprite.prototype;

SPRITE_CLS.vanish = function(){
	this.scale = 0.8;
	setTimeout(()=>{
		this.remove();
	}, 100);
}

SPRITE_CLS.moveTo = function(x, y){
	let time = 1000 * 0.3;
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
	}, time*1.1);// Delayed...
}

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

function createBall(r, c, index){
	let x = START_X + c * B_SIZE;
	let y = START_Y + r * B_SIZE;
	let ball = createSprite(x, y, 32, 32);
	ball.addImage(assets[images[index]]);
	ball.r = r; ball.c = c;
	ball.index = index; ball.debug = DEBUG;
	return ball;
}

function checkMatrix(mtxBef, ball){
	console.log("checkMatrix:" + ball.r + ", " + ball.c);

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

	// Sort
	function compare(a, b){
		if(a.r < b.r) return -1;
		if(b.r < a.r) return 1;
		if(a.c < b.c) return -1;
		if(b.c < a.c) return 1;
		return 0;
	}
	checked.sort(compare);

	// Remove
	for(let i=checked.length-1; 0<=i; i--){
		let r = checked[i].r;
		let c = checked[i].c;
		//mtxBef[r][c].remove();
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

	// Reposition
	for(let r=0; r<R_MAX; r++){
		for(let c=0; c<C_MAX; c++){
			if(mtxAft[r][c] == null) continue;
			let x = START_X + c * B_SIZE;
			let y = START_Y + r * B_SIZE;
			mtxAft[r][c].moveTo(x, y);
		}
	}

	return mtxAft;
}