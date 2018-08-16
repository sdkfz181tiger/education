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

// ぱぴぷぺぽ語暗号

const table = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];

var msg1  = "今日のお昼はカレーを食べました";
console.log(msg1);

// 暗号化
var msg2 = encrypt(msg1);
console.log(msg2);

// 復号化
var msg3 = decrypt(msg2);
console.log(msg3);

// 暗号化(偶数位置にぱぴぷぺぽ連結)
function encrypt(str){
	var result = "";
	for(var i=0; i<str.length; i++){
		var o = i % table.length;
		result += str[i] + table[o];
	}
	return result;
}

// 復号化(奇数番目だけ連結)
function decrypt(str){
	var result = "";
	for(var i=0; i<str.length; i+=2){
		result += str[i];
	}
	return result;
}