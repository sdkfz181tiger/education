/*!
 * smz2048.js v1.0.0
 *
 * Copyright (c) 2020 ShimejiOzaki
 *
 * Released under the MIT license.
 * see http://ozateck.sakura.ne.jp
 *
 * The inherits function is:
 * ISC license | https://github.com/isaacs/inherits/blob/master/LICENSE
 */
class MineSweeper{

	constructor(rows, cols, boms){
		this._rows = rows;
		this._cols = cols;
		this._boms = boms;
		this._tblTrap = [];
		this._tblSensor = [];
		this._tblSearch = [];
		this.initTrap(boms);
		this.initSensor();
		this.initSearch();
	}

	getTrap(){return this._tblTrap;}
	getSensor(){return this._tblSensor;}
	getSearch(){return this._tblSearch;}

	initTrap(boms){
		this._tblTrap = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._tblTrap.push(line);
		}
		let arr = [];
		let total = this._rows*this._cols;
		for(let b=0; b<total; b++){
			if(b < boms){
				arr.push(1);
			}else{
				arr.push(0);
			}
		}
		for(let b=total-1; 0<b; b--){
			let rdm = Math.floor(Math.random() * (b-1));
			let tmp = arr[rdm];
			arr[rdm] = arr[b];
			arr[b] = tmp;
		}
		for(let b=0; b<total; b++){
			let r = Math.floor(b / this._cols);
			let c = Math.floor(b % this._cols);
			this._tblTrap[r][c] = arr[b];
		}
	}

	initSensor(){
		this._tblSensor = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._tblSensor.push(line);
		}
		for(let r=0; r<this._rows; r++){
			for(let c=0; c<this._cols; c++){
				if(this.checkTrap(r, c, -1, -1)) this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, -1, 0))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, -1, 1))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 0, -1))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 0, 1))   this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 1, -1))  this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 1, 0))   this._tblSensor[r][c]++;
				if(this.checkTrap(r, c, 1, 1))   this._tblSensor[r][c]++;
			}
		}
	}

	initSearch(){
		this._tblSearch = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._tblSearch.push(line);
		}
	}

	search(r, c){
		console.log("search:", r, c);
		this.initSearch();
		if(this._tblTrap[r][c] == 1) return true;
		this.recursive(r, c);
		return false;
	}

	recursive(r, c){
		if(this._tblSearch[r][c] == 1) return;
		this._tblSearch[r][c] = 1;
		if(this.checkSpace(r, c, 1, 0))  this.recursive(r+1, c);
		if(this.checkSpace(r, c, -1, 0)) this.recursive(r-1, c);
		if(this.checkSpace(r, c, 0, 1))  this.recursive(r, c+1);
		if(this.checkSpace(r, c, 0, -1)) this.recursive(r, c-1);
	}

	checkSpace(r, c, x, y){
		let gR = r + x;
		let gC = c + y;
		if(gR < 0) return false;
		if(gC < 0) return false;
		if(this._rows <= gR) return false;
		if(this._cols <= gC) return false;
		if(this._tblTrap[gR][gC] == 1) return false;
		return true;
	}

	checkTrap(r, c, x, y){
		let gR = r + x;
		let gC = c + y;
		if(gR < 0) return false;
		if(gC < 0) return false;
		if(this._rows <= gR) return false;
		if(this._cols <= gC) return false;
		if(this._tblTrap[r][c] == 1) return false;
		if(this._tblTrap[gR][gC] == 0) return false;
		return true;
	}

	consoleAll(){
		console.log("=Trap=");
		this.consoleTable(this._tblTrap);
		console.log("=Sensor=");
		this.consoleTable(this._tblSensor);
		console.log("=Search=");
		this.consoleTable(this._tblSearch);
	}

	consoleTable(table){
		let line = "";
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		for(let r=0; r<this._rows; r++){
			line += "|";
			for(let c=0; c<this._cols; c++){
				let n = table[r][c];
				line += n;
				if(c < this._cols-1) line += ",";
			}
			line += "|\n";
		}
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		console.log(line);
	}
}