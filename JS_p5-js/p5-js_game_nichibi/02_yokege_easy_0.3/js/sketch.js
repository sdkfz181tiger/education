
let score;

let iReimu, iMarisa, iYoumu, iChiruno, iSanae;

let pReimu, pMarisa, pYoumu, pChiruno, pSanae;

let pArray;

function preload(){
	iReimu   = loadImage("assets/y_reimu_x2.png");
	iMarisa  = loadImage("assets/y_marisa_x2.png");
	iYoumu   = loadImage("assets/y_youmu_x2.png");
	iChiruno = loadImage("assets/y_chiruno_x2.png");
	iSanae   = loadImage("assets/y_sanae_x2.png");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// スコア初期化
	score = 0;

	// れいむ配置
	pReimu = createSprite(width/2, height/2, 16, 16);
	pReimu.addImage(iReimu);// 画像
	pReimu.scale = 0.5;
	pReimu.immovable = true;

	// まりさ配列
	pArray = [];
	setInterval(createMarisa, 1000);
}

function draw(){
	background(200);

	fill(33);
	noStroke();

	let str = "SCORE:" + score;
	textSize(16);
	textAlign(CENTER);
	text(str, width/2, 20);

	score++;

	// 左キー
	if(keyIsDown(LEFT_ARROW)){
		pReimu.position.x -= 4;
		pReimu.mirrorX(-1);// 左向き
	}

	// 右キー
	if(keyIsDown(RIGHT_ARROW)){
		pReimu.position.x += 4;
		pReimu.mirrorX(1);// 右向き
	}

	// 上キー
	if(keyIsDown(UP_ARROW)){
		pReimu.position.y -= 4;
	}

	// 下キー
	if(keyIsDown(DOWN_ARROW)){
		pReimu.position.y += 4;
	}

	for(let i=0; i<pArray.length; i++){
		let pMarisa = pArray[i];

		// まりさ画面上判定
		if(pMarisa.position.y < 0){
			pMarisa.position.y = height;// 画面の下へ
			let spd = random(2, 5);// 速度ランダム
			let deg = random(360);// 角度ランダム
			pMarisa.setSpeed(spd, deg);
		}

		// まりさ画面下判定
		if(pMarisa.position.y > height){
			pMarisa.position.y = 0;// 画面の上へ
			let spd = random(2, 5);// 速度ランダム
			let deg = random(360);// 角度ランダム
			pMarisa.setSpeed(spd, deg);
		}

		// まりさ画面左判定
		if(pMarisa.position.x < 0){
			pMarisa.position.x = width;// 画面の右へ
			let spd = random(2, 5);// 速度ランダム
			let deg = random(360);// 角度ランダム
			pMarisa.setSpeed(spd, deg);
		}

		// まりさ画面右判定
		if(pMarisa.position.x > width){
			pMarisa.position.x = 0;// 画面の左へ
			let spd = random(2, 5);// 速度ランダム
			let deg = random(360);// 角度ランダム
			pMarisa.setSpeed(spd, deg);
		}

		// まりさがれいむと衝突していたら...
		if(pMarisa.bounce(pReimu)){
			text("痛いんだぜ!!", pReimu.position.x, pReimu.position.y-24);
			noLoop();
		}
	}
	
	drawSprites();// これお約束!!
}

function createMarisa(){
	// まりさ配置
	let pMarisa = createSprite(0, 0, 16, 16);
	pMarisa.addImage(iMarisa);// 画像
	pMarisa.scale = random(0.5, 0.8);
	pMarisa.setSpeed(2, random(360));
	if(random() < 0.5){
		pMarisa.mirrorX(-1);// 左向き
	}
	pArray.push(pMarisa);
}