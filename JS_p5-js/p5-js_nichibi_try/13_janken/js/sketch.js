
let sndJan, sndPon;

//let janken = [];

let enemyIndex = 0;
let playerIndex = -1;
let enemy;

function preload(){

	sndJan = loadSound("sounds/v_jan.mp3");
	sndPon = loadSound("sounds/v_pon.mp3");

	let imGu = loadImage("assets/jk_gu_x3.png");
	let imCho = loadImage("assets/jk_cho_x3.png");
	let imPa = loadImage("assets/jk_pa_x3.png");
	//janken = [imGu, imCho, imPa];
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	frameRate(2);// Important!!
	background(33);

	enemy = createSprite(width/2, height/2);

	let btnGu = createSprite(width / 2-100, height-100);
	//btnGu.addImage(janken[0]);
	btnGu.scale = 0.5;
	btnGu.shapeColor = color(200, 33, 33);
	btnGu.width = 40;
	btnGu.height = 40;
	btnGu.onMousePressed = actionGu;

	let btnCho = createSprite(width / 2, height-100);
	//btnCho.addImage(janken[1]);
	btnCho.scale = 0.5;
	btnCho.shapeColor = color(200, 33, 33);
	btnCho.width = 40;
	btnCho.height = 40;
	btnCho.onMousePressed = actionChoki;

	let btnPa = createSprite(width / 2+100, height-100);
	//btnPa.addImage(janken[2]);
	btnPa.scale = 0.5;
	btnPa.shapeColor = color(200, 33, 33);
	btnPa.width = 40;
	btnPa.height = 40;
	btnPa.onMousePressed = actionPa;

	sndJan.play();
}

function draw(){

	fill(255);
	textSize(40);
	textAlign(CENTER, TOP);
	text("= じゃんけんゲーム =", width / 2, 20);

	//enemyIndex = floor(random(janken.length));
	// console.log(enemyIndex);
	// enemy.addImage(janken[enemyIndex]);

	if(!isLooping()){
		console.log(playerIndex + " vx " + enemyIndex);

		if(playerIndex == enemyIndex){
			text("= あいこ!! =", width * 0.5, height * 0.25);
		}

		if(playerIndex == 0 && enemyIndex == 1){
			text("= 勝ち!! =", width * 0.5, height * 0.25);
		}

		if(playerIndex == 1 && enemyIndex == 2){
			text("= 勝ち!! =", width * 0.5, height * 0.25);
		}

		if(playerIndex == 2 && enemyIndex == 0){
			text("= 勝ち!! =", width * 0.5, height * 0.25);
		}

		if(playerIndex == 0 && enemyIndex == 2){
			text("= 負け!! =", width * 0.5, height * 0.25);
		}

		if(playerIndex == 1 && enemyIndex == 0){
			text("= 負け!! =", width * 0.5, height * 0.25);
		}

		if(playerIndex == 2 && enemyIndex == 1){
			text("= 負け!! =", width * 0.5, height * 0.25);
		}

		sndPon.play();
	}

	drawSprites();
}

function actionGu(){
	console.log("グー!!");
	playerIndex = 0;
	noLoop();
}

function actionChoki(){
	console.log("チョキ!!");
	playerIndex = 1;
	noLoop();
}

function actionPa(){
	console.log("パー!!");
	playerIndex = 2;
	noLoop();
}

function drawText(str){
	textSize(24);
	textAlign(CENTER, CENTER);
	text(str, width / 2, height);
}