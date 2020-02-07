var assets = [
	"images/title.png",// タイトル
];

function gameStart(){
	var scene = new Scene();
	core.replaceScene(scene); core.resume();

	//==========
	// ここから
	//==========
	
	scene.backgroundColor = "darkblue";

	let my2048 = new My2048();
	my2048.randomPut();
	my2048.randomPut();
	my2048.checkBoard();

	scene.on(Event.LEFT_BUTTON_DOWN, ()=>{
		if(!my2048.slideX(0, 1)) return;
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});

	scene.on(Event.RIGHT_BUTTON_DOWN, ()=>{
		if(!my2048.slideX(3, -1)) return;
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});

	scene.on(Event.UP_BUTTON_DOWN, ()=>{
		if(!my2048.slideUp()) return;
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});

	scene.on(Event.DOWN_BUTTON_DOWN, ()=>{
		if(!my2048.slideDown()) return;
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});
	
	//==========
	// ここまで
	//==========

};

function titleStart(){// タイトル画面
	var scene = gameManager.createTitleScene();
	core.replaceScene(scene); core.pause();
	scene.on(enchant.Event.TOUCH_START, function(){gameStart();});
}

//==========
//EnchantJS
enchant();
var gameManager;
var core;
var scene;
window.onload = function(){
	gameManager = new common.GameManager();
	core = gameManager.createCore(240, 240);
	core.preload(assets);
	core.onload = function(){gameStart();};
	core.start();
};

//==========
// 2048
class My2048{

	constructor(size=4){
		console.log("My2048!!");
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

	slideX(start, offset){
		let size = this._size;
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
					//console.log("c, i", c, i);
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

	isInside(n){
		if(n < 0) return false;
		if(this._size <= n) return false;
		return true;
	}

	slideLeft(){
		let size = this._size;
		let flg = false;
		for(let r=0; r<size; r++){
			for(let c=0; c<size-1; c++){
				if(this._board[r][c] == 0){
					for(let i=c+1; i<size; i++){
						if(this._board[r][i] == 0) continue;
						this.swapCells(r, i, r, c);
						flg = true;
						break;
					}
				}
				for(let i=c+1; i<size; i++){
					//console.log("c, i", c, i);
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

	slideRight(){
		let size = this._size;
		let flg = false;
		for(let r=0; r<size; r++){
			for(let c=size-1; 0<c; c--){
				if(this._board[r][c] == 0){
					for(let i=c-1; 0<=i; i--){
						if(this._board[r][i] == 0) continue;
						this.swapCells(r, i, r, c);
						flg = true;
						break;
					}
				}
				for(let i=c-1; 0<=i; i--){
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

	slideUp(){
		let size = this._size;
		let flg = false;
		for(let c=0; c<size; c++){
			for(let r=0; r<size-1; r++){
				if(this._board[r][c] == 0){
					for(let i=r+1; i<size; i++){
						if(this._board[i][c] == 0) continue;
						this.swapCells(i, c, r, c);
						flg = true;
						break;
					}
				}
				for(let i=r+1; i<size; i++){
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

	slideDown(){
		let size = this._size;
		let flg = false;
		for(let c=0; c<size; c++){
			for(let r=size-1; 0<r; r--){
				if(this._board[r][c] == 0){
					for(let i=r-1; 0<=i; i--){
						if(this._board[i][c] == 0) continue;
						this.swapCells(i, c, r, c);
						flg = true;
						break;
					}
				}
				for(let i=r-1; 0<=i; i--){
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

	combineCells(fromR, fromC, toR, toC){
		console.log("combineCells:", fromR, fromC, "<->", toR, toC);
		this._board[toR][toC] += this._board[fromR][fromC];
		this._board[fromR][fromC] = 0;
	}

	swapCells(fromR, fromC, toR, toC){
		console.log("swapCells:", fromR, fromC, "<->", toR, toC);
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

	checkBoard(){
		let line = "-------------\n";
		for(let r=0; r<this._size; r++){
			line += "|";
			for(let c=0; c<this._size; c++){
				let n = this._board[r][c];
				line += (n < 10) ? " " + n : n;
				if(c < this._size-1) line += ",";
			}
			line += "|\n";
		}
		line += "-------------"
		console.log(line);
	}
}






