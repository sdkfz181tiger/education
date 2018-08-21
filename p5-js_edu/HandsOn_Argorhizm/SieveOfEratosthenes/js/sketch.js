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
// Scratch -> JavaScript
// -> http://ozateck.sakura.ne.jp/wordpress/category/js-x-scratch/

// 九九表を作る

console.log("Hello JavaScript!!");

const NUM_MIN = 2;
const NUM_MAX = 30;

const NUM_SQRT = Math.sqrt(NUM_MAX);

let results = [];

// Step1
// 最小値から最大値までの数値が入っているリストを作成
let nums = [];
for(let i=NUM_MIN; i<NUM_MAX; i++){
	nums.push(i);
}

// Step2
// 先頭値が√最大値に達するまで繰り返す
while(nums[0] < NUM_SQRT){
	results.push(nums[0]);      // 先頭値を結果リストに追加
	nums = clean(nums[0], nums);// 先頭値の倍数を元リストから削除
}

// Step3
// 残りの数値を結果リストに追加する
results = results.concat(nums);
console.log(results);

// 配列(arr)から数値(num)の倍数に当たる数値を削除する
function clean(num, arr){
	for(let i=arr.length-1; 0<=i; i--){
		if(i % num == 0) arr.splice(i, 1);
	}
	return arr;
}
