console.log("Hello p5.js!!");

let cheff, bullets, pigs, walls;

function preload(){
	console.log("preload");
}

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);
	fill(255, 255, 255);
	noStroke();

	// Wall
	walls = [];
	let wTop = createWall(width*0.5, 0, width, 5);
	walls.push(wTop);
	let wBottom = createWall(width*0.5, height, width, 5);
	walls.push(wBottom);
	let wLeft = createWall(0, height*0.5, 5, width);
	walls.push(wLeft);
	let wRight = createWall(width, height*0.5, 5, height);
	walls.push(wRight);

	// Cheff
	cheff = createCheff(width*0.5, height*0.5);

	// Array
	bullets = [];
	pigs = [];

	// Wakeup
	setInterval(wakeup, 500);

	// Shot
	setInterval(shot, 100);
}

function draw(){
	console.log("draw");
	background(200);

	// Cheff x Pigs
	for(let p=pigs.length-1; 0<=p; p--){
		if(cheff.bounce(pigs[p])){
			noLoop();
		}
	}

	// Bullets x Pigs
	for(let p=pigs.length-1; 0<=p; p--){
		for(let b=bullets.length-1; 0<=b; b--){
			if(isOutside(bullets[b]) ||
					bullets[b].bounce(pigs[p])){
				bullets[b].remove();
				bullets.splice(b, 1);
			}
		}
		if(isOutside(pigs[p])){
			pigs[p].remove();
			pigs.splice(p, 1);
		}
	}

	drawSprites();
}

// Wakeup
function wakeup(){
	if(20 < pigs.length) return;

	let cX = cheff.position.x;
	let cY = cheff.position.y;
	let radius = 200;
	let radian = Math.PI * 2 * Math.random();
	let pX = cX + Math.cos(radian) * radius;
	let pY = cY + Math.sin(radian) * radius;
	let speed = 10 * Math.random();
	let deg = radian * 180 / Math.PI - 180;
	let pig = createPig(pX, pY, speed, deg);
	pigs.push(pig);
}

// Shot
function shot(){
	if(20 < bullets.length) return;

	let cX = cheff.position.x;
	let cY = cheff.position.y;
	let speed = 2;
	let rad = Math.atan2(mouseY-cY, mouseX-cX);
	let deg = rad * 180 / Math.PI
	let bullet = createBullet(cheff.position.x, cheff.position.y, 10, deg);
	bullets.push(bullet);
}

// Display
function isOutside(target){
	if(target.position.x < 0) return true;
	if(target.position.y < 0) return true;
	if(width  < target.position.y) return true;
	if(height < target.position.y) return true;
	return false;
}
