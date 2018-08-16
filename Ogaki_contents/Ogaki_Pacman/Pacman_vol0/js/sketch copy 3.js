//==========
// p5.js

console.log("Hello p5.js!!");

const DEBUG  = false;
const F_RATE = 32;

let assets = {};
let player = null;
let tMap   = null;
let tMapX, tMapY = null;

const images = [
	"images/tanuki.png",
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
	// Tilemap
	tMap = loadTiledMap("desert", "tiledmaps");
}

function setup(){
	createCanvas(480, 320);
	frameRate(32);

	// TiledMap
	tMap.setPositionMode("MAP");
	tMap.setDrawMode(CENTER);
	let mSize = tMap.getMapSize();
	tMapX = 0;
	tMapY = 0;

	// Player
	player = createPlayer(0, 0, "images/tanuki.png");
	player.setGrid(tMapX, tMapY);
}

function draw(){
	background(0, 0, 0);

	// TiledMap
	tMap.draw(tMapX, tMapY);

	if(keyIsPressed){
		if(key == "a" || key == "A") tMapX -= 0.25;
		if(key == "d" || key == "D") tMapX += 0.25;
		if(key == "w" || key == "W") tMapY -= 0.25;
		if(key == "s" || key == "S") tMapY += 0.25;
	}

	// Player
	if(player.position.x < 0) player.position.x = width;
	if(width < player.position.x) player.position.x = 0;
	if(player.position.y < 0) player.position.y = height;
	if(height < player.position.y) player.position.y = 0;

	let mSize = tMap.getMapSize();
	let tSize = tMap.getTileSize();

	let cX = width * 0.5;
	let cY = height * 0.5;
	let mX = cX - tMap.getPosition().x * tSize.x;
	let mY = cY - tMap.getPosition().y * tSize.y;
	let x = mX + player.gX * tSize.x;
	let y = mY + player.gY * tSize.y;
	player.position.x = x;
	player.position.y = y;

	// Sprites
	drawSprites();
}

function mousePressed(){

	//player.vanish();
}

function keyPressed(){

	// Up
	if(keyCode == 38){
		player.moveGrid(0, -1);
	}
	// Down
	if(keyCode == 40){
		player.moveGrid(0, 1);
	}
	// Left
	if(keyCode == 37){
		player.moveGrid(-1, 0);
	}
	// Right
	if(keyCode == 39){
		player.moveGrid(1, 0);
	}
}

//==========
// Utility

function createPlayer(x, y, path){
	let spr = createSprite(x, y, 16, 16);
	spr.addImage(assets[path]);
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

//==========
// Sprite
const SPRITE_CLS = p5.prototype.Sprite;

SPRITE_CLS.prototype.gX = 0;
SPRITE_CLS.prototype.gY = 0;

SPRITE_CLS.prototype.vanish = function(){
	this.scale = 0.8;
	setTimeout(()=>{this.remove();}, 100);
}

SPRITE_CLS.prototype.setGrid = function(x, y){
	this.gX = x; this.gY = y;
}

SPRITE_CLS.prototype.moveGrid = function(x, y){
	this.gX += x; this.gY += y;
}

SPRITE_CLS.prototype._moveTo = function(x, y){
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