console.log("Hello p5.js!!");

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

let boids;

function setup(){
	console.log("setup");
	createCanvas(480, 320);
	frameRate(16);
	background(0);

	fill(200, 200, 200);
	noStroke();

	boids = new Array();
	for(let i=0; i<50; i++){
		let x = random(0, width);
		let y = random(0, height);
		let dot = new Dot(x, y);
		dot.vX = random(-3, 3);
		dot.vY = random(-3, 3);
		boids.push(dot);
	}
}

function draw(){
	console.log("draw");
	background(0);

	for(let i=0; i<boids.length; i++){
		calcPositions(i);
		calcPaddings(i);
		calcVectors(i);

		if(boids[i].x < 0){
			boids[i].x = 5;
			boids[i].vX *= -0.5;
		}
		if(width < boids[i].x){
			boids[i].x = width-5;
			boids[i].vX *= -0.5;
		}
		if(boids[i].y < 0){
			boids[i].y = 5;
			boids[i].vY *= -0.5;
		}
		if(height < boids[i].y){
			boids[i].y = height-5;
			boids[i].vY *= -0.5;
		}
		boids[i].draw();
	}
}

// Utility
function calcPositions(index){
	let p = {x: 0, y: 0};
	for(let i=0; i<boids.length; i++){
		if(index != i){
			p.x += boids[i].x;
			p.y += boids[i].y;
		}
	}
	p.x /= boids.length - 1;
	p.y /= boids.length - 1;
	boids[index].vX += (p.x - boids[index].x) / 100;
	boids[index].vY += (p.y - boids[index].y) / 100;
}

function calcPaddings(index){
	for(let i=0; i<boids.length; i++){
		if(index != i){
			let distance = getDistance(boids[index], boids[i]);
			if(distance < 5){
				boids[index].vX -= (boids[i].x - boids[index].x) / 2;
				boids[index].vY -= (boids[i].y - boids[index].y) / 2;
			}
		}
	}
}

function calcVectors(index){
	let v = {x: 0, y: 0};
	for(let i=0; i<boids.length; i++){
		if(index != i){
			v.x += boids[i].vX;
			v.y += boids[i].vY;
		}
	}
	v.x /= boids.length - 1;
	v.y /= boids.length - 1;
	boids[index].vX += (v.x - boids[index].vX) / 8;
	boids[index].vY += (v.y - boids[index].vY) / 8;
}

function getDistance(dotA, dotB){
	let num = Math.pow(dotA.x - dotB.x, 2) + Math.pow(dotA.y - dotB.y, 2);
	return Math.sqrt(num);
}

class Dot{

	constructor(x, y){
		this.x = x;
		this.y = y;
		this.vX = 0;
		this.vY = 0;

		this._r = Math.floor(Math.random() * 200) + 255 - 200;
		this._g = Math.floor(Math.random() * 200) + 255 - 200;
		this._b = Math.floor(Math.random() * 200) + 255 - 200;
		this._size = 1;

		this._seed = "";
		for(let i=0; i<32; i++){
			this._seed += "1";
		}
		this._max = parseInt(this._seed, 2);
		this._num = Math.floor(Math.random() * this._max);
		this._str = this._num.toString(2);

		if(this._str.length < 32){
			let total = 32 - this._str.length;
			let prefix = "";
			for(let i=0; i<total; i++){
				prefix += "0";
			}
			this._str = prefix + this._str;
		}
		//console.log("num:" + this._num + " / " + this._max);
	}

	draw(){
		fill(this._r, this._g, this._b);

		this.x += this.vX;
		this.y += this.vY;

		// Body
		for(let i=0; i<this._str.length; i++){
			if(this._str[i] === "1"){
				let odd = i % 4;
				let lX = this.x + this._size * odd;
				let lY = this.y + this._size * Math.floor(i / 4);
				rect(lX, lY, this._size, this._size);
				let rX = this.x - this._size * (odd-7);
				let rY = lY
				rect(rX, rY, this._size, this._size);
			}
		}
	}
}