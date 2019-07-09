console.log("Hello p5.js!!");

let imgA, imgB, imgC;

function preload(){
	console.log("preload!!");

	imgA = loadImage("./assets/a.png");
	imgB = loadImage("./assets/b.png");
	imgC = loadImage("./assets/c.png");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
}

function draw(){
	background(33);
	drawSprites();
}

function keyTyped(){
	console.log("keyTyped:" + key);

	if(key == "a"){
		setSprite(imgA);
		startSpeech("Apple");
	}
	if(key == "b"){
		setSprite(imgB);
		startSpeech("Banana");
	}
	if(key == "c"){
		setSprite(imgC);
		startSpeech("Cat");
	}
}

function setSprite(img){

	let x = random(50, width-50);
	let y = random(50, height-50);
	let spr = createSprite(x, y, 32, 32);
	spr.addImage(img);
	spr.scale = random(0.5, 1.4);
	spr.rotation = random(0, 360);
	spr.life = 96;
}