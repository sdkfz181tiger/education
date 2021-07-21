
let ssPlayer, anPlayer;
let ssToge, anToge;

let groundY = 0;
let spaceY = 0;

let player;
let markerTop;
let markerBtm;
let enemies = [];

function preload(){
	ssPlayer = loadSpriteSheet("assets/s_shi_x2.png", 32, 32, 5);
	anPlayer = loadAnimation(ssPlayer);
	ssToge = loadSpriteSheet("assets/s_toge_x3.png", 24, 24, 5);
	anToge = loadAnimation(ssToge);
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// Ground
	groundY = height - 50;
	spaceY = groundY - height / 2;

	for(let i=0; i<80; i++){
		let x = random(0, width);
		let y = height / 2 - i * 50;
		let enemy = createSprite(x, y, 4, 4);
		enemy.addAnimation("roll", anToge);
		enemies.push(enemy);
	}

	player = createSprite(0, 0, 32, 32);
	player.position.x = width / 2;
	player.position.y = groundY;
	player.addAnimation("fly", anPlayer);
	player.changeAnimation("fly");

	markerTop = createSprite(0, 0, 64, 4);
	markerTop.shapeColor = color(255);
	markerTop.position.x = player.position.x;
	markerTop.position.y = height / 2;
	//markerTop.visible = false;

	markerBtm = createSprite(0, 0, 64, 4);
	markerBtm.shapeColor = color(255);
	markerBtm.position.x = player.position.x;
	markerBtm.position.y = groundY;
	//markerBtm.visible = false;
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

	if(player.position.x < player.width/2){
		player.position.x = player.width/2;
	}

	if(width-player.width/2 < player.position.x){
		player.position.x = width - player.width/2;
	}

	if(player.position.y < markerTop.position.y){
		markerTop.position.y = player.position.y;
		markerBtm.position.y = markerTop.position.y + spaceY;
	}

	if(markerBtm.position.y < player.position.y){
		markerBtm.position.y = player.position.y;
		markerTop.position.y = markerBtm.position.y - spaceY;
	}

	camera.position.y = markerTop.position.y;

	for(let enemy of enemies){
		if(enemy.overlap(player)){
			noLoop();
		}
	}

	drawSprites();

	camera.off();// Camera off

	// Score
	score = floor(groundY - player.position.y);
	fill(255);
	textSize(48);
	textAlign(CENTER, TOP);
	text(score, width / 2, 16);
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
