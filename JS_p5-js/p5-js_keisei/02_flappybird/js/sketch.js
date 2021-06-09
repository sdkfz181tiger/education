
let player;

let topA, btmA;
let topB, btmB;

let score = 0;
let speed = 3;
let grdY = 0;

function preload(){
	loadAssets("assets/");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(24);
	noLoop();

	background(100);

	// 1-1, 背景を表示
	createBackground(speed);

	// 3-1, 地面の位置を取得
	grdY = getGroundY();

	// 4-1, トンネルAの表示
	topA = createTop(width, -50, speed, 180);
	btmA = createBtm(width, height+50);

	// 5-1, トンネルBの表示
	topB = createTop(width*1.5, -50, speed, 180);
	btmB = createBtm(width*1.5, height+50);

	// 3-2, プレイヤーの表示
	player = createPlayer(width / 2, height / 2);

	// 1-2, ゲーム開始、終了バナー
	createBanner(width / 2, height / 2);
}

function draw(){
	background(100, 150, 250);

	scrollBackground();

	// 3-3, プレイヤーの動き1
	if(player.position.y < grdY){
		player.velocity.y += 2;
		player.rotation = player.velocity.y * 3;
	}else{
		player.velocity.y = 0;
		player.position.y = grdY;
	}

	// 4-2, トンネルAの動き
	if(topA.position.x <= 0){
		topA.position.x = width;
		topA.position.y = random(-100, 100);
		score += 1;
	}
	btmA.position.x = topA.position.x;
	btmA.position.y = topA.position.y + topA.height + 100;

	// 5-2, トンネルBの動き
	if(topB.position.x <= 0){
		topB.position.x = width;
		topB.position.y = random(-100, 100);
		score += 1;
	}
	btmB.position.x = topB.position.x;
	btmB.position.y = topB.position.y + topB.height + 100;

	// 6, 衝突判定
	if(collideTunnels(player, topA, btmA)){
		gameOver();
	}

	drawSprites();
	showScore(score);
}

function mousePressed(){

	// Game
	gameStart();

	// 3-4, プレイヤーの動き2
	player.setSpeed(10, 270);
	seJump.play();
}