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

	let deg = -90;// 角度
	let num = 5;  // 総数
	let pad = random(5, 10); // 間隔
	deg -= pad * (num-1) * 0.5;
	for(let i=0; i<num; i++){
		let x = width * 0.5;
		let y = height * 0.9;
		let speed = random(2, 3);
		let bullet = createSprite(x, y, 8, 8);
		bullet.debug = true;// Debug
		bullet.shapeColor = color(255);
		bullet.setSpeed(speed, deg + pad * i);
		bullets.push(bullet);
	}

	setTimeout(shot, 1000);
}

function isOutside(position){
	if(position.x < 0)     return true;
	if(width < position.x) return true;
	if(position.y < 0)     return true;
	if(width < position.y) return true;
	return false;
}