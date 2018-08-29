//==========
// p5.js
// -> https://p5js.org/
// References(使い方)
// -> https://p5js.org/reference/
// Examples(使用例)
// -> https://p5js.org/examples/

//==========
// p5.play
// -> http://p5play.molleindustria.org/
// References(使い方)
// -> http://p5play.molleindustria.org/docs/classes/Sprite.html
// Examples(使用例)
// -> http://p5play.molleindustria.org/examples/index.html

//==========
// HandsOn資料
// -> http://ozateck.sakura.ne.jp/wordpress

console.log("Hello p5.js!!");

// 内挿探索(Interpolation Search)
function intSearch(arr, target){

	let l = 0;              // 検索対象の左端
	let r = arr.length - 1; // 検索対象の右端
	let m = -1              // 見つける値がありそうな要素番号
	let p = -1;             // 検索結果
	let c = 0;              // 処理回数

	// 見つける探索範囲になければ、探索せずに-1を返す
	if(target < arr[l] || arr[r] < target) return p;

	// 探索
	while(l <= r && p == -1){
		c++;// 処理回数
		// 見つける値がありそうな要素番号
		if(arr[l] == arr[r]){
			m = l;
		}else{
			m = Math.floor((target - arr[l]) / (arr[r] - arr[l]) * (r - l) + l);
		}
		// 途中経過
		console.log("処理回数:" + c + " " + "l:" + l + " r:" + r + " m:" + m);
		// 探索範囲を狭める
		if(arr[m] == target){
			p = m;
		}else if(arr[m] > target){
			r = m - 1;
		}else{
			l = m + 1;
		}
	}
	return p;
}

// Test
let arr = [0, 4, 15, 27, 34, 44, 51, 65, 70, 89, 92, 100];
let p = intSearch(arr, 51);
console.log("p:" + p);