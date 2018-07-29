//==========
// p5.js

console.log("Hello p5.js!!");

const DEBUG              = true;

const PLAYER_SPEED       = 4;
const PLAYER_FRICTION    = 0.95;
const BULLET_SPEED       = 8;
const BULLET_FRICTION    = 1.0;
const BULLET_LIMIT       = 3;
const ASTEROID_SPEED_MIN = 2;
const ASTEROID_SPEED_MAX = 6;
const ASTEROID_LIMIT     = 10;
const ASTEROID_INTERVAL  = 1000 * 1;
const TIME_LIMIT         = 60;
const TIME_INTERVAL      = 1000 * 1;
const POWER_MAX          = 30;

let assets = {};

let balls  = [];
let ground = null;

let numTimer  = TIME_LIMIT;
let numPower  = POWER_MAX;
let msg       = "";

const images = [
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
	createCanvas(480, 320);
	frameRate(32);

	for(let i=0; i<10; i++){
		let x = random(0, width);
		let y = random(0, height);
		let ball = createBall(x, y, 16, "images/tanuki.png");
		balls.push(ball);
	}

	ground = createSprite(width*0.5, height, width, 32);
	ground.immovable = true;
}

function draw(){
	background(0, 0, 0);

	// Collision
	for(let a=0; a<balls.length; a++){
		// Gravity
		balls[a].velocity.y += 0.2;
		// Ball x Ball
		for(let b=a+1; b<balls.length; b++){
			balls[a].bounce(balls[b]);
		}
		// Ball x Ground
		if(balls[a].bounce(ground)){
			if(abs(balls[a].velocity.y) < 0.5){
				balls[a].velocity.y = 0;
			}
		}
	}
	
	// Sprites
	drawSprites();
}

function mousePressed(){

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

function createBall(x, y, r, path){
	let ball = createSprite(x, y, 32, 32);
	ball.setCollider("circle", 0, 0, r);
	ball.addImage(assets[path]);
	//ball.friction = 0.5;
	ball.restitution = 0.5;
	ball.debug = true;
	return ball;
}