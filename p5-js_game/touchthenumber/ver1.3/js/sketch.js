console.log("Hello p5.js!!");

const R_TOTAL = 5;
const C_TOTAL = 8;
const P_ROWS  = 64;
const P_COLS  = 54;

const C_WIDTH  = 48;
const C_HEIGHT = 58;

let cards = [];
let erat  = null;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(42);
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	angleMode(DEGREES);

	noStroke();
	fill(255, 255, 255);

	let nums = [];
	let total = R_TOTAL * C_TOTAL;
	for(let n=0; n<total; n++){
		nums.push(n);
	}

	for(let d=nums.length-1; 0<d; d--){
		let rdm = Math.floor(Math.random() * d);
		let tmp = nums[rdm];
		nums[rdm] = nums[d];
		nums[d]   = tmp;
	}

	let num = 0;

	let centerX = width * 0.5;
	let startX  = (P_COLS - C_WIDTH) * 0.5 - (C_TOTAL * P_COLS * 0.5);
	let centerY = height * 0.5;
	let startY  = (P_ROWS - C_HEIGHT) * 0.5 - (R_TOTAL * P_ROWS * 0.5);

	for(let r=0; r<R_TOTAL; r++){
		for(let c=0; c<C_TOTAL; c++){
			// Card
			let x = P_COLS * c + centerX + startX;
			let y = P_ROWS * r + centerY + startY;
			let card = new Card(
				x, y, C_WIDTH, C_HEIGHT, nums[num++]);
			cards.push(card);
		}
	}

	// Eratosthenes
	erat = new Eratosthenes();
}

function draw(){
	//console.log("draw");
	background(0);

	// Draw
	for(let i=0; i<cards.length; i++){
		cards[i].draw();
	}
}

function mousePressed(){

	// MousePressed
	for(let i=0; i<cards.length; i++){
		if(cards[i].isInside(mouseX, mouseY)){
			console.log("Card:" + cards[i].getNumber());
			if(erat.isExists(cards[i].getNumber())){
				console.log("Prime number!!");
				cards[i].setDisabled();
			}
		}
	}
}