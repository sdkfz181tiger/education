console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

let font = null;
let sprs = [];

function preload(){
	console.log("preload!!");
	font = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	frameRate(32);

	// Sprites
	for(let i=0; i<50; i++){
		let x = random(0, width);
		let y = random(0, height);
		let spr = createSprite(x, y, 8, 8);
		let spd = random(1, 3);
		let deg = random(0, 360);
		spr.setSpeed(spd, deg);
		sprs.push(spr);
	}
}

function draw(){
	console.log("draw!!");
	background(33, 33, 33);

	noFill();
	stroke(100);

	// Positions
	for(let spr of sprs){
		if(spr.position.x < 0){
			spr.position.x = width;
		}
		if(width < spr.position.x){
			spr.position.x = 0;
		}
		if(spr.position.y < 0){
			spr.position.y = height;
		}
		if(height < spr.position.y){
			spr.position.y = 0;
		}
	}

	// Lines
	for(let i=0; i<sprs.length-1; i++){
		let fromX = sprs[i].position.x;
		let fromY = sprs[i].position.y;
		let toX   = sprs[i+1].position.x;
		let toY   = sprs[i+1].position.y;
		line(fromX, fromY, toX, toY);
	}

	// Sprites
	drawSprites();

	fill(255);
	noStroke();

	// Clock
	let date = new Date();
	let hour = date.getHours();
	let min  = date.getMinutes();
	let sec  = date.getSeconds();

	let strHour = (hour < 10) ? "0"+hour:hour;
	let strMin  = (min  < 10) ? "0"+min:min;
	let strSec  = (sec  < 10) ? "0"+sec:sec;
	let str = strHour + ":" + strMin + ":" + strSec;
	textSize(64);
	textAlign(CENTER);
	textFont(font);
	text(str, 240, 180);
}