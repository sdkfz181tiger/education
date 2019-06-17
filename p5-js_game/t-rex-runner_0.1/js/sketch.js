console.log("Hello p5.js!!");

const GROUND_Y  = 280;
const GRAVITY_Y = 3;
const JUMP_Y    = -35;

let font = null;
let tRex = null;

function preload(){
	// Font
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(480, 320);
	background(200);
	frameRate(32);

	// T-rex
	tRex = createSprite(100, GRAVITY_Y, 32, 32);
	tRex.addAnimation("run",   "./assets/t_run_1.png",   "./assets/t_run_2.png");
	tRex.addAnimation("jump",  "./assets/t_jump_1.png",  "./assets/t_jump_2.png");
	tRex.addAnimation("stoop", "./assets/t_stoop_1.png", "./assets/t_stoop_2.png");
	tRex.addAnimation("dead",  "./assets/t_dead_1.png",  "./assets/t_dead_2.png");

	// Animation
	tRex.changeAnimation("run");

	// Jump
	tRex.jumpY = 0;
}

function draw(){
	console.log("draw!!");
	background(200);
	drawSprites();

	tRex.jumpY      += GRAVITY_Y;
	tRex.position.y += tRex.jumpY;
	if(GROUND_Y < tRex.position.y){
		tRex.jumpY = 0;
		tRex.position.y = GROUND_Y;
		tRex.changeAnimation("run");// Run
	}
}

function mousePressed(){
	console.log("mousePressed!!");

	if(tRex.jumpY != 0) return;
	tRex.jumpY = JUMP_Y;
	tRex.changeAnimation("jump");// Jump
}