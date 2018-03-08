console.log("Hello p5.js!!");

//==========
// p5.js

let sManager;

let files = [
	"sc_01.png", "sc_02.png"
];

let imgObj = new Object();

let cheff;
let pigs;

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
		pigs = [];
		let padding = 25;
		let rows = 5;
		let cols = 11;
		for(let r=0; r<rows; r++){
			for(let c=0; c<cols; c++){
				let pig = createPig();
				pig.position.x = width * 0.5 - cols * padding * 0.5 + padding * (c + 0.5);
				pig.position.y = height * 0.1 + padding * r;
				pigs.push(pig);
			}
		}
	}

	this.draw = function(){
		background(200, 200, 200);
		drawSprites();
	}

	this.mousePressed = function(){
		cheff.position.x = mouseX;
		cheff.position.y = mouseY;
		// for(let i=0; i<boids.length; i++){
		// 	boids[i].toggle();
		// }
	}
}