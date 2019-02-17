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

let player = null;
let invaders = [];
let bullets  = [];

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(32);
	background(33, 33, 33);
	fill(255, 255, 255);
	noStroke();

	// Player
	player = createSprite(width*0.5, height-30, 16, 8);
	player.shapeColor = color(255, 255, 255);
	player.immovable = true;

	// Invaders
	let padding = 35;
	let rows = 4;
	let cols = 8;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = width * 0.5 - cols * padding * 0.5 + padding * (c + 0.5);
			let y = 40 + padding * r;
			let invader = createSprite(x, y, 32, 32);
			invader.setSpeed(1, 0);
			invaders.push(invader);
		}
	}
}

function draw(){
	console.log("draw");
	background(33, 33, 33);

	// Invaders
	for(let i=invaders.length-1; 0<=i; i--){
		
		// Left
		let borderL = 0;
		if(borderL > invaders[i].position.x - invaders[i].width*0.5){
			let disX = invaders[i].position.x - invaders[i].width*0.5 - borderL;
			invaders[i].position.x -= disX * 2.0;
			invaders[i].position.y += invaders[i].height;
			invaders[i].velocity.x *= -1.0;
		}

		// Right
		let borderR = width;
		if(borderR < invaders[i].position.x + invaders[i].width*0.5){
			let disX = invaders[i].position.x + invaders[i].width*0.5 - borderR;
			invaders[i].position.x -= disX * 2.0;
			invaders[i].position.y += invaders[i].height;
			invaders[i].velocity.x *= -1.0;
		}

		// Bullets
		for(let b=bullets.length-1; 0<=b; b--){

			// Outside of canvas
			if(bullets[b].position.y < 0){
				// Remove bullet!!
				bullets[b].remove();
				bullets.splice(b, 1);
				break;
			}

			// Collision
			if(bullets[b].collide(invaders[i])){
				// Remove invader!!
				invaders[i].remove();
				invaders.splice(i, 1);
				// Remove bullet!!
				bullets[b].remove();
				bullets.splice(b, 1);
				break;// Important!!
			}
		}
	}

	drawSprites();
}

function keyPressed(){

	if(keyCode == 37){
		player.setSpeed(5, 180);
	}
	if(keyCode == 39){
		player.setSpeed(5, 0);
	}
	if(keyCode == 90){
		//shot();
		//shotA(-80);
		shotB(-90, 3);
	}
}

function keyReleased(){

	if(keyCode == 37 || keyCode == 39){
		player.setSpeed(0, 0);
	}
}

function shot(){

	let x = player.position.x;
	let y = player.position.y;
	let bullet = createSprite(x, y, 4, 8);
	bullet.shapeColor = color(255, 255, 255);
	bullet.setSpeed(10, -90);
	bullets.push(bullet);
}

function shotA(dir){

	let x = player.position.x;
	let y = player.position.y;
	let bullet = createSprite(x, y, 4, 8);
	bullet.shapeColor = color(255, 255, 255);
	bullet.setSpeed(3, dir);
	bullets.push(bullet);
}

function shotB(dir, total){

	for(let i=0; i<total; i++){
		let x = player.position.x;
		let y = player.position.y;
		let bullet = createSprite(x, y, 4, 8);
		bullet.shapeColor = color(255, 255, 255);
		bullet.setSpeed(3, dir+i*10);
		bullets.push(bullet);
	}
}




