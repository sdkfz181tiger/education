console.log("Hello p5.js!!");

const DISP_W     = 480;
const DISP_H     = 320;

const TICK_TIME  = 2000;

const GROUND_W   = 1200;
const GROUND_Y   = 280;
const GRAVITY_Y  = 4;
const JUMP_Y     = -35;
const SPEED_BASE = -10;
const SPEED_CAC  = -10;
const SPEED_PTR  = -14;

const CLOUDS   = ["./assets/g_cloud.png"];
const CACTUSES = [
	"./assets/ca_a_1.png", "./assets/ca_a_2.png", "./assets/ca_a_3.png",
	"./assets/ca_b_1.png", "./assets/ca_b_2.png", "./assets/ca_b_3.png"];
const PTERANOS = ["./assets/p_fly_1.png", "./assets/p_fly_2.png"];

let font   = null;
let tRex   = null;
let gSpr1  = null;
let gSpr2  = null;
let clouds = null;
let cacs   = null;
let ptrs   = null;

function preload(){
	// Font
	font  = loadFont("./assets/misaki_gothic.ttf");
}

function setup(){
	console.log("setup!!");
	createCanvas(DISP_W, DISP_H);
	frameRate(16);

	// GameStart
	gameStart();
} 

function draw(){
	//console.log("draw!!");
	background(150);
	drawGround();
	drawClouds();
	drawTRex();
	drawCacs();
	drawPtrs();
	drawSprites();
}

function drawGround(){
	// Ground
	gSpr1.position.x += SPEED_BASE;
	gSpr2.position.x += SPEED_BASE;
	if(gSpr1.position.x < -GROUND_W*0.5){
		let offsetX = gSpr2.getBoundingBox().right();
		gSpr1.position.x = offsetX + GROUND_W*0.5;
	}
	if(gSpr2.position.x < -GROUND_W*0.5){
		let offsetX = gSpr1.getBoundingBox().right();
		gSpr2.position.x = offsetX + GROUND_W*0.5;
	}
}

function drawClouds(){
	// Clouds
	for(let i=clouds.length-1; 0<=i; i--){
		let cloud = clouds[i] ;
		cloud.position.x += SPEED_BASE;
		// Remove
		if(cloud.position.x < 0){ 
			clouds.splice(i, 1);
			cloud.remove();
		}
	}
}

function drawTRex(){
	// Gravity
	let bottomY = tRex.getBoundingBox().bottom();
	if(tRex.velY < 0 || bottomY < GROUND_Y){
		tRex.velY       += GRAVITY_Y;
		tRex.position.y += tRex.velY;
	}
	bottomY = tRex.getBoundingBox().bottom();
	if(GROUND_Y < bottomY){
		tRex.velY = 0;
		tRex.position.y = GROUND_Y - tRex.getBoundingBox().extents.y * 0.5;
	}
}

function drawCacs(){
	// Cacs
	for(let i=cacs.length-1; 0<=i; i--){
		let cac = cacs[i] ;
		cac.position.x += SPEED_CAC;
		// Overlap
		if(tRex.overlap(cac)) gameOver();
		// Remove
		if(cac.position.x < 0){
			cacs.splice(i, 1);
			cac.remove();
		}
	}
}

function drawPtrs(){
	// Ptrs
	for(let i=ptrs.length-1; 0<=i; i--){
		let ptr = ptrs[i] ;
		ptr.position.x += SPEED_PTR;
		// Overlap
		if(tRex.overlap(ptr)) gameOver();
		// Remove
		if(ptr.position.x < 0){
			ptrs.splice(i, 1);
			ptr.remove();
		}
	}
}

function gameStart(){
	console.log("gameStart!!");

	// T-rex
	tRex = createSprite(100, GRAVITY_Y, 32, 32);
	tRex.addAnimation("run",   "./assets/t_run_1.png",   "./assets/t_run_2.png");
	tRex.addAnimation("jump",  "./assets/t_jump_1.png",  "./assets/t_jump_2.png");
	tRex.addAnimation("stoop", "./assets/t_stoop_1.png", "./assets/t_stoop_2.png");
	tRex.addAnimation("dead",  "./assets/t_dead_1.png",  "./assets/t_dead_2.png");
	tRex.velY = 0;// Velocity

	// Ground
	gSpr1 = createSprite(0, GROUND_Y-5, 32, 32);
	gSpr1.addImage(loadImage("./assets/g_ground.png"));
	gSpr2 = createSprite(GROUND_W, GROUND_Y-5, 32, 32);
	gSpr2.addImage(loadImage("./assets/g_ground.png"));

	// Clouds, Cacs, Ptrs
	clouds = [];
	cacs   = [];
	ptrs   = [];
	tickEnemies();
}

function gameOver(){
	console.log("gameOver!!");
	noLoop();
}

function tickEnemies(){
	console.log("tickEnemies!!");
	let rdm = floor(random(0, 10));
	for(let i=0; i<3; i++){
		// Clouds
		let index = floor(random(0, CLOUDS.length));
		let path = CLOUDS[index];
		clouds.push(createCloud(path));
	}

	// Cacs, Ptrs
	if(rdm < 8){
		// Cacs
		let index = floor(random(0, CACTUSES.length));
		let path = CACTUSES[index];
		cacs.push(createCac(path, DISP_W, 265));
	}

	if(rdm < 3){
		// Ptrs
		let x = DISP_W;
		let y = floor(random(50, 220));
		ptrs.push(createPtr(x, y));
	}
	setTimeout(()=>{tickEnemies();}, TICK_TIME);
}

function createCloud(path){
	let x = DISP_W + random(0, 200);
	let y = floor(random(0, 160));
	let cloud = createSprite(x, y, 32, 32);
	cloud.addImage(loadImage(path));
	return cloud;
}

function createCac(path, x=DISP_W, y=160){
	let cac = createSprite(x, y, 32, 32);
	cac.addImage(loadImage(path));
	return cac;
}

function createPtr(x, y){
	let ptr = createSprite(x, y, 32, 32);
	ptr.addAnimation("fly", PTERANOS[0], PTERANOS[1]);
	return ptr;
}

function keyPressed(){
	//console.log("keyPressed!!");

	if(keyCode == 32){// Space
		if(tRex.velY != 0) return;
		tRex.velY = JUMP_Y;
		tRex.changeAnimation("jump");// Jump
	}

	if(keyCode == 224){// Command
		tRex.changeAnimation("stoop");// Stoop
	}
}

function keyReleased(){
	//console.log("keyReleased!!");

	tRex.changeAnimation("run");// Run
}