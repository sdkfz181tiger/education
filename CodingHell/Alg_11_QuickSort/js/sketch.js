console.log("Hello JavaScript!!");

let numbers = [];

for(let i=0; i<100; i++){
	let number = Math.floor(Math.random() * 100);
	numbers.push(number);
}
console.log(numbers);

let l = 0;
let r = numbers.length - 1;
numbers = quickSort(numbers, l, r);
console.log(numbers);

function quickSort(arr, l, r){

	if(r <= l) return;

	// 基準値(今回は左端とする)
	let pivot = arr[l];

	// 走査用の添字
	let i = l;
	let j = r;

	while(true){
		// 左から右へ走査しながら、
		// Pivotを上回る値がある添字を探る
		while(arr[i] < pivot) i++;
		// 右から左へ走査しながら、
		// Pivotを下回る値がある添字を探る
		while(pivot < arr[j]) j--;
		// iとjが交差した場合は繰り返し処理を停止
		if (j <= i) break;
		// iとjにある値を交換する
		let tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
		// 添字を一つ進める
		i++;
		j--;
	}

	// 交差した境界の左側を再帰処理
	quickSort(arr, l, i-1);
	// 交差した境界の右側を再帰処理
	quickSort(arr, j+1, r);

	return arr;
}