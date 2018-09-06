console.log("Hello JavaScript!!");

// ローカルストレージに保存するキー
const KEY = "my_ranks";

// ランキングデータを格納するJSONオブジェクト
let jObj  = {};

// ランキングデータを取得
let jStr = localStorage.getItem(KEY);
if(jStr == null){
	jObj.scores = [];
}else{
	jObj = JSON.parse(jStr);
}

// スコアをランダムで決定し、配列に追加して整列する
let score = Math.floor(Math.random() * 100);
jObj.scores.push(score);
jObj.scores = bubbleSort(jObj.scores);

// 自分のランキングを確認
let rank = linearSearch(jObj.scores, score) + 1;
console.log("あなたの得点は[ " + score + " ]です!!");
console.log("貴方は[ " + rank + "位 ]です!!");
console.log(jObj);

// ランキングデータを保存
localStorage.setItem(KEY, JSON.stringify(jObj));

// バブルソート
function bubbleSort(arr){
	// 配列の最後の要素(scores.length-1)から最初の要素(0)まで
	for(let last=arr.length-1; 0<=last; last--){
		// 配列の最初の要素(i)から最後の要素の一つ手前(last-1)まで
		for(let i=0; i<=last-1; i++){
			// 配列の要素(i)と(i+1)の大きさを比較する
			if(arr[i] < arr[i+1]){
				// 配列の要素を交換する
				let tmp  = arr[i];
				arr[i]   = arr[i+1];
				arr[i+1] = tmp;
			}
		}
	}
	return arr;
}

// 線形探索法
function linearSearch(arr, target){
	for(let i=0; i<arr.length; i++){
		if(arr[i] == target) return i;
	}
	return -1;
}