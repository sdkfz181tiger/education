console.log("Hello p5.js!!");

const DEG_TO_RAD  = Math.PI / 180;

let size = 10;
let rows;
let cols;

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	background(0);

	fill(200, 200, 200);
	stroke(255, 255, 255);
	strokeWeight(1.0);

	rows = height / size;
	cols = width / size;
}

// 連続処理
function draw(){
	console.log("draw");
	
	for(let r=0; r<rows; r++){
		beginShape(TRIANGLE_STRIP);
		for(let c=0; c<cols; c++){
			vertex(c*size, r*size);
			vertex(c*size, (r+1)*size);
		}
		endShape();
	}
}