
let wTop, wBottom, wLeft, wRight;

let iBall, iCard;
let iReimu, iMarisa, iYoumu, iChiruno, iSanae;

let pReimu, pBall;
let pCards = [];

function preload(){
	iReimu   = loadImage("assets/y_reimu_x2.png");
	iBall    = loadImage("assets/y_ball_x2.png");
	iCard    = loadImage("assets/y_card_x2.png");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// 壁
	wTop = createSprite(width/2, 0, width, 16);
	wTop.immovable = true;

	wBottom = createSprite(width/2, height, width, 16);
	wBottom.immovable = true;

	wLeft = createSprite(0, height/2, 16, height);
	wLeft.immovable = true;

	wRight = createSprite(width, height/2, 16, height);
	wRight.immovable = true;

	// れいむ配置
	pReimu = createSprite(width/2, height-40, 60, 16);
	pReimu.addImage(iReimu);// 画像
	pReimu.scale = 0.5;
	pReimu.immovable = true;

	// ボール
	pBall = createSprite(width/2, height-55, 30, 30);
	pBall.addImage(iBall);
	pBall.scale = 0.5;
	pBall.setSpeed(8, random(60, 120));

	// カードを配置
	let rows = 2;
	let cols = 5;
	let pad  = 64;
	let sX = width / 2 - (cols-1) * pad / 2;
	let sY = height / 2 - rows * pad / 2;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = sX + c * pad;
			let y = sY + r * pad;
			pCard = createSprite(x, y, 10, 10);
			pCard.addImage(iCard);
			pCard.scale = 0.5;
			pCard.immovable = true;
			pCards.push(pCard);
		}
	}
}

function draw(){
	background(33);

	fill(200);
	rect(0, 0, width, height);

	// ボール x 壁
	pBall.bounce(wTop);
	pBall.bounce(wBottom);
	pBall.bounce(wLeft);
	pBall.bounce(wRight);

	// ボール x れいむ
	if(pBall.bounce(pReimu)){
		let spd = pBall.getSpeed();
		if(keyIsDown(LEFT_ARROW)){
			pBall.setSpeed(spd, 225);
		}
		if(keyIsDown(RIGHT_ARROW)){
			pBall.setSpeed(spd, 315);
		}
	}

	// ボール x カード
	for(let i=0; i<pCards.length; i++){
		let pCard = pCards[i];
		if(pBall.bounce(pCard)){
			pCard.position.x = -100;
			pCard.position.y = -100;
		}
	}

	if(keyIsDown(LEFT_ARROW)){
		pReimu.position.x -= 8;
		pReimu.mirrorX(-1);// 左向き
	}

	if(keyIsDown(RIGHT_ARROW)){
		pReimu.position.x += 8;
		pReimu.mirrorX(1);// 右向き
	}
	
	drawSprites();// これお約束!!
}