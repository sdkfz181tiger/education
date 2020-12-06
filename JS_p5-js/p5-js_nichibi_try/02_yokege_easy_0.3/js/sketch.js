
let iReimu, iMarisa, iYoumu, iChiruno, iSanae;

let pReimu, pMarisa, pYoumu, pChiruno, pSanae;

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

	// れいむ配置
	pReimu = createSprite(width/2, height-60, 60, 16);
	pReimu.addImage(iReimu);// 画像
	pReimu.scale = 0.5;
	pReimu.immovable = true;

	// まりさ配置
	pMarisa = createSprite(width/2, 0, 60, 16);
	pMarisa.addImage(iMarisa);// 画像
	pMarisa.scale = 0.5;
	pMarisa.setSpeed(4, 90);

	// ようむ配置
	pYoumu = createSprite(width/2, 0, 60, 16);
	pYoumu.addImage(iYoumu);// 画像
	pYoumu.scale = 0.5;
	pYoumu.setSpeed(4, 90);
}

function draw(){
	background(33);

	fill(200, 200, 200);
	rect(0, 0, width, height);

	if(keyIsDown(LEFT_ARROW)){
		pReimu.position.x -= 4;
		pReimu.mirrorX(-1);// 左向き
	}

	if(keyIsDown(RIGHT_ARROW)){
		pReimu.position.x += 4;
		pReimu.mirrorX(1);// 右向き
	}

	if(width < pReimu.position.x){
		pReimu.position.x = 0;
	}

	if(pReimu.position.x < 0){
		pReimu.position.x = width;
	}

	// まりさと地面
	if(height < pMarisa.position.y || pMarisa.position.y < 0){
		pMarisa.position.x = Math.random() * width;
		pMarisa.position.y = 0;
		pMarisa.setSpeed(4, 90);
	}

	// まりさがれいむと衝突していたら...
	if(pMarisa.bounce(pReimu)){
		console.log("あたったんだぜ!!");
		//noLoop();
	}

	// ようむと地面
	if(height < pYoumu.position.y || pYoumu.position.y < 0){
		pYoumu.position.x = Math.random() * width;
		pYoumu.position.y = 0;
		pYoumu.setSpeed(4, 90);
	}

	// ようむがれいむと衝突していたら...
	if(pYoumu.bounce(pReimu)){
		console.log("あたったんだぜ!!");
		//noLoop();
	}
	
	drawSprites();// これお約束!!
}