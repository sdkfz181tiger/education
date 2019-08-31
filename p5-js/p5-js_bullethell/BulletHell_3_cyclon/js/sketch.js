"use strict"
//==========
// p5.js

console.log("Hello p5.js!!");

let bullets = [];
let deg = 0;
let img;

function preload(){
	// Font
	let font = loadFont("fonts/misaki_gothic.ttf");
	textFont(font);
	// Image
	img = loadImage("images/tanuki.png");
}

function setup(){
	createCanvas(480, 320);
	frameRate(32);
	shot();
}

function draw(){
	background(33);

	// Remove
	for(let i=bullets.length-1; 0<=i; i--){
		if(isOutside(bullets[i].position)){
			bullets[i].remove();
			bullets.splice(i, 1);
		}
	}

	// Degree(右回転)
	deg += 5;
	if(360 < deg) deg -= 360;

	// Degree(左回転)
	//deg -= 5;
	//if(deg < 0) deg += 360;

	drawSprites();
}

function shot(){

	let x = width * 0.5;
	let y = height * 0.5;
	let bullet = createSprite(x, y, 8, 8);
	bullet.addImage(img);
	bullet.debug = true;// Debug
	bullet.shapeColor = color(255);
	bullet.setSpeed(5, deg);
	bullets.push(bullet);

	setTimeout(shot, 100);
}

function isOutside(position){
	if(position.x < 0)     return true;
	if(width < position.x) return true;
	if(position.y < 0)     return true;
	if(width < position.y) return true;
	return false;
}