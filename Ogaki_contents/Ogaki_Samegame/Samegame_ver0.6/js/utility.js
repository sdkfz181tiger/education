console.log("Hello utility.js!!");

//==========
// Utility(Boids)

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
	boids[index].vX += (p.x - boids[index].x) / 2;
	boids[index].vY += (p.y - boids[index].y) / 2;
}

function calcPaddings(index){
	for(let i=0; i<boids.length; i++){
		if(index != i){
			let distance = getDistance(boids[index], boids[i]);
			if(distance < 24){
				boids[index].vX -= (boids[i].x - boids[index].x) * 10;
				boids[index].vY -= (boids[i].y - boids[index].y) * 10;
			}else if(distance < 16){
				boids[index].vX /= 3;
				boids[index].vY /= 3;
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
	boids[index].vX += (v.x - boids[index].vX) / 10;
	boids[index].vY += (v.y - boids[index].vY) / 10;
}

function getDistance(dotA, dotB){
	let num = Math.pow(dotA.x - dotB.x, 2) + Math.pow(dotA.y - dotB.y, 2);
	return Math.sqrt(num);
}

function bounceWalls(index){
	let padding = 30;
	if(boids[index].x < -padding){
		boids[index].x = 5;
		boids[index].vX *= -0.2;
	}
	if(width+padding < boids[index].x){
		boids[index].x = width-5;
		boids[index].vX *= -0.2;
	}
	if(boids[index].y < -padding){
		boids[index].y = 5;
		boids[index].vY *= -0.2;
	}
	if(height+padding < boids[index].y){
		boids[index].y = height-5;
		boids[index].vY *= -0.2;
	}
}

//==========
// Classes

class Dot{

	constructor(x, y){
		this.x  = x;
		this.y  = y;
		this.vX = 0;
		this.vY = 0;
		this.moveFlg = true;

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
	}

	draw(){
		if(this.moveFlg == false) return;

		let max = 1;
		if(this.vX < -max) this.vX = -max;
		if(max < this.vX) this.vX = max;
		if(this.vY < -max) this.vY = -max;
		if(max < this.vY) this.vY = max;

		this.x += this.vX;
		this.y += this.vY;

		// Body
		fill(this._r, this._g, this._b);
		noStroke();
		rect(this.x, this.y, 16, 16);
	}

	start(){
		this.moveFlg = true;
	}

	stop(){
		this.moveFlg = false;
	}

	toggle(){
		if(this.moveFlg == true){
			this.moveFlg = false;
		}else{
			this.moveFlg = true;
		}
	}
}