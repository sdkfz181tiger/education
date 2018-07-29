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

let boids  = [];
let kesus  = [];

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

	// TODO: Voidを使って画面の中央に集まる感じでどうだろうかw
	for(let i=0; i<30; i++){
		let x = random(0, width);
		let y = random(0, height);
		let dot = new Dot(x, y);
		dot.vX = random(-10, 10);
		dot.vY = random(-10, 10);
		boids.push(dot);
	}
}

function draw(){
	background(0, 0, 0);

	for(let i=0; i<boids.length; i++){
		// Boids
		calcPositions(i);
		calcPaddings(i);
		calcVectors(i);
		bounceWalls(i);
		
		// Draw
		boids[i].draw();
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