//==========
// p5.js

const G = 0.8;

let cX, cY, balls;

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	frameRate(1);
	background(33);
	noStroke();
	fill(255);

	cX = width / 2;
	cY = height / 2;

	balls = [];
	for(let i=0; i<36; i++){
		let v = random(8, 10);
		let ball = new Ball(i*10, -v);
		balls.push(ball);
	}
}

function draw(){
	background(33);


	for(let i=balls.length-1; 0<=i; i--){
		let ball = balls[i];
		ball.update();
		if(ball.isFinished()) balls.splice(i, 1);
	}
}

class Ball{

	constructor(r, v){
		this._r = r;
		this._v = v;
		this._h = 0;
	}

	update(){
		push();
		translate(cX, cY);
		rotate(this._r);
		this._v += G;
		this._h += this._v;
		circle(0, this._h, 4);
		pop();
	}

	isFinished(){
		console.log(this._h);
		if(this._h < 0) return true;
		return false;
	}
}