console.log("Hello p5.js!!");

let sndBGM, sndTap;

function preload(){
	console.log("preload!!");
	sndBGM = loadSound("./assets/minuet_bach.mp3");
	sndTap = loadSound("./assets/tap.mp3");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	sndBGM.play();

	console.log(sndBGM);
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