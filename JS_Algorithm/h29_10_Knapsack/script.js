console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H29秋
//    ナップザック問題

const N = 4;// 要素の種類
const W = 10;// 容量制限

const weights = [2, 3, 4, 5];
const values  = [3, 4, 5, 9];

// NxW+1の配列
let table = Array.from(new Array(N), ()=>new Array(W+1).fill(-1));

window.onload = (event)=>{

	// ナップザック問題
	for(let n=0; n<N; n++){
		for(let w=0; w<W+1; w++){
			calc(n, w);
		}
	}

	console.table(table);// 結果を確認
}

function calc(n, w){
	if(table[n][w] != -1) return table[n][w];// 確定済み

	if(w < getWeight(n)){
		table[n][w] = getDp(n-1, w);// 容量をオーバーしていた場合
	}else{
		let i = getWeight(n);
		let aV = getDp(n-1, w);// 追加しなかった場合
		let bV = getDp(n, w-i) + values[n];// 追加した場合
		table[n][w] = Math.max(aV, bV);// 比較して価値がより高い方を採用
	}
}

function getWeight(w){
	if(w < 0) return 0;
	return weights[w];
}

function getValue(v){
	if(v < 0) return 0;
	return values[v];
}

function getDp(n, w){
	if(n < 0 || w < 0) return 0;
	return table[n][w];
}
