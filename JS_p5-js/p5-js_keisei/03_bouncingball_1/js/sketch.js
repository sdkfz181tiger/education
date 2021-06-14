
let player;
let enemies = [];
let score = 0;
let grdY = 0;

function preload(){
	loadAssets("assets/");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(32);
	noLoop();

	background(100);

	createBackground();

	grdY = getGroundY();

	player = createPlayer(width / 2, grdY - 16);

	createBanner(width / 2, height / 2);
	setTimeout(gameStart, 800);
	setInterval(createEnemy, 1000);
}

function draw(){
	background(100, 150, 250);

	if(player.position.x < 0) player.position.x = width;
	if(width < player.position.x) player.position.x = 0;

	for(let enemy of enemies){

		if(enemy.position.x < 0){
			enemy.position.x = width;
			enemy.hp -= 1;
		}
		if(width < enemy.position.x){
			enemy.position.x = 0;
			enemy.hp -= 1;
		}

		if(enemy.position.y < grdY){
			enemy.velocity.y += 0.4;
		}else{
			enemy.position.y = grdY;
			enemy.velocity.y *= -0.85;
		}

		if(enemy.hp <= 0){
			enemy.position.y = 0;
			enemy.velocity.y = 0;
			enemy.hp = ENEMY_HP;
		}
	}

	// Collide
	if(collideOthers(player, enemies)){
		gameOver();
	}

	drawSprites();

	score++;
	showScore(score);
}

function keyPressed(){
	if(!isLooping()) return;
	if(keyCode == 65){
		player.velocity.x = -5;
	}
	if(keyCode == 83){
		player.velocity.x = +5;
	}
}

function keyReleased(){
	if(!isLooping()) return;
	player.velocity.x = 0;
}

