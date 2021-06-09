console.log("Hello utility.js!!");

let aTanu, aPoi;
let iBkg, iGrd;
let iGetReady, iGameOver;
let seJump, seOmg;

let sBkgA, sGrdA;
let sGetReady, sGameOver;

let playing = false;
const ENEMY_HP = 2;

function loadAssets(dir){
	const sTanu = loadSpriteSheet(dir + "s_tanu_x2.png", 32, 32, 5);
	aTanu = loadAnimation(sTanu);
	const sPoi = loadSpriteSheet(dir + "s_poison_x2.png", 24, 24, 5);
	aPoi = loadAnimation(sPoi);

	iBkg = loadImage(dir + "fb_bkg_x2.png");
	iGrd = loadImage(dir + "fb_grd_x2.png");
	iGameOver = loadImage(dir + "fb_gameover_x2.png");
	iGetReady = loadImage(dir + "fb_getready_x2.png");
	seJump = loadSound(dir + "se_jump.mp3");
	seOmg = loadSound(dir + "se_omg.mp3");
}

function createPlayer(x, y){
	let player = createSprite(x, y, 32, 32);
	player.addAnimation("fly", aTanu);
	player.changeAnimation("fly");
	return player;
}

function createEnemy(){
	if(!isLooping()) return;
	let x = random(width);
	let y = 10;
	let s = random(2, 4);
	let d = random(360);
	let enemy = createSprite(x, y, 16, 16);
	enemy.addAnimation("fly", aPoi);
	enemy.changeAnimation("fly");
	enemy.setSpeed(s, d);
	enemy.hp = ENEMY_HP;
	enemies.push(enemy);
}

function createBackground(){

	sBkgA = createSprite(width/2, height/2, 32, 32);
	sBkgA.addImage(iBkg);

	sGrdA = createSprite(width/2, height, 32, 32);
	sGrdA.addImage(iGrd);
}

function getGroundY(){
	return height - sGrdA.height / 2;
}

function showScore(num){
	fill(255);
	textSize(64);
	textAlign(CENTER, TOP);
	text(num, width / 2, 10);
}

function createBanner(x, y){
	sGetReady = createSprite(x, y);
	sGetReady.addImage(iGetReady);
	sGameOver = createSprite(x, -480);
	sGameOver.addImage(iGameOver);
}

function gameStart(){
	if(playing) return;
	playing = true;
	sGetReady.position.y = -480;
	sGameOver.position.y = -480;
	loop();
}

function gameOver(){
	sGetReady.position.y = -480;
	sGameOver.position.y = height / 2;
	seOmg.play();// Sound
	noLoop();
}

function collideOthers(tgt, others){
	for(let other of others){
		const x = other.position.x;
		const y = other.position.y;
		if(tgt.overlapPoint(x, y)) return true;
	}
	return false;
}