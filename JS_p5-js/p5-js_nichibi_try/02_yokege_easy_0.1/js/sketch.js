
let pReimu;// れいむ
let eMarisas;// まりさ達

let iReimu, iMarisa;

function preload(){
	iReimu = loadImage("assets/y_reimu_x2.png");
	iMarisa = loadImage("assets/y_marisa_x2.png");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// れいむ配置
	pReimu = createSprite(width/2, height-60, 60, 16);
	pReimu.addImage(iReimu);// 画像
	pReimu.immovable = true;

	// まりさ配置
	pMarisa = createSprite(width/2, 60, 60, 16);
	pMarisa.addImage(iMarisa);// 画像
	pMarisa.immovable = true;
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

	// もし、衝突していたら
	if(pReimu.collide(pMarisa)){
		console.log("あたったんだぜ!!");
	}
	
	drawSprites();// これお約束!!
}