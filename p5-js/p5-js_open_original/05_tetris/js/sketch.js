"use strict";
//==========
// p5.js

let MINO_I = [
	[0, 0, 1, 0,
	 0, 0, 1, 0,
	 0, 0, 1, 0,
	 0, 0, 1, 0],
	[0, 0, 0, 0,
	 0, 0, 0, 0,
	 1, 1, 1, 1,
	 0, 0, 0, 0],
	[0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0,
	 0, 1, 0, 0],
	[0, 0, 0, 0,
	 1, 1, 1, 1,
	 0, 0, 0, 0,
	 0, 0, 0, 0]
];

let MINO_L = [
	[0, 2, 0, 0,
	 0, 2, 0, 0,
	 0, 2, 2, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 2, 2, 2,
	 0, 2, 0, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 2, 2, 0,
	 0, 0, 2, 0,
	 0, 0, 2, 0],
	[0, 0, 0, 0,
	 0, 0, 2, 0,
	 2, 2, 2, 0,
	 0, 0, 0, 0]
];

let MINO_J = [
	[0, 0, 3, 0,
	 0, 0, 3, 0,
	 0, 3, 3, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 3, 0, 0,
	 0, 3, 3, 3,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 3, 3, 0,
	 0, 3, 0, 0,
	 0, 3, 0, 0],
	[0, 0, 0, 0,
	 3, 3, 3, 0,
	 0, 0, 3, 0,
	 0, 0, 0, 0]
];

let MINOS = [MINO_I, MINO_L, MINO_J];

let colors = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, tManager;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(1);
	fill(255);
	noStroke();

	cX = width / 2;
	cY = height / 2;
	tManager = new TetrisManager();
}

function draw(){
	background(33);
}

function mousePressed(){
	console.log("mousePressed");
	tManager.stepDown();
	if(tManager.checkCollision()){
		tManager.stepUp();
		tManager.fixMino();
		tManager.createMino();
	}
	tManager.check();
}

function keyPressed(){
	if(keyCode == LEFT_ARROW){
		if(!tManager.checkWallL()){
			tManager.stepLeft();
		}
	}
	if(keyCode == RIGHT_ARROW){
		if(!tManager.checkWallR()){
			tManager.stepRight();
		}
	}
	if(keyCode == UP_ARROW) tManager.stepUp();
	if(keyCode == DOWN_ARROW){
		tManager.stepDown();
		if(tManager.checkCollision()){
			tManager.stepUp();
			tManager.fixMino();
			tManager.createMino();
		}
	}
	tManager.check();
}

class TetrisManager{

	constructor(){
		this._rows  = 20;
		this._cols  = 10;
		this._grids = [];
		this._mino  = null;
		this.init();
		this.createMino();
		this.check();
	}

	init(){
		let total = this._rows * this._cols;
		for(let t=0; t<total; t++){
			this._grids.push(0);
		}
	}

	createMino(){
		this._mino = new Mino(0, 3);
	}

	fixMino(){
		if(this._mino == null) return;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+this._mino.r;
				let iC = c+this._mino.c;
				let i = iR*this._cols + iC;
				if(iR < 0 || iC < 0) continue;
				if(this._rows < iR) continue;
				if(this._cols < iC) continue;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(this._grids[i] != 0) continue;
				this._grids[i] = this._mino.getGrid(r, c);
			}
		}
	}

	checkCollision(){
		if(this._mino == null) return false;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+this._mino.r;
				let iC = c+this._mino.c;
				let i = iR*this._cols + iC;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(this._grids[i] != 0) return true;
				if(this._rows-1 < iR) return true;
			}
		}
		return false;
	}

	checkWallL(){
		if(this._mino == null) return false;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iC = c+this._mino.c-1;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(iC < 0) return true;
			}
		}
		return false;
	}

	checkWallR(){
		if(this._mino == null) return false;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iC = c+this._mino.c+1;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(this._cols <= iC) return true;
			}
		}
		return false;
	}

	stepUp(){
		if(this._mino == null) return;
		this._mino.stepUp();
	}

	stepDown(){
		if(this._mino == null) return;
		this._mino.stepDown();
	}

	stepLeft(){
		if(this._mino == null) return;
		this._mino.stepLeft();
	}

	stepRight(){
		if(this._mino == null) return;
		this._mino.stepRight();
	}

	check(){
		let data = [];
		for(let n of this._grids) data.push(n);
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+this._mino.r;
				let iC = c+this._mino.c;
				let i = iR*this._cols + iC;
				if(iR < 0 || iC < 0) continue;
				if(this._rows < iR) continue;
				if(this._cols <= iC) continue;
				if(this._mino.getGrid(r, c) == 0) continue;
				if(data[i] != 0) continue;
				data[i] = this._mino.getGrid(r, c);
			}
		}
		let str = "=======================\n";
		for(let r=0; r<this._rows; r++){
			let line = "| ";
			for(let c=0; c<this._cols; c++){
				let iG = r*this._cols + c;
				line += (data[iG]==0) ? "  ":data[iG]+" ";
			}
			str += line + "|\n";
		}
		str += "=======================\n";
		console.log(str);
	}
}

class Mino{

	constructor(r, c){
		this._r = r;
		this._c = c;
		this._size = 4;
		this._mino = null;
		this.init();
	}

	set r(n){this._r=n;}
	set c(n){this._c=c;}
	get r(){return this._r;}
	get c(){return this._c;}
	get size(){return this._size;}

	init(){
		let i = floor(Math.random()*MINOS.length);
		let r = floor(Math.random()*MINOS[i].length);
		this._mino = MINOS[i][r];
	}

	getGrid(r, c){
		let i = r*this._size + c;
		return this._mino[i];
	}

	stepUp(){
		this._r--;
	}

	stepDown(){
		this._r++;
	}

	stepLeft(){
		this._c--;
	}

	stepRight(){
		this._c++;
	}
}