//==========
// p5.js

console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const GRAVITY    = 0.02;

let rocket;
let base;
let smoke;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("fonts/misaki_gothic.ttf");
	textFont(font);
}

function setup(){
	createCanvas(480, 320);
	frameRate(32);
	noFill();
	noStroke();

	// Rocket
	rocket = new Rocket(width*0.5, height*0.5, 0, -90);
	// Base
	base = new Base(width*0.5, height-20, 40, 10);
	// Smoke
	smoke = new Smoke();
}

function draw(){
	background(0, 0, 0);

	// Draw
	rocket.draw();
	base.draw();
	smoke.draw();

	// Rocket x Base
	if(base.contains(rocket.getX(), rocket.getY())){
		if(gameJudge()){
			gameClear();
		}else{
			gameOver();
		}
	}

	// Statuses
	drawStatuses();
}

function keyPressed(){
	// Up
	if(keyCode == 38){
		rocket.thrust(0.4);
		smoke.add(rocket.getX(), rocket.getY(), 32);
	}
	if(keyCode == 37) rocket.turn(-4);
	if(keyCode == 39) rocket.turn(+4);
}

//==========
// GameClear or GameOver

function drawStatuses(){
	textSize(16); textAlign(LEFT);
	if(gameJudge()){
		fill(150, 255, 150);
		text("YOU:GOOD!!", 10, 25);
	}else{
		fill(255, 150, 150);
		text("YOU:DANGER!!", 10, 25);
	}
	fill(255, 255, 255);
	let msgSpd = rocket.getSpeed();
	let msgDeg = rocket.getDeg() * -1.0;
	let msgAlt = Math.floor(base.getY() - rocket.getY());
	text("SPD:" + msgSpd, 10, 40);
	text("DEG:" + msgDeg, 10, 55);
	text("ALT:" + msgAlt, 10, 70);
}

function gameJudge(){
	let speed = rocket.getSpeed();
	if(1 < speed) return false;
	let deg = rocket.getDeg();
	if(deg < -93) return false;
	if(-87 < deg) return false;
	return true;
}

function gameClear(){
	background(100, 100, 150);
	rocket.draw(); base.draw(); smoke.draw();
	fill(255); textSize(32); textAlign(CENTER);
	text("GAME CLEAR!!" , width*0.5, height*0.5);
	noLoop();
}

function gameOver(){
	background(150, 100, 100);
	rocket.draw(); base.draw(); smoke.draw();
	fill(255); textSize(32); textAlign(CENTER);
	text("GAME OVER!!" , width*0.5, height*0.5);
	noLoop();
}

//==========
// Classes

// Rocket
class Rocket{
	constructor(x, y, speed, deg){
		this._x = x; this._y = y;
		this._w = 20; this._h = 25;
		this._speed = speed; this._deg = deg;
		this._rad = DEG_TO_RAD * this._deg;
		this._vX = 0; this._vY = 0;
	}
	getX(){
		return this._x;
	}
	getY(){
		return this._y;
	}
	thrust(s){
		this._speed = s;
		this._vX += this._speed * Math.cos(this._rad);
		this._vY += this._speed * Math.sin(this._rad);
	}
	turn(d){
		this._deg += d;
		this._rad = DEG_TO_RAD * this._deg;
	}
	getSpeed(){
		let speed = Math.sqrt(this._vX*this._vX + this._vY*this._vY);
		this._speed = Math.floor(speed*100) / 100;
		return this._speed;
	}
	getDeg(){
		return this._deg;
	}
	draw(){
		this._x += this._vX;
		this._y += this._vY;
		this._vY += GRAVITY;

		if(this._x < 0) this._x = width;
		if(width < this._x) this._x = 0;
		if(this._y < 0) this._y = height;
		if(height < this._y){
			this._y = 0; this._vY = 0;
		}

		// Draw
		fill(255);
		translate(this._x, this._y);
		rotate(this._rad);
		triangle(this._w, 0,
			0, +this._h*0.2,
			0, -this._h*0.2);
		resetMatrix();
	}
}

// Base
class Base{
	constructor(x, y, w, h){
		this._x = x - w * 0.5;
		this._y = y;
		this._w = w; this._h = h;
	}
	getX(){
		return this._x;
	}
	getY(){
		return this._y;
	}
	contains(x, y){
		if(x < this._x) return false;
		if(this._x + this._w < x) return false;
		if(y < this._y) return false;
		if(this._y + this._h < y) return false;
		return true;
	}
	draw(){
		fill(255, 150, 150);
		translate(this._x, this._y);
		rect(0, 0, this._w, this._h)
		resetMatrix();
	}
}

// Smoke
class Smoke{
	constructor(){
		this._arr = [];
	}
	add(x, y, life){
		this._arr.push(
			{x: x, y: y, life: life});
	}
	draw(){
		for(let i=this._arr.length-1; 0<=i; i--){
			let obj = this._arr[i];
			obj.life--;
			if(obj.life % 3 == 0){
				fill(255);
				translate(obj.x, obj.y);
				ellipse(0, 0, 8, 8);
				resetMatrix();
			}
			if(obj.life <= 0) this._arr.splice(i, 1);
		}
	}
}