console.log("Hello p5.js!!");

const SIZE_G    = 64;

const GROUND_Y  = 260;
const CENTER_X  = 240;
const LEFT_X    = 140;
const RIGHT_X   = 340;

let player      = null;
let timbers     = [];
let branches    = [];
let gameOverFlg = false;

function setup(){
	console.log("setup!!");

	createCanvas(480, 320);
	background(200, 200, 200);
	angleMode(DEGREES);
	frameRate(16);

	// Player
	player = createSprite(LEFT_X, GROUND_Y, SIZE_G, SIZE_G);

	// Timbers
	for(let i=0; i<10; i++){
		let timber = createSprite(CENTER_X, GROUND_Y - SIZE_G*i, SIZE_G, SIZE_G);
		timbers.push(timber);
	}
}

function draw(){
	background(200, 200, 200);

	for(let timber of timbers){
		if(0 < timber.getSpeed) continue;
		if(timber.position.x < 0 || width < timber.position.x){
			timber.position.x = CENTER_X;
			timber.position.y = getMinY() - SIZE_G;
			timber.setSpeed(0);
		}
	}

	drawSprites();

	if(gameOverFlg == true){
		// Game Over!!
		fill(255, 255, 255);
		textSize(32);
		textAlign(CENTER);
		text("GAME OVER!!", 240, 160);
		noLoop();// Stop!!
	}
}

function mousePressed(){

	if(mouseX < width*0.5){
		player.position.x = LEFT_X;
		cutTimbers(30, -5);
	}else{
		player.position.x = RIGHT_X;
		cutTimbers(30, -175);
	}

	slideTimbers();
	createBranch();
}

function cutTimbers(speed, degree){
	let target = null;
	for(let timber of timbers){
		if(0 < timber.getSpeed()) continue;
		if(target == null) target = timber;
		if(target.position.y < timber.position.y){
			target = timber;
		}
	}
	if(target) target.setSpeed(speed, degree);
}

function slideTimbers(){

	for(let timber of timbers){
		if(timber.getSpeed() <= 0){
			timber.position.y += SIZE_G;
		}
	}

	for(let branch of branches){
		branch.position.y += SIZE_G;
		if(GROUND_Y < branch.position.y){
			branch.remove();
			continue;
		}
		if(player.overlap(branch)){
			gameOverFlg = true;// Game Over!!
		}
	}
}

function createBranch(){
	let rdm  = Math.floor(Math.random() * 10) % 3 - 1;
	if(rdm == 0) return;
	let posX = CENTER_X + SIZE_G * rdm;
	let branch = createSprite(posX, GROUND_Y - SIZE_G*3, SIZE_G, SIZE_G/3);
	branches.push(branch);
}

function getMinY(){
	let minY = GROUND_Y + SIZE_G;
	for(let timber of timbers){
		if(0 < timber.getSpeed()) continue;
		if(timber.position.y < minY){
			minY = timber.position.y;
		}
	}
	return minY;
}