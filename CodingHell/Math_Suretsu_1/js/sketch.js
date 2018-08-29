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

// 数列

console.log("Hello JavaScript!!");

// 問題A
// 下記にある様な数列の合計を計算するには...!?
// 0 + 1 + 2 + 3 + 4 + ...

let numA = 0;
for(let i=0; i<5; i++){
	numA += i;
	console.log(numA);
}
console.log("合計は:" + numA + "です。");

// 問題B
// 下記にある様な数列の合計を計算するには...!?
// 0 + 2 + 4 + 6 + 8 + ...

let numB = 0;
for(let i=0; i<5; i++){
	numB += i * 2;
	console.log(numB);
}
console.log("合計は:" + numB + "どすな。");

// 問題C
// 下記にある様な数列の合計を計算するには...!?
// 0 + 3 + 6 + 9 + 12 + ...

let numC = 0;
for(let i=0; i<5; i++){
	numC += i * 3;
	console.log(numC);
}
console.log("合計は:" + numC + "でんがな。");

// 問題D
// 下記にある様な数列の合計を計算するには...!?
// 0 + 3 + 6 + 9 + 12 + ...

let a = 0;// 初項
let d = 3;// 差分
let n = 5;// 項数
let numD = 0.5 * n * (2 * a + d * n - d); 
console.log("合計は:" + numD + "でおます。");

// 問題X
// O崎さんはヤミ金を始めました。
// ある日、知り合いのO坂さんに元金100円を月額利息10%(単利)で貸しました。
// 返済期限である1年後(12ヶ月後)にはいくらの借金になっているでしょうか!?
