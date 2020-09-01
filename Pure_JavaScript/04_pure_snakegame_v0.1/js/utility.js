"use strict";
//==========
// MineSweeper

class SnakeGame{

	constructor(width, height, g){
		this._width  = width;
		this._height = height;
		this._g      = g;
		this._rows   = Math.floor(this._height / g);
		this._cols   = Math.floor(this._height / g);
		this._body   = [];
		this._foods  = [];
		this.init();
	}

	init(){
		let x = Math.floor(this._cols/2) * this._g;
		let y = Math.floor(this._rows/2) * this._g;
		this._body.push(new Dot(x, y));
		this._vX = 0;
		this._vY = 1;
		this.addFood();
		this.addFood();
		this.addFood();
		this.addFood();
		this.addFood();
		this.addFood();
	}

	addBody(){
		let t = this._body.length-1;
		let x = this._body[t].x;
		let y = this._body[t].y;
		this._body.push(new Dot(x, y));
	}

	addFood(){
		let x = Math.floor(Math.random()*(this._cols-2)+1)*this._g;
		let y = Math.floor(Math.random()*(this._rows-2)+1)*this._g;
		this._foods.push(new Dot(x, y));
	}

	isGameOver(){
		// Game Area
		if(this._body[0].x < this._g*0.5) return true;
		if(this._body[0].y < this._g*0.5) return true;
		if(this._width-this._g*1.5  < this._body[0].x) return true;
		if(this._height-this._g*1.5 < this._body[0].y) return true;
		// Head x Tail
		for(let f=this._body.length-1; 1<f; f--){
			let dX = this._body[0].x - this._body[f].x;
			let dY = this._body[0].y - this._body[f].y;
			let dist = Math.sqrt(dX*dX + dY*dY);
			if(dist < this._g) return true;
		}
		return false;
	}

	update(){
		// Tail
		for(let t=this._body.length-1; 0<t; t--){
			this._body[t].x = this._body[t-1].x;
			this._body[t].y = this._body[t-1].y;
		}
		// Head
		this._body[0].x += Math.floor(this._g * this._vX);
		this._body[0].y += Math.floor(this._g * this._vY);
		// Head x Foods
		for(let f=this._foods.length-1; 0<=f; f--){
			let dX = this._body[0].x - this._foods[f].x;
			let dY = this._body[0].y - this._foods[f].y;
			let dist = Math.sqrt(dX*dX + dY*dY);
			if(dist < this._g){
				this.addBody();          // Add body
				this.addFood();          // Add food
				this._foods.splice(f, 1);// Remove food
			}
		}
	}

	getBody(){
		return this._body;
	}

	getFoods(){
		return this._foods;
	}

	goLeft(){
		if(this._vX == 1) return;
		this._vX = -1;
		this._vY = 0;
	}

	goRight(){
		if(this._vX == -1) return;
		this._vX = 1;
		this._vY = 0;
	}

	goUp(){
		if(this._vY == 1) return;
		this._vX = 0;
		this._vY = -1;
	}

	goDown(){
		if(this._vY == -1) return;
		this._vX = 0;
		this._vY = 1;
	}
}

class Dot{

	constructor(x, y){
		this._x = x;
		this._y = y;
	}

	set x(num){this._x = num;}
	set y(num){this._y = num;}
	get x(){return this._x;}
	get y(){return this._y;}
}

