//==========
// p5.js

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

const PLAYER_SPEED      = 2;
const PLAYER_FRICTION   = 0.98;
const BULLET_SPEED      = 4;
const BULLET_FRICTION   = 1.0;
const ASTEROID_LIMIT    = 10;
const ASTEROID_INTERVAL = 1000 * 1;
const TIME_LIMIT        = 60;
const TIME_INTERVAL     = 1000 * 1;

const POWER_MAX         = 30;

const DEBUG = true;

const images = [
	"images/earth.png",
	"images/moon.png",
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

let assets = {};

let player    = null;
let asteroids = [];
let bullets   = [];

let numTimer  = TIME_LIMIT;
let numPower  = POWER_MAX;

let msg       = "";

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

	// Player
	player = createPlayer(240, 160, "images/tanuki.png");

	// Asteroids, CountDown
	startAsteroids();
	startCountDown();
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
		if(asteroids[a].bounce(player)){
			numPower--;
			if(numPower <= 0){
				gameOver();
			}
			playSound("sounds/damage.mp3");
		}
		// Asteroid x Bullet
		for(let b=bullets.length-1; 0<=b; b--){
			if(bullets[b].bounce(asteroids[a])){
				bullets[b].position.x = -100;
				bullets[b].position.y = -100;
				playSound("sounds/hit.mp3");
			}
		}
	}

	// Asteroids
	cleanOutside(asteroids);
	cleanOutside(bullets);

	// Status
	drawStatuses();

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
		playSound("sounds/shot.mp3");
	}
}

function keyReleased(){
	if(keyCode == 37 || keyCode == 39){
		player.rotationSpeed = 0;
	}
}

function startAsteroids(){
	//console.log("startAsteroids");
	if(isFinished()) return;// Finished?

	// Asteroids
	if(asteroids.length < ASTEROID_LIMIT){

		let paths = [
			"images/ume.png",
			"images/earth.png",
			"images/moon.png",
		];
		let rdm = floor(random(0, paths.length-1));

		let asteroid = createAsteroid(1, 3, paths[rdm]);
		asteroids.push(asteroid);
	}
	// Timeout
	setTimeout(startAsteroids, ASTEROID_INTERVAL);
}

function startCountDown(){
	//console.log("startCountDown");
	if(isFinished()) return;// Finished?

	// CountDown
	numTimer--;
	if(numTimer <= 0 && 0 < numPower){
		gameClear();
	}
	// Timeout
	setTimeout(startCountDown, TIME_INTERVAL);
}

function gameClear(){
	msg = "GAME CLEAR!!";
	playSound("sounds/gameclear.mp3");
	noLoop();
}

function gameOver(){
	msg = "GAME OVER!!";
	playSound("sounds/gameover.mp3");
	noLoop();
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

function playSound(path){
	if(assets[path].isPlaying()){
		assets[path].stop();
	}
	assets[path].play();
}

function drawStatuses(){
	textSize(16);
	let msgTimer = "TIME:" + numTimer;
	let msgPower = "POWER:" + numPower;
	textAlign(LEFT);
	text(msgTimer , 10, 20);
	textAlign(RIGHT);
	text(msgPower , 470, 20);
	textSize(32);
	textAlign(CENTER);
	text(msg, width*0.5, height*0.5);
}

function isFinished(){
	if(numTimer <= 0 || numPower <=0) return true;
	return false;
}