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

let assets    = {};
let player    = null;
let asteroids = [];
let bullets   = [];
let numTimer  = TIME_LIMIT;
let numPower  = POWER_MAX;
let msg       = "";

const images = [
	"images/tanuki.png",// Player
	"images/earth.png",
	"images/moon.png",
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
	createCanvas(480, 320);
	frameRate(32);

	// Player
	player = createPlayer(width/2, height/2, "images/tanuki.png");

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
	for(let a=0; a<asteroids.length; a++){
		// Asteroid x Player
		if(asteroids[a].bounce(player)){
			numPower--;
			if(numPower <= 0){
				gameOver();
			}
			playSound("sounds/damage.mp3");
		}
		// Asteroid x Bullet
		for(let b=0; b<bullets.length; b++){
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

	// Sprites
	drawSprites();

	// Status
	drawStatuses();
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
	if(keyCode == 90 && bullets.length < BULLET_LIMIT){
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

function startAsteroids(){
	//console.log("startAsteroids");
	if(isFinished()) return;// Finished?

	// Asteroids
	if(asteroids.length < ASTEROID_LIMIT){

		let rdm = floor(random(1, images.length-1));
		let asteroid = createAsteroid(
				ASTEROID_SPEED_MIN, ASTEROID_SPEED_MAX, images[rdm]);
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

function playSound(path){
	if(assets[path].isPlaying()){
		assets[path].stop();
	}
	assets[path].play();
}

function drawStatuses(){
	fill(255, 200, 200);
	textSize(16);
	let msgTimer = "TIME:" + numTimer;
	let msgPower = "POWER:" + numPower;
	textAlign(LEFT);
	text(msgTimer , 10, 20);
	textAlign(RIGHT);
	text(msgPower , width-10, 20);
	textAlign(CENTER);
	text(msg, width*0.5, 20);
}

function isFinished(){
	if(numTimer <= 0 || numPower <=0) return true;
	return false;
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