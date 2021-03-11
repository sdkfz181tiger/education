
let ssPlayer, anPlayer;
let ssEnemy, anEnemy;
let imCoin;

let player;
let myBox;

let invaders = [];

function preload(){
	ssPlayer = loadSpriteSheet("assets/s_shi_x2.png", 32, 32, 5);
	anPlayer = loadAnimation(ssPlayer);
	ssEnemy = loadSpriteSheet("assets/h_shi_x2.png", 32, 32, 5);
	anEnemy = loadAnimation(ssEnemy);
	imCoin = loadImage("assets/c_coin_x2.png");
}

function setup(){
	createCanvas(320, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	let rows = 2;
	let cols = 2;
	let p = 40;
	let sX = width / 2 - (cols-1) * p / 2;
	let sY = height / 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = sX + c * p;
			let y = sX + r * p;
			let invader = createSprite(x, y, 4, 4);
			invader.addAnimation("fly", anEnemy);
			invader.debug = true;
			invaders.push(invader);
		}
	}

	// Player
	player = createSprite(0, 0, 32, 32);
	player.position.x = width / 2;
	player.position.y = height - 60;
	player.addAnimation("fly", anPlayer);
	player.changeAnimation("fly");
	player.debug = true;

	// MyBox
	myBox = null;
}

function draw(){
	background(33);

	// MyBox
	if(myBox == null){
		for(i=0; i<invaders.length; i++){
			let invader = invaders[i];
			if(invader.overlap(player)){
				if(myBox == null){
					myBox = invader;
					myBox.oX = myBox.position.x - player.position.x;
					myBox.oY = myBox.position.y - player.position.y;
					myBox.position.x = player.position.x + myBox.oX;
				}
			}
		}
	}else{
		if(player.velocity.x < 0 && myBox.oX < 0){
			myBox.position.x = player.position.x + myBox.oX;
		}
	}

	drawSprites();

	camera.off();// Camera off
}

function keyPressed(){
	myBox = null;

	if(keyCode == UP_ARROW){
		player.setSpeed(4, 270);
	}

	if(keyCode == LEFT_ARROW){
		player.setSpeed(4, 180);
	}

	if(keyCode == RIGHT_ARROW){
		player.setSpeed(4, 0);
	}

	if(keyCode == DOWN_ARROW){
		player.setSpeed(4, 90);
	}
}

function keyReleased(){
	player.setSpeed(0, 0);
	if(myBox != null) myBox.setSpeed(0, 0);
}
