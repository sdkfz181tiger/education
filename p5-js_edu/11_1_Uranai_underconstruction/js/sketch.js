console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;

let msg;

let font;
let imgMahoujin;
let imgBoy;
let imgGirl;
let imgFly;

function preload(){
	console.log("preload!!");
	font = loadFont("./assets/misaki_gothic.ttf");
	imgMahoujin = loadImage("./assets/mahoujin.png");
	imgBoy = loadImage("./assets/k_boy.png");
	imgGirl = loadImage("./assets/k_girl.png");
	imgFly = loadImage("./assets/c_fly.png");
}

function setup(){
	console.log("setup!!");
	let canvas = createCanvas(480, 320);
	canvas.parent("my_canvas");
	frameRate(32);

	msg = "誕生日を入力するのだ!!";

	let iYear = createInput();
	iYear.parent("my_canvas");
	iYear.position(width*0.5 - iYear.width*0.5, 230);

	let iMonth = createInput();
	iMonth.parent("my_canvas");
	iMonth.position(width*0.5 - iMonth.width*0.5, 260);

	let iDay = createInput();
	iDay.parent("my_canvas");
	iDay.position(width*0.5 - iDay.width*0.5, 290);

	let mahoujin = createSprite(240, 160, 32, 32);
	mahoujin.addImage(imgMahoujin);

	let kids = createSprite(240, 140, 32, 32);
	kids.scale = 0.4;
	kids.addImage(imgGirl);

	kids.onMousePressed = function(){
		msg = "あなたの前世はハエです!!";
		kids.addImage(imgFly);
	}
}

function draw(){
	console.log("draw!!");
	background(33);

	fill(255);
	textFont(font);
	textSize(24);
	textAlign(CENTER);
	text(msg, 240, 30);

	// Sprites
	drawSprites();
}