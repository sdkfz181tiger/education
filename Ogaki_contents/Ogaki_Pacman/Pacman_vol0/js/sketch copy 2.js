//==========
// p5.js

console.log("Hello p5.js!!");

const DEBUG              = false;

const PLAYER_SPEED       = 4;
const PLAYER_FRICTION    = 0.95;

let assets = {};
let player = null;

const images = [
	"images/soldier.png", "images/bkg.png",// Soldier, Background
	"images/earth.png",   "images/moon.png",   "images/ume.png", 
	"images/inv1a.png",   "images/inv2a.png",  "images/inv3a.png",
	"images/inv4a.png",   "images/inv5a.png",  "images/inv6a.png",
	"images/inv7a.png",   "images/inv8a.png",  "images/inv9a.png",
	"images/inv10a.png",  "images/inv11a.png", "images/inv12a.png",
	"images/inv13a.png",  "images/inv14a.png", "images/inv15a.png",
	"images/inv16a.png",  "images/inv17a.png",
];

const sounds = [
	"sounds/damage.mp3", "sounds/gameclear.mp3",
	"sounds/gameover.mp3", "sounds/hit.mp3",
	"sounds/pong.mp3", "sounds/shot.mp3",
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

	// Background
	let bkg = createBkg(240, 160, "images/bkg.png");

	// Player
	player = createPlayer(width/2, height/2, "images/soldier.png");
}

function draw(){
	background(0, 0, 0);

	// Player
	if(player.position.x < 0) player.position.x = width;
	if(width < player.position.x) player.position.x = 0;
	if(player.position.y < 0) player.position.y = height;
	if(height < player.position.y) player.position.y = 0;

	// Sprites
	drawSprites();
}

function keyPressed(){

	// Up
	if(keyCode == 38){
		player.setSpeed(PLAYER_SPEED, 270);
	}
	// Down
	if(keyCode == 40){
		player.setSpeed(PLAYER_SPEED, 90);
	}
	// Left
	if(keyCode == 37){
		player.setSpeed(PLAYER_SPEED, 180);
	}
	// Right
	if(keyCode == 39){
		player.setSpeed(PLAYER_SPEED, 0);
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

function createBkg(x, y, path){
	let spr = createSprite(x, y, 480, 320);
	spr.addImage(assets[path]);
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

		let rdm = floor(random(2, images.length-1));
		let asteroid = createAsteroid(
				ASTEROID_SPEED_MIN, ASTEROID_SPEED_MAX, images[rdm]);
		asteroids.push(asteroid);
	}
	// Timeout
	setTimeout(startAsteroids, ASTEROID_INTERVAL);
}

function playSound(path){
	if(assets[path].isPlaying()){
		assets[path].stop();
	}
	assets[path].play();
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