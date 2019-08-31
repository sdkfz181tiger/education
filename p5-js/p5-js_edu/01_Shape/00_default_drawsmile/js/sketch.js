//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

function setup(){
	createCanvas(480, 320);
	background(100, 100, 100);

	// 繰り返し処理
	// for(初期化; 繰り返し条件; 後処理){処理}
	for(let i=0; i<5; i++){
		let posX = 240 + 50 * i;
		let posY = 160 + 50 * i;
		// ニコニコマークを描く関数を使う
		drawSmile(posX, posY);
	}
}

// ニコニコマークを描く関数
function drawSmile(x, y){

	// 顔の輪郭
	noFill();
	stroke(255, 255, 255);
	strokeWeight(5);
	ellipse(x, y, 80, 80);

	// 左目
	fill(255, 255, 255);
	noStroke();
	ellipse(x-20, y-10, 10, 10);

	// 右目
	fill(255, 255, 255);
	noStroke();
	ellipse(x+20, y-10, 10, 10);

	// 口
	noFill();
	stroke(255, 255, 255);
	strokeWeight(5);
	angleMode(DEGREES);
	arc(x, y+10, 30, 30, 10, 170);
}