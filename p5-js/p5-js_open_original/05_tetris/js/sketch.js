"use strict";
//==========
// p5.js

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

class TetrisManager{

	constructor(){
		this._rows = 10;
		this._cols = 10;
		this._grids = [];
		this._mino = null;
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
		let rdm = floor(Math.random()*8);
		this._mino = new Mino(0, rdm);
	}

	fixMino(){
		if(this._mino == null) return;
		let mR = this._mino.r;
		let mC = this._mino.c;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+mR;
				let iC = c+mC;
				let i = iR*this._cols + iC;
				if(iR < 0 || iC < 0) continue;
				if(this._rows < iR) continue;
				if(this._cols < iC) continue;
				this._grids[i] = this._mino.getGrid(r, c);
			}
		}
	}

	checkCollision(){
		if(this._mino == null) return false;
		let mR = this._mino.r;
		let mC = this._mino.c;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+mR;
				let iC = c+mC;
				let i = iR*this._cols + iC;
				if(this._grids[i] == 0) continue;
				if(this._mino.getGrid(r, c) != 0) return true;
				if(this._rows-1 < iR) return true;
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

	check(){
		let data = [];
		for(let n of this._grids) data.push(n);
		let mR = this._mino.r;
		let mC = this._mino.c;
		let size = this._mino.size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let iR = r+mR;
				let iC = c+mC;
				let i = iR*this._cols + iC;
				if(iR < 0 || iC < 0) continue;
				if(this._rows < iR) continue;
				if(this._cols < iC) continue;
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
		this._type = 1;
		this._size = 2;
		this._mino =[];
		this.init();
	}

	set r(n){this._r=n;}
	set c(n){this._c=c;}
	get r(){return this._r;}
	get c(){return this._c;}
	get type(){return this._type;}
	get size(){return this._size;}

	init(){
		for(let i=0; i<this._size**2; i++){
			this._mino.push(this._type);
		}
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
}