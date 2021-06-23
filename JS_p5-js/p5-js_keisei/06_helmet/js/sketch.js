
let iBkg, iGameOver;
let aPower, aPoison;
let aRun, aDead;

let score = 0;
let player = null;
let kinokos = [];
let isPlaying = true;

function preload(){
	// Image
	iBkg = loadImage("./assets/b_edo.png");
	iGameOver = loadImage("./assets/b_gameover.png");
	// SpriteSheet
	const sPower = loadSpriteSheet("./assets/k_power.png", 12, 12, 5);
	aPower = loadAnimation();
	const sPoison = loadSpriteSheet("./assets/k_poison.png", 12, 12, 5);
	aPoison = loadAnimation(sPoison);
	const sRun = loadSpriteSheet("./assets/t_run.png", 16, 16, 5);
	aRun = loadAnimation(sRun);
	const sDead = loadSpriteSheet("./assets/t_dead.png", 16, 16, 5)
	aDead = loadAnimation(sDead);
}

function setup(){
	createCanvas(160, 160);
	angleMode(DEGREES);
	frameRate(32);
	background(33);
	// Background
	let bkg = createSprite(width/2, height/2);
	bkg.addImage(iBkg);
	// Score
	textSize(24);
	textAlign(CENTER, TOP);
	text(score, width/2, 10);
	// Player
	player = createSprite(width/2, height - 40);
	player.debug = true;
	player.addAnimation("run", aRun);
	player.addAnimation("dead", aDead);
	player.changeAnimation("run");
	// Kinokos
	const total = 4;
	const padX = 32;
	const startX = width / 2 - padX*(total-1)/2;
	for(let i=0; i<total; i++){
		let x = startX + padX * i;
		let y = 0 - random(height / 2);
		let kinoko = createSprite(x, y);
		kinoko.debug = true;
		kinoko.addAnimation("dance", aPoison);
		kinokos.push(kinoko);
	}
}

function draw(){
	background(33);
	drawSprites();
	text(score, width/2, 10);

	if(!isPlaying) return;

	for(let kinoko of kinokos){
		kinoko.position.y += 2;
		if(height - 32 < kinoko.position.y){
			kinoko.position.x = random(width);
			kinoko.position.y = 0 - random(height / 2);
		}
		checkCollision(kinoko);
	}
}

function keyPressed(){

	if(!isPlaying) return;

	if(keyCode == LEFT_ARROW){
		player.position.x -= 8;
		if(player.position.x < 0){
			player.position.x = 0;
		}
	}

	if(keyCode == RIGHT_ARROW){
		player.position.x += 8;
		if(width < player.position.x){
			player.position.x = 0;
			score += 10;// Score
		}
	}
}

function checkCollision(target){
	const x = target.position.x;
	const y = target.position.y;
	if(!player.overlapPoint(x, y)) return;
	player.changeAnimation("dead");
	// Logo
	let gameover = createSprite(width/2, height/2);
	gameover.addImage(iGameOver);
	// Flag
	isPlaying = false;
	setTimeout(noLoop, 1000);
}
