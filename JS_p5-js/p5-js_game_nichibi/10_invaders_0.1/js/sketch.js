
let ssPlayer, anPlayer;
let ssEnemy, anEnemy;
let imCoin;

let groundY = 0;
let vX = 0;
let score = 0;

let player;

let invaders = [];
let bullets = [];

function preload(){
	ssPlayer = loadSpriteSheet("assets/s_shi_x2.png", 32, 32, 5);
	anPlayer = loadAnimation(ssPlayer);
	ssEnemy = loadSpriteSheet("assets/h_shi_x2.png", 32, 32, 5);
	anEnemy = loadAnimation(ssEnemy);
	imCoin = loadImage("assets/c_coin_x2.png");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// Ground
	groundY = height - 30;
	// Speed
	vX = (random() < 0.5) ? -1 : 1;

	let rows = 3;
	let cols = 5;
	let p = 40;
	let sX = width / 2 - (cols-1) * p / 2;
	let sY = height / 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = sX + c * p;
			let y = sX + r * p;
			let invader = createSprite(x, y, 4, 4);
			invader.addAnimation("fly", anEnemy);
			invader.velocity.x = vX;
			invader.debug = true;
			invaders.push(invader);
		}
	}

	player = createSprite(0, 0, 32, 32);
	player.position.x = width / 2;
	player.position.y = groundY;
	player.addAnimation("fly", anPlayer);
	player.changeAnimation("fly");
	player.debug = true;
}

function draw(){
	background(33);

	// Ground
	noFill();
	stroke(255);
	strokeWeight(2);
	line(-width, groundY, width*2, groundY);

	// Player
	if(player.position.y < groundY){
		player.velocity.y += 0.8;
	}else{
		player.velocity.x = 0;
		player.velocity.y = 0;
		player.position.y = groundY;
	}

	// Invaders
	let turnFlg = false;
	for(let invader of invaders){
		let pX = invader.position.x;
		if(pX < 0 || width < pX){
			turnFlg = true;
			break;
		}
	}
	if(turnFlg){
		for(let invader of invaders){
			invader.velocity.x *= -1;
			invader.position.y += invader.height / 10;
		}
	}

	// Bullets
	for(let b=bullets.length-1; 0<=b; b--){
		let bullet = bullets[b];
		if(bullet.position.y < 30){
			// Remove
			bullet.remove();
			bullets.splice(b, 1);
			continue;
		}
		// x Invaders
		for(i=0; i<invaders.length; i++){
			let invader = invaders[i];
			if(invader.overlap(bullet)){
				// Remove
				invader.remove();
				invaders.splice(i, 1);
				// Remove
				bullet.remove();
				bullets.splice(b, 1);
				// Score
				score += 10;
				continue;
			}
		}
	}

	drawSprites();

	camera.off();// Camera off

	fill(255);
	textSize(32);
	textAlign(CENTER, TOP);
	text(score, width/2, 20);
}

function keyPressed(){

	if(keyCode == UP_ARROW){
		let pX = player.position.x;
		let pY = player.position.y;
		let bullet = createSprite(pX, pY, 4, 4);
		bullet.shapeColor = color(255);
		bullet.velocity.y = -4;
		bullets.push(bullet);
	}

	if(keyCode == LEFT_ARROW){
		player.setSpeed(10, 260);
	}

	if(keyCode == RIGHT_ARROW){
		player.setSpeed(10, 280);
	}
}
