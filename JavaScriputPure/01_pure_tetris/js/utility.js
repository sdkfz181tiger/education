"use strict";
//==========
// Tetris

let MINO_I = [
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

let MINO_O = [
	[0, 0, 0, 0,
	 0, 4, 4, 0,
	 0, 4, 4, 0,
	 0, 0, 0, 0]
];

let MINO_Z = [
	[0, 0, 0, 0,
	 0, 5, 5, 0,
	 0, 0, 5, 5,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 0, 5, 0,
	 0, 5, 5, 0,
	 0, 5, 0, 0]
];

let MINO_S = [
	[0, 0, 0, 0,
	 0, 6, 6, 0,
	 6, 6, 0, 0,
	 0, 0, 0, 0],
	[0, 6, 0, 0,
	 0, 6, 6, 0,
	 0, 0, 6, 0,
	 0, 0, 0, 0]
];

let MINO_T = [
	[0, 0, 0, 0,
	 0, 7, 0, 0,
	 7, 7, 7, 0,
	 0, 0, 0, 0],
	[0, 7, 0, 0,
	 0, 7, 7, 0,
	 0, 7, 0, 0,
	 0, 0, 0, 0],
	[0, 0, 0, 0,
	 0, 7, 7, 7,
	 0, 0, 7, 0,
	 0, 0, 0, 0],
	[0, 0, 7, 0,
	 0, 7, 7, 0,
	 0, 0, 7, 0,
	 0, 0, 0, 0]
];

const MINOS  = [MINO_I, MINO_L, MINO_J, MINO_O, MINO_S, MINO_Z, MINO_T];

class TetrisManager{

	constructor(rows=20,cols=10,debug=false){
		this._rows  = rows;
		this._cols  = cols;
		this._debug = debug;
		this._grids = [];
		this._mino  = null;
		this.init();
	}

	init(){
		let total = this._rows * this._cols;
		for(let t=0; t<total; t++){
			this._grids.push(0);
		}
		this.createMino();
		this.step();
	}

	step(){
		this.stepDown();
		if(this.checkCollision()){
			this.stepUp();
			this.fixMino();
			this.createMino();
		}
		this.checkLines(this._rows-1);
		setTimeout(()=>{this.step();}, 1000);
	}

	createMino(){
		this._mino = new Mino(0, 3);
	}

	fixMino(){
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
			this._mino.c = -this._mino.getLIndex();
		}
		if(this._cols < this._mino.c+this._mino.size){
			this._mino.c = (this._cols-1) - this._mino.getRIndex();
		}
	}

	checkLines(last){
		for(let r=last; 0<=r; r--){
			let filled = true;
			for(let c=0; c<this._cols; c++){
				let n = this._grids[r*this._cols+c];
				if(n != 0) continue;
				filled = false;
			}
			if(filled == true){
				this._grids.splice(r*this._cols, this._cols);// Delete and fill
				for(let i=0; i<this._cols; i++) this._grids.unshift(0);
				this.checkLines(r);// Recursive
			}
		}
	}

	stepUp(){
		this._mino.stepUp();
	}

	stepDown(){
		this._mino.stepDown();
	}

	stepLeft(){
		this._mino.stepLeft();
	}

	stepRight(){
		this._mino.stepRight();
	}

	rotateL(){
		this._mino.rotateL();
	}

	rotateR(){
		this._mino.rotateR();
	}

	getData(){
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
		let bar = "";
		for(let b=0; b<this._cols*2+3; b++) bar += "=";
		bar += "\n";
		let str = bar;
		for(let r=0; r<this._rows; r++){
			let line = "| ";
			for(let c=0; c<this._cols; c++){
				let iG = r*this._cols + c;
				line += (data[iG]==0) ? "  ":data[iG]+" ";
			}
			str += line + "|\n";
		}
		str += bar;
		if(this._debug){
			console.clear();
			console.log(str);
		}
		return data;
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
		this._i = Math.floor(Math.random()*MINOS.length);
		this._j = Math.floor(Math.random()*MINOS[this._i].length);
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

	getLIndex(){
		for(let c=0; c<this._s; c++){
			for(let r=0; r<this._s; r++){
				let i = r*this._s + c;
				if(this._m[i] != 0) return c;
			}
		}
		return 0;
	}

	getRIndex(){
		for(let c=this._s-1; 0<=c; c--){
			for(let r=this._s-1; 0<=r; r--){
				let i = r*this._s + c;
				if(this._m[i] != 0) return c;
			}
		}
		return 0;
	}
}