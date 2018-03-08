console.log("Hello p5.js!!");

//==========
// p5.js

let sManager;

let files = [
	"sc_01.png", "sc_02.png"
];

let imgObj = new Object();

let cheff;
let boids, pigs;

let sUtterance = null;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textFont(font); textSize(32); fill(255);

	// Images
	for(file of files){
		imgObj[file] = loadImage("assets/" + file);
	}

	// SpeechSynthesis
	initSpeechSynthesis();
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(32);
	angleMode(DEGREES);
	rectMode(CENTER);
	fill(255, 255, 255);
	noStroke();

	// SceneManager
	sManager = new SceneManager();
	sManager.wire();
	sManager.showScene(SceneTitle);
}

//==========
// タイトル

function SceneTitle(){

	this.enter = function(){
		removeAllSprites();

		// Cheff
		cheff = createSprite(240, 160, 50, 50);
		cheff.addAnimation("run", 
			"assets/c_cheff_run_0.png", "assets/c_cheff_run_1.png",
			"assets/c_cheff_run_2.png", "assets/c_cheff_run_3.png",
			"assets/c_cheff_run_4.png", "assets/c_cheff_run_5.png");
		cheff.changeAnimation("run");

		// Boids
		boids = [];
		for(let i=0; i<30; i++){
			let x = random(0, width);
			let y = random(0, height);
			let dot = new Dot(x, y);
			dot.vX = random(-2, 2);
			dot.vY = random(-2, 2);
			boids.push(dot);
		}

		// Pigs
		pigs = [];
		for(let i=pigs.length; i<boids.length; i++){
			let pig = createSprite(300, 160, 50, 50);
			pig.addAnimation("run", 
				"assets/c_pig_run_0.png", "assets/c_pig_run_1.png",
				"assets/c_pig_run_2.png", "assets/c_pig_run_3.png",
				"assets/c_pig_run_4.png", "assets/c_pig_run_5.png");
			pig.changeAnimation("run");
			pig.position.x = boids[i].x;
			pig.position.y = boids[i].y;
			pig.scale = 0.7 + 0.3 * Math.random();
			pigs.push(pig);
		}
	}

	this.draw = function(){
		background(200, 200, 200);
		drawSprites();

		for(let i=0; i<boids.length; i++){
			// Boids
			calcPositions(i);
			calcPaddings(i);
			calcVectors(i);
			bounceWalls(i);
			
			// Draw
			boids[i].draw();

			// Pigs
			pigs[i].position.x = boids[i].x;
			pigs[i].position.y = boids[i].y;
			if(boids[i].vX < 0){
				pigs[i].mirrorX(-1);
			}else{
				pigs[i].mirrorX(+1);
			}
		}
	}

	this.mousePressed = function(){
		cheff.position.x = mouseX;
		cheff.position.y = mouseY;
		// for(let i=0; i<boids.length; i++){
		// 	boids[i].toggle();
		// }
	}
}