
let player;
let bullets = [];
let enemies = [];
let score = 0;
let grdY = 0;

function preload(){
	loadAssets("assets/");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(16);
	noLoop();
	background(33);
	createBackground();

	grdY = getGroundY();

	player = createPlayer(width / 2, grdY - 16);
	createEnemy(random(width), 10);

	// Ready, Start
	gameReady();
	setTimeout(gameStart, 800);
}

function draw(){
	background(33);

	// Player
	if(player.position.x < 0) player.position.x = width;
	if(width < player.position.x) player.position.x = 0;

	// Enemies
	for(let e=enemies.length-1; 0<=e; e--){
		let enemy = enemies[e];
		// Bounce x
		if(enemy.position.x < enemy.width/2){
			enemy.position.x = enemy.width/2;
			enemy.velocity.x *= -1.0;
		}
		if(width - enemy.width/2 < enemy.position.x){
			enemy.position.x = width - enemy.width/2;
			enemy.velocity.x *= -1.0;
		}
		// Gravity
		if(enemy.position.y < grdY - enemy.height/2){
			enemy.velocity.y += 0.4;
		}else{
			enemy.position.y = grdY - enemy.height/2;
			enemy.velocity.y *= -0.95;
		}
		// Remove
		if(enemy.scale < 0.25){
			enemies.splice(e, 1);
			enemy.remove();
			continue;
		}
		// x Bullets
		for(let b=bullets.length-1; 0<=b; b--){
			let bullet = bullets[b];
			// Remove
			if(bullet.position.y < 50){
				bullets.splice(b, 1);
				bullet.remove();
				continue;
			}
			// x Bullet
			if(collideOther(bullet, enemy)){
				// Score
				score++;
				// Enemy
				enemy.setSpeed(random(4, 8), random(240, 300));
				enemy.scale *= 0.8;
				let eX = enemy.position.x;
				let eY = enemy.position.y;
				createEnemy(eX, eY, enemy.scale);
				// Remove
				bullets.splice(b, 1);
				bullet.remove();
				// Sound
				seDmg.play();
				continue;
			}
		}
		// x Player
		if(collideOther(player, enemy)){
			gameOver();
		}
	}

	drawSprites();
	showScore(score);
}

function keyPressed(){
	//console.log(keyCode);
	if(!isLooping()) return;
	if(keyCode == LEFT_ARROW){
		player.velocity.x = -5;
	}
	if(keyCode == RIGHT_ARROW){
		player.velocity.x = +5;
	}
	if(keyCode == 90){// Z
		let x = player.position.x;
		let y = player.position.y;
		createBullet(x, y);
	}
}

function keyReleased(){
	if(!isLooping()) return;
	if(keyCode == 90) return;
	player.velocity.x = 0;
}

