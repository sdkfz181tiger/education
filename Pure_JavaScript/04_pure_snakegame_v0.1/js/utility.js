"use strict";
//==========
// MineSweeper

class SnakeGame{

	constructor(rows, cols){
		this._rows  = rows;
		this._cols  = cols;
		this._table = [];
		this._snake = [];
		this.init();
	}

	init(){
		// Table
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++) line.push(0);
			this._table.push(line);
		}
		// Snake
		this._snake.push(new Dot(0, 0, 16));

		this.consoleTable(this._table);
	}

	consoleTable(table){
		let line = "";
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		for(let r=0; r<this._rows; r++){
			line += "|";
			for(let c=0; c<this._cols; c++){
				let n = table[r][c];
				line += (n==0)?"-":n;
				if(c < this._cols-1) line += " ";
			}
			line += "|\n";
		}
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		console.log(line);
	}
}

class Dot{

	constructor(r, c, size){
		this._r = r;
		this._c = c;
		this._size = size;
	}

	set r(num){
		this._r = num;
	}

	get r(){
		return this._r;
	}

	set c(num){
		this._c = num;
	}

	get c(){
		return this._c;
	}

	get size(){
		return this._size;
	}
}

