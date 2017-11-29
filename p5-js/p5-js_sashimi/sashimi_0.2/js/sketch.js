console.log("Hello p5.js!!");

let sManager;

function preload(){

	// Font
	let font = loadFont("assets/misaki_gothic.ttf");
	textSize(32);
	textFont(font);
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	background(0);
	frameRate(16);
	angleMode(DEGREES);
	rectMode(CENTER);
	fill(255, 255, 255);
	noStroke();

	// SceneManager
	sManager = new SceneManager();
	sManager.addScene(Scene1);
	sManager.addScene(Scene2);
	sManager.addScene(Scene3);
	sManager.showNextScene();
}

function draw(){
	// SceneManager
	sManager.draw();
}

function mousePressed(){
	console.log("mousePressed");

	// SceneManager
	sManager.mousePressed();
}

function Scene1(){

	this.setup = function(){

	}

	this.draw = function(){
		background(200, 100, 100);
		textAlign(CENTER);
		text("Scene1", width*0.5, height*0.5);
	}

	this.mousePressed = function(){
		this.sceneManager.showNextScene();
	}
}

function Scene2(){

	this.setup = function(){

	}

	this.draw = function(){
		background(100, 200, 100);
		textAlign(CENTER);
		text("Scene2", width*0.5, height*0.5);
	}

	this.mousePressed = function(){
		this.sceneManager.showNextScene();
	}
}

function Scene3(){

	this.setup = function(){

	}

	this.draw = function(){
		background(100, 100, 200);
		textAlign(CENTER);
		text("Scene3", width*0.5, height*0.5);
	}

	this.mousePressed = function(){
		this.sceneManager.showNextScene();
	}
}