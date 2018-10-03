console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;
const F_RATE = 8;

let nums    = [0, 0, 0];
let images  = [];
let sprites = [];

let rollFlg = true;

let msg = "TAP TO STOP!!";

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("./assets/misaki_gothic.ttf");
	textFont(font);

	// Images
	for(let i=0; i<10; i++){
		let fName = "./assets/s" + i + ".png";
		let image = loadImage(fName);
		images.push(image);
	}
}

function setup(){
	createCanvas(DISP_W, DISP_H);
	frameRate(F_RATE);

	background(0, 0, 0);

	// Sprites
	let sprL = createSprite(180, 140, 32, 32);
	sprL.addImage(images[0]);
	sprites.push(sprL);

	let sprC = createSprite(240, 140, 32, 32);
	sprC.addImage(images[0]);
	sprites.push(sprC);

	let sprR = createSprite(300, 140, 32, 32);
	sprR.addImage(images[0]);
	sprites.push(sprR);
}

function draw(){
	background(0, 0, 0);

	// Roll
	if(rollFlg == true){
		for(let i=0; i<nums.length; i++){
			let rdm = getRandom(0, images.length-1);
			nums[i] = rdm;
			sprites[i].addImage(images[rdm]);
		}
	}

	// Sprites
	drawSprites();

	// Text
	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(msg, 240, 240);
}

function mousePressed(){

	// Toggle
	if(rollFlg == true){
		rollFlg = false;
		judge();
	}else{
		rollFlg = true;
	}
}

// Random
function getRandom(min, max){
	let rdm = min + Math.floor(Math.random() * (max-min+1));
	return rdm;
}

function judge(){
	if(nums[0] == nums[1] && nums[0] == nums[2]){
		msg = "ATARI!! (^o^ )";
	}else{
		msg = "HAZURE!! (*_*;)";
	}
}