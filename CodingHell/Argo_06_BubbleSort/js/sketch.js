console.log("Hello JavaScript!!");

// 配列
let numbers = [0, 0, 0, 0, 0, 0];

// 配列にランダム値を入れる
for(let r=0; r<numbers.length; r++){
	let rdm = Math.floor(Math.random() * 30);
	numbers[r] = rdm;
}

console.log(numbers);

// 配列の最後の要素(numbers.length-1)から最初の要素(0)まで
for(let last=numbers.length-1; 0<=last; last--){
	// 配列の最初の要素(i)から最後の要素の一つ手前(last-1)まで
	for(let i=0; i<=last-1; i++){
		// 配列の要素(i)と(i+1)の大きさを比較する
		if(numbers[i+1] < numbers[i]){
			// 配列の要素を交換する
			let tmp      = numbers[i];
			numbers[i]   = numbers[i+1];
			numbers[i+1] = tmp;
		}
	}
}

console.log(numbers);