console.log("Hello p5.js!!");

const cols = 4;
const rows = 4;
const size = 64;

let index  = 0;
let startX = 0;
let startY = 0;

let font   = null;
let sndOK  = null;
let score  = 0;

function preload(){
	// Font, Sound
	font = loadFont("./assets/misaki_gothic.ttf");
	sndOK = loadSound("./assets/se_ok.mp3");
}

function setup(){
	console.log("setup!!");

	createCanvas(480, 320);

	score = 0;
	tiles();
}

function tiles(){
	colorMode(HSB);
	background(0, 0, 0);
	noStroke();

	index = floor(random(0, cols * rows));
	startX = width * 0.5  - (size*cols) * 0.5;
	startY = height * 0.5 - (size*rows) * 0.5;

	let rdm     = floor(random(0, 360));
	let colorOK = color(rdm, 100-(score*2), 100);
	let colorNG = color(rdm, 60, 60);

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let i = r*cols + c;
			if(i == index){
				fill(colorOK);
			}else{
				fill(colorNG);
			}
			square(startX+size*c, startY+size*r, size-2, 10);
		}
	}

	colorMode(RGB);
	fill(255, 255, 255);
	textFont(font);
	textSize(64);
	textAlign(RIGHT);
	text(score, width-5, 60);
}

function mousePressed(){

	let x = size * (index%cols) + size*0.5;
	let y = size * floor(index/cols) + size*0.5;
	let colorIndex   = get(startX+x, startY+y);
	let colorPressed = get(mouseX, mouseY);

	let flg = true;
	for(let i=0; i<colorIndex.length; i++){
		if(colorIndex[i] != colorPressed[i]){
			flg = false;
			break;
		}
	}
	
	if(flg == true){
		score++;
		sndOK.play();
		tiles();
	}
}