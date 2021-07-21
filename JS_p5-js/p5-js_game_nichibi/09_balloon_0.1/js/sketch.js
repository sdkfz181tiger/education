
let ssPlayer, anPlayer;
let ssEnemy, anEnemy;
let imCoin;

let groundY = 0;
let spaceX = 0;
let score = 0;

let player;

let markerRight;
let markerLeft;

let enemies = [];
let coins = [];

function preload(){
	ssPlayer = loadSpriteSheet("assets/s_shi_x2.png", 32, 32, 5);
	anPlayer = loadAnimation(ssPlayer);
	ssEnemy = loadSpriteSheet("assets/h_shi_x2.png", 32, 32, 5);
	anEnemy = loadAnimation(ssEnemy);
	imCoin = loadImage("assets/c_coin_x2.png");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// Ground
	groundY = height - 30;

	for(let i=0; i<10; i++){
		let x = width / 2 + i * 50;
		let y = random(groundY - 30);
		let enemy = createSprite(x, y, 4, 4);
		enemy.addAnimation("fly", anEnemy);
		enemy.debug = true;
		enemies.push(enemy);
	}

	for(let i=0; i<10; i++){
		let x = width / 2 + i * 50;
		let y = random(groundY);
		let coin = createSprite(x, y, 4, 4);
		coin.addImage(imCoin);
		coin.debug = true;
		coins.push(coin);
	}

	player = createSprite(0, 0, 32, 32);
	player.position.x = width / 2;
	player.position.y = groundY;
	player.addAnimation("fly", anPlayer);
	player.changeAnimation("fly");
	player.debug = true;

	markerRight = createSprite(width-150, height/2, 4, 64);
	markerRight.shapeColor = color(255);
	//markerBtm.visible = false;

	markerLeft = createSprite(150, height/2, 4, 64);
	markerLeft.shapeColor = color(255);
	//markerTop.visible = false;

	spaceX = markerRight.position.x - markerLeft.position.x;
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

	if(markerRight.position.x < player.position.x){
		markerRight.position.x = player.position.x;
		markerLeft.position.x = markerRight.position.x - spaceX;
	}

	if(player.position.x < markerLeft.position.x){
		markerLeft.position.x = player.position.x;
		markerRight.position.x = markerLeft.position.x + spaceX;
	}

	camera.position.x = markerLeft.position.x + spaceX * 0.5;

	for(let enemy of enemies){
		if(enemy.overlap(player)){
			let dX = enemy.position.x - player.position.x;
			let dY = enemy.position.y - player.position.y;
			if(Math.sqrt(dX*dX+dY*dY) < 28){
				noLoop();
			}
		}
	}

	for(let coin of coins){
		if(coin.overlap(player)){
			coin.position.x = 0;
			coin.position.y = 0;
			score += 10;
		}
	}

	drawSprites();

	camera.off();// Camera off

	fill(255);
	textSize(64);
	textAlign(CENTER, TOP);
	text(score, width/2, 20);
}

function keyPressed(){

	if(keyCode == UP_ARROW){
		player.setSpeed(10, 270);
	}

	if(keyCode == LEFT_ARROW){
		player.setSpeed(10, 260);
	}

	if(keyCode == RIGHT_ARROW){
		player.setSpeed(10, 280);
	}
}
