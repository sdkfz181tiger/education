//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

console.log("Hello p5.js!!");

const DISP_W = 480;
const DISP_H = 320;

let sprTanu;
let sprEnemies = [];

function setup(){
	console.log("setup");
	createCanvas(DISP_W, DISP_H);
	frameRate(32);
	background(0, 0, 0);
	fill(255, 255, 255);

	// Sprite
	sprTanu = createSprite(240, 160, 32, 32);
	sprTanu.mass = 1;
	let imgTanu = loadImage("assets/tanuki.png");
	sprTanu.addImage(imgTanu);

	// Enemy
	for(let i=0; i<10; i++){
		let speed = random(1, 2);
		let deg = random(0, 360);
		let sprEnemy = createEnemy(240, 160, 150, speed, deg);
		sprEnemies.push(sprEnemy);
	}
}

function draw(){
	//console.log("draw");
	background(0, 0, 0);

	// if(sprTanu.collide(sprEnemy)){
	// 	noLoop();
	// 	fill(255, 255, 255);
	// 	textSize(32);
	// 	textAlign(CENTER);
	// 	text("GAME OVER!!", 240, 40);
	// 	console.log("GAME OVER!!");
	// }

	console.log(sprEnemies.length);

	for(let i=sprEnemies.length-1; i>=0; i--){
		if(sprTanu.collide(sprEnemies[i])){
			sprEnemies[i].remove();
			sprEnemies.splice(i, 1);
		}
	}

	drawSprites();
}

function keyPressed(){
	console.log("keyPressed:", keyCode);

	if(keyCode == 37){
		sprTanu.setSpeed(1, 180);
	}

	if(keyCode == 39){
		sprTanu.setSpeed(1, 0);
	}

	if(keyCode == 38){
		sprTanu.setSpeed(1, 270);
	}

	if(keyCode == 40){
		sprTanu.setSpeed(1, 90);
	}
}

function keyReleased(){
	sprTanu.setSpeed(0, 0);
}

function createEnemy(cX, cY, radius, speed, deg){

	let radian = deg * Math.PI / 180.0;
	let x = cX + radius * Math.cos(radian);
	let y = cY + radius * Math.sin(radian);
	let enemy = createSprite(x, y, 16, 16);
	enemy.setSpeed(speed, deg-180);
	return enemy;
}