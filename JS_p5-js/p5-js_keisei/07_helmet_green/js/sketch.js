
const PAD_X = 20;

let iBkg, iNinja, iGuide, iGameOver;
let iLeftOpen, iRightOpen, iRightClose;
let iItems = [];
let iPlayers = [];

let sItems = [];
let sPlayers = [];
let index = 0;

let dLeft, dRight, sPlayerDead;

function preload(){
	// Image
	iBkg = loadImage("./assets/n_back.png");
	iNinja = loadImage("./assets/n_ninja.png");
	iGuide = loadImage("./assets/n_guide.png");
	iGameOver = loadImage("./assets/n_gameover.png");
	iLeftOpen = loadImage("./assets/d_left_open.png");
	iRightOpen = loadImage("./assets/d_right_open.png");
	iRightClose = loadImage("./assets/d_right_close.png");

	iItems = [];
	for(let i=1; i<=5; i++){
		let img = loadImage("./assets/n_item_" + i + ".png");
		iItems.push(img);
	}

	iPlayers = [];
	for(let i=1; i<=7; i++){
		let img = loadImage("./assets/n_player_" + i + ".png");
		iPlayers.push(img);
	}
	iPlayerDead = loadImage("./assets/n_player_dead.png");
}

function setup(){
	createCanvas(160, 120);
	angleMode(DEGREES);
	noSmooth();
	frameRate(8);
	background(33);
	// Background
	let bkg = createSprite(width/2, height/2);
	bkg.addImage(iBkg);
	// Ninja
	let ninja = createSprite(width-10, 20);
	ninja.addImage(iNinja);
	// Guide
	let guide = createSprite(width/2, height/2+18);
	guide.addImage(iGuide);
	// Door
	dLeft = createSprite(15, 65);
	dLeft.addImage(iLeftOpen);
	dRight = createSprite(width-25, 65);
	dRight.addImage(iRightOpen);
	// Items, Players
	setItems();
	setPlayers();
}

function setItems(){
	// Items
	const startX = width / 2 - PAD_X * (iItems.length-1) / 2;
	for(let i=0; i<iItems.length; i++){
		let x = startX + PAD_X * i;
		let y = random(height/2) * -1.0;
		let item = createSprite(x, y);
		item.addImage(iItems[i]);
		item.rotation = random(360);
		item.velocity.y = 2;
		sItems.push(item);
	}
}

function setPlayers(){
	// Players
	const startX = width / 2 - PAD_X * (iPlayers.length-1) / 2;
	for(let i=0; i<iPlayers.length; i++){
		let x = startX + PAD_X * i;
		let y = height / 2 + 18;
		let player = createSprite(x, y);
		player.addImage(iPlayers[i]);
		player.rotation = 0;
		player.visible = i == index;
		sPlayers.push(player);
	}
	sPlayerDead = createSprite(width/2, height/2+38);
	sPlayerDead.addImage(iPlayerDead);
}

function draw(){
	background(33);
	drawSprites();

	// Items
	for(let item of sItems){
		if(80 < item.position.y){
			item.position.y = random(height/2) * -1.0;
			item.rotation = random(360);
		}
	}
}

function mousePressed(){
	console.log("mousePressed");

	index++;
	if(sPlayers.length-1 < index) index = 0;
	for(let i=0; i<sPlayers.length; i++){
		sPlayers[i].visible = i == index;
	}
}

function keyPressed(){
	console.log(key);
	// if(keyCode == LEFT_ARROW){
	// }
}
