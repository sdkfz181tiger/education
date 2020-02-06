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

	const size = 4;
	var board = [
		[2, 2, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	showBoard();

	scene.on(Event.LEFT_BUTTON_DOWN, slideLeft);
	scene.on(Event.RIGHT_BUTTON_DOWN, slideRight);
	scene.on(Event.UP_BUTTON_DOWN, slideUp);
	scene.on(Event.DOWN_BUTTON_DOWN, slideDown);

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

	}

	function showBoard(){
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