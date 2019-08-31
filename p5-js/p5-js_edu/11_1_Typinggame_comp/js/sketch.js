console.log("Hello p5.js!!");

const START_Y = 30;
const END_Y   = 300;
const SPEED_Y = 0.5;

let strs = [
	"Raspberry Pi",
	"Nintendo Switch",
	"Good morning",
];

let font = null;
let score = 0;
let indS = indC = 0;
let textY   = START_Y;

function preload(){
	console.log("preload!!");
	font = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	fill(255);
	noStroke();
	textFont(font);// Font
}

function draw(){
	background(33);
	fill(255, 100, 100);
	rect(0, END_Y, width, 2);

	fill(255);
	textSize(18);
	textAlign(RIGHT);
	text("SCORE:" + score, width-8, 20);

	let str = strs[indS];
	let padding = 18;
	let sX = width * 0.5 - (str.length-1) * padding * 0.5; 
	let sY = textY;
	for(let i=0; i<str.length; i++){
		let x = sX + i * padding;
		let y = sY;
		let c = str.charAt(i);
		let color = (indC <= i) ? 255:100;
		fill(color);
		textSize(32);
		textAlign(CENTER);
		text(c, x, y);
		if(indC == i) text("*", x, y + 32);
	}

	textY += SPEED_Y;
	if(END_Y < textY){
		noLoop();// GameOver!!
	}
}

function keyTyped(){
	console.log("keyTyped:" + key);
	let answer = strs[indS].charAt(indC);
	if(answer.toLowerCase() == key || answer.toUpperCase() == key){
		nextChar();
	}
}

function nextChar(){
	indC++;
	if(strs[indS].charAt(indC) == " ") indC++;
	if(strs[indS].length <= indC){
		indC = 0;
		nextStr();
	}
}

function nextStr(){
	indS++;
	if(strs.length <= indS){
		indS = 0;
	}
	score += 10;    // Score
	textY = START_Y;// Reset
}