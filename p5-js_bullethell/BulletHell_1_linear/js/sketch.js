"use strict"
//==========
// p5.js

console.log("Hello p5.js!!");

let bullets = [];

function preload(){
	// Font
	let font = loadFont("fonts/misaki_gothic.ttf");
	textFont(font);
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

	drawSprites();
}

function shot(){
	let x = width * 0.5;
	let y = height * 0.9;
	let bullet = createSprite(x, y, 8, 8);
	bullet.debug = true;// Debug
	bullet.shapeColor = color(255);
	bullet.setSpeed(20, -90);
	bullets.push(bullet);
	setTimeout(shot, 250);
}

function isOutside(position){
	if(position.x < 0)     return true;
	if(width < position.x) return true;
	if(position.y < 0)     return true;
	if(width < position.y) return true;
	return false;
}