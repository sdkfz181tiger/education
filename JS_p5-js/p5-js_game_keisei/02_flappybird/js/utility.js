console.log("Hello utility.js!!");

let anBird;
let iBkg, iGrd;
let iTop, iBtm;
let iGetReady, iGameOver;
let seJump, seOmg;

let sBkgA, sBkgB;
let sGrdA, sGrdB;
let sGetReady, sGameOver;

let playing = false;

function loadAssets(dir){
	const sBird = loadSpriteSheet(dir + "fb_bird_x2.png", 34, 24, 3);
	aBird = loadAnimation(sBird);
	iBkg = loadImage(dir + "fb_bkg_x2.png");
	iGrd = loadImage(dir + "fb_grd_x2.png");
	iTop = loadImage(dir + "fb_tun_top_x2.png");
	iBtm = loadImage(dir + "fb_tun_bottom_x2.png");
	iGameOver = loadImage(dir + "fb_gameover_x2.png");
	iGetReady = loadImage(dir + "fb_getready_x2.png");
	seJump = loadSound(dir + "se_jump.mp3");
	seOmg = loadSound(dir + "se_omg.mp3");
}

function createPlayer(x, y){
	let player = createSprite(x, y, 32, 32);
	player.addAnimation("fly", aBird);
	player.changeAnimation("fly");
	return player;
}

function createTop(x, y, speed=0, deg=0){
	let top = createSprite(x, y);
	top.addImage(iTop);
	top.setSpeed(speed, deg);
	return top;
}

function createBtm(x, y, speed=0, deg=0){
	let btm = createSprite(x, y);
	btm.addImage(iBtm);
	btm.setSpeed(speed, deg);
	return btm;
}

function createBackground(vX){

	sBkgA = createSprite(0, height/2, 32, 32);
	sBkgA.addImage(iBkg);
	sBkgA.setSpeed(vX/2, 180);

	sBkgB = createSprite(width, height/2, 32, 32);
	sBkgB.addImage(iBkg);
	sBkgB.setSpeed(vX/2, 180);

	sGrdA = createSprite(0, height, 32, 32);
	sGrdA.addImage(iGrd);
	sGrdA.setSpeed(vX, 180);

	sGrdB = createSprite(width, height, 32, 32);
	sGrdB.addImage(iGrd);
	sGrdB.setSpeed(vX, 180);
}

function getGroundY(){
	return height - sGrdA.height / 2;
}

function scrollBackground(){

	// Background
	if(sBkgA.position.x <= -width/2){
		let offX = sBkgA.position.x +  width / 2;
		sBkgA.position.x = width * 1.5 + offX;
	}
	if(sBkgB.position.x <= -width/2){
		let offX = sBkgB.position.x +  width / 2;
		sBkgB.position.x = width * 1.5 + offX;
	}

	// Ground
	if(sGrdA.position.x <= -width/2){
		let offX = sGrdA.position.x +  width / 2;
		sGrdA.position.x = width * 1.5 + offX;
	}
	if(sGrdB.position.x <= -width/2){
		let offX = sGrdB.position.x +  width / 2;
		sGrdB.position.x = width * 1.5 + offX;
	}
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

function collideTunnels(tgt, ...tnls){
	for(let tnl of tnls){
		const x = tgt.position.x;
		const y = tgt.position.y;
		if(tnl.overlapPoint(x, y)) return true;
	}
	return false;
}