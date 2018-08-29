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

//==========
// for文を使う
for(var r=1; r<=9; r++){
	for(var c=1; c<=9; c++){
		var result = r * c;
		console.log("[" + r + " x " + c + "]の答えは " + result + "です。");
	}
}

//==========
// 2次元配列に格納する
var data = [];
for(var r=1; r<=9; r++){
	var arr = [];
	data.push(arr);
	for(var c=1; c<=9; c++){
		var result = r * c;
		arr.push(result);
	}
}

console.log("配列を表示します");
console.log(data);

console.log("特定の計算結果を表示します");
console.log(data[0][0]);// 1 x 1
console.log(data[1][1]);// 2 x 2
console.log(data[3][3]);// 3 x 3
