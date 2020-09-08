//==========
// p5.js

console.log("Hello p5.js!!");

const DEBUG  = false;
const F_RATE = 32;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

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
	tMap.setPositionMode("MAP");
	tMapX = 0;
	tMapY = 0;
}

function setup(){
	createCanvas(480, 320);
	frameRate(F_RATE);

	// Player 
	player = new Player(0, 0, "images/tanuki.png");
	player.readyGrid(4, 2);
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

	player.draw();
}

function keyPressed(){
	if(keyCode == 38) player.startStep(0, -1);
	if(keyCode == 40) player.startStep(0, 1);
	if(keyCode == 37) player.startStep(-1, 0);
	if(keyCode == 39) player.startStep(1, 0);
}

function keyReleased(){
	//player.stopStep();
}

function mousePressed(){
	//player.startMove(mouseX, mouseY);
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

class Player{

	constructor(x, y, path){
		this._x  = x; this._y  = y;
		this._vX = 0; this._vY = 0;
		this._gX = 0; this._gY = 0;
		this._dX = x; this._dY = y;
		this._speed  = 128; this._deg = 0;
		this._image  = assets[path];
		this._width  = this._image.width;
		this._height = this._image.height;
	}

	readyGrid(gX, gY){
		setTimeout(()=>{
			this._gX += gX; this._gY += gY;
			let mSize = tMap.getMapSize();
			let tSize = tMap.getTileSize();
			let mX = tMap.getPosition().x * tSize.x;
			let mY = tMap.getPosition().y * tSize.y;
			this._dX = mX + this._gX * tSize.x;
			this._dY = mY + this._gY * tSize.y;
		}, 300);
	}

	startStep(gX, gY){
		this._gX += gX; this._gY += gY;
		let mSize = tMap.getMapSize();
		let tSize = tMap.getTileSize();
		let mX = tMap.getPosition().x * tSize.x;
		let mY = tMap.getPosition().y * tSize.y;
		let dX = mX + this._gX * tSize.x;
		let dY = mY + this._gY * tSize.y;
		this.startMove(dX, dY);
	}

	stopStep(){
		this.stopMove();
	}

	startMove(dX, dY){
		this._dX  = dX; this._dY = dY;
		let disX  = this._dX - this._x;
		let disY  = this._dY - this._y;
		let rad   = Math.atan2(disY, disX);
		this._vX  = this._speed * Math.cos(rad);
		this._vY  = this._speed * Math.sin(rad);
		this._deg = rad * RAD_TO_DEG;
	}

	stopMove(){
		this._vX = 0; this._vY = 0;
	}

	draw(){
		let disX = this._dX - this._x;
		let disY = this._dY - this._y;
		let rad  = Math.atan2(disY, disX);
		this._vX = this._speed * Math.cos(rad);
		this._vY = this._speed * Math.sin(rad);
		this._x += this._vX / F_RATE;
		this._y += this._vY / F_RATE;
		let distance = disX*disX + disY*disY;
		if(distance < 25) {
			this._x = this._dX; this._y = this._dY;
			this._vX = 0.0; this._vY = 0.0;
			this.stopMove();
		}
		image(this._image, 
			this._x - this._width * 0.5, 
			this._y - this._height * 0.5);
	}
}