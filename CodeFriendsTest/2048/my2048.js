//==========
// 2048
class My2048{

	constructor(size=4){
		this._size = size;
		this._last = null;
		this._board = [];
		for(let r=0; r<size; r++){
			let line = [];
			for(let c=0; c<size; c++){
				line.push(0);
			}
			this._board.push(line);
		}
	}

	slideLeft(){return this.slideX(1);}

	slideRight(){return this.slideX(-1);}

	slideUp(){return this.slideY(1);}

	slideDown(){return this.slideY(-1);}

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

	slideX(offset){
		if(offset != 1 && offset != -1) return false;
		let size = this._size;
		let start = (0 < offset) ? 0:size-1;
		let flg = false;
		for(let r=0; r<size; r++){
			for(let c=start; this.isInside(c); c+=offset){
				if(this._board[r][c] == 0){
					for(let i=c+offset; this.isInside(i); i+=offset){
						if(this._board[r][i] == 0) continue;
						this.swapCells(r, i, r, c);
						flg = true;
						break;
					}
				}
				for(let i=c+offset; this.isInside(i); i+=offset){
					if(this._board[r][i] == 0) continue;
					if(this._board[r][i] == this._board[r][c]){
						this.combineCells(r, i, r, c);
						flg = true;
					}
					break;
				}
			}
		}
		return flg;
	}

	slideY(offset){
		if(offset != 1 && offset != -1) return false;
		let size = this._size;
		let start = (0 < offset) ? 0:size-1;
		let flg = false;
		for(let r=start; this.isInside(r); r+=offset){
			for(let c=0; c<size; c++){
				if(this._board[r][c] == 0){
					for(let i=r+offset; this.isInside(i); i+=offset){
						if(this._board[i][c] == 0) continue;
						this.swapCells(i, c, r, c);
						flg = true;
						break;
					}
				}
				for(let i=r+offset; this.isInside(i); i+=offset){
					if(this._board[i][c] == 0) continue;
					if(this._board[i][c] == this._board[r][c]){
						this.combineCells(i, c, r, c);
						flg = true;
					}
					break;
				}
			}
		}
		return flg;
	}

	isInside(n){
		if(n < 0) return false;
		if(this._size <= n) return false;
		return true;
	}

	combineCells(fromR, fromC, toR, toC){
		//console.log("combineCells:", fromR, fromC, "<->", toR, toC);
		this._board[toR][toC] += this._board[fromR][fromC];
		this._board[fromR][fromC] = 0;
	}

	swapCells(fromR, fromC, toR, toC){
		//console.log("swapCells:", fromR, fromC, "<->", toR, toC);
		let tmp = this._board[toR][toC];
		this._board[toR][toC] = this._board[fromR][fromC];
		this._board[fromR][fromC] = tmp;
	}

	randomPut(){
		let size = this._size;
		let arr = [];
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let n = this._board[r][c];
				if(n == 0) arr.push({r:r, c:c});
			}
		}
		if(arr.length <= 0) return false;
		let i = Math.floor(Math.random() * arr.length);
		let r = arr[i].r;
		let c = arr[i].c;
		this._last = {r:r, c:c};
		this._board[r][c] = 2;
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

	checkBoard(){
		let line = "SCORE:" + this.getScore();
		while(line.length < 17) line = "-" + line + "-";
		line += "\n";
		for(let r=0; r<this._size; r++){
			line += "|";
			for(let c=0; c<this._size; c++){
				let n = this._board[r][c];
				if(n < 10){
					line += "  " + n;
				}else if(n < 100){
					line += " " + n;
				}else{
					line += n;
				}
				if(c < this._size-1) line += ",";
			}
			line += "|\n";
		}
		line += "-----------------";
		console.log(line);
	}
}