"use strict"
//==========
// p5.js

// "レトロシューティングゲーム"
// 	敵の数がどんどん増えるよ!!
// 	ハイスコアに挑戦!!

// 作業の流れ
// 1, プレイヤーを出そう
// 2-1, プレイヤーを操作しよう(UP/LEFT/RIGHT)
// 2-2, 画面外判定を実装しよう
// 3, 星空を出そう
// 4-1, 隕石の出現と時間を実装しよう
// 4-2, BGMを再生しよう
// 5-1, 弾を発射しよう
// 5-2, 隕石xプレイヤー

console.log("Hello p5.js!!");

const DEBUG       = false;// デバッグモード

const P_SPEED     = 4;   // プレイヤー移動速度
const P_FRICTION  = 0.95;// プレイヤー減衰速度
const B_SPEED     = 8;   // 弾のスピード
const B_FRICTION  = 1.0; // 弾の減衰速度
const B_LIMIT     = 3;   // 弾の最大数
const A_SPEED_MIN = 1;   // アステロイド最低速度
const A_SPEED_MAX = 3;   // アステロイド最高速度
const A_LIMIT     = 30; // アステロイド最大数
const A_INTERVAL  = 1000;// アステロイド出現タイミング
const A_REINFORCE = 8;   // アステロイド出現数増加タイミング
const T_INTERVAL  = 1000;// 時間経過タイミング

let assets        = {};  // アセット
let player        = null;// プレイヤー
let asteroids     = [];  // アステロイド
let bullets       = [];  // 弾
let numTime       = 0;   // タイム
let numLife       = 3;   // ライフ
let numScore      = 0;   // スコア
let msg           = "";  // メッセージ

//  プレイヤー、背景、アステロイドの種類
const images = [
	"images/soldier.png", "images/bkg.png",// Soldier, Background
	//"images/moon.png", "images/earth.png",
	"images/inv1a.png", "images/inv2a.png", "images/inv3a.png",
];

const sounds = [
	"sounds/bgmam.mp3", "sounds/bgmpm.mp3",
	"sounds/damage.mp3", "sounds/gameclear.mp3",
	"sounds/gameover.mp3", "sounds/hit.mp3",
	"sounds/pong.mp3", "sounds/shot.mp3", "sounds/go.mp3",
];

function setup(){
	createCanvas(480, 320); frameRate(32);

	// 3, 星空を出そう
	for(let i=0; i<100; i++){
		createStar();
	}

	// 1, プレイヤーを出そう
	player = createPlayer(width/2, height/2, "images/soldier.png");

	// 4-1, 隕石の出現と時間を実装しよう
	startAsteroids();
	startCountUp();

	// 4-2, BGMを再生しよう
	//playSound("sounds/bgmam.mp3", true);
}

function keyPressed(){
	// 2-1, プレイヤーを操作しよう(UP/LEFT/RIGHT)
	if(keyCode == 38){
		player.setSpeed(P_SPEED, player.rotation-90);
		playSound("sounds/go.mp3");
	}
	if(keyCode == 37){
		player.rotationSpeed = -5;
	}
	if(keyCode == 39){
		player.rotationSpeed = +5;
	}
	// 5-1, 弾を発射しよう
	if(keyCode == 90 && bullets.length < B_LIMIT){
		createBullet();
		playSound("sounds/shot.mp3");
	}
}

function keyReleased(){
	if(keyCode == 37 || keyCode == 39){
		player.rotationSpeed = 0;
	}
}

function draw(){
	background(0, 0, 0);

	// 2-2, 画面外判定を実装しよう
	if(player.position.x < 0) player.position.x = width;
	if(player.position.x > width) player.position.x = 0;
	if(player.position.y < 0) player.position.y = height;
	if(player.position.y > height) player.position.y = 0;

	// 当たり判定を実装しよう
	for(let a=0; a<asteroids.length; a++){
		// 5-2, 隕石xプレイヤー
		if(isCollide(player, asteroids[a])){
			if(--numLife <= 0) gameOver();
			playSound("sounds/damage.mp3");
		}
		// 隕石x弾
		for(let b=0; b<bullets.length; b++){
			if(isBounce(bullets[b], asteroids[a])){
				bullets[b].position.x = -100;
				bullets[b].position.y = -100;
				numScore++;
				playSound("sounds/hit.mp3");
			}
		}
	}

	// Clean, Draw
	cleanOutside(asteroids);
	cleanOutside(bullets);
	drawSprites(); drawStatuses();
}

function gameOver(){
	msg = "GAME OVER!!";
	stopSound("sounds/bgmam.mp3");
	playSound("sounds/gameover.mp3");
	noLoop();
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

function createPlayer(x, y, path){
	let spr = createSprite(x, y, 16, 16);
	spr.addImage(assets[path]);
	spr.friction = P_FRICTION;
	spr.debug = DEBUG;
	return spr;
}

function createStar(){
	let x = random(0, width);
	let y = random(0, height);
	let size = random(1, 3);
	let spr = createSprite(x, y, size, size);
	return spr;
}

function createAsteroid(min, max, path){
	// Asteroids
	let x = width / 2; let y = height / 2;
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

function createBullet(){
	let x = player.position.x;
	let y = player.position.y;
	let r = player.rotation-90;
	let spr = createSprite(x, y, 4, 4);
	spr.setSpeed(B_SPEED, r);
	spr.shapeColor = color(255, 255, 255);
	spr.friction = B_FRICTION;
	spr.debug = DEBUG;
	bullets.push(spr);
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

function isCollide(sprite, target){
	let dX = sprite.position.x - target.position.x;
	if(target.width*0.4 < Math.abs(dX)) return false;
	let dY = sprite.position.y - target.position.y;
	if(target.height*0.4 < Math.abs(dY)) return false;
	//let dist = Math.floor(Math.sqrt(dX*dX + dY*dY));
	//if(target.width*0.4 < dist) return false;
	if(sprite.bounce(target)) return true;
	return false;
}

function isBounce(sprite, target){
	if(sprite.bounce(target)) return true;
	return false;
}

function startAsteroids(){
	//console.log("startAsteroids");
	if(isFinished()) return;// Finished?
	// Asteroids
	if(asteroids.length < A_LIMIT){
		let r = floor(numTime / A_REINFORCE) + 1;
		for(let i=0; i<r; i++){
			let rdm = floor(random(2, images.length));
			let asteroid = createAsteroid(
					A_SPEED_MIN, A_SPEED_MAX, images[rdm]);
			asteroids.push(asteroid);
		}
	}
	// Timeout
	setTimeout(startAsteroids, A_INTERVAL);
}

function startCountUp(){
	//console.log("startCountUp");
	if(isFinished()) return;// Finished?
	// CountUp
	numTime++;
	// Timeout
	setTimeout(startCountUp, T_INTERVAL);
}

function playSound(path, loop=false){
	stopSound(path);
	assets[path].setLoop(loop);
	assets[path].play();
}

function stopSound(path){
	if(assets[path].isPlaying()) assets[path].stop();
}

function drawStatuses(){
	fill(255, 255, 255); noStroke(); textSize(24);
	let msgTimer = "TIME:"  + numTime;
	let msgLife  = "LIFE:"  + numLife;
	let msgScore = "SCORE:" + numScore;
	textAlign(LEFT);   text(msgTimer, 10, 25);
	textAlign(RIGHT);  text(msgLife, width-10, 25);
	textAlign(CENTER); text(msgScore, width*0.5, 25);
	textAlign(CENTER); text(msg, width*0.5, height-5);
}

function isFinished(){
	if(numLife <=0) return true;
	return false;
}