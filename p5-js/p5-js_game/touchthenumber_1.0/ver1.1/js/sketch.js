console.log("Hello p5.js!!");

const mRows   = 5;
const mCols   = 5;
const pWidth  = 50;
const pHeight = 60;

let images;
let index;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(64);
	textFont(font);

	// Images
	images = [];
	for(let i=0; i<25; i++){
		let image = loadImage("assets/card" + i + ".png");
		images.push(image);
	}
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

	// Offset
	let startX = width  / 2 - pWidth  / 2 * mCols + pWidth  / 2;
	let startY = height / 2 - pHeight / 2 * mRows + pHeight / 2;

	// Cards
	let cards = [];
	for(let i=0; i<mRows*mCols; i++){
		let card = createSprite(0, 0, pWidth, pHeight);
		card.addImage(images[i]);
		card.tag = i;// Tagを付ける
		card.onMousePressed = (e)=>{
			judge(e);
		};
		cards.push(card);
	}

	// Shuffle
	let shuffles = shuffle(cards);
	for(let i=0; i<shuffles.length; i++){
		shuffles[i].position.x = startX + pWidth * (i % mCols);
		shuffles[i].position.y = startY + pHeight * Math.floor(i / mCols);
	}

	// Default
	index = 0;
}

// 連続処理
function draw(){
	//console.log("draw");
	background(0);

	// Draw
	drawSprites();
}

function judge(e){
	if(index == e.tag){
		console.log("Success!!");
		index++;
		e.visible = false;
	}else{
		console.log("Failed!!");
	}
}