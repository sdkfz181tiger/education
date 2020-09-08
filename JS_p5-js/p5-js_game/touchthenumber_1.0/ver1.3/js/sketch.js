console.log("Hello p5.js!!");

const R_TOTAL = 5;
const C_TOTAL = 5;
const P_ROWS  = 64;
const P_COLS  = 54;

const C_WIDTH  = 48;
const C_HEIGHT = 58;

let erat  = null;
let cards = [];
let nums  = [];

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

	// Eratosthenes
	erat = new Eratosthenes();

	// Numbers
	for(let n=0; n<100; n++){
		nums.push(n);
	}
	nums = shuffle(nums);

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
				x, y, C_WIDTH, C_HEIGHT, nums[num]);
			if(erat.isExists(nums[num])){
				card.setHighlight();
			}else{
				card.setEnabled();
			}
			cards.push(card);
			num++;
		}
	}

	// Reset
	resetCards(30, 250);
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

function shuffle(arr){
	for(let d=arr.length-1; 0<d; d--){
		let rdm  = Math.floor(Math.random() * d);
		let tmp  = arr[rdm];
		arr[rdm] = arr[d];
		arr[d]   = tmp;
	}
	return arr;
}

function resetCards(times=10, interval=1000){
	if(times <= 0) return;
	// Shuffle
	nums = shuffle(nums);
	// Reset
	for(let i=0; i<cards.length; i++){
		cards[i].setNumber(nums[i]);
		if(erat.isExists(nums[i])){
			cards[i].setHighlight();
		}else{
			cards[i].setEnabled();
		}
	}
	// Timeout
	setTimeout(()=>{
		resetCards(times-1, interval);
	}, interval);
}