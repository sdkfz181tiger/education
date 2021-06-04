
let player;

let topA, btmA;
let topB, btmB;

let score = 0;
let speed = 3;
let grdY = 0;

function preload(){
	loadAssets();
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(24);
	noLoop();

	background(100);
	createBackground(speed);

	grdY = getGroundY();

	topA = createTop(width, -50, speed, 180);
	btmA = createBtm(width, height+50);

	topB = createTop(width*1.5, -50, speed, 180);
	btmB = createBtm(width*1.5, height+50);

	player = createPlayer(width / 2, height / 2);

	createInfo(width / 2, height / 2);
}

function draw(){
	background(100, 150, 250);

	scrollBackground();

	// Jump
	if(player.position.y < grdY){
		player.velocity.y += 2;
	}else{
		player.velocity.y = 0;
		player.position.y = grdY;
	}

	// Tunnel A
	if(topA.position.x <= 0){
		topA.position.x = width;
		topA.position.y = random(-100, 100);
		score += 1;
	}
	btmA.position.x = topA.position.x;
	btmA.position.y = topA.position.y + topA.height + 100;

	// Tunnel B
	if(topB.position.x <= 0){
		topB.position.x = width;
		topB.position.y = random(-100, 100);
		score += 1;
	}
	btmB.position.x = topB.position.x;
	btmB.position.y = topB.position.y + topB.height + 100;

	// Collision
	if(collideTunnels(player, topA, btmA)){
		gameOver();
	}

	drawSprites();
	showScore(score);
}

function mousePressed(){

	// Game
	gameStart();

	// Jump
	player.setSpeed(10, 270);
}