console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H30春
//    ナイト巡回問題

const V = 4;// 盤面の行数
const H = 3;// 盤面の列数

// VxHの配列
let board = Array.from(new Array(V), ()=>new Array(H).fill(0));

// ナイトが移動する方向(8方向)
const dV = [-2, -1,  1, 2,  2,  1, -1, -2];
const dH = [1,   2,  2, 1, -1, -2, -2, -1];

window.onload = (event)=>{

	// ナイト巡回問題
	search(1, 0, 0);
}

function search(i, v, h){
	if(v < 0 || V-1 < v) return;// 盤面の外であったら中止
	if(h < 0 || H-1 < h) return;
	if(board[v][h] != 0) return;// 巡回済みであったら中止
	board[v][h] = (i<10) ? "0"+i:i;// 巡回の番号

	if(V*H <= i){
		show();// 最後に到達していた場合は書き出す
		return;
	}else{
		// ナイトの8方向それぞれのマスを調べる
		for(let j=0; j<dV.length; j++){
			search(i+1, v+dV[j], h+dH[j]);
		}
	}
	board[v][h] = 0;// マスをリセットする
}

function show(){
	for(let line of board) console.log(line.join(","));
}