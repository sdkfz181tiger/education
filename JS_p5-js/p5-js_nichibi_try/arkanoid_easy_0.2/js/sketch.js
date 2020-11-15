
let player; // プレイヤー
let ball;   // ボール
let wTop;   // 壁(上)
let wLeft;  // 壁(左)
let wRight; // 壁(右)
let wBottom;// 壁(下)

let b01,b02,b03,b04;// ブロック

function setup() {
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	// プレイヤー
	player = createSprite(width/2, height-60, 60, 16);
	player.shapeColor = color(255, 255, 255);
	player.immovable = true;
	
	// スプライトを作る(x, y, w, h)
	ball = createSprite(width/2, height/2, 16, 16);
	ball.shapeColor = color(255, 255, 255);

	// ランダムで移動
	let deg = random(360);
	ball.setSpeed(10, 330);
	
	// 壁(上)
	wTop = createSprite(width/2, 0, width, 16);
	wTop.immovable = true;// 動かないモードtrue
	
	// 壁(左)
	wLeft = createSprite(0, height/2, 16, height);
	wLeft.immovable = true;// 動かないモードtrue
	
	// 壁(右)
	wRight = createSprite(width, height/2, 16, height);
	wRight.immovable = true;// 動かないモードtrue
	
	// 壁(上)
	wBottom = createSprite(width/2, height, width, 16);
	wBottom.immovable = true;// 動かないモードtrue

	// ブロック
	b01 = createSprite(90, 100, 99, 15);
	b01.shapeColor = color(255, 255, 255);
	b01.immovable = true;// 動かないモードtrue

	b02 = createSprite(190, 100, 99, 15);
	b02.shapeColor = color(255, 255, 255);
	b02.immovable = true;// 動かないモードtrue

	b03 = createSprite(290, 100, 99, 15);
	b03.shapeColor = color(255, 255, 255);
	b03.immovable = true;// 動かないモードtrue

	b04 = createSprite(390, 100, 99, 15);
	b04.shapeColor = color(255, 255, 255);
	b04.immovable = true;// 動かないモードtrue
}

function draw() {
	background(33);

	// もし、LEFTキーが押されていたら
	if(keyIsDown(LEFT_ARROW)){
		player.position.x -= 4;
	}

	// もし、RIGHTキーが押されていたら
	if(keyIsDown(RIGHT_ARROW)){
		player.position.x += 4;
	}
	
	// 跳ね返り
	ball.bounce(player); // ボール x プレイヤー
	ball.bounce(wTop);   // ボール x 壁(上)
	ball.bounce(wLeft);  // ボール x 壁(左)
	ball.bounce(wRight); // ボール x 壁(右)
	ball.bounce(wBottom);// ボール x 壁(下)

	// ボール x ブロック
	if(ball.bounce(b01)){
		b01.position.x = -100;
		b01.position.y = -100;
	}

	if(ball.bounce(b02)){
		b02.position.x = -100;
		b02.position.y = -100;	
	}

	if(ball.bounce(b03)){
		b03.position.x = -100;
		b03.position.y = -100;
	}

	if(ball.bounce(b04)){
		b04.position.x = -100;
		b04.position.y = -100;
	}
	
	drawSprites();// これお約束!!
}