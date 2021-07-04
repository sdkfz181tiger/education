console.log("Hello, JavaScript!!");

// H25春_午後問2
//    逆ポーランド記法

window.onload = (event)=>{

	let str = "1*((2+3)/4)";// 変換前数式文字データ
	let arr = convertToArr(str);// 変換前配列データ
	console.log(arr);

	let stack  = [null];// スタック用配列
	let result = [];// 変換後数式を格納する配列

	for(let i=0; i<arr.length; i++){

		let p = getPriority(arr[i]);// 配列にある値を取り出す
		if(p < 0) break;// -1の場合はエラーなので停止

		let last = stack.length - 1;// スタックの先頭にアクセス
		// 変換前配列データの優先度とスタックの先頭の優先度を比較する
		while(p<=getPriority(stack[last]) && stack[last] != "("){
			result.push(stack[last]);// スタックの優先度が高い場合はpopする
			stack = stack.slice(0, -1);// スタックから削除
			last--;// 優先度が低くなるか、"("でない限り繰り返す
		}

		if(arr[i] == ")"){// ")"の場合はスタックの先頭"("を削除
			stack = stack.slice(0, -1);
		}else{
			stack.push(arr[i]);// 違う場合はスタックにpushする
		}
		// データを確認する
		console.log(arr[i] + ":" + stack.join(" ") + " -> " + result.join(" "));
	}
	// 残りのデータを変換後データに写していく
	for(let i=stack.length-1; 0<=i; i--) result.push(stack[i]);

	// 結果を確認する
	console.log(str, " -> ", result.join(" "));
}

// 文字列を配列に変換する
function convertToArr(s){
	let elements = s.split(/(\d{1,}|\+|\-|\*|\-|\(|\))/);
	let data = [];
	for(let element of elements){
		if(element == "") continue;
		data.push(element);
	}
	return data;
}

// 文字の優先度を取得
function getPriority(c){
	if (c === "(") return 5;
	if (!Number.isNaN(parseInt(c))) return 4;
	if (c === "*" || c === "/") return 3;
	if (c === "+" || c === "-") return 2;
	if (c === ")") return 1;
	if (c === null) return 0;
	return -1;// Error
}