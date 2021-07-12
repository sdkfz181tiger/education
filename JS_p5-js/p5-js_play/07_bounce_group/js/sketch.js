
const DIR = "./assets/";

let ssDoku, anDoku;
let ssKino, anKino;

let dokus, kinos;

function preload(){
	ssDoku = loadSpriteSheet(DIR + "s_doku_x5.png", 60, 60, 5);
	anDoku = loadAnimation(ssDoku);
	ssKino = loadSpriteSheet(DIR + "s_kino_x5.png", 60, 60, 5);
	anKino = loadAnimation(ssKino);
}

function setup(){
	createCanvas(320, 320);
	noSmooth();
	frameRate(16);
	background(33);

	dokus = new Group();
	kinos = new Group();

	// Sprites
	for(let i=0; i<5; i++){
		let x = random(width);
		let y = random(height);
		let doku = createSprite(x, y);
		doku.addAnimation("dance", anDoku);
		doku.setCollider("circle", -2, 2, 30);
		doku.setSpeed(5, random(360));
		doku.debug = true;
		dokus.add(doku);
	}

	for(let i=0; i<2; i++){
		let x = random(width);
		let y = random(height);
		let kino = createSprite(x, y);
		kino.addAnimation("dance", anKino);
		kino.setCollider("circle", -2, 2, 30);
		kino.debug = true;
		kino.immovable = true;
		kinos.add(kino);
	}
}

function draw(){
	background(33);
	drawSprites();

	// Bounce
	dokus.bounce(kinos);

	// AllSprites
	for(let sprite of allSprites){
		if(sprite.position.x < 0){
			sprite.position.x = width;
		}
		if(width < sprite.position.x){
			sprite.position.x = 0;
		}
		if(sprite.position.y < 0){
			sprite.position.y = height;
		}
		if(height < sprite.position.y){
			sprite.position.y = 0;
		}
	}
}