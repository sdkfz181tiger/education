console.log("Hello JavaScript!!");

// 配列
let numbers = [0, 0, 0, 0, 0, 0];

// 配列にランダム値を入れる
for(let r=0; r<numbers.length; r++){
	let rdm = Math.floor(Math.random() * 30);
	numbers[r] = rdm;
}

console.log(numbers);

// 配列の先頭から最後までを探索
for(let i=0; i<numbers.length; i++){
	let min = numbers[i];// 最小値
	let k   = i;         // 最小値の位置
	// 探索開始位置"t"から配列の最後まで
	for(let t=i; t<numbers.length; t++){
		// 対象が最小値を下回っていた場合
		if(numbers[t] < min){
			min = numbers[t];// 最小値を更新
			k   = t;         // 最小値の位置を更新
		}
	}
	// 先頭の要素"i"と、確定した最小値"k"を交換する
	let tmp = numbers[i];
	numbers[i] = numbers[k];
	numbers[k] = tmp;
}

console.log(numbers);