//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

const PLAYER_SPEED    = 2;
const PLAYER_FRICTION = 0.95;
const BULLET_SPEED    = 5;
const BULLET_FRICTION = 1.0;

const DEBUG  = true;

const images = [
	"images/tanuki.png",
	"images/ume.png",
];

const sounds = [
	"sounds/gameclear.mp3",
	"sounds/gameover.mp3",
	"sounds/s_pong.mp3",
];

let assets = {};

let player    = null;
let asteroids = [];
let bullets   = [];

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
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
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(64);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Test
	assets["sounds/gameclear.mp3"].play();

	// Player
	player = createPlayer(240, 160, "images/tanuki.png");

	// Asteroids
	let asteroid = createAsteroid(240, 160, "images/ume.png");
	asteroid.setSpeed(1, 45);
	asteroids.push(asteroid);
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	drawSprites();
}

function keyPressed(){
	console.log("keyPressed:", keyCode);

	// Up
	if(keyCode == 38){
		player.setSpeed(PLAYER_SPEED, player.rotation-90);
	}

	// Left
	if(keyCode == 37){
		player.rotationSpeed = -5;
	}

	// Right
	if(keyCode == 39){
		player.rotationSpeed = +5;
	}

	// Shot(Z)
	if(keyCode == 90){
		let x = player.position.x;
		let y = player.position.y;
		let rotation = player.rotation-90;
		let bullet = createBullet(x, y, rotation);
		bullet.setSpeed(BULLET_SPEED, rotation);
		bullets.push(bullet);
	}
}

function keyReleased(){
	if(keyCode == 37 || keyCode == 39){
		player.rotationSpeed = 0;
	}
}

function createPlayer(x, y, path){
	let spr = createSprite(x, y, 16, 16);
	spr.addImage(assets[path]);
	spr.friction = PLAYER_FRICTION;
	spr.debug = DEBUG;
	return spr;
}

function createAsteroid(x, y, path){
	let spr = createSprite(x, y, 16, 16);
	spr.addImage(assets[path]);
	spr.debug = DEBUG;
	return spr;
}

function createBullet(x, y, rotation){
	let spr = createSprite(x, y, 4, 4);
	spr.shapeColor = color(255, 255, 255);
	spr.friction = BULLET_FRICTION;
	spr.debug = DEBUG;
	return spr;
}