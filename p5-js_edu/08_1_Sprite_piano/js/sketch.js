console.log("Hello p5.js!!");

let snd1Do;
let snd1Re;
let snd1Mi;

let btn1Do;
let btn1Re;
let btn1Mi;

function preload(){
	snd1Do = loadSound("./assets/piano1_do.mp3");
	snd1Re = loadSound("./assets/piano1_re.mp3");
	snd1Mi = loadSound("./assets/piano1_mi.mp3");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	frameRate(6);

	// Do
	btn1Do = createSprite(210, 160, 28, 120);
	btn1Do.shapeColor = color(255);
	btn1Do.onMousePressed = function(){
		this.shapeColor = color(200);
		snd1Do.play();
	}
	btn1Do.onMouseReleased = function(){
		this.shapeColor = color(255);
	}

	// Re
	btn1Re = createSprite(240, 160, 28, 120);
	btn1Re.shapeColor = color(255);
	btn1Re.onMousePressed = function(){
		this.shapeColor = color(200);
		snd1Re.play();
	}
	btn1Re.onMouseReleased = function(){
		this.shapeColor = color(255);
	}

	// Mi
	btn1Mi = createSprite(270, 160, 28, 120);
	btn1Mi.shapeColor = color(255);
	btn1Mi.onMousePressed = function(){
		this.shapeColor = color(200);
		snd1Mi.play();
	}
	btn1Mi.onMouseReleased = function(){
		this.shapeColor = color(255);
	}
}

function draw(){
	console.log("draw!!");
	background(33, 33, 33);
	drawSprites();
}