console.log("Hello p5.js!!");

const mRows   = 4;
const mCols   = 4;
const pWidth  = 40;
const pHeight = 50;

const colors = [
	"red", "blue", "yellow", "green", "orange",
	"purple", "aqua", "lime", "brown", "pink"];

let sSprite;

let matrix;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(64);
	textFont(font);
}

// 初期化
function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	angleMode(DEGREES);
	rectMode(CENTER);

	fill(255, 255, 255);

	// Selected
	sSprite = createSprite(pWidth/2 + 5, height - pHeight/2 -5, pWidth, pHeight);
	sSprite.shapeColor = color("white");

	// Offset
	let startX = width  / 2 - pWidth  / 2 * mCols + pWidth  / 2;
	let startY = height / 2 - pHeight / 2 * mRows + pHeight / 2;

	// Grid
	matrix = [];
	for(let r=0; r<mRows; r++){
		let line = [];
		for(let c=0; c<mCols; c++){
			let x = startX + c * pWidth;
			let y = startY + r * pHeight;
			let pie = createSprite(x, y, pWidth, pHeight);
			let index = floor((r * mCols + c) / 2);
			pie.shapeColor = color(colors[index]);
			pie.onMousePressed = (e)=>{
				judge(e);
			};
			line.push(pie);
		}
		matrix.push(line);
	}
}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);

	// Draw
	drawSprites();
}

function judge(e){
	sSprite.shapeColor = e.shapeColor;
}