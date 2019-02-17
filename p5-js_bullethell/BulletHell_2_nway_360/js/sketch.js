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

	//shot1_1();
	shot1_2();
	//shot2_1();
	//shot2_2();
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

function shot1_1(){

	let deg = -100;
	for(let i=0; i<3; i++){
		let x = width * 0.5;
		let y = height * 0.9;
		let bullet = createSprite(x, y, 8, 8);
		bullet.debug = true;// Debug
		bullet.shapeColor = color(255);
		bullet.setSpeed(5, deg + 10 * i);
		bullets.push(bullet);
	}

	setTimeout(shot1_1, 250);
}

function shot1_2(){

	let deg = -45;// 角度
	let num = 5;  // 総数
	let pad = 10; // 間隔
	deg -= pad * (num-1) * 0.5;
	for(let i=0; i<num; i++){
		let x = width * 0.5;
		let y = height * 0.9;
		let bullet = createSprite(x, y, 8, 8);
		bullet.debug = true;// Debug
		bullet.shapeColor = color(255);
		bullet.setSpeed(5, deg + pad * i);
		bullets.push(bullet);
	}

	setTimeout(shot1_2, 250);
}

function shot2_1(){

	for(let i=0; i<10; i++){
		let x = width * 0.5;
		let y = height * 0.5;
		let bullet = createSprite(x, y, 8, 8);
		bullet.debug = true;// Debug
		bullet.shapeColor = color(255);
		bullet.setSpeed(5, 36 * i);
		bullets.push(bullet);
	}

	setTimeout(shot2_1, 250);
}

function shot2_2(){

	let num = 20;       // 総数
	let pad = 360 / num;// 間隔
	for(let i=0; i<num; i++){
		let x = width * 0.5;
		let y = height * 0.5;
		let bullet = createSprite(x, y, 8, 8);
		bullet.debug = true;// Debug
		bullet.shapeColor = color(255);
		bullet.setSpeed(5, pad * i);
		bullets.push(bullet);
	}

	setTimeout(shot2_2, 250);
}

function isOutside(position){
	if(position.x < 0)     return true;
	if(width < position.x) return true;
	if(position.y < 0)     return true;
	if(width < position.y) return true;
	return false;
}