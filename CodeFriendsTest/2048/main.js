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

	// const size = 4;
	// var board = [
	// 	[0, 0, 0, 0],
	// 	[0, 0, 0, 0],
	// 	[0, 0, 0, 0],
	// 	[0, 0, 0, 0]
	// ];

	// randomPut();
	// showBoard();

	// scene.on(Event.LEFT_BUTTON_DOWN, slideLeft);
	// scene.on(Event.RIGHT_BUTTON_DOWN, slideRight);
	// scene.on(Event.UP_BUTTON_DOWN, slideUp);
	// scene.on(Event.DOWN_BUTTON_DOWN, slideDown);	

	function slideLeft(){
		for(let r=0; r<size; r++){
			for(let c=0; c<size-1; c++){
				if(board[r][c] == 0){
					for(let i=c+1; i<size; i++){
						if(board[r][i] == 0) continue;
						swapCells(r, i, r, c);
						break;
					}
				}
				for(let i=c+1; i<size; i++){
					if(board[r][i] == 0) continue;
					if(board[r][i] == board[r][c]){
						combineCells(r, i, r, c);
					}else{
						swapCells(r, i, r, c+1);
					}
					break;
				}
			}
		}
		showBoard();
	}

	function slideUp(){
		for(let c=0; c<size; c++){
			for(let r=0; r<size-1; r++){
				if(board[r][c] == 0){
					for(let i=r+1; i<size; i++){
						if(board[i][c] == 0) continue;
						swapCells(i, c, r, c);
						break;
					}
				}
				for(let i=r+1; i<size; i++){
					if(board[i][c] == 0) continue;
					if(board[i][c] == board[r][c]){
						combineCells(i, c, r, c);
					}else{
						swapCells(i, c, r+1, c);
					}
					break;
				}
			}
		}
		showBoard();
	}

	function slideRight(){
		for(let r=0; r<size; r++){
			for(let c=size-1; 0<c; c--){
				if(board[r][c] == 0){
					for(let i=c-1; 0<=i; i--){
						if(board[r][i] == 0) continue;
						swapCells(r, i, r, c);
						break;
					}
				}
				for(let i=c-1; 0<=i; i--){
					if(board[r][i] == 0) continue;
					if(board[r][i] == board[r][c]){
						combineCells(r, i, r, c);
					}else{
						swapCells(r, i, r, c-1);
					}
					break;
				}
			}
		}
		showBoard();
	}

	function slideDown(){
		for(let c=0; c<size; c++){
			for(let r=size-1; 0<r; r--){
				if(board[r][c] == 0){
					for(let i=r-1; 0<=i; i--){
						if(board[i][c] == 0) continue;
						swapCells(i, c, r, c);
						break;
					}
				}
				for(let i=r-1; 0<=i; i--){
					if(board[i][c] == 0) continue;
					if(board[i][c] == board[r][c]){
						combineCells(i, c, r, c);
					}else{
						swapCells(i, c, r-1, c);
					}
					break;
				}
			}
		}
		showBoard();
	}

	function combineCells(fromR, fromC, toR, toC){
		board[toR][toC] += board[fromR][fromC];
		board[fromR][fromC] = 0;
	}

	function swapCells(fromR, fromC, toR, toC){
		let tmp = board[toR][toC];
		board[toR][toC] = board[fromR][fromC];
		board[fromR][fromC] = tmp;
	}

	function randomPut(){

		let arr = [];
		for(let r=0; r<size; r++){
			for(let c=0; c<size; c++){
				let n = board[r][c];
				if(n == 0) arr.push({r:r, c:c});
			}
		}

		if(arr.length <= 0) return false;
		let i = Math.floor(Math.random() * arr.length);
		let r = arr[i].r;
		let c = arr[i].c;
		board[r][c] = 2;

		return true;
	}

	function showBoard(){

		if(!randomPut()){
			console.log("GAME OVER!!");
			return;
		}

		let line = "-------------\n";
		for(let r=0; r<size; r++){
			line += "|";
			for(let c=0; c<size; c++){
				let n = board[r][c];
				line += (n < 10) ? " " + n : n;
				if(c < size-1) line += ",";
			}
			line += "|\n";
		}
		line += "-------------"
		console.log(line);
	}

	let my2048 = new My2048();
	my2048.randomPut();
	my2048.randomPut();
	my2048.checkBoard();

	scene.on(Event.LEFT_BUTTON_DOWN, ()=>{
		my2048.slideLeft();
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});

	scene.on(Event.RIGHT_BUTTON_DOWN, ()=>{
		my2048.slideRight();
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});

	scene.on(Event.UP_BUTTON_DOWN, ()=>{
		my2048.slideUp();
		if(my2048.randomPut()){
			my2048.checkBoard();
		}else{
			console.log("GAME OVER!!");
		}
	});

	scene.on(Event.DOWN_BUTTON_DOWN, ()=>{
		my2048.slideDown();
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

	slideLeft(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=0; c<size-1; c++){
				if(this._board[r][c] == 0){
					for(let i=c+1; i<size; i++){
						if(this._board[r][i] == 0) continue;
						this.swapCells(r, i, r, c);
						break;
					}
				}
				for(let i=c+1; i<size; i++){
					if(this._board[r][i] == 0) continue;
					if(this._board[r][i] == this._board[r][c]){
						this.combineCells(r, i, r, c);
					}else{
						this.swapCells(r, i, r, c+1);
					}
					break;
				}
			}
		}
	}

	slideRight(){
		let size = this._size;
		for(let r=0; r<size; r++){
			for(let c=size-1; 0<c; c--){
				if(this._board[r][c] == 0){
					for(let i=c-1; 0<=i; i--){
						if(this._board[r][i] == 0) continue;
						this.swapCells(r, i, r, c);
						break;
					}
				}
				for(let i=c-1; 0<=i; i--){
					if(this._board[r][i] == 0) continue;
					if(this._board[r][i] == this._board[r][c]){
						this.combineCells(r, i, r, c);
					}else{
						this.swapCells(r, i, r, c-1);
					}
					break;
				}
			}
		}
	}

	slideUp(){
		let size = this._size;
		for(let c=0; c<size; c++){
			for(let r=0; r<size-1; r++){
				if(this._board[r][c] == 0){
					for(let i=r+1; i<size; i++){
						if(this._board[i][c] == 0) continue;
						this.swapCells(i, c, r, c);
						break;
					}
				}
				for(let i=r+1; i<size; i++){
					if(this._board[i][c] == 0) continue;
					if(this._board[i][c] == this._board[r][c]){
						this.combineCells(i, c, r, c);
					}else{
						this.swapCells(i, c, r+1, c);
					}
					break;
				}
			}
		}
	}

	slideDown(){
		let size = this._size;
		for(let c=0; c<size; c++){
			for(let r=size-1; 0<r; r--){
				if(this._board[r][c] == 0){
					for(let i=r-1; 0<=i; i--){
						if(this._board[i][c] == 0) continue;
						this.swapCells(i, c, r, c);
						break;
					}
				}
				for(let i=r-1; 0<=i; i--){
					if(this._board[i][c] == 0) continue;
					if(this._board[i][c] == this._board[r][c]){
						this.combineCells(i, c, r, c);
					}else{
						this.swapCells(i, c, r-1, c);
					}
					break;
				}
			}
		}
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






