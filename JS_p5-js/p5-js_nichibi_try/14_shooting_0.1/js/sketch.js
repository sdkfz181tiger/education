
let ssPlayer, anPlayer;
let ssEnemy, anEnemy;
let imCoin;

let groundY = 0;
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

	player = createSprite(0, 0, 32, 32);
	player.position.x = width / 2;
	player.position.y = groundY;
	player.addAnimation("walk", anPlayer);
	player.changeAnimation("walk");
	player.debug = true;

	startEnemy();
	startShot();
}

function draw(){
	background(33);

	// Ground
	noFill();
	stroke(255);
	strokeWeight(2);
	line(-width, groundY, width*2, groundY);

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
				// Remove(Bullet)
				bullet.remove();
				bullets.splice(b, 1);

				// Remove(Invader)
				invader.hp--;
				if(0 < invader.hp){
					// Knockback
					invader.position.y -= invader.height * 0.5;
				}else{
					// Remove
					invader.remove();
					invaders.splice(i, 1);
				}

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

function startShot(){

	let pX = player.position.x;
	let pY = player.position.y;
	let bullet = createSprite(pX, pY, 4, 4);
	bullet.shapeColor = color(255);
	bullet.velocity.y = -8;
	bullets.push(bullet);

	setTimeout(startShot, 500);
}

function startEnemy() {

	let x = random(width);
	let y = 0;

	let invader = createSprite(x, y, 4, 4);
	invader.addAnimation("walk", anEnemy);
	invader.velocity.y = random(1, 2);
	invader.debug = true;
	invader.hp = 10;
	invaders.push(invader);

	setTimeout(startEnemy, 1000);
}

function keyPressed(){

	if(keyCode == LEFT_ARROW){
		player.setSpeed(10, 180);
	}

	if(keyCode == RIGHT_ARROW){
		player.setSpeed(10, 0);
	}
}

function keyReleased(){
	player.setSpeed(0, 0);
}