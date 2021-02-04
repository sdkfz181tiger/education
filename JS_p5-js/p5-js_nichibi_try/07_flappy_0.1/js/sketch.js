
let ssBird, anBird;
let imBkg, imGrd;
let imTTop, imTBtm;

let spBkgA, spBkgB;
let spGrdA, spGrdB;

let spPlayer;
let spTTopA, spTBtmA;
let spTTopB, spTBtmB;

let score = 0;
let scrSpd = 3;
let grdY;

function preload(){
	ssBird = loadSpriteSheet("assets/fb_bird_x2.png", 34, 24, 3);
	anBird = loadAnimation(ssBird);
	imBkg = loadImage("assets/fb_bkg_x2.png");
	imGrd = loadImage("assets/fb_grd_x2.png");
	imTTop = loadImage("assets/fb_tun_top_x2.png");
	imTBtm = loadImage("assets/fb_tun_bottom_x2.png");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	spBkgA = createSprite(0, height/2, 32, 32);
	spBkgA.addImage(imBkg);
	spBkgA.setSpeed(scrSpd/2, 180);

	spBkgB = createSprite(width, height/2, 32, 32);
	spBkgB.addImage(imBkg);
	spBkgB.setSpeed(scrSpd/2, 180);

	spGrdA = createSprite(0, height, 32, 32);
	spGrdA.addImage(imGrd);
	spGrdA.setSpeed(scrSpd, 180);

	spGrdB = createSprite(width, height, 32, 32);
	spGrdB.addImage(imGrd);
	spGrdB.setSpeed(scrSpd, 180);

	grdY = height - spGrdA.height / 2;

	spTTopA = createSprite(width, -50, 32, 32);
	spTTopA.addImage(imTTop);
	spTTopA.setSpeed(scrSpd, 180);
	score += 1;
	spTTopA.score = score;

	spTBtmA = createSprite(width, height+50, 32, 32);
	spTBtmA.addImage(imTBtm);

	spTTopB = createSprite(width*1.5, -50, 32, 32);
	spTTopB.addImage(imTTop);
	spTTopB.setSpeed(scrSpd, 180);
	score += 1;
	spTTopB.score = score;

	spTBtmB = createSprite(width*1.5, height+50, 32, 32);
	spTBtmB.addImage(imTBtm);

	player = createSprite(0, 0, 32, 32);
	player.position.x = floor(width / 2);
	player.position.y = floor(height / 2);
	player.addAnimation("fly", anBird);
	player.changeAnimation("fly");
}

function draw(){
	background(100, 150, 250);

	// Jump
	if(player.position.y < grdY){
		player.velocity.y += 2;
	}else{
		player.velocity.y = 0;
		player.position.y = grdY;
	}

	// Background
	if(spBkgA.position.x <= -width/2){
		let offX = spBkgA.position.x +  width / 2;
		spBkgA.position.x = width * 1.5 + offX;
	}
	if(spBkgB.position.x <= -width/2){
		let offX = spBkgB.position.x +  width / 2;
		spBkgB.position.x = width * 1.5 + offX;
	}

	// Ground
	if(spGrdA.position.x <= -width/2){
		let offX = spGrdA.position.x +  width / 2;
		spGrdA.position.x = width * 1.5 + offX;
	}
	if(spGrdB.position.x <= -width/2){
		let offX = spGrdB.position.x +  width / 2;
		spGrdB.position.x = width * 1.5 + offX;
	}

	// Tunnel A
	if(spTTopA.position.x <= 0){
		spTTopA.position.x = width;
		spTTopA.position.y = random(-100, 100);
		spTBtmA.position.y = spTTopA.position.y + spTTopB.height + 100;
		score += 1;
		spTTopA.score = score;
	}
	spTBtmA.position.x = spTTopA.position.x;

	// Tunnel B
	if(spTTopB.position.x <= 0){
		spTTopB.position.x = width;
		spTTopB.position.y = random(-100, 100);
		spTBtmB.position.y = spTTopB.position.y + spTTopB.height + 100;
		score += 1;
		spTTopB.score = score;
	}
	spTBtmB.position.x = spTTopB.position.x;

	// Collision
	if(player.overlap(spTTopA) || player.overlap(spTBtmA) ||
		player.overlap(spTTopB) || player.overlap(spTBtmB)){
		//noLoop();
	}

	drawSprites();

	fill(255);
	textSize(64);
	textAlign(CENTER, TOP);
	text(spTTopA.score, spTTopA.position.x, 10);
	text(spTTopB.score, spTTopB.position.x, 10);
}

function mousePressed(){
	// Jump
	player.setSpeed(10, 270);
}