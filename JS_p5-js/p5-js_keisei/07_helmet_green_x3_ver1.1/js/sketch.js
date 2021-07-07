
const DIR = "./assets/";
const PAD_X = 60;
const FALL_Y = 30;

let fDigital;
let seLeft, seRight, seScore, seGameOver;
let iBkg, iNinja, iGuide, iGameOver, iDead;
let iLeftOpen, iRightOpen, iRightClose;
let iItems = [];
let iPlayers = [];

let sItems = [];
let sPlayers = [];
let index = 0;
let score = 0;
let doorFlg = false;
let deadFlg = false;

let dLeft, dRight;

function preload(){
	// Font
	fDigital    = loadFont(DIR + "PixelLcd7.ttf");
	// Sound
	seLeft      = loadSound(DIR + "se_left.mp3");
	seRight     = loadSound(DIR + "se_right.mp3");
	seScore     = loadSound(DIR + "se_score.mp3");
	seGameOver  = loadSound(DIR + "se_gameover.mp3");
	// Image
	iBkg        = loadImage(DIR + "n_back_x3.png");
	iNinja      = loadImage(DIR + "n_ninja_x3.png");
	iGuide      = loadImage(DIR + "n_guide_x3.png");
	iGameOver   = loadImage(DIR + "n_gameover_x3.png");
	iDead       = loadImage(DIR + "n_dead_x3.png");
	iLeftOpen   = loadImage(DIR + "d_left_open_x3.png");
	iRightOpen  = loadImage(DIR + "d_right_open_x3.png");
	iRightClose = loadImage(DIR + "d_right_close_x3.png");

	iItems = [];
	for(let i=1; i<=5; i++){
		let img = loadImage(DIR + "n_item_" + i + "_x3.png");
		iItems.push(img);
	}

	iPlayers = [];
	for(let i=1; i<=7; i++){
		let img = loadImage(DIR + "n_player_" + i + "_x3.png");
		iPlayers.push(img);
	}
}

function setup(){
	createCanvas(480, 360);
	angleMode(DEGREES);
	noSmooth();
	frameRate(8);
	background(33);
	// Font
	textFont(fDigital, 14);
	textAlign(LEFT, TOP);
	// Background
	let bkg = createSprite(width/2, height/2);
	bkg.addImage(iBkg);
	// Ninja
	let ninja = createSprite(width-30, 80);
	ninja.addImage(iNinja);
	// Guide
	let guide = createSprite(width/2, 230);
	guide.addImage(iGuide);
	// Door
	dLeft = createSprite(45, 200);
	dLeft.addImage(iLeftOpen);
	dRight = createSprite(width-74, 195);
	dRight.addImage("open", iRightOpen);
	dRight.addImage("close", iRightClose);
	// Items, Players
	setItems();
	setPlayers();
	actionDoor();
}

function setItems(){
	// Items
	const startX = width / 2 - PAD_X * (iItems.length-1) / 2;
	for(let i=0; i<iItems.length; i++){
		let x = startX + PAD_X * i;
		let y = random(1, 3) * -FALL_Y;
		let item = createSprite(x, y);
		item.addImage(iItems[i]);
		item.rotation = random(360);
		sItems.push(item);
	}
}

function setPlayers(){
	// Players
	const startX = width / 2 - PAD_X * (iPlayers.length-1) / 2;
	for(let i=0; i<iPlayers.length; i++){
		let x = startX + PAD_X * i;
		let y = 230;
		let player = createSprite(x, y);
		player.addImage(iPlayers[i]);
		player.visible = i == index;
		player.rotation = 0;
		sPlayers.push(player);
	}
}

function actionDoor(){
	// Toggle
	if(index < sPlayers.length-1){
		doorFlg = !doorFlg;
	}
	if(doorFlg){
		dRight.changeImage("open");
	}else{
		dRight.changeImage("close");
	}
	setTimeout(actionDoor, random(1, 3) * 1000);// Timeout
}

function draw(){
	background(33);
	drawSprites();
	showScore();
	// Dead
	if(deadFlg) {
		sPlayers[index].visible = !sPlayers[index].visible;
		return;
	}
	// Step
	let stepFlg = frameCount%3 == 0;
	// Items
	for(let item of sItems){
		const x = item.position.x;
		const y = item.position.y;
		// x Players
		if(sPlayers[index].overlapPoint(x, y)){
			gameOver();
			break;
		}
		// Step
		if(stepFlg) item.position.y += FALL_Y;
		if(220 < y){
			item.position.y = random(1, 3) * -FALL_Y;
			item.rotation = random(360);
			continue;
		}
	}
	// Players
	for(let i=0; i<sPlayers.length; i++){
		sPlayers[i].visible = (i == index) && !deadFlg;
	}
}

function showScore(){
	// How to play
	textAlign(CENTER, BOTTOM);
	textFont(fDigital, 24);
	fill(0, 66, 0);
	text("<- Left key | Right key ->", width/2, height - 5);
	// Score
	let digits = "";
	let length = score.toString().length;
	for(let i=0; i<length; i++) digits += "8";
	textAlign(LEFT, TOP);
	textFont(fDigital, 50);
	fill(120, 180, 120);
	text(digits, 5, 10);
	fill(0, 66, 0);
	text(score, 5, 10);
	// GameOver
	if(deadFlg){
		textAlign(CENTER, BOTTOM);
		textFont(fDigital, 36);
		fill(0, 66, 0);
		text("GAME OVER", width/2, height/2);
	}
}

function addScore(){
	index = 0;
	score++;
	seScore.play();// Sound
}

function gameOver(){
	deadFlg = true;
	seGameOver.play();// Sound

	setTimeout(()=>{
		sPlayers[index].visible = false;
		let x = sPlayers[index].position.x;
		let y = sPlayers[index].position.y + 70;
		let dead = createSprite(x, y);
		dead.addImage(iDead);
		noLoop();// Stop
	}, 1000);// Timeout
}

function keyPressed(){
	if(deadFlg) return;

	if(keyCode == LEFT_ARROW){
		goLeft();
		seLeft.play();// Sound
		return;
	}
	if(keyCode == RIGHT_ARROW){
		goRight();
		seRight.play();// Sound
		return;
	}
}

function goLeft(){
	const last = sPlayers.length-1;
	if(last <= index) return;
	// Left
	index--;
	if(index < 0) index = 0;
}

function goRight(){
	const last = sPlayers.length-1;
	if(last <= index) return;
	// Right
	if(index < last-1){
		index++;
		return;
	}
	if(doorFlg){
		index++;
		setTimeout(addScore, 500);// Timeout
		return;
	}
}
