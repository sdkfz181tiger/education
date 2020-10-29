//==========
// p5.js

const p    = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];
const pad  = 16;
let snakes = [];
let dots   = [];

function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(8);
	background(33);
	stroke(200);
	strokeWeight(4);
	noFill();

	let rows = 21;
	let cols = 21;
	for(let r=0; r<rows; r++){
		for(let c=0; c<cols; c++){
			let x = c * pad - pad*cols/2;
			let y = r * pad - pad*rows/2;
			if(r%2==0 && c%2==0){
				dots.push(new Dot(x, y));
				continue;
			}
			snakes.push(new Snake(x, y, 45));
			snakes.push(new Snake(x, y, 135));
		}
	}
}

function draw(){
	background(33);

	push();
	translate(width/2, height/2);
	rotate(45);
	for(let dot of dots) dot.draw();
	for(let snake of snakes) snake.draw();
	pop();
}

class Snake{

	constructor(x, y, d){
		this._x = x;
		this._y = y;
		this._d = d;
		this._n = random(360);
		this._c = color(p[floor(this._n%p.length)]);
	}

	draw(){
		stroke(this._c);
		strokeWeight(3);
		noFill();
		push();
		translate(this._x, this._y);
		rotate(this._d);
		//circle(0, 0, 5);
		line(pad*sin(this._n), 0, pad*sin(this._n+60), 0);
		pop();
		this._n += 5;
		if(360 < this._n) this._n -= 360;
	}
}

class Dot{

	constructor(x, y){
		this._x = x;
		this._y = y;
		this._n = random(360);
		this._c = color(p[floor(this._n%p.length)]);
	}

	draw(){
		noStroke();
		strokeWeight(0);
		fill(this._c);
		circle(this._x, this._y, 10*sin(this._n));
		this._n += 5;
		if(360 < this._n) this._n -= 360;
	}
}