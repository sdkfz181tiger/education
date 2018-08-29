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

// 二分探索
function binSearch(arr, target){

	let l = 0;                      // 検索対象の左端
	let r = arr.length - 1;         // 検索対象の右端
	let m = Math.floor((l + r) / 2);// 件宅対象の中央
	let p = -1;                     // 検索結果
	let c = 0;                      // 処理回数

	while(l <= r && p == -1){
		c++;// カウントアップ
		m = Math.floor((l + r) / 2);
		console.log("l:" + l + " r:" + r + " m:" + m);
		if(arr[m] == target){
			p = m;// 検索結果
		}else if(target < arr[m]){
			r = m - 1;
		}else{
			l = m + 1;
		}
	}
	return p;
}

// Test
let arr = [10, 12, 34, 44, 51, 65, 70, 89, 92];
let p = binSearch(arr, 89);
console.log("p:" + p);