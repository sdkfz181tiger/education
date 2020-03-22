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

	constructor(rows, cols){
		this._rows = rows;
		this._cols = cols;
		this._board = [];
		this.init();
	}

	init(){
		this._board = [];
		for(let r=0; r<this._rows; r++){
			let line = [];
			for(let c=0; c<this._cols; c++){
				line.push(0);
			}
			this._board.push(line);
		}
		this.consoleBoard();
	}

	putBoms(num){

		let boms = [];
		let total = this._rows*this._cols;
		for(let b=0; b<total; b++){
			if(b < num){
				boms.push(1);
			}else{
				boms.push(0);
			}
		}
		console.log(boms);
		for(let b=total-1; 0<b; b--){
			let rdm = Math.floor(Math.random() * (b-1));
			let tmp = boms[rdm];
			boms[rdm] = boms[b];
			boms[b] = tmp;
		}
		console.log(boms);
	}

	consoleBoard(){
		let line = "";
		for(let c=0; c<this._cols*2; c++) line += "-";
		line += "-\n";
		for(let r=0; r<this._rows; r++){
			line += "|";
			for(let c=0; c<this._cols; c++){
				let n = this._board[r][c];
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