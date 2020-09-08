console.log("Hello p5.js!!");

let stgIndex = 0;
let stgLevel = [
	{cols: 2, rows: 2, size: 128, corner: 10},
	{cols: 4, rows: 4, size: 64, corner: 8},
	{cols: 6, rows: 6, size: 42.5, corner: 6},
	{cols: 8, rows: 8, size: 32, corner: 4},
	{cols: 10, rows: 8, size: 32, corner: 4}
];

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

	rows   = stgLevel[stgIndex].rows;
	cols   = stgLevel[stgIndex].cols;
	size   = stgLevel[stgIndex].size;
	corner = stgLevel[stgIndex].corner;

	index = floor(random(0, cols * rows));
	startX = width * 0.5  - (size*cols) * 0.5;
	startY = height * 0.5 - (size*rows) * 0.5;

	let rdm     = floor(random(0, 360));
	let colorOK = color(rdm, 100, 100);
	let colorNG = color(rdm, 60, 60);

	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let i = r*cols + c;
			if(i == index){
				fill(colorOK);
			}else{
				fill(colorNG);
			}
			square(startX+size*c, startY+size*r, size-2, corner);
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
		if(score % 3 == 0) stgIndex++;
		if(stgLevel.length-1 < stgIndex) stgIndex = 0;
		sndOK.play();
		tiles();
	}
}