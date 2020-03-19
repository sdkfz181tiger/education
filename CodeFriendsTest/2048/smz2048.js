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
class Smz2048{

	constructor(){
		this._size = 4;
		this._board = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this._copy = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		this._moves = [];
		this._history = [];
		this.copyBoard();
	}

	slideLeft(){
		this._moves = [];
		this.copyBoard();
		for(let r=0; r<this._size; r++){
			this.slideCells(r, 0, 0, 1);
		}
		return this.isChanged();
	}

	slideRight(){
		this._moves = [];
		this.copyBoard();
		for(let r=0; r<this._size; r++){
			this.slideCells(r, this._size-1, 0, -1);
		}
		return this.isChanged();
	}

	slideUp(){
		this._moves = [];
		this.copyBoard();
		for(let c=0; c<this._size; c++){
			this.slideCells(0, c, 1, 0);
		}
		return this.isChanged();
	}

	slideDown(){
		this._moves = [];
		this.copyBoard();
		for(let c=0; c<this._size; c++){
			this.slideCells(this._size-1, c, -1, 0);
		}
		return this.isChanged();
	}

	getSize(){return this._size;}

	getBoard(){return this._board;}

	getScore(){
		let size = this._size;
		let score = 0;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				score += this._board[r][c];
			}
		}
		return score;
	}

	getMove(r, c){
		for(let i=0; i<this._moves.length; i++){
			let move = this._moves[i];
			if(move.tR == r && move.tC == c) return move;
		}
		return null;
	}

	slideCells(r, c, dR, dC){
		if(dR == 0 && dC == 0) return;
		if(!this.isInside(r)) return;
		if(!this.isInside(c)) return;
		if(!this.isInside(r+dR)) return;
		if(!this.isInside(c+dC)) return;
		//console.log("=> slideCells[", r, c, "]");
		if(this.browCells(r, c, dR, dC)){
			this.slideCells(r, c, dR, dC);
		}else{
			this.slideCells(r+dR, c+dC, dR, dC);
		}
	}

	browCells(r, c, dR, dC){
		let tR = r + dR;
		let tC = c + dC;
		while(this.isInside(tR) && this.isInside(tC)){
			if(this._board[r][c] == 0){
				if(this._board[tR][tC] != 0){
					//console.log("swap[", tR, tC, "]->[", r, c, "]");
					this.swapCells(tR, tC, r, c);
					this._moves.push({gR:r-tR, gC:c-tC, tR:tR, tC:tC});
					return true;
				}
			}else{
				if(this._board[r][c] == this._board[tR][tC]){
					//console.log("combine[", tR, tC, "]->[", r, c, "]");
					this.combineCells(tR, tC, r, c);
					this._moves.push({gR:r-tR, gC:c-tC, tR:tR, tC:tC});
					return false;
				}
				if(this._board[tR][tC] != 0){
					//console.log("pass[", tR, tC, "]->[", r, c, "]");
					return false;
				}
			}
			tR += dR;
			tC += dC;
		}
		return false;
	}

	combineCells(fromR, fromC, toR, toC){
		this._board[toR][toC] += this._board[fromR][fromC];
		this._board[fromR][fromC] = 0;
	}

	swapCells(fromR, fromC, toR, toC){
		let tmp = this._board[toR][toC];
		this._board[toR][toC] = this._board[fromR][fromC];
		this._board[fromR][fromC] = tmp;
	}

	isInside(n){
		if(n < 0) return false;
		if(this._size <= n) return false;
		return true;
	}

	isChanged(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				if(this._board[r][c] != this._copy[r][c]) return true;
			}
		}
		return false;
	}

	copyBoard(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				this._copy[r][c] = this._board[r][c];
			}
		}
	}

	randomPut(n = 2){
		let size = this._size;
		let arr = [];
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				if(this._board[r][c] == 0) arr.push({r:r, c:c});
			}
		}
		if(arr.length <= 0) return false;
		let i = Math.floor(Math.random() * arr.length);
		let r = arr[i].r;
		let c = arr[i].c;
		this._last = {r:r, c:c};
		this._board[r][c] = n;
		return true;
	}

	checkGameOver(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				if(this._board[r][c] == 0) return false;
				if(r < size-1){
					if(this._board[r][c] == this._board[r+1][c]){
						return false;
					}
				}
				if(c < size-1){
					if(this._board[r][c] == this._board[r][c+1]){
						return false;
					}
				}
			}
		}
		return true;
	}

	pushHistory(){
		let arr = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				arr[r][c] = this._board[r][c];
			}
		}
		this._history.push(arr);
	}

	popHistory(){
		if(this._history.length < 2) return;
		this._history.pop();
		let arr = this._history.pop();
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				this._board[r][c] = arr[r][c];
			}
		}
		this.pushHistory();
		this.consoleBoard();
	}

	consoleBoard(){
		let size = this._size;
		let line = "SCORE:" + this.getScore();
		while(line.length < 17){
			line = line + "-";
			if(line.length < 17) line = "-" + line;
		}
		line += "\n";
		for(let r=0; r<size; r++){
			line += "|";
			for(let c=0; c<size; c++){
				let n = this._board[r][c];
				if(n < 10){
					line += "  " + n;
				}else if(n < 100){
					line += " " + n;
				}else{
					line += n;
				}
				if(c < size-1) line += ",";
			}
			line += "|\n";
		}
		line += "-----------------";
		console.log(line);
	}
}