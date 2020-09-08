console.log("Hello p5.js!!");

const BLOCK_W = 4;
const BLOCK_H = 4;
const BLOCK_PAD = 1;

let mSnd;
let mImg;
let myFft;
let myBlocks;

// 読み込み
function preload(){
	console.log("preload");

	// データ読み込み
	mSnd = loadSound("assets/bgm1.mp3");
	mImg = loadImage("assets/mosaiq.png");
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);

	// Mosaiq
	myBlocks = createBlocks(width / 2, height / 2, mImg);

	// FFT, Sound
	myFft = new p5.FFT();
	if(mSnd.isPlaying()) mSnd.stop();
	mSnd.play();
}

// 連続処理
function draw(){
	console.log("draw");
	background(0);

	// データを少なくする
	let waveform = myFft.waveform();
	let offset = floor(waveform.length / myBlocks[0].length);
	let data = [];
	for(let i=0; i<waveform.length; i+=offset){
		data.push(waveform[i]);
	}
	drawVertex(data);
	drawMosaiq(data);
}

function drawMosaiq(data){

	let cMax = myBlocks[0].length;
	let rMax = myBlocks.length;

	// 全てのブロックを非表示にする
	for(let r=0; r<rMax; r++){
		for(let c=0; c<cMax; c++){
			myBlocks[r][c].visible = false;// Default
		}
	}

	// データに該当するスプライトだけ表示する
	for(var i=0; i<data.length; i++){
		var c = floor(map(i, 0, data.length-1, 0, cMax-1));
		var r = floor(map(data[i], -1, 1, 0, rMax-1));
		myBlocks[r][c].visible = true;
		let mid = floor(rMax / 2);
		if(r < mid){
			for(let i=r; i<mid; i++) myBlocks[i][c].visible = true;
		}else{
			for(let i=r; mid<i; i--) myBlocks[i][c].visible = true;
		}
	}

	drawSprites();
}

function drawVertex(data){

	stroke(100, 200, 100);
	strokeWeight(1);
	noFill();

	// データの値それぞれに線を引いていく
	beginShape();
	for(var i=0; i<data.length; i++){
		var posX = map(i, 0, data.length-1, 0, width);
		var posY = map(data[i], -1, 1, 0, height);
		vertex(posX, posY);
	}
	endShape();
}

function createBlocks(bX, bY, img){

	let offset = 5;
	
	// Colors
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
	let blocks = [];
	bX -= (BLOCK_W+BLOCK_PAD)*(cMax-1)*0.5;
	bY -= (BLOCK_H+BLOCK_PAD)*(rMax-1)*0.5;
	for(let r=0; r<rMax; r++){
		let lines = [];
		for(let c=0; c<cMax; c++){
			let block = createSprite(
				(BLOCK_W+BLOCK_PAD)*c + bX, (BLOCK_H+BLOCK_PAD)*r + bY, BLOCK_W, BLOCK_H);
			block.shapeColor = colors[r][c];
			block.visible = false;// Default
			lines.push(block);
		}
		blocks.push(lines);
	}
	return blocks;
}