console.log("Hello JavaScript!!");

let numbers = [];

for(let i=0; i<9; i++){
	let number = Math.floor(Math.random() * 30);
	numbers.push(number);
}

console.log(numbers);

// 最初のステップ数
const STEPS = 3;
// ステップ数を1つづつ狭めていく
for(let s=STEPS; 0<s; s--){
	console.log("STEP:" + s);
	// 同じステップ数のグループそれぞれにアクセスするオフセット値
	for(let o=0; o<s; o++){
		// 配列の先頭"o+s"から最後までを探索
		for(let i=o+s; i<numbers.length; i+=s){
			// 探索対象の値
			let tmp = numbers[i];
			// 整列済みの範囲"i-s"から"0"まで逆順に探索する
			for(let t=i-s; 0<=t; t-=s){
				// 探索対象の値が配列"t"の値より小さい場合
				if(tmp < numbers[t]){
					// 配列の後ろ"t+s"にシフトする
					//console.log("後ろにシフトする:" + numbers[t]);
					numbers[t+s] = numbers[t];
					numbers[t]   = tmp;
				}else{
					// 整列済みの範囲の探索終了
					break;
				}
			}
		}
	}
}

console.log(numbers);