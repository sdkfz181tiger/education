"use strict";

const palette = ["#D4E09B", "#F6F4D2", "#CBDFBD", "#F19C79", "#A44A3F"];

let se, iRei, iMari;
let player;
let bullets = [];
let enemies = [];

//==========
// p5.js

function preload() {
	// Assets
	se = loadSound("assets/se.mp3");
	iRei = loadImage("assets/y_reimu_x2.png");
	iMari = loadImage("assets/y_marisa_x2.png");
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	frameRate(24);

	// Player
	player = createPlayer(width / 2, height / 2, iRei, 0.5);
}

function draw(){
	background("#333333");

	outToRemove(bullets);
	outToOverlap(enemies);
	collideToRemove(enemies, bullets, se);

	if(collide(player, enemies)){
		noLoop();
	}

	drawSprites();
}

function keyPressed(){
	//console.log(keyCode);

	if(keyCode == 37) player.setSpeed(10, 180);
	if(keyCode == 38) player.setSpeed(10, 270);
	if(keyCode == 39) player.setSpeed(10, 0);
	if(keyCode == 40) player.setSpeed(10, 90);

	if(keyCode == 90){

		const spd = random(4, 8);
		const deg = random(360);
		createEnemy(enemies, 0, 0, spd, deg, iMari, 0.8);

		let x = player.position.x;
		let y = player.position.y;
		createBullet(bullets, x, y, 16, 270);
		console.log(enemies.length, bullets.length);
	}
}

function keyReleased(){
	if(keyCode == 90) return;
	player.setSpeed(0, 0);
}