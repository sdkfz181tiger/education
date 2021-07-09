console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H28春
//    ライフゲーム

const ROWS = 10; // 行数
const COLS = 10; // 列数
// 生死を格納する配列
let cells = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(false));
// 判定結果を格納する配列
let dummies = Array.from(new Array(ROWS), ()=>new Array(COLS).fill(false));

window.onload = (event)=>{
	
	// 仮データを作成
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			cells[r][c] = Math.random() < 0.4;
		}
	}

	step();
}

function step(){

	show();// Cellsを出力
	clear(dummies);// Dummiesをリセット
	// LifeGame
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			let counter = getAliveCnt(r, c);// 周囲のセルの生存数
			if(check(cells, r, c)){// 生のマス
				if(2 <= counter && counter <= 3){
					dummies[r][c] = true;// 2以上3以下の場合は生
				}else{
					dummies[r][c] = false;// それ以外の場合は死
				}
			}else{// 死のマス
				if(counter == 3){
					dummies[r][c] = true;// 生が3であれば生
				}else{
					dummies[r][c] = false;// それ以外は死
				}
			}
		}
	}
	copy(dummies, cells);// 配列をコピーする
	setTimeout(step, 1000);// 1000ミリ秒後に繰り返す
}

function getAliveCnt(r, c){
	let counter = 0;
	const dirs = [
		[-1, -1], [-1, 0], [-1, 1], [0, -1], 
		[0, 1], [1, -1], [1, 0], [1, 1]];
	for(let dir of dirs){
		if(check(cells, r+dir[0], c+dir[1])) counter++;
	}
	return counter;
}

function check(arr, r, c){
	if(r < 0 || c < 0 || ROWS <= r || COLS <= c) return false;
	return arr[r][c];
}

function clear(arr){
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			arr[r][c] = false;
		}
	}
}

function copy(arrA, arrB){
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			arrB[r][c] = arrA[r][c];
		}
	}
}

function show(){
	let str = "";
	for(let r=0; r<ROWS; r++){
		for(let c=0; c<COLS; c++){
			str += (cells[r][c])?"o":"-";
		}
		str += "\n";
	}
	console.clear();
	console.log(str);
}