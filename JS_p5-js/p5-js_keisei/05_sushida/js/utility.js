console.log("Hello utility.js!!");

let aTanu, aKino01, aKino02;
let iBkg, iGrd;
let iGetReady, iGameOver;
let seDmg, seJump, seOmg;

let sBkgA, sGrdA;
let sGetReady, sGameOver;

let playing = true;
const BULLET_SPD = 18;

function loadAssets(dir){
	// Animations
	const sTanu = loadSpriteSheet(dir + "s_tanu_x2.png", 32, 32, 5);
	aTanu = loadAnimation(sTanu);
	const sKino01 = loadSpriteSheet(dir + "s_kinoko_01_x5.png", 120, 120, 5);
	aKino01 = loadAnimation(sKino01);
	const sKino02 = loadSpriteSheet(dir + "s_kinoko_02_x5.png", 120, 120, 5);
	aKino02 = loadAnimation(sKino02);
	// Images
	iBkg = loadImage(dir + "fb_bkg_x2.png");
	iGrd = loadImage(dir + "fb_grd_x2.png");
	iGameOver = loadImage(dir + "fb_gameover_x2.png");
	iGetReady = loadImage(dir + "fb_getready_x2.png");
	// Sounds
	seDmg = loadSound(dir + "se_dmg.mp3");
	seJump = loadSound(dir + "se_jump.mp3");
	seOmg = loadSound(dir + "se_omg.mp3");
}

function createPlayer(x, y){
	let player = createSprite(x, y, 32, 32);
	player.addAnimation("fly", aTanu);
	player.changeAnimation("fly");
	return player;
}

function createBullet(x, y){
	let bullet = createSprite(x, y, 4, 8);
	bullet.shapeColor = color(255);
	bullet.setSpeed(BULLET_SPD, 270);
	bullets.push(bullet);
}

function createEnemy(x, y, s=1.0){
	let enemy = createSprite(x, y, 16, 16);
	enemy.addAnimation("fly", aKino02);
	enemy.changeAnimation("fly");
	enemy.setSpeed(random(4, 8), random(240, 300));
	enemy.scale = s;
	enemies.push(enemy);
}

function createBackground(){

	//sBkgA = createSprite(width/2, height/2, 32, 32);
	//sBkgA.addImage(iBkg);

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

function gameReady(){
	if(!playing) return;
	playing = false;
	sGetReady = createSprite(width/2, height/2);
	sGetReady.addImage(iGetReady);
	sGameOver = createSprite(width/2, -480);
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

function collideOther(tgt, other){
	const x = tgt.position.x;
	const y = tgt.position.y;
	return other.overlapPoint(x, y);
}

function collideOthers(tgt, others){
	for(let other of others){
		if(collideOther(tgt, other)) return true;
	}
	return false;
}