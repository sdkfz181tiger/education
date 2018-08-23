//==========
// p5.js

console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const GRAVITY    = 0.02;

let rocket;
let ground;
let base;
let smoke;

let target;

function preload(){
	console.log("preload");

	// Font
	let font = loadFont("fonts/misaki_gothic.ttf");
	textFont(font);
}

function setup(){
	createCanvas(480, 320);
	frameRate(8);
	noFill();
	noStroke();

	// Rocket
	rocket = new Rocket(width*0.5, height*0.2, 0, -90);
	// Ground
	ground = new Ground(height*0.6, height*0.9);
	// Base
	let position = ground.getBasePosition();
	base = new Base(position.x, position.y, 40, 10);
	// Smoke
	smoke = new Smoke();
	// Target
	target = {x: 0, y: 0};
}

function draw(){
	background(0, 0, 0);

	stroke(255);
	fill(255);

	// let c  = {x: width*0.5, y: height*0.5};
	// let v1 = {x: 50,  y: 50};
	// line(c.x, c.y, c.x+v1.x, c.y+v1.y);

	// let vL = calcVerticalL(v1);
	// line(c.x, c.y, c.x+vL.x, c.y+vL.y);

	// let p1 = {x: target.x-c.x, y: target.y-c.y};
	// ellipse(c.x+p1.x, c.y+p1.y, 3, 3);

	// let dot = calcDot(vL, p1);
	// let cos = dot / (calcLength(vL) * calcLength(p1));
	
	// if(0 < cos){
	// 	console.log("前です:" + cos);
	// }else{
	// 	console.clear();
	// }

	if(isRside(width*0.5, height*0.5, 100, 100, target.x, target.y)){
		console.log("右です");
		ellipse(target.x, target.y, 3, 3);
	}else{
		console.clear();
	}

	function isRside(fromX, fromY, toX, toY, pX, pY){

		line(fromX, fromY, toX, toY);

		let c  = {x: fromX, y: fromY};
		let v1 = {x: toX-fromX,  y: toY-fromY};
		let vL = calcVerticalR(v1);
		let p1 = {x: pX-fromX, y: pY-fromY};
		let dot = calcDot(vL, p1);
		let cos = dot / (calcLength(vL) * calcLength(p1));
		if(0 < cos) return true;
		return false;
	}

	function calcVerticalL(v1){
		let l = {x: v1.y, y: v1.x*-1.0};
		return l;
	}

	function calcVerticalR(v){
		let r = {x: v.y*-1.0, y: v.x};
		return r;
	}

	function calcDot(v1, v2){
		let dot = v1.x * v2.x + v1.y * v2.y;
		return dot;
	}

	function calcLength(v){
		let length = Math.sqrt(v.x*v.x+v.y*v.y);
		return length;
	}

	/*
	// Draw
	rocket.draw();
	ground.draw();
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
	*/
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

function mousePressed(){
	target.x = mouseX;
	target.y = mouseY;
	return false;
}

//==========
// GameClear or GameOver

function drawStatuses(){
	fill(255, 255, 255);
	noStroke();
	textSize(16); textAlign(LEFT);
	if(gameJudge()){
		fill(150, 255, 150);
		text("YOU:GOOD!!", 10, 25);
	}else{
		fill(255, 150, 150);
		text("YOU:DANGER!!", 10, 25);
	}
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
	background(50, 50, 100);
	rocket.draw(); base.draw();
	ground.draw(); smoke.draw();
	fill(255); noStroke();
	textSize(32); textAlign(CENTER);
	text("GAME CLEAR!!" , width*0.5, height*0.5);
	noLoop();
}

function gameOver(){
	background(100, 50, 50);
	rocket.draw(); base.draw();
	ground.draw(); smoke.draw();
	fill(255); noStroke();
	textSize(32); textAlign(CENTER);
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
		fill(255, 255, 255);
		noStroke();
		translate(this._x, this._y);
		rotate(this._rad);
		triangle(this._w, 0,
			0, +this._h*0.2,
			0, -this._h*0.2);
		resetMatrix();
	}
}

// Ground
class Ground{
	constructor(minY, maxY){
		this._minY = minY;
		this._maxY = maxY;
		this._arr = [];
		this.init(10);
	}
	init(total){
		let padX = width / total;
		let padY = 30;
		let startX = 0;
		let startY = height * 0.8;
		this._arr.push({x: startX, y: startY});
		for(let i=0; i<total; i++){
			let rdm = Math.floor(padY * Math.random());
			if(rdm % 2 == 0) rdm *= -1;
			let x = padX * (i+1);
			let y = startY + rdm;
			if(y < this._minY) y = this._minY;
			if(this._maxY < y) y = this._maxY;
			this._arr.push({x: x, y: y});
			startY = y;
		}
		console.log(this._arr);
	}
	getBasePosition(){
		let i = Math.floor(Math.random() * (this._arr.length - 2));
		return this._arr[i+1];
	}
	draw(){
		noFill();
		stroke(255, 255, 255);
		for(let i=1; i<this._arr.length; i++){
			let fromX = this._arr[i-1].x;
			let fromY = this._arr[i-1].y;
			let toX = this._arr[i].x;
			let toY = this._arr[i].y;
			line(fromX, fromY, toX, toY);
		}
	}
}

// Base
class Base{
	constructor(x, y, w, h){
		this._x = x - w * 0.5;
		this._y = y - h;
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
		noStroke();
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
				fill(255, 255, 255);
				noStroke();
				translate(obj.x, obj.y);
				ellipse(0, 0, 8, 8);
				resetMatrix();
			}
			if(obj.life <= 0) this._arr.splice(i, 1);
		}
	}
}