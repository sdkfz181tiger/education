//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

const PLAYER_SPEED    = 2;
const PLAYER_FRICTION = 0.98;
const BULLET_SPEED    = 2;
const BULLET_FRICTION = 1.0;

const GENERATE_INTERVAL = 1000 * 2;

const DEBUG = true;

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

	// Attack
	generateAsteroid();
}

function draw(){
	background(0, 0, 0);

	// Player
	if(player.position.x < 0) player.position.x = width;
	if(width < player.position.x) player.position.x = 0;
	if(player.position.y < 0) player.position.y = height;
	if(height < player.position.y) player.position.y = 0;

	// Collide
	for(let a=asteroids.length-1; 0<=a; a--){
		// Asteroid x Player
		asteroids[a].bounce(player);
		// Asteroid x Bullet
		for(let b=bullets.length-1; 0<=b; b--){
			if(asteroids[a].bounce(bullets[b])){
				bullets[b].position.x = -100;
				bullets[b].position.y = -100;
			}
		}
	}

	// Asteroids
	cleanOutside(asteroids);
	cleanOutside(bullets);

	drawSprites();
}

function keyPressed(){

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
		let bullet = createBullet(x, y);
		bullet.setSpeed(BULLET_SPEED, rotation);
		bullets.push(bullet);
	}
}

function keyReleased(){
	if(keyCode == 37 || keyCode == 39){
		player.rotationSpeed = 0;
	}
}

function generateAsteroid(){
	console.log("generateAsteroid!!");

	let asteroid = createAsteroid(1, 5, null);
	asteroids.push(asteroid);

	// Timeout
	setTimeout(generateAsteroid, GENERATE_INTERVAL);
}

//==========
// Utility

function createPlayer(x, y, path){
	let spr = createSprite(x, y, 16, 16);
	spr.addImage(assets[path]);
	spr.friction = PLAYER_FRICTION;
	spr.debug = DEBUG;
	return spr;
}

function createAsteroid(min, max, path){

	// Asteroids
	let x = width / 2;
	let y = height / 2;
	let speed = random(min, max);
	let rotation = random(0, 360);

	if(315 <= rotation || rotation < 45){
		x = 0; y = random(0, height);
	}
	if(45 <= rotation && rotation < 135){
		x = random(0, width); y = 0;
	}
	if(135 <= rotation && rotation < 225){
		x = width; y = random(0, height);
	}
	if(225 <= rotation && rotation < 315){
		x = random(0, width); y = height;
	}

	let spr = createSprite(x, y, 16, 16);
	if(path != null){
		spr.addImage(assets[path]);
	}else{
		spr.shapeColor = color(255, 255, 255);
	}
	spr.setSpeed(speed, rotation);
	spr.debug = DEBUG;
	return spr;
}

function createBullet(x, y){
	let spr = createSprite(x, y, 4, 4);
	spr.shapeColor = color(255, 255, 255);
	spr.friction = BULLET_FRICTION;
	spr.debug = DEBUG;
	return spr;
}

function cleanOutside(sprites){
	for(let i=sprites.length-1; 0<=i; i--){
		if(isOutside(sprites[i])){
			sprites[i].remove();
			sprites.splice(i, 1);
		}
	}
}

function isOutside(sprite){
	if(sprite.position.x < 0) return true;
	if(width < sprite.position.x) return true;
	if(sprite.position.y < 0) return true;
	if(width < sprite.position.y) return true;
	return false;
}