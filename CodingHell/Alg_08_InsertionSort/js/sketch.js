console.log("Hello JavaScript!!");

// 配列
let numbers = [0, 0, 0, 0, 0];

// 配列にランダム値を入れる
for(let r=0; r<numbers.length; r++){
	let rdm = Math.floor(Math.random() * 30);
	numbers[r] = rdm;
}

console.log(numbers);

// 配列の先頭+1から最後までを探索
for(let i=1; i<numbers.length; i++){
	// 探索対象の値
	let tmp = numbers[i];
	// 整列済みの範囲"i-1"から"0"まで逆順に探索する
	for(let t=i-1; 0<=t; t--){
		// 探索対象の値が配列"t"の値より小さい場合
		if(tmp < numbers[t]){
			// 配列の後ろ"t+1"にシフトする
			//console.log("後ろにシフトする:" + numbers[t]);
			numbers[t+1] = numbers[t];
			numbers[t]   = tmp;
		}else{
			// 整列済みの範囲の探索終了
			break;
		}
	}
	console.log(numbers);
}