console.log("Hello JavaScript!!");

// 配列
let numbers = [3, 6, 9, 12, 15, 18];

let target = 18;// 探索対象
let result = -1;// 探索結果

// 配列の左端(left)と右端(right)の添字
let left   = 0;
let right  = numbers.length - 1;

// 探索が成功するか、探索が終了するまで繰り返す
while(result == -1 || right < left){
	// 左端(left)と右端(right)の中央値
	let middle = Math.floor((left + right)/2);
	// 探索判定
	if(numbers[middle] == target){
		// 探索成功
		result = middle;
	}else{
		// 探索範囲をカットする
		if(numbers[middle] < target){
			left = middle + 1;// 左端をカット
		}else{
			right = middle -1;// 右端をカット
		}
	}
}

console.log("result:" + result);