console.log("Hello, 応用情報技術者試験!!");

// 応用情報_H29春
//    探索アルゴリズム

const TARGET = 100;// 目標値
const NUMS = [10, 34, 55, 77];// 利用する値を格納した配列

const queue = []; // キューを使った配列
let answer = null;// 解答候補を格納する

window.onload = (event)=>{
	
	enqueue(new Status([], 0, true));// 最初の値
	while(0 < queue.length) dequeue();// キューの値を一つづつ取り出す
	console.log("Answer:", answer.total, answer.selected);// 解答を確認する
}

function enqueue(status){
	queue.push(status);// 最後尾に追加する(Enqueue)
}

function dequeue(){

	let status = queue.shift();// 先頭から一つ取り出す(Dequeue)
	if(answer == null){
		answer = status;// 解答がnullならばそのまま解答候補とする
	}else{
		// TARGETとの差がanswer.totalよりstatus.totalが近ければ
		if(Math.abs(TARGET - status.total) < Math.abs(TARGET - answer.total)){
			answer = status;// statusをanswerに変更する
		}
	}

	if(status.next < 0) return;// 利用する値がもう無い場合は何もしない
	enqueue(new Status(status.selected, status.next, true)); // 次の値を選択した場合
	enqueue(new Status(status.selected, status.next, false));// 次の値を選択しない場合
}

class Status{

	constructor(selected, index, flg){
		this._total = 0;
		this._selected = selected.slice();
		this._next = (index<NUMS.length-1)?index+1:-1;

		if(flg) this._selected.push(NUMS[index]);
		for(let num of this._selected) this._total += num;

		//console.log("Status:", index, this._total, this._selected, this._next);
	}

	get total(){return this._total;}
	get selected(){return this._selected;}
	get next(){return this._next;}
}