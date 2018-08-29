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

// バケツソート

console.log("Hello JavaScript!!");

const TOTAL = 10;

// 乱数の入った配列を用意する
let nums = [];
for(let i=0; i<TOTAL; i++){
	let num = Math.floor(TOTAL * Math.random());
	nums.push(num);
}
console.log(nums);

// 配列数が同じ配列を用意して0で初期化する
let cnt = [];
for(let i=0; i<TOTAL; i++){
	cnt.push(0);
}

// 配列の添字に該当する箇所に+1する
for(let i=0; i<TOTAL; i++){
	cnt[nums[i]] += 1;
}
console.log(cnt);

// 配列を表示する
let arr = [];
for(let i=0; i<TOTAL; i++){
	for(let n=0; n<cnt[i]; n++){
		arr.push(i);
	}
}
console.log(arr);