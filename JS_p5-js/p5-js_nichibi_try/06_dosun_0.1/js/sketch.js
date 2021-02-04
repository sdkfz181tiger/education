'use strict';

let imReimu;
let imBkg, imGrd;
let imFoot;

let player;
let foot;

let score = 0;

function preload(){
	imReimu = loadImage("assets/y_reimu_x2.png");
	imBkg = loadImage("assets/fb_bkg_night_x2.png");
	imGrd = loadImage("assets/fb_grd_night_x2.png");
	imFoot = loadImage("assets/fb_foot_x2.png");
}

function setup(){
	createCanvas(320, 480);
	angleMode(DEGREES);
	frameRate(32);
	background(100);

	let bkg = createSprite(width/2, height/2, 32, 32);
	bkg.addImage(imBkg);

	let grd = createSprite(width/2, height, 32, 32);
	grd.addImage(imGrd);

	player = createSprite(width/2, height-64, 32, 32);
	player.addImage(imReimu);

	foot = createSprite(width/2, -height/2, 32, 32);
	foot.setSpeed(10, 90);
	foot.addImage(imFoot);
}

function draw(){
	background(100, 150, 250);

	drawSprites();

	fill(255);
	textSize(96);
	textAlign(CENTER, TOP);
	text(score, width / 2, 32);

	if(player.position.x - player.width/2 < 0){
		player.position.x = player.width/2;
	}

	if(width - player.width/2 < player.position.x){
		player.position.x = width - player.width/2;
	}

	if(0 < foot.velocity.y){
		if(height/2-64 < foot.position.y){
			foot.velocity.y *= -1;
			score++;
		}
	}

	if(foot.velocity.y < 0){
		if(foot.position.y < -height/2){
			foot.position.x = random(width);
			foot.velocity.y *= -1;
		}
	}

	if(player.overlap(foot)){
		//noLoop();
	}
}

function keyPressed(){

	if(keyCode == LEFT_ARROW){
		player.setSpeed(5, 180);
		player.mirrorX(-1);
	}

	if(keyCode == RIGHT_ARROW){
		player.setSpeed(5, 0);
		player.mirrorX(1);
	}
}

function keyReleased(){
	player.setSpeed(0, 0);
}