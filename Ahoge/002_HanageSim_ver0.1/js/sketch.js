
let iNose;
let sNose;

let hX, hY;
let hLen, hDeg;
let score;

function preload(){
	iNose = loadImage("assets/b_nose.png");
}

function setup(){
	createCanvas(480, 320);
	angleMode(DEGREES);
	frameRate(16);
	background(200);

	sNose = createSprite(width/2, 0, 32, 32);
	sNose.addImage(iNose);
	sNose.scale = 0.5;

	hX = width / 2 - 35;
	hY = 70;
	hLen = 4;
	hDeg = 90;

	score = 0;
}

function draw(){
	stepHanage();
	showScore();
	drawSprites();
}

function stepHanage(){
	noFill();
	stroke(33);
	strokeWeight(random(1,3));

	let x = hX + hLen * cos(hDeg);
	let y = hY + hLen * sin(hDeg);
	line(hX, hY, x, y);

	hX = x;
	hY = y;
	hLen = random(2, 6);
	hDeg += random(-20, 20);

	score += floor(hLen);

	if(hX<0 || width<hX || hY<0 || height<hY){
		noLoop();
	}
}

function showScore(){
	fill(33);
	noStroke();
	rect(0, 0, width, 24);

	fill(255);
	noStroke();
	textSize(20);

	textAlign(LEFT);
	text("鼻毛シミュレータ", 4, 20);

	textAlign(RIGHT);
	let str = score + "ミリメートル";
	text(str, width-4, 20);
}