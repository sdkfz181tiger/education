
const DIR = "./assets/";

let ssTakara, anTakara;
let takaras;

function preload(){
	ssTakara = loadSpriteSheet(DIR + "s_takara_x5.png", 80, 90, 4);
	anTakara = loadAnimation(ssTakara);
}

function setup(){
	createCanvas(480, 320);
	noSmooth();
	frameRate(8);
	background(33);

	takaras = new Group();

	let arr = [1, 1, 1, 1, 1, 1, 1, 2, 3];
	for(let i=0; i<arr.length-1; i++){
		let rdm = floor(random(i+1, arr.length));
		let tmp = arr[i];
		arr[i] = arr[rdm];
		arr[rdm] = tmp;
	}

	let pad = 50;

	let startX = width / 2 - (arr.length-1) * pad / 2;
	let startY = height / 2;

	for(let i=0; i<arr.length; i++){

		let x = startX + i * pad;
		let takara = createSprite(x, startY);
		takara.addAnimation("open", anTakara);
		takara.animation.stop();
		takara.scale = 0.5;
		takaras.push(takara);

		takara.onMousePressed = (e)=>{
			e.animation.stop();
			e.animation.changeFrame(arr[i]);
		}
	}
}

function draw(){
	background(33);
	drawSprites();
}