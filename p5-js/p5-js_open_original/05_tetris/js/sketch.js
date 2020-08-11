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

let MINOS   = [MINO_I, MINO_L, MINO_J];
let COLORS  = ["#386641", "#6A994E", "#A7C957", "#F2E8CF", "#BC4749"];
let cX, cY, tMng;

function setup(){
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	rectMode(CENTER);
	frameRate(2);
	fill(255);
	noStroke();

	cX = width / 2;
	cY = height / 2;
	tMng = new TetrisManager();
}

function draw(){
	background(33);
	tMng.stepDown();
	if(tMng.checkCollision()){
		tMng.stepUp();
		tMng.fixMino();
		tMng.createMino();
	}
	tMng.check();
}

function mousePressed(){
	console.log("mousePressed");
	tMng.stepDown();
	if(tMng.checkCollision()){
		tMng.stepUp();
		tMng.fixMino();
		tMng.createMino();
	}
	tMng.check();
}

function keyPressed(){
	if(keyCode == LEFT_ARROW){
		if(!tMng.checkWallL()){
			tMng.stepLeft();
		}
	}
	if(keyCode == RIGHT_ARROW){
		if(!tMng.checkWallR()){
			tMng.stepRight();
		}
	}
	if(keyCode == UP_ARROW){
		//tMng.stepUp();
		tMng.rotateL();
		tMng.checkRotation();
		//tMng.rotateR();// Test
	}
	if(keyCode == DOWN_ARROW){
		tMng.stepDown();
		if(tMng.checkCollision()){
			tMng.stepUp();
			tMng.fixMino();
			tMng.createMino();
		}
	}
	tMng.check();
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

	checkRotation(){
		if(this._mino.c < 0){
			this._mino.c = -this._mino.getLeftIndex();
		}
		if(this._cols < this._mino.c+this._mino.size){
			this._mino.c = (this._cols-1) - this._mino.getRightIndex();
		}
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

	rotateL(){
		if(this._mino == null) return;
		this._mino.rotateL();
	}

	rotateR(){
		if(this._mino == null) return;
		this._mino.rotateR();
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
		this._s = 4;
		this._i = 0;
		this._j = 0;
		this._m = null;
		this.init();
	}

	set r(n){this._r=n;}
	set c(n){this._c=n;}
	get r(){return this._r;}
	get c(){return this._c;}
	get size(){return this._s;}

	init(){
		this._i = floor(Math.random()*MINOS.length);
		this._j = floor(Math.random()*MINOS[this._i].length);
		this._m = MINOS[this._i][this._j];
	}

	getGrid(r, c){
		let i = r*this._s + c;
		return this._m[i];
	}

	stepUp(){this._r--;}

	stepDown(){this._r++;}

	stepLeft(){this._c--;}

	stepRight(){this._c++;}

	rotateL(){
		this._j--;
		if(this._j < 0) this._j = MINOS[this._i].length - 1;
		this._m = MINOS[this._i][this._j];
	}

	rotateR(){
		this._j++;
		if(MINOS[this._i].length <= this._j) this._j = 0;
		this._m = MINOS[this._i][this._j];
	}

	getLeftIndex(){
		for(let c=0; c<this._s; c++){
			for(let r=0; r<this._s; r++){
				let i = r*this._s + c;
				if(this._m[i] != 0) return c;
			}
		}
		return 0;
	}

	getRightIndex(){
		for(let c=this._s-1; 0<=c; c--){
			for(let r=this._s-1; 0<=r; r--){
				let i = r*this._s + c;
				if(this._m[i] != 0) return c;
			}
		}
		return 0;
	}
}