console.log("Hello p5.js!!");

const BLOCK_W = 4;
const BLOCK_H = 4;
const BLOCK_PAD = 1;

let mImg;

// 読み込み
function preload(){
	console.log("preload");
	mImg = loadImage("assets/mosaiq.png");
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	noLoop();
	background(0);

	drawMosaiq(width / 2, height / 2, mImg);
	drawSprites();
}

// 連続処理
function draw(){
	console.log("draw");
}

function drawMosaiq(bX, bY, img){

	let offset = 5;
	
	// Image
	let colors = [];
	for(let y=0; y<img.height; y+=offset){
		let lines = [];
		for(let x=0; x<img.width; x+=offset){
			lines.push(img.get(x, y));
		}
		colors.push(lines);
	}

	let cMax = colors[0].length;
	let rMax = colors.length;

	// Blocks
	bX -= (BLOCK_W+BLOCK_PAD)*(cMax-1)*0.5;
	bY -= (BLOCK_H+BLOCK_PAD)*(rMax-1)*0.5;
	for(let r=0; r<rMax; r++){
		for(let c=0; c<cMax; c++){
			if(colors[r][c][3] != 0){
				let block = createSprite(
					(BLOCK_W+BLOCK_PAD)*c + bX, (BLOCK_H+BLOCK_PAD)*r + bY, BLOCK_W, BLOCK_H);
				block.shapeColor = colors[r][c];
			}
		}
	}
}