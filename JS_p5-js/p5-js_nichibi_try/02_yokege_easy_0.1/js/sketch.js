
let pReimu;// れいむ
let pMarisa;// まりさ

let iReimu, iMarisa;

function preload(){
	iReimu = loadImage("assets/y_reimu_x2.png");
	iMarisa = loadImage("assets/y_marisa_x2.png");
}

function setup() {
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

function draw() {
	background(33);

	fill(200, 200, 200);
	rect(0, 0, width, height);

	// もし、LEFTキーが押されていたら
	if(keyIsDown(LEFT_ARROW)){
		pReimu.position.x -= 4;
		pReimu.mirrorX(-1);// 左向き
	}

	// もし、RIGHTキーが押されていたら
	if(keyIsDown(RIGHT_ARROW)){
		pReimu.position.x += 4;
		pReimu.mirrorX(1);// 右向き
	}

	// もし、Upキーが押されていたら
	if(keyIsDown(UP_ARROW)){
		pReimu.position.y -= 4;
	}

	// もし、Downキーが押されていたら
	if(keyIsDown(DOWN_ARROW)){
		pReimu.position.y += 4;
	}

	// もし、画面の右端より大きかったら
	if(width < pReimu.position.x){
		pReimu.position.x = 0;
	}

	// もし、画面の左端より小さかったら
	if(pReimu.position.x < 0){
		pReimu.position.x = width;
	}

	// もし、衝突していたら
	if(pReimu.collide()){
		console.log("あたったんだぜ!!");
	}
	
	drawSprites();// これお約束!!
}