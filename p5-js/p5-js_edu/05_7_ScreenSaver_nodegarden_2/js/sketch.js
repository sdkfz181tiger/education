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
	colorMode(HSB);// HSB
	for(let i=0; i<50; i++){
		let x = random(0, width);
		let y = random(0, height);
		let h = random(0, 360);
		let spd = random(1, 2) * 0.2;
		let deg = random(0, 360);
		let spr = createSprite(x, y, 8, 8);
		spr.shapeColor = color(h, 100, 100);
		spr.setSpeed(spd, deg);
		sprs.push(spr);
	}
}

function draw(){
	console.log("draw!!");
	background(0, 0, 0);

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
	colorMode(RGB);// RGB
	for(let i=0; i<sprs.length; i++){
		for(let j=i; j<sprs.length; j++){
			let fromX = sprs[i].position.x;
			let fromY = sprs[i].position.y;
			let toX   = sprs[j].position.x;
			let toY   = sprs[j].position.y;
			let distX = toX - fromX;
			let distY = toY - fromY;
			let distance = Math.sqrt(distX*distX+distY*distY);
			if(100 < distance) continue;
			stroke(255 - distance*1.5);
			line(fromX, fromY, toX, toY);
		}
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